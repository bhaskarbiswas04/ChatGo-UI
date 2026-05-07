import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';

function useGetOtherUsers() {
    const dispatch = useDispatch();
    const { authUser } = useSelector((store) => store.user);

    useEffect(()=>{
        const fetchOtherUsers = async ()=>{
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                  `https://chat-go-app-backend.vercel.app/api/v1/user`,
                  { withCredentials: true },
                  {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                  }
                );
                // console.log(response);
                dispatch(setOtherUsers(response.data))
                
            } catch (error) {
                console.log(error);
            }
        }

        if (authUser) {
          fetchOtherUsers();
        }
    }, [authUser, dispatch])
}

export default useGetOtherUsers