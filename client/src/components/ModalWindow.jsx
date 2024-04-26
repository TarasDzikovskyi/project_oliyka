import React from 'react';
import {IoMdClose} from "react-icons/io";



function ModalWindow({setCode, showWindow, setShowWindow}) {

    return (
        <div style={showWindow ? {display: 'flex'} : {display: 'none'}}
             className='absolute top-0 left-0 z-[200] h-full w-full flex justify-center items-center blur-bg overflow-hidden '>
            <div className='pt-4 bg-[#216AD8] rounded-t-[20px] shadow-xl'>
                <div className='relative bg-white px-[50px] pb-[50px] pt-[25px]'>
                    <div className='absolute text-3xl text-black  cursor-pointer right-[8px] top-[8px]'
                         onClick={() => {
                             setShowWindow(false)
                         }}>
                        <IoMdClose/>
                    </div>

                    <h2 className='text-[24px] font-medium text-[#206AD9]'>Скануйте</h2>

                    <input type="text" className='mt-[20px] input py-2 w-[320px]' autoFocus
                           onChange={(e) => setCode(e.target.value)}/>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;