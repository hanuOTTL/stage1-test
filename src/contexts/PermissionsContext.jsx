import { createContext, useState, useEffect, useRef } from "react";
import io from "socket.io-client";

export const PermissionsContext = createContext();

export const PermissionsProvider = ({ children }) => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [combinedStream, setCombinedStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoPermission, setVideoPermission] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [screenPermission, setScreenPermission] = useState(false);

  useEffect(() => {
    const socketInstance = io("https://turfai.openturf.dev", {
      path: "/stageone_v2_be/socket.io",
      secure: true 
    });

    setSocket(socketInstance);

    // socketInstance.connect();

    socketInstance.on("connection", () => {
      setIsConnected(true);
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    const savedPermissions = localStorage.getItem("permissionsGranted");
    if (savedPermissions === "true") {
      setPermissionsGranted(true);
    }

    return () => {
      socketInstance.disconnect();
      console.log("Socket disconnected from cleanup");
    };

    
  }, []);


  useEffect(() => {
    if (permissionsGranted && combinedStream) {
      startRecording("67e3ce19e621dc006fb746a4", "67e3cd9be621dc006fb7469c", combinedStream);
    }
  }, [permissionsGranted, combinedStream]);

  const requestPermissions = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      setVideoPermission(true); 

      const videoRecordingStream = await navigator.mediaDevices.getDisplayMedia(
        {
          video: {
            width: {max: 800, ideal: 800},
            height: {max: 600, ideal: 600},
            frameRate: {ideal: 20, max: 20}
          },
        }
      );

      setScreenPermission(true);

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 11025
        },
      });

      const newCombinedStream = new MediaStream([
        ...videoRecordingStream.getTracks(),
        ...audioStream.getTracks(),
      ]);

      setVideoStream(mediaStream); 

      setAudioPermission(true);

  
      setCombinedStream(newCombinedStream);
      setPermissionsGranted(true);

      localStorage.setItem("permissionsGranted", "true");
    } catch (err) {
      console.error("Permission denied:", err);
      setPermissionsGranted(false);
    }
  };

  const startRecording = async (interviewId, candidateId, stream) => {
    try {

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const videoBuffer = event.data;
          setRecordedChunks((prev) => [...prev, videoBuffer]);

          recordData(interviewId, candidateId, videoBuffer);
        }
      };

      recorder.start(1000);
      console.log("Recording started");
    } catch (err) {
      console.error("Error starting screen recording:", err);
    }
  };

  const stopRecording = (interviewId, candidateId) => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      console.log("Recording stopped");
    }

    if (socket && socket.connected) {
      socket.emit("stopRecording", { interviewId, candidateId });
    }
  };

  const recordData = (interviewId, candidateId, videoBuffer) => {
    if (socket && socket.connected) {
      // console.log("Emitting recordingData:", {
      //   sessionId,
      //   candidateId,
      //   videoBuffer,
      // });
      socket.emit("recordingData", { interviewId, candidateId, videoBuffer });
    } else {
      console.error("Socket not connected or undefined");
    }
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissionsGranted,
        requestPermissions,
        videoStream,
        startRecording,
        recordingStream: combinedStream, 
        videoPermission,
        audioPermission,
        screenPermission,
        stopRecording
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};
