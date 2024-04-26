import React, {useEffect, useState} from 'react';
import {removeNode} from "../store/slices/nodeSlice";
import {IoMdClose} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {getProblemsByMap} from "../api/axios.api";
import {toast} from "react-toastify";


function EditElement({openMenu, setOpenMenu, setNodes, setShowEdit}) {
    const dispatch = useDispatch();

    const [showProblems, setShowProblems] = useState(false);
    const [problems, setProblems] = useState([]);
    const [nodeName, setNodeName] = useState('');
    const [nodeLabel, setNodeLabel] = useState('');
    const [checked, setChecked] = useState(false);


    const {user} = useSelector((state) => state.user);
    const currentNode = useSelector((state) => state.node);
    const {map} = useSelector((state) => state.map);
    const problem = useSelector((state) => state.problem);



    useEffect(() => {
        if (currentNode.id !== undefined) {
            setNodeLabel(currentNode.data.label);
            setNodeName(currentNode.data.name);

            if(currentNode.defaultBorder === '4px solid #3563E9') setChecked(true)
        }
    }, [currentNode]);


   const saveElement = () => {
       setNodes((nds) =>
           nds.map((node) => {
               if (currentNode.id !== undefined && node.id === currentNode.id) {
                   console.log(checked)

                   const newNode = {...node, defaultBorder: checked ? '4px solid #3563E9' : '4px solid #FFF73D'};
                   newNode.data = {...newNode.data, label: nodeLabel, name: nodeName};
                   newNode.style = {
                       ...newNode.style,
                       border: checked ? '4px solid #3563E9' : '4px solid #FFF73D',
                       animation: 'none',
                       backgroundColor: 'transparent'
                   };
                   return newNode
               }
               return node;
           })
       );

       setShowEdit(false);
       toast.success('Елемент оновлено!');
       setOpenMenu(false);
       dispatch(removeNode());
    };



    useEffect(() => {
        if (currentNode.id !== undefined) {
            setNodeLabel(currentNode.data.label);
            setNodeName(currentNode.data.name);

            if (currentNode.defaultBorder === '4px solid #3563E9') setChecked(true)
        }
    }, [currentNode]);



    return (
        <div className='absolute h-full w-full flex justify-center items-center overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>


            <div className='pt-4 bg-[#206AD9] rounded-t-[20px]'>

                <div className='relative w-[500px] bg-white flex flex-col items-center justify-center'>
                    <div className='absolute text-3xl text-black  cursor-pointer right-[8px] top-[8px]'
                         onClick={() => {
                             setShowEdit(false);
                             // dispatch(removeNode())
                         }}>
                        <IoMdClose/>
                    </div>

                    <div>
                        <p className='text-[#206AD9] text-[24px] font-semibold pt-[30px] pb-[50px]'>Редагували елемент</p>


                        {/*<input type="text" className='input py-[5px]'/>*/}

                        <div className="relative mb-[20px]" data-twe-input-wrapper-init>
                            <input
                                type="text"
                                className="border-2 border-gray-300 peer block min-h-[auto] w-full rounded  bg-transparent
                                px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear
                                focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100
                                motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill
                                dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput1"
                                value={nodeLabel}
                                onChange={e => setNodeLabel(e.target.value)}
                                />
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="bg-white pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                px-[10px] truncate mt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200
                                ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-[#206AD9]
                                -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none "
                            >Label
                            </label>
                        </div>

                        <div className="relative mb-[20px]" data-twe-input-wrapper-init>
                            <input
                                type="text"
                                className="border-2 border-gray-300 peer block min-h-[auto] w-full rounded  bg-transparent
                                px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear
                                focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100
                                motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill
                                dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                id="exampleFormControlInput1"
                                value={nodeName}
                                onChange={e => setNodeName(e.target.value)}
                                />
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="bg-white pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
                                px-[10px] truncate mt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200
                                ease-out -translate-y-[0.9rem] scale-[0.8] peer-focus:text-[#206AD9]
                                -translate-y-[0.9rem] scale-[0.8] motion-reduce:transition-none "
                            >Назва елементу
                            </label>
                        </div>

                        <div className='flex justify-between'>
                            <div className='flex py-3'>
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

                                <p className='text-[14px] font-semibold'>Жовтий</p>
                            </div>

                            <div className='flex py-3 '>
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

                                <p className='text-[14px] font-semibold'>Синій</p>
                            </div>
                        </div>

                        <div className=' py-[50px] flex justify-center w-full'>
                            <button className='btn btn-option w-full justify-center' onClick={saveElement}>
                                Зберегти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditElement;