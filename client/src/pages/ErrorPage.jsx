import React from 'react';
import error from '../assets/error.png';
import {useNavigate} from "react-router-dom";



const ErrorPage  = () => {
    const navigate = useNavigate();


    return (
        <div className='flex flex-col items-center justify-center h-screen'>

            <div className='flex items-center justify-center px-10'>
                <div>
                    <p className='text-6xl font-medium'>page</p>
                    <p className='text-6xl font-medium'>NOT FOUND</p>
                    <p className='text-custom_icons pt-14 pb-10 text-lg w-[450px]'>
                        Oops, it looks like this page you are looking for does not exist, or
                        the link you clicked may be broken.
                    </p>

                    <button
                        className='btn bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 text-lg'
                        onClick={() => navigate('/')}>
                        Go Home
                    </button>
                </div>

                <div>
                    <img src={error} alt="error"/>
                </div>

            </div>
        </div>
    );
};

export default ErrorPage;