import { createContext, useState, useEffect } from "react";

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  // Set initial state to false if not yet granted
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const savedPermissions = localStorage.getItem("permissionsGranted");
    if (savedPermissions === "true") {
      setPermissionsGranted(true);
    }
  }, []);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log(stream);
      setPermissionsGranted(true);
      localStorage.setItem("permissionsGranted", "true");
    } catch (err) {
      console.error("Permission denied:", err);
      setPermissionsGranted(false);
    }
  };

  return (
    <PermissionsContext.Provider value={{ permissionsGranted, requestPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};
