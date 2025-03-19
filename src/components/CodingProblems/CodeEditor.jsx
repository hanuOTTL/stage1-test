import MonacoEditor from "react-monaco-editor";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { LanguageContext } from "../../contexts/LanguageContext";
import { generateJavaScriptTemplate } from "../CodingTemplates/CodingTemplates";
import { generateJavaTemplate } from "../CodingTemplates/CodingTemplates";
import { generatePythonTemplate } from "../CodingTemplates/CodingTemplates";

const CodeEditor = ({
  setOutputDetails,
  setConsoleDetails,
  testCaseValues,
  setMemoryDetails,
  setTimeDetails,
  setMessageDetails,
  inputType,
}) => {
  const [candidateCode, setCandidateCode] = useState("");
  const [finalSourceCode, setFinalSourceCode] = useState("");
  const { language, languageId } = useContext(LanguageContext);

  useEffect(() => {
    let generatedCode = "";

    if (language === "javascript" && candidateCode != "") {
      generatedCode = generateJavaScriptTemplate({ candidateCode, inputType });
    } else if (language === "java" && candidateCode != "") {
      generatedCode = generateJavaTemplate({ candidateCode, inputType });
      console.log(generatedCode);
    } else if (language === "python" && candidateCode != "") {
      generatedCode = generatePythonTemplate({ candidateCode, inputType });
    }

    setFinalSourceCode(generatedCode);
  }, [language, candidateCode, inputType]);

  console.log(finalSourceCode);

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
          expected_output: btoa(testCase?.expected_output),
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
      let submissions = response?.data?.submissions; // Extract array of submissions

      // Iterate over the submissions array
      submissions.forEach((submission, index) => {
        let statusId = submission?.status?.id; // Get status ID of the submission

        if (statusId === 1 || statusId === 2) {
          // If the status is 1 (In Queue) or 2 (Processing), check again after a delay
          setTimeout(() => {
            checkStatus(tokens); // Continue polling for all tokens
          }, 3000);
          return;
        } else {
          // If the status is "Wrong Answer" (statusId: 4) or successful submission (statusId: other than 4)
          const stderr = submission?.stderr ? atob(submission?.stderr) : ""; // Set stderr if present, otherwise leave it empty
          const stdout = submission?.stdout || "No output available"; // Get stdout or fallback message

          // Handle console output (stderr for both cases)
          setConsoleDetails((prevConsoleDetails) => {
            const newConsoleDetails = [...prevConsoleDetails];
            newConsoleDetails[index] = stderr; // Assign stderr or empty string
            return newConsoleDetails;
          });

          // Handle output details (stdout for both cases)
          setOutputDetails((prevOutputDetails) => {
            const newOutputDetails = [...prevOutputDetails];
            newOutputDetails[index] =
              stdout !== "No output available" ? atob(stdout) : ""; // Only decode stdout if it has content
            return newOutputDetails;
          });

          // Handle message, time, and memory usage for all cases
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
      // Handle error appropriately
    }
  };

  return (
    <div className="rounded-md border-2 border-[#EBEAE6] h-full overflow-hidden">
      <div className="w-full bg-box-header rounded-t-button py-5 px-4 flex justify-between">
        <div className="bg-white rounded-button inline-block px-3.5 py-2.5">
          {language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()}
        </div>
        <div>
          <button
            className="bg-white rounded-button inline-block px-3.5 py-2.5 mx-5  cursor-pointer"
            onClick={handleRunCode}
          >
            Run Code
          </button>

          <button className="bg-background-green text-white rounded-button inline-block px-3.5 py-2.5 mx-5 cursor-pointer">
            Submit and Next
          </button>
        </div>
      </div>

      <div className="w-full min-h-[250px]">
        <MonacoEditor
          theme="vs-light"
          language="python"
          value={candidateCode}
          defaultValue="Enter Code here"
          onChange={(value) => setCandidateCode(value)}
          className="w-full min-h-[250px]"
        />
        {/* {processing && <div>Processing</div>}
      {OutputDetails} */}
      </div>
    </div>
  );
};

export default CodeEditor;
