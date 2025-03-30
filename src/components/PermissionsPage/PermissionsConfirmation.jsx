import { PermissionsContext } from "../../contexts/PermissionsContext";
import { useContext } from "react";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const PermissionsConfirmation = () => {
  const { videoPermission, audioPermission, screenPermission } =
    useContext(PermissionsContext);
  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <span>
          <label className={`inline-block px-2 py-1.5 `}>
            {videoPermission ? (
              <CheckIcon
                style={{
                  color: "green",
                  marginRight: 5,
                  paddingBottom: 5,
                }}
              />
            ) : (
              <CancelIcon
                style={{ color: "red", marginRight: 5, paddingBottom: 5 }}
              />
            )}
            Camera
          </label>
        </span>

        <span>
          <label className={`inline-block px-2 py-1.5`}>
            {audioPermission ? (
              <CheckIcon
                style={{
                  color: "green",
                  marginRight: 5,
                  paddingBottom: 5,
                }}
              />
            ) : (
              <CancelIcon
                style={{ color: "red", marginRight: 5, paddingBottom: 5 }}
              />
            )}
            Microphone
          </label>
        </span>
        <span>
          <label className={`inline-block px-2 py-1.5 `}>
            {screenPermission ? (
              <CheckIcon
                style={{
                  color: "green",
                  marginRight: 5,
                  paddingBottom: 5,
                }}
              />
            ) : (
              <CancelIcon
                style={{ color: "red", marginRight: 5, paddingBottom: 5 }}
              />
            )}
            Screen Share
          </label>
        </span>
      </div>
    </div>
  );
};

export default PermissionsConfirmation
