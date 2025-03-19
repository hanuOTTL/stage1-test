import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  console.log(socket)

  useEffect(() => {
    const socketInstance = io('ws://localhost:3000', {
      autoConnect: false,  
    });

    setSocket(socketInstance);

    socketInstance.connect();


    socketInstance.on('connection', () => {
      setIsConnected(true);
      console.log('Socket connected:', socketInstance.id);
    });


    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });


    return () => {
      socketInstance.disconnect();
      console.log('Socket disconnected from cleanup');
    };
  }, []);

  // const startStreaming = (sessionId, candidateId, stream) => {
  //   if (socket && socket.connected) {
  //     socket.emit('stream', stream);
  //   }
  // };

  const stopRecording = (sessionId, candidateId) => {
    if (socket && socket.connected) {
      socket.emit('stopRecording', { sessionId, candidateId });
    }
  };

  const recordData = (sessionId, candidateId, videoBuffer) => {
    if (socket && socket.connected) {
      console.log('Emitting recordingData:', { sessionId, candidateId, videoBuffer }); 
      socket.emit('recordingData', { sessionId, candidateId, videoBuffer });
        socket.emit('testEvent', "Hi")
    
    } else {
      console.error('Socket not connected or undefined');  
    }
  };
  

  return (
    <SocketContext.Provider value={{ socket, isConnected, stopRecording, recordData }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
