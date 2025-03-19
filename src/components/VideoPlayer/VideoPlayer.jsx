import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from '../../contexts/SocketContext';

const RecordingStream = ({ sessionId, candidateId }) => {
  const { recordData, stopRecording } = useSocket();
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {

        if (!stream) {
          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
          setStream(mediaStream);
          

          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;

            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play(); 
            };
          }


          const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm;codecs=vp8' });
          setMediaRecorder(recorder);

          // recorder.ondataavailable = (event) => {
          //   if (event.data && event.data.size > 0) {
          //     const videoBuffer = event.data;
          //     recordData(sessionId, candidateId, videoBuffer); 
          //   }
          // };

          recorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              setRecordedChunks(prev => [...prev, event.data]);  

              const videoBuffer = event.data;
              recordData(sessionId, candidateId, videoBuffer); 
            }
          };

  
          recorder.start(1000);
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();

    return () => {
  
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [recordData, sessionId, candidateId, mediaRecorder, stream]);

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop(); // Stop recording
    }
    stopRecording(sessionId, candidateId); 
  };
  


  const playRecordedChunks = () => {
    if (recordedChunks.length > 0) {
      const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
      const recordedURL = URL.createObjectURL(recordedBlob);
      if (recordedVideoRef.current) {
        recordedVideoRef.current.src = recordedURL;
        recordedVideoRef.current.play();
      }
    }
  };



  return (
    <>
    
    <div>
      <video
        ref={videoRef}  
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxWidth: '500px' }}
      />
      <button onClick={handleStopRecording}>Stop Recording</button>

    </div>

    <button onClick={playRecordedChunks}>Play Recorded Chunks</button>

<div>
<h3>Recorded Chunks</h3>
<video
  ref={recordedVideoRef}
  controls
  style={{ width: '100%', maxWidth: '500px' }}
/>
</div>
</>
  );
};

export default RecordingStream;
