// import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';

// export const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const socketInstance = io('https://turfai.openturf.dev/stageone_v2_be/api/v1', {
//       autoConnect: false,
//     });

//     setSocket(socketInstance);

//     socketInstance.connect();

//     socketInstance.on('connection', () => {
//       setIsConnected(true);
//       console.log('Socket connected:', socketInstance.id);
//     });

//     socketInstance.on('disconnect', () => {
//       setIsConnected(false);
//       console.log('Socket disconnected');
//     });

//     return () => {
//       socketInstance.disconnect();
//       console.log('Socket disconnected from cleanup');
//     };
//   }, []);


//   const startRecording = async (sessionId, candidateId) => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//         audio: true,
//       });

//       videoRef.current.srcObject = stream;
//       videoRef.current.play();

//       const recorder = new MediaRecorder(stream);
//       setMediaRecorder(recorder);

//       recorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           const videoBuffer = event.data;
//           setRecordedChunks((prev) => [...prev, videoBuffer]);
//           console.log('Captured chunk:', videoBuffer);

//           recordData(sessionId, candidateId, videoBuffer);
//         }
//       };

//       recorder.start(1000); 
//       console.log('Recording started');
//     } catch (err) {
//       console.error('Error starting screen recording:', err);
//     }
//   };

//   const stopRecording = (sessionId, candidateId) => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       console.log('Recording stopped');
//     }

//     if (socket && socket.connected) {
//       socket.emit('stopRecording', { sessionId, candidateId });
//     }
//   };


//   const recordData = (sessionId, candidateId, videoBuffer) => {
//     if (socket && socket.connected) {
//       console.log('Emitting recordingData:', { sessionId, candidateId, videoBuffer });
//       socket.emit('recordingData', { sessionId, candidateId, videoBuffer });
//     } else {
//       console.error('Socket not connected or undefined');
//     }
//   };

//   return (
//     <SocketContext.Provider value={{ socket, isConnected, startRecording, stopRecording }}>
//       {children}
//       {/* Hidden video element to show stream */}
//       <video ref={videoRef} style={{ display: 'none' }} />
//     </SocketContext.Provider>
//   );
// };