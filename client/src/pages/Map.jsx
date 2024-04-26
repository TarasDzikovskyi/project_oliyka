import React, {useCallback, useEffect, useState} from 'react';
import FlowWithProvider from "./Flow";
import {applyNodeChanges, useEdgesState, useNodesState} from "reactflow";
import Dropdown from "../components/Dropdown";
import {MdDelete, MdOutlineLogout} from "react-icons/md";
import {removeFromLocalStorage} from "../utils/auth.utils";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {logout} from "../store/slices/userSlice";
import {toast} from "react-toastify";
import {IoIosSave} from "react-icons/io";
import {FaBackspace} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {getCurrentMap, getMapsById, getMapsLevel1, saveCurrentMap} from "../api/axios.api";
import {IoHome, IoReturnUpBackOutline, IoSaveSharp} from "react-icons/io5";
import {RiCloseCircleLine} from "react-icons/ri";
import {removeProblem} from "../store/slices/problemSlice";
import {v4 as uuidv4} from "uuid";
import {addMap, mapFailure, mapStart, removeMap} from "../store/slices/mapSlice";
import Loader from "../components/Loader";
import axios from "axios";
import {PiArrowBendUpLeftBold} from "react-icons/pi";


function Map() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [background, setBackground] = useState('white');
    const [openMenu, setOpenMenu] = useState(false);
    const [schema, setSchema] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const {user} = useSelector(state => state.user);
    const problem = useSelector(state => state.problem);
    const {map} = useSelector(state => state.map);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [allMaps, setAllMaps] = useState([]); //пункт: оберіть схему
    const [showModalProblem, setShowModalProblem] = useState(false);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [schemaName, setSchemaName] = useState('');


    {/*розлогінитись*/
    }
    const logoutHandler = () => {
        dispatch(logout());
        removeFromLocalStorage('access_token');
        toast.success('You logged out successfully.');
        navigate('/auth');
    };

    {/*видаляє елементи зі схеми по одному з кінця*/}
    const moveBack = useCallback(() => {
        nodes.pop();

        if (nodes.length > 0)
            setNodes((oldNodes) => applyNodeChanges(nodes, oldNodes));

    }, [nodes]);

    // const moveBack = async () => {
    //     const res = await axios.get('http://10.50.55.71:7777/api/police');
    //     console.log(res)
    //
    // };

    {/*очищує схему*/
    }
    const onClear = async () => {
        setBackground('white');
        dispatch(removeMap());
        setNodes([]);
        setAllMaps([])
    };


    useEffect(() => {
        const getData = async () => {
            let data = {type: "get_MapsLevel1"};

            const res = await getMapsLevel1(data);

            console.log(res);
            if (res.status === 200) setSchema(res.data.Maps_level1);
            else toast.error("Помилка з'єднання з 1С")
        };

        getData()

    }, []);


    const getMap = async (map_item) => {
        try {
            dispatch(mapStart());
            setLoading(true);

            const data = {
                type: "get_object_map",
                uid: map_item.Map_uid,
                width: window.innerWidth,
                height: window.innerHeight
            };

            const res = await getCurrentMap(data);

            if (res.status === 200) {
                res.data.Map['first_level'] = schemaName;

                setNodes(res.data.Map.nodes);
                dispatch(addMap(res.data.Map));
                setBackground(res.data.Map.bg);
            } else {
                dispatch(mapFailure('Щось пішло не так!'));
                toast.error('Щось пішло не так!');
            }

            setLoading(false)

        } catch (e) {
            console.log(e)
        }
    };


    const handleSchemaClick = async (item) => {
        // select from table by id

        const data = {"type": "get_maps", "uid": item.Map_uid};

        const res = await getMapsById(data);

        if (res.status === 200) {
            setSchemaName(item.Map_name);
            setAllMaps(res.data.Maps);

        } else toast.error('Щось пішло не так!');


        // setCurrentFlow(item)

        // console.log(item)

    };


    useEffect(() => {
        if (problem !== null) setShowModalProblem(true);
        else setShowModalProblem(false);
    }, [problem]);


    const saveMap = async () => {
        try {
            if (nodes.length > 0) {
                setLoading(true);

                const res = await saveCurrentMap({
                    map,
                    edges,
                    nodes,
                    width: window.innerWidth,
                    height: window.innerHeight
                });


                if (res.status === 200) {
                    toast.success('Збережено успішно!');
                    setBackground('white');
                    dispatch(removeMap());
                    setNodes([]);
                    setAllMaps([])
                } else toast.error('Помилка при збереженні!');

                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            toast.error('Помилка при збереженні!');
            console.log(e);
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", function (e) {
            dispatch(removeProblem());
            setShowModalProblem(false);

        });
    }, []);
    // console.log(user);


    return (
        <div className='flex overflow-hidden'>
            {loading && <Loader/>}

            {/*кнопка для меню зліва*/}
            <div className='fixed top-[-8px] left-2 z-50'>
                <div className="relative py-3 sm:max-w-xl mx-auto">
                    <nav>
                        <button
                            className="w-12 h-11 relative focus:outline-none bg-white/30 backdrop-blur-md rounded-lg"
                            onClick={() => setOpen(!open)}>
                            <div
                                className="block w-5 absolute left-5 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className={`block absolute h-0.5 w-7 text-custom_primary bg-[#212121] transform transition duration-500 ease-in-out 
                                        ${open ? 'rotate-45 bg-[#d1001f]' : '-translate-y-2'}`}/>

                                <span
                                    className={`block absolute h-0.5 w-5 text-custom_primary bg-[#212121] transform transition duration-500 ease-in-out 
                                        ${open ? 'opacity-0' : ''}`}/>

                                <span className={`block absolute h-0.5 w-7 text-custom_primary bg-[#212121] transform transition duration-500 ease-in-out 
                                          ${open ? '-rotate-45 bg-[#d1001f]' : 'translate-y-2'}`}/>
                            </div>
                        </button>
                    </nav>
                </div>
            </div>


            {/*меню зліва*/}
            <div
                style={open ? {left: 0} : {left: '-100%'}}
                className=" duration-500 fixed top-0 left-0 h-screen !p-0 !pt-14 w-[300px] z-20 bg-white overflow-auto">

                {/*профіль користувача*/}
                {user && (
                    <div className=' mt-2 py-3 mb-3 relative flex text-white items-center leading-none border-b-2 bg-[#2069D7]'>
                        {user.photo ? (
                            <div className='ml-2 w-[60px] h-[60px] rounded-full overflow-hidden mr-5'>
                                <img src={`data:image/jpeg;base64,${user.photo}`} alt="profile"/>
                            </div>
                        ) : (
                            <div
                                className="relative w-[60px] h-[60px] overflow-hidden mr-5 bg-gray-100 rounded-full dark:bg-gray-600">
                                <svg className="absolute w-15 h-15 text-gray-400 left-[2px] top-2" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                        )}

                        <h2 className='text-[22px] font-semibold'>{user.user_full_name}</h2>

                        <div className='absolute top-[-45px] right-0 text-black'>
                                <span className='text-[25px] cursor-pointer' onClick={() => logoutHandler()}>
                                    <MdOutlineLogout/>
                                </span>
                            {/*<button className='btn btn-custom' onClick={() => logoutHandler()}>Logout</button>*/}
                        </div>
                    </div>
                )}

                {/*кнопки керування*/}
                <div className='flex justify-center mx-2  mb-8  rounded-full'>
                    <button className='main-button ' onClick={moveBack}>
                        <div className='text-[22px]'><PiArrowBendUpLeftBold /></div>
                        <div className='pl-2'>Back</div>
                    </button>

                    <button id='save_btn' className='main-button px-3 flex items-center ml-2' onClick={saveMap}>
                        <div className='text-[18px]'><IoSaveSharp /></div>
                        <div className='pl-2'>Save</div>
                    </button>

                    <button className='main-button  px-3 ml-2' onClick={onClear}>
                        <div className='text-[22px]'><MdDelete/></div>
                        <div className='pl-2'>Clear</div>
                    </button>
                </div>

                {/*<button onClick={() => onRestore()}>Restore</button>*/}


                {/*випадайка основних схем*/}
                <Dropdown schema={schema} name={'Елементи першого рівня'}
                          handleSchemaClick={handleSchemaClick} type={'first'} isOpened={false}/>


                {/*випадайка карт вибраного рівня*/}
                <Dropdown name={'Схеми вибраного рівня'} getMap={getMap}
                          allMaps={allMaps} type={'second'} isOpened={false}/>


                {/*випадайка доступних елементів на карті*/}
                {/*<Dropdown elements={elements} name={'Доступні елементи'} type={'third'} isOpened={false}/>*/}


                {/*випадайка елементів на схемі*/}
                <Dropdown nodes={nodes} type={'fourth'} isOpened={false} openMenu={openMenu} setOpenMenu={setOpenMenu}
                          setNodes={setNodes} name={'Елементи на схемі'}/>


                {/*<div className='w-full h-[200px]'>*/}
                {/*    <img src={`data:image/png;base64, ${background}`} />*/}

                {/*</div>*/}

            </div>


            {/*{showModalProblem && problem.namber !== undefined && (*/}
            {/*    <div*/}
            {/*        className='fixed w-screen h-[100dvh] bg-white/30 backdrop-blur-md top-0 left-0 z-[100] flex items-center justify-center'>*/}
            {/*        <div className='absolute top-[25px] cursor-pointer right-[25px] text-4xl font-bold'*/}
            {/*             onClick={() => {*/}
            {/*                 setShowModalProblem(false);*/}
            {/*                 dispatch(removeProblem())*/}
            {/*             }}>*/}
            {/*            <RiCloseCircleLine/>*/}
            {/*        </div>*/}


            {/*        /!*<div className='bg-white pt-8 pb-4 px-5 rounded-lg shadow-lg'>*!/*/}
            {/*        /!*    <ElementProblem problem={problem} setShowModalProblem={setShowModalProblem}/>*!/*/}
            {/*        /!*</div>*!/*/}
            {/*    </div>*/}
            {/*)}*/}


            {/*сама схема*/}
            <FlowWithProvider background={background} nodes={nodes} setNodes={setNodes} onNodesChange={onNodesChange}
                              openMenu={openMenu} setOpenMenu={setOpenMenu} setBackground={setBackground}
                              isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}
                              reactFlowInstance={reactFlowInstance} setReactFlowInstance={setReactFlowInstance}
                              edges={edges} setEdges={setEdges} onEdgesChange={onEdgesChange}/>
        </div>
    );
}

export default Map;