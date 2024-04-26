import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeNode} from "../store/slices/nodeSlice";
import NodeCreator from "./NodeCreator";


function NodeOptions({setVisibleOptions, setNodes, tempPosition, }) {
    const [color, setColor] = useState('#3563E9');
    const [checked, setChecked] = useState(false);
    const [handlePosition, setHandlePosition] = useState({});
    const node = useSelector(state => state.node);
    const dispatch = useDispatch();

    // console.log(node)


    useEffect(() => {
        checked ? setColor('#FFF73D') : setColor('#3563E9');
    },[checked]);



    const onAdd = () => {
        const border = `4px solid ${color}`;

        setNodes((nds) =>
            nds.map((item) => {
                if (item.id === node.id) {
                    return {
                        ...item,
                        position: tempPosition,
                        data: {
                            ...item.data,
                            handlePosition: handlePosition
                        },
                        positionAbsolute: tempPosition,
                        hidden: false,
                        defaultBorder: border,
                        style: {
                            ...item.style,
                            border: border
                        }
                    };
                }
                return item;
            })
        );

        dispatch(removeNode())
    };

    // console.log(checked)

    return (
        <div className='fixed top-0 left-0 z-[100] w-screen h-screen flex items-center justify-center blur-bg'>

            <div className='w-[500px] bg-white py-5 rounded-xl flex flex-col items-center justify-center'>

                <div className='text-[25px] font-semibold'>Element Options</div>


                <div className='py-5'>
                    <NodeCreator setHandlePosition={setHandlePosition}/>
                </div>


                <div className='flex'>
                    <div className='flex py-3'>
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center px-2 rounded-full cursor-pointer"
                                   htmlFor="customStyle">
                                <input type="checkbox"
                                       checked={checked}
                                       onChange={e => setChecked(!checked)}
                                       className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none
                                       rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute
                                       before:top-2/4 before:left-2/4 before:block before:h-5 before:w-5 before:-translate-y-2/4
                                        before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0
                                         before:transition-opacity checked:border-[#FFF73D] checked:bg-[#FFF73D]
                                         checked:before:bg-[#FFF73D] hover:scale-105 hover:before:opacity-0"
                                       id="customStyle"/>
                                <span
                                    className="absolute text-black transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
                                     fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"/>
                                </svg>
                            </span>
                            </label>
                        </div>

                        <p className='text-[14px] font-semibold'>Жовтий елемент</p>
                    </div>

                    <div className='flex py-3 pl-10'>
                        <div className="inline-flex items-center">
                            <label className="relative flex items-center px-2 rounded-full cursor-pointer"
                                   htmlFor="customStyle">
                                <input type="checkbox"
                                       checked={!checked}
                                       onChange={e => setChecked(!checked)}
                                       className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none
                                       rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute
                                       before:top-2/4 before:left-2/4 before:block before:h-5 before:w-5 before:-translate-y-2/4
                                       before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0
                                        before:transition-opacity checked:border-[#3563E9] checked:bg-[#3563E9]
                                         checked:before:bg-[#3563E9] hover:scale-105 hover:before:opacity-0"
                                       id="customStyle"/>
                                <span
                                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
                                     fill="currentColor" stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"/>
                                </svg>
                            </span>
                            </label>
                        </div>

                        <p className='text-[14px] font-semibold'>Синій елемент</p>
                    </div>
                </div>


                <button className='btn btn-custom mt-2' onClick={() => {
                    onAdd();
                    setVisibleOptions(false)
                }}>Create
                </button>
            </div>
        </div>
    );
}

export default NodeOptions;