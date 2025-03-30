import { useRef, useContext, useEffect } from "react";
import { PermissionsContext } from "../../contexts/PermissionsContext";
import { IoCameraOutline } from "react-icons/io5";

const WebcamStream = () => {
  const videoRef = useRef(null);
  const { permissionsGranted, videoStream } = useContext(PermissionsContext);

  useEffect(() => {

    if (permissionsGranted && videoStream && videoRef.current) {
      videoRef.current.srcObject = videoStream;
    }


    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const videoStream = videoRef.current.srcObject;
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [permissionsGranted, videoStream]); 

  return (
    <div className="mb-4">
      {permissionsGranted && videoStream ? (
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
            backgroundColor: "#FAF9F5",
          }}
          className="flex items-center justify-center border-2 border-black"
        >
          <IoCameraOutline className="w-[150px] h-[100px]" />
        </div>
      )}
    </div>
  );
};

export default WebcamStream;
