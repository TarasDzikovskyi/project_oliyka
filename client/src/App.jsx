import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {getTokenFromLocalStorage} from "./utils/auth.utils";
import {getProfile} from "./api/axios.api";
import {loginSuccess, logout} from "./store/slices/userSlice";
import {BrowserRouter as Router} from "react-router-dom";
import Routers from "./components/Routers";

function App() {
    const dispatch = useDispatch();

    const checkToken = async () => {
        const token = getTokenFromLocalStorage();

        try {
            if (token) {
                let req = {token: token};
                const {data} = await getProfile(req);

                if (data) {
                    dispatch(loginSuccess(data));
                } else {
                    dispatch(logout);
                    toast.error('Please relogin')
                }
            }
        } catch (e) {
            console.log(e);
            // if(e.response?.status === 401) {
            //     console.log(e.response?.data.error);
            //     const error = e.response?.data.message;
            //     toast.error(error.toString())
            // }
        }
    };

    useEffect(() => {
        checkToken();
    }, []);


    return (
        <>
            <Router>
                <Routers />
            </Router>
        </>
    )
}

export default App
