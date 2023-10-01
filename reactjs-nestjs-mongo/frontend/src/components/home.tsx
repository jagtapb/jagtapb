import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/authSlice";
import { RootState } from "../redux/store";

export const Home = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth.value);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.post('user', {});
                setMessage(`Hi ${data.name}, Welcome to the application.`);    
                dispatch(setAuth(true));
            } catch(e) {
                setMessage('You are not Authenticated...');
                dispatch(setAuth(false));
            }
        })();
    }, []);

    return <div className="container mt-5 text-center">
        <h3>{auth ? message : 'You are not Authenticated...'}</h3>
    </div>;
};