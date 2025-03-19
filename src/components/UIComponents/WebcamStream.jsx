import { useRef, useContext, useEffect } from "react";
import { PermissionsContext } from "../../contexts/PermissionsContext";
import { IoCameraOutline } from "react-icons/io5";


const WebcamStream = () => {
  const videoRef = useRef(null);
  const { permissionsGranted } = useContext(PermissionsContext);

  useEffect(() => {
    const startVideoStream = async () => {
      try {
        let stream;
        if (permissionsGranted) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    if (permissionsGranted) {
      startVideoStream();
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [permissionsGranted]);

  return (
    <div className="mb-4">
      {permissionsGranted ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          width="100%"
          height="auto"
          className="rounded-full border-2 border-black"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
            backgroundColor: "#FAF9F5"
          }}
          className="flex items-center justify-center border-2 border-black"
        >
            <IoCameraOutline className="w-[150px] h-[100px]"/>
        </div>
      )}
    </div>
  );
};

export default WebcamStream;
