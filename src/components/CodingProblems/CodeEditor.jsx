import MonacoEditor from "react-monaco-editor";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../../api/Axios";
import { LanguageContext } from "../../contexts/LanguageContext";
import {
  generateJavaScriptTemplate,
  generateJavaTemplate,
  generatePythonTemplate,
} from "../CodingTemplates/CodingTemplates";
import { useNavigate } from "react-router-dom";
import {
  generateJavaSolveFunction,
  generateJavascriptSolveFunction,
  generatePythonSolveFunction,
} from "../CodingTemplates/InputTemplates";
import { useLocation } from "react-router-dom";

const CodeEditor = ({
  outputDetails,
  messageDetails,
  setOutputDetails,
  setConsoleDetails,
  testCaseValues,
  setMemoryDetails,
  setTimeDetails,
  setMessageDetails,
  inputType,
  nextFunction,
  setAnswer,
}) => {
  const [candidateCode, setCandidateCode] = useState("");
  const [finalSourceCode, setFinalSourceCode] = useState("");
  const { language, languageId } = useContext(LanguageContext);
  const [codeOutput, setCodeOutput] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    let generatedCode = "";

    if (language === "javascript" && candidateCode != "") {
      generatedCode = generateJavaScriptTemplate({ candidateCode, inputType });
    } else if (language === "java" && candidateCode != "") {
      generatedCode = generateJavaTemplate({ candidateCode, inputType });
    } else if (language === "python" && candidateCode != "") {
      generatedCode = generatePythonTemplate({ candidateCode, inputType });
    }

    setFinalSourceCode(generatedCode);
  }, [language, candidateCode, inputType]);

  useEffect(() => {
    let generatedSolveFunction = "";
    if (language === "javascript") {
      generatedSolveFunction = generateJavascriptSolveFunction({
        candidateCode,
        inputType,
      });
    } else if (language === "java") {
      generatedSolveFunction = generateJavaSolveFunction({
        candidateCode,
        inputType,
      });
    } else if (language === "python") {
      generatedSolveFunction = generatePythonSolveFunction({
        candidateCode,
        inputType,
      });
    }

    setCandidateCode(generatedSolveFunction);
  }, []);

  if (location.pathname == "question") {
    const output = testCaseValues?.map((testCase, index) => {
      const passed = messageDetails[index] === "Accepted";
      return {
        testCase: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: outputDetails[index]?.trim(),
        passed: passed,
      };
    });

    setCodeOutput(output);
  }

  const submitAnswer = async () => {
    try {
      const answerData = {
        candidateId: "67e3cd9be621dc006fb7469c",
        interviewId: "67e3ce19e621dc006fb746a4",
        questionId: "67e24c28cd6210ac580bcdd2",
        answerText: candidateCode,
        codeOutput: codeOutput,
      };

      console.log(answerData);
      const response = await apiClient.post("/answer", answerData);

      console.log("Answer submitted successfully:", response.data);
      nextFunction();
    } catch (error) {
      console.error(
        "Failed to submit answer:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleRunCode = () => {
    setOutputDetails("");
    setConsoleDetails("");
    const formData = {
      submissions: Object.keys(testCaseValues).map((testCaseKey) => {
        const testCase = testCaseValues[testCaseKey];

        return {
          language_id: languageId,
          source_code: btoa(finalSourceCode),
          stdin: btoa(testCase?.input),
          expected_output: btoa(testCase?.expectedOutput),
        };
      }),
    };

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: "true",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "84ffe3ed05mshd86d1c17bd1a0b2p145f59jsn77388046ca81",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);

        // Step 1: Get tokens from the response array
        const tokens = response.data.map((submission) => submission.token);

        // Step 2: Call checkStatus with comma-separated tokens
        checkStatus(tokens);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        console.log(error);
      });
  };

  const checkStatus = async (tokens) => {
    const tokenString = tokens.join(",");

    console.log(tokenString);
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: tokenString,
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "84ffe3ed05mshd86d1c17bd1a0b2p145f59jsn77388046ca81",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };

    try {
      let response = await axios.request(options);
      let submissions = response?.data?.submissions;

      submissions.forEach((submission, index) => {
        let statusId = submission?.status?.id;

        if (statusId === 1 || statusId === 2) {
          setTimeout(() => {
            checkStatus(tokens);
          }, 3000);
          return;
        } else {
          const stderr = submission?.stderr ? atob(submission?.stderr) : "";
          const stdout = submission?.stdout || "No output available";

          setConsoleDetails((prevConsoleDetails) => {
            const newConsoleDetails = [...prevConsoleDetails];
            newConsoleDetails[index] = stderr;
            return newConsoleDetails;
          });

          setOutputDetails((prevOutputDetails) => {
            const newOutputDetails = [...prevOutputDetails];
            newOutputDetails[index] =
              stdout !== "No output available" ? atob(stdout) : "";
            return newOutputDetails;
          });

          setMessageDetails((prevMessageDetails) => {
            const newMessageDetails = [...prevMessageDetails];
            newMessageDetails[index] =
              submission?.status?.description || "No message available";
            return newMessageDetails;
          });

          setTimeDetails((prevTimeDetails) => {
            const newTimeDetails = [...prevTimeDetails];
            newTimeDetails[index] = submission?.time || "N/A";
            return newTimeDetails;
          });

          setMemoryDetails((prevMemoryDetails) => {
            const newMemoryDetails = [...prevMemoryDetails];
            newMemoryDetails[index] = submission?.memory || "N/A";
            return newMemoryDetails;
          });
        }
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="rounded-md border-2 border-[#EBEAE6] h-full overflow-hidden">
      <div className="w-full bg-box-header rounded-t-button py-2 px-2 flex justify-between">
        <div className="bg-white rounded-button inline-block px-2 py-1.5">
          {language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()}
        </div>
        <div>
          <button
            className="bg-white rounded-button inline-block px-2 py-1.5 mx-2 cursor-pointer"
            onClick={handleRunCode}
          >
            Run Code
          </button>

          <button
            className="bg-background-green text-white rounded-button inline-block px-2 py-1.5 mx-2 cursor-pointer"
            onClick={() => submitAnswer()}
          >
            Submit and Next
          </button>
        </div>
      </div>

      <div className="w-full min-h-[50%]">
        <MonacoEditor
          theme="vs-light"
          language="python"
          value={candidateCode}
          defaultValue="const solve(arr){}"
          onChange={(value) => {
            setCandidateCode(value);
            setAnswer(value);
          }}
          className="w-full min-h-[250px]"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
