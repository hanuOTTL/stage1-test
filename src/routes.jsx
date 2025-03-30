import React from "react";
import Layout from "./Layout";

const CodingProblem = React.lazy(() =>
  import("./components/CodingProblems/CodingProblem")
);
const McqQuestion = React.lazy(() =>
  import("./components/McqQuestions/McqQuestion")
);
const OtpLandingPage = React.lazy(() =>
  import("./components/OtpLandingPage/OtpLandingPage")
);
const PermissionPage = React.lazy(() =>
  import("./components/PermissionsPage/PermissionPage")
);
const Instructions = React.lazy(() =>
  import("./components/Instructions/Instruction")
);

const Tutorial = React.lazy(() => import("./components/Tutorial/TutorialPage"));

const QuestionSwitcher = React.lazy(() =>
  import("./components/QuestionRendering/QuestionSwitcher")
);

const FinalPage = React.lazy(()=> import("./components/FinalPage/FinalPage"))

const ImportantInformation = React.lazy(()=>import("./components/ImportantInformation/ImportantInformation"))

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "question", element: <QuestionSwitcher /> },
      { path: "/", element: <OtpLandingPage /> },
      { path: "permissions", element: <PermissionPage /> },
      { path: "instructions", element: <Instructions /> },
      { path: "tutorial", element: <Tutorial /> },
      { path: "question", element: <QuestionSwitcher /> },
      { path: "finalpage", element: <FinalPage /> },
      { path: "info", element: <ImportantInformation /> }
    ],
  },
];

export default routes;
