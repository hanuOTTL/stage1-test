import React, { useEffect, useState, useRef, useContext } from "react";
// import { useSocket } from "../../contexts/SocketContext";
import { useLocation } from "react-router-dom";
import { PermissionsContext } from "../../contexts/PermissionsContext";

const RecordingStream = ({ sessionId, candidateId }) => {
  // const { recordData, stopRecording } = useSocket();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);

  const location = useLocation();
const { permissionsGranted } = useContext(PermissionsContext);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        if (!stream) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setStream(mediaStream);

          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;

            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
            };
          }

          // const recorder = new MediaRecorder(mediaStream, {
          //   mimeType: "video/webm;codecs=vp8",
          // });
          // setMediaRecorder(recorder);

          // recorder.ondataavailable = (event) => {
          //   if (event.data && event.data.size > 0) {
          //     const videoBuffer = event.data;
          //     recordData(sessionId, candidateId, videoBuffer);
          //   }
          // };

          // recorder.ondataavailable = (event) => {
          //   if (event.data && event.data.size > 0) {
          //     setRecordedChunks((prev) => [...prev, event.data]);

          //     const videoBuffer = event.data;
          //     recordData(sessionId, candidateId, videoBuffer);
          //   }
          // };

          // recorder.start(1000);
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();


    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [sessionId, candidateId, mediaRecorder, stream]);

  // const handleStopRecording = () => {
  //   if (mediaRecorder) {
  //     mediaRecorder.stop(); // Stop recording
  //   }
  //   stopRecording(sessionId, candidateId);
  // };

  // const playRecordedChunks = () => {
  //   if (recordedChunks.length > 0) {
  //     const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
  //     const recordedURL = URL.createObjectURL(recordedBlob);
  //     if (recordedVideoRef.current) {
  //       recordedVideoRef.current.src = recordedURL;
  //       recordedVideoRef.current.play();
  //     }
  //   }
  // };
  const handleMouseDown = (e) => {
    setIsDragging(true);

    const rect = videoRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };



  return (
    <>
      <div>
        {permissionsGranted?(<video
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          disablePictureInPicture
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="rounded-full border-2 border-black"
          style={{
            position: "fixed",
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: "200px",
            height: "200px",
            zIndex: 9999, 
            cursor: isDragging ? "grabbing" : "grab",
            objectFit: "cover",
          }}
        />):(
          <></>
        )
        }
        
      </div>
    </>
  );
};

export default RecordingStream;
