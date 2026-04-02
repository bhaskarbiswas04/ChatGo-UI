import { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchOtherUsers = async()=>{
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(
                  `https://chat-go-app-backend.vercel.app/api/v1/user`,
                );
                console.log(response);
                dispatch(setOtherUsers(response.data))
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])
}

export default useGetOtherUsers