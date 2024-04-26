import React, {useEffect, useState} from 'react';
import ReactCodeInput from "react-code-input";
import {getProfile, loginUser, checkCode} from "../api/axios.api";
import logo from '../assets/oliyar-logo.png';
import {setTokenToLocalStorage} from "../utils/auth.utils";
import {useNavigate} from "react-router-dom";
import {login, loginStart, loginSuccess, loginFailure} from "../store/slices/userSlice";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";


function Auth() {
    const [checkerCode, setCheckerCode] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [liveCode, setLiveCode] = useState('');
    const [uid, setUid] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleCheck = async () => {
        try {
            dispatch(loginStart());

            if (liveCode !== '') {
                // перевірка коду з смс

                let data = {
                    'type': 'login',
                    'login_type': 'repair_login',
                    'user_UID': uid,
                    'sms_code': liveCode,
                };

                const user = await checkCode(data);

                if (user.status === 200) {
                    setTokenToLocalStorage('access_token', user.data.token);
                    dispatch(loginSuccess(user.data));
                    setPhoneNumber('');
                    toast.success('Авторизація успішна! Велкам.');
                    navigate('/');
                } else {
                    console.log(e);
                    dispatch(loginFailure());
                    toast.error('Спробуйте знову!');
                }

            } else {
                // вхід по телефону

                if (phoneNumber.startsWith('+380')) {
                    let regex = /\b[0-9]{11,12}\b/;
                    let isValid = regex.test(phoneNumber);

                    if (isValid) {
                        setCheckerCode(!checkerCode);

                        let data = {
                            'type': 'login',
                            'login_type': 'username_phone',
                            'credentials': phoneNumber
                        };

                        const user = await loginUser(data);

                        if (user.status === 200) setUid(user.data.user_UID);
                        else dispatch(loginFailure());

                    } else {
                        dispatch(loginFailure());
                        toast.error('Невірний номер!')
                    }

                } else {
                    // вхід по rfid

                    let data = {
                        "type": "login",
                        "login_type": "physical_key",
                        "credentials": phoneNumber
                        // "credentials": '055000038009227'
                    };

                    const user = await loginUser(data);

                    console.log(user);

                    if (user.status === 200) {
                        setTokenToLocalStorage('access_token', user.data.token);
                        dispatch(loginSuccess(user.data));
                        toast.success('Login successfully.');
                        navigate('/');
                    }
                }
            }
        } catch (e) {
            dispatch(loginFailure());
            toast.error('Користувача не знайдено!');
            console.log(e)
        }
    };


    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center bg-[#E7E7E7]'>
            <div className='absolute top-5 left-5'>
                <img src={logo} alt="logo"/>
            </div>

            <h1 className='text-4xl font-bold mb-[50px]'>Login</h1>

            {checkerCode ? (
                // перевірка коду з смс
                <div className='flex flex-col items-center justify-center'>
                    <div className='my-5'>
                        <ReactCodeInput type='text' fields={4} onChange={(code) => setLiveCode(code)}/>
                    </div>
                    <button className='btn btn-custom ' onClick={() => handleCheck()}>
                        Вхід
                    </button>
                </div>
            ) : (
                // поле номеру телефону або rfid
                <div className='flex flex-col items-center justify-center'>
                    <input className='input my-5' type="text" value={phoneNumber} autoFocus
                           onChange={(e) => setPhoneNumber(e.target.value)} placeholder='+380... or RFID'/>
                    <button id='btn1' className='btn btn-custom ' onClick={() => handleCheck()}>
                        {phoneNumber.startsWith('+') ? 'Отримати код' : 'Вхід'}
                    </button>
                </div>
            )}

        </div>
    );
}

export default Auth;