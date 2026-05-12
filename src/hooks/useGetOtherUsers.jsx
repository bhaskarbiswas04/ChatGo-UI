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

                const response = await axios.get(
                  `https://chatgo-app-backend-1.onrender.com/api/v1/user`,
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