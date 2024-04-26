import React, {useEffect, useState} from 'react';
import {TbArrowBarUp,TbArrowBarToDown,TbArrowBarDown,TbArrowBarToUp,TbArrowBarRight,TbArrowBarToLeft,
    TbArrowBarLeft,TbArrowBarToRight} from "react-icons/tb";


function NodeCreator({setHandlePosition}) {
    const [top, setTop] = useState(null);
    const [bottom, setBottom] = useState(null);
    const [left, setLeft] = useState(null);
    const [right, setRight] = useState(null);



    useEffect(() => {
        let position = {};

        top !== null ? position['top'] = top : delete position['top'];
        bottom !== null ? position['bottom'] = bottom : delete position['bottom'];
        left !== null ? position['left'] = left : delete position['left'];
        right !== null ? position['right'] = right : delete position['right'];
        // console.log(position);
        setHandlePosition(position);

    },[top, bottom, left, right]);


    return (
        <div className='flex flex-col items-center justify-center text-black'>

            <div className='flex justify-between w-[100px]'>
                <div className="flex items-center">
                    <input id="up-up" type="checkbox" value="source"  checked={top === 'source'}
                           onChange={(e) => setTop(e.target.value)}
                           className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    <label htmlFor="up-up" className="ms-2 text-lg font-medium "> <TbArrowBarUp /></label>
                </div>

                <div className="flex items-center">
                    <input id="up-down" type="checkbox" value="target" checked={top === 'target'}
                           onChange={(e) => setTop(e.target.value)}
                           className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    <label htmlFor="up-down" className="ms-2 text-lg font-medium "><TbArrowBarToDown /></label>
                </div>
            </div>

            <div className='flex items-center'>
                <div className='flex flex-col items-end'>
                    <div className="flex items-center">
                        <label htmlFor="left-to" className="ms-2 text-lg font-medium "><TbArrowBarLeft /></label>
                        <input id="left-to" type="checkbox" value="source"  checked={left === 'source'}
                               onChange={(e) => setLeft(e.target.value)}
                               className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="left-for" className="ms-2 text-lg font-medium "><TbArrowBarToRight /></label>
                        <input id="left-for" type="checkbox" value="target" checked={left === 'target'}
                               onChange={(e) => setLeft(e.target.value)}
                               className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    </div>
                </div>

                <div className='bg-gray-100 rounded-lg h-[70px] w-[150px] flex justify-center items-center my-2 mx-3'>
                    <div
                        onClick={() => {
                            setBottom(null);
                            setRight(null);
                            setLeft(null);
                            setTop(null)
                        }}
                        className='text-[24px] font-semibold cursor-pointer'>
                        X
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className="flex items-center">
                        <input id="right-to" type="checkbox" value="source"  checked={right === 'source'}
                               onChange={(e) => setRight(e.target.value)}
                               className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                        <label htmlFor="right-to" className="text-lg font-medium "><TbArrowBarRight /></label>
                    </div>

                    <div className="flex items-center">
                        <input id="right-for" type="checkbox" value="target" checked={right === 'target'}
                               onChange={(e) => setRight(e.target.value)}
                               className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                        <label htmlFor="right-for" className="text-lg font-medium "><TbArrowBarToLeft /></label>
                    </div>
                </div>

            </div>

            <div className='flex justify-between w-[100px]'>
                <div className="flex items-center">
                    <input id="up-up" type="checkbox" value="source"  checked={bottom === 'source'}
                           onChange={(e) => setBottom(e.target.value)}
                           className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    <label htmlFor="up-up" className="ms-2 text-lg font-medium rotate-180"><TbArrowBarUp /></label>
                </div>

                <div className="flex items-center">
                    <input id="up-down" type="checkbox" value="target" checked={bottom === 'target'}
                           onChange={(e) => setBottom(e.target.value)}
                           className="w-4 h-4 bg-gray-100 border-gray-300 rounded"/>
                    <label htmlFor="up-down" className="ms-2 text-lg font-medium "><TbArrowBarToUp /></label>
                </div>
            </div>


        </div>
    );
}

export default NodeCreator;