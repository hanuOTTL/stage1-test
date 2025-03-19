import React from "react";

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

const routes = [
  { path: "code", element: CodingProblem },
  { path: "mcq", element: McqQuestion },
  { path: "/", element: OtpLandingPage },
  { path: "permissions", element: PermissionPage },
  { path: "instructions", element: Instructions },
];

export default routes;
