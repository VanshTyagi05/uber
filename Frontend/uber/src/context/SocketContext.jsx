import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);

   const sendMessage = (eventName,message)=>{
    socket.emit(eventName,message);
   }

   const receiveMessage = (eventName,callBack)=>{
   socket.on(eventName,callBack);
   }

    return (
        <SocketContext.Provider value={{ sendMessage,receiveMessage,socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;