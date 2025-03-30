import { Outlet } from "react-router-dom";
import RecordingStream from "./components/RecordingStream/RecordingStream";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";

const Layout = () => {
  const location = useLocation()

  const showOnPaths = ["/code", "/mcq", "/question"];
  const noHeaderRoutes = ["/", "/permissions","/tutorial", "/finalpage", "/info"];

  return (
    <div>
      {showOnPaths.includes(location.pathname) && <RecordingStream/>}
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
    </div>
  );
};

export default Layout;
