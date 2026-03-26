import React, { useEffect } from 'react';
import axios from "axios";

function useGetOtherUsers() {

  
    useEffect(()=>{
        const fetchOtherUsers = async()=>{
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(
                  `https://chat-go-app-backend.vercel.app/api/v1/user`,
                );
                console.log(response);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    })
}

export default useGetOtherUsers