import ReactFlow, {
    Background,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    MarkerType, useReactFlow, ReactFlowProvider
} from 'reactflow';
import {addEdge} from 'react-flow-renderer'
import 'reactflow/dist/style.css';
import CustomResizerNode from '../components/CustomResizerNode';
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NodeOptions from "../components/NodeOptions";
import {addNode, removeNode} from "../store/slices/nodeSlice";
import {removeMap} from "../store/slices/mapSlice";
import person from '../assets/person.png';
import {createProblem} from "../api/axios.api";
import moment from "moment";
import {toast} from "react-toastify";
import create from '../assets/create2.png';
import editer from '../assets/edit.png';
import problems_img from '../assets/problems.png';
import EditElement from "../components/EditElement";
import {IoMdClose} from "react-icons/io";
import Problems from "../components/Problems";

const nodeTypes = {CustomResizerNode};


function Flow({background, nodes, setNodes, onNodesChange, openMenu, setOpenMenu, reactFlowInstance,
                  setReactFlowInstance, edges, setEdges, onEdgesChange}) {

    const [url, setUrl] = useState(background);
    const {getNode} = useReactFlow();
    const {user} = useSelector(state => state.user);
    const [visibleOptions, setVisibleOptions] = useState(false);
    const [tempPosition, setTempPosition] = useState(null);


    // console.log(map)
    const dispatch = useDispatch();

    // з`єднання блоків стрілочкою
    const onConnect = useCallback((connection) => {
        if (user.authType === 'rfid') {
            setEdges((eds) => addEdge({
                    ...connection,
                    animated: true,
                    type: 'smoothstep',
                    style: {
                        strokeWidth: 3,
                        stroke: '#EF4444',
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 12,
                        height: 12,
                        color: '#EF4444',
                    },
                }, eds)
            )
        }
    }, [setEdges, user]);

    // клік по елементу
    const handleNodeClick = useCallback((event, node) => {
        setOpenMenu(true);
        // setActiveNode(node);
        dispatch(addNode(node));
    }, []);


    // динамічна зміна заднього фону
    useEffect(() => {
        let newUrl = background + '?' + Date.now();
        setUrl(newUrl);
    }, [background]);


    const color = 'rgba(208,206,212,1)';
    const transparentColor = color.replace("1)", '0)');
    let finalColor = (background === 'white') ? color : transparentColor;

    let rfStyle = {
        backgroundImage: `linear-gradient(${finalColor}, ${finalColor}), url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        backgroundPosition: `center`,
        backgroundSize: '100vw 100vh',
    };


    useEffect(() => {
        window.addEventListener("beforeunload", function (e) {
            dispatch(removeMap());
            dispatch(removeNode())
        });
    }, []);


    // видалення елементу кнопкою backspace
    const onNodesDelete = useCallback((deleted) => {
        const animated = true;
        const markerEnd = {type: 'arrowclosed', width: 12, color: '#EF4444'};
        const type = "smoothstep";
        const style = {strokeWidth: 3, stroke: '#EF4444'};
        setEdges(
            deleted.reduce((acc, node) => {
                const incomers = getIncomers(node, nodes, edges);
                const outgoers = getOutgoers(node, nodes, edges);
                const connectedEdges = getConnectedEdges([node], edges);

                const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

                const createdEdges = incomers.flatMap(({id: source}) =>
                    outgoers.map(({id: target}) => ({
                        id: `${source}->${target}`,
                        source,
                        target,
                        animated,
                        markerEnd,
                        type,
                        style
                    }))
                );

                setOpenMenu(false);

                return [...remainingEdges, ...createdEdges];
            }, edges)
        );
    }, [nodes, edges]);


    // при пересуванні елемента на схему
    const onDrop = useCallback((event) => {
        event.preventDefault();

        const name = event.dataTransfer.getData('name');

        if (typeof name === 'undefined' || !name) return;

        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        setTempPosition(position);
        setVisibleOptions(true);

    }, [reactFlowInstance]);


    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);


    function shouldNodeBeRemoved(user) {
        return user.authType !== 'phone';
    }


    // редагування/видалення елементів
    function handleNodesChange(changes) {
        const nextChanges = changes.reduce((acc, change) => {
            if (change.type === 'remove') {
                if (shouldNodeBeRemoved(user)) {
                    change.type = 'edit';

                    const node = getNode(change.id);
                    const pos = {x: 0, y: 0};

                    setNodes((nds) =>
                        nds.map((item) => {
                            if (item.id === node.id) {
                                const newNode = {
                                    ...item,
                                    position: pos,
                                    positionAbsolute: pos,
                                    hidden: true,
                                    width: 100,
                                    height: 50,
                                    style: {...item.style},
                                    // data: {...item.data}
                                };

                                newNode.style.width = 100;
                                newNode.style.height = 50;
                                return newNode
                            }
                            return item;
                        })
                    );
                    setOpenMenu(false);

                    return [...acc, change];
                }

                return acc;
            }
            return [...acc, change];
        }, []);

        onNodesChange(nextChanges);
    }

    function handleEdgeChange(changes) {
        const nextChanges = changes.reduce((acc, change) => {

            if (change.type === 'remove') {
                if (shouldNodeBeRemoved(user)) {
                    return [...acc, change];
                }
                return acc;
            }

            return [...acc, change];
        }, []);

        onEdgesChange(nextChanges);
    }


    function handleDoubleClick(e, node) {
        // const pos = {x: 0, y: 0};
        //
        // setNodes((nds) =>
        //     nds.map((item) => {
        //         if (item.id === node.id) {
        //             const newNode = {
        //                 ...item,
        //                 position: pos,
        //                 positionAbsolute: pos,
        //                 hidden: true,
        //                 width: 100,
        //                 height: 50,
        //                 style: { ...item.style },
        //                 // data: {...item.data}
        //             };
        //
        //             newNode.style.width = 100;
        //             newNode.style.height = 50;
        //             return newNode
        //         }
        //         return item;
        //     })
        // );
        // setOpenMenu(false);
        // dispatch(removeNode())
    }


    return (
        <div className="relative w-screen h-[100dvh] overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgeChange}
                onNodesDelete={onNodesDelete}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                panOnDrag={false}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={handleNodeClick}
                onNodeDoubleClick={handleDoubleClick}
                style={rfStyle}
                translateExtent={[[0, 0], [window.innerWidth, window.innerHeight]]}
            >

                {background !== 'white' && (
                    <div className='w-screen h-[100dvh]'>
                        <img src={`data:image/png;base64, ${background}`} className='w-full h-full' alt='bg'/>
                    </div>
                )}

                <Background variant="dots" gap={12} size={1}/>
            </ReactFlow>

            {/*{isOpenModal && (*/}
            {/*    // вікно зберігання схеми*/}
            {/*    */}
            {/*)}*/}

            {visibleOptions && (
                //опції налаштування елемента перед появленням на схемі
                <NodeOptions visibleOptions={visibleOptions} setVisibleOptions={setVisibleOptions} setNodes={setNodes}
                             tempPosition={tempPosition}/>
            )}


            {/*бокове меню справа*/}
            {/*<NodeInfo openMenu={openMenu} setOpenMenu={setOpenMenu} activeNode={activeNode}*/}
            {/*          setActiveNode={setActiveNode} setNodes={setNodes}/>*/}


            <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} setNodes={setNodes}/>
        </div>
    );
}


function FlowWithProvider(props) {
    return (
        <ReactFlowProvider>
            <Flow {...props} />
        </ReactFlowProvider>
    );
}

export default FlowWithProvider;


const Menu = ({openMenu, setOpenMenu, setNodes}) => {
    const dispatch = useDispatch();
    const [showProblems, setShowProblems] = useState(false);
    const [oldProblems, setProblems] = useState([]);
    const [checked, setChecked] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    // const [showProblems, setShowProblems] = useState(false);


    const {user} = useSelector((state) => state.user);
    const currentNode = useSelector((state) => state.node);
    const {map} = useSelector((state) => state.map);
    // const problem = useSelector((state) => state.problem);



    // useEffect(() => {
    //     const getProblemsByElement = async () => {
    //         const data = {
    //             type: "get_repair",
    //             uid: currentNode.id
    //         };
    //
    //         const res = await getProblemsByMap(data);
    //         // console.log(res);
    //
    //         let activeProblems = [];
    //
    //         res.data.data.forEach((item) => {
    //             if (item.status === 'open') activeProblems.push(item)
    //         });
    //
    //         setProblems(activeProblems)
    //     };
    //
    //     // console.log(showProblems)
    //     if (openMenu && currentNode.id !== undefined && problem.namber === undefined) getProblemsByElement()
    // }, [openMenu, problem]);


    useEffect(() => {
        if (currentNode.id !== undefined) {
            if(currentNode.defaultBorder === '4px solid #3563E9') setChecked(true)
        }
    }, [currentNode]);


    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (currentNode.id !== undefined && node.id === currentNode.id) {
                    const newNode = {...node, defaultBorder: checked ? '4px solid #3563E9' : '4px solid #FFF73D'};

                    if (openMenu)
                        newNode.style = {
                            ...node.style,
                            border: node.activeBorder,
                            animation: 'blinker 1s linear infinite',
                            backgroundColor: 'rgba(231, 46, 46, 0.3)'
                        };
                    else {
                        newNode.style = {
                            ...newNode.style,
                            border: checked ? '4px solid #3563E9' : '4px solid #FFF73D',
                            animation: 'none',
                            backgroundColor: 'transparent'
                        };
                    }

                    return newNode
                } else {
                    const newNode = {...node};
                    newNode.style = {...newNode.style, border: newNode.defaultBorder, animation: 'none', backgroundColor: 'transparent'};
                    return newNode
                }
                // return node;
            })
        );
    }, [ setNodes, openMenu, checked]);


    const startRepair = async () => {
        const objectRepair = {
            map_uid: map.id,
            uid: currentNode.id,
            status: 'open',
            reason: 'Невідома причина',
            pause_reason: '-',
            applicant: user.user_full_name,
            owner: 'Механік 4',
            element: currentNode.data.name,
            building: map.name,
            date: moment().unix()
        };

        const data = {
            type: "set_new_repair",
            data: objectRepair
        };

        const res = await createProblem(data);

        if (res.status === 200) toast.success('Заявку створено!');
        dispatch(removeNode());
        setShowEdit(false);
        setShowProblems(false);
        setOpenMenu(false);
    };


    return (
        <>
            <div style={currentNode.id !== undefined ?  {right: 0} : {right: '-100%'}}
                 className='fixed top-[70px] right-0 z-50 bg-[#2069D7] duration-500 '>
                <div className='pl-[15px] w-full pt-[20px] pb-[12px] flex items-end relative'>
                    <div className='h-[47px] w-[47px] rounded-full'>
                        <img src={person} alt="img" className='w-full h-full'/>
                    </div>

                    <div className='pl-[14px] text-white'>
                        Mechanic
                    </div>


                    <div className='absolute text-3xl text-black  cursor-pointer right-[8px] top-[8px]'
                         onClick={() => {
                             setOpenMenu(false);
                             dispatch(removeNode());
                             setShowEdit(false);
                             setShowProblems(false)
                         }}>
                        <IoMdClose/>
                    </div>
                </div>

                <div className='bg-white py-[30px]'>
                    <div className='pl-[15px] flex items-center cursor-pointer' onClick={startRepair}>
                        <div className='w-[30px] h-[30px]'>
                            <img src={create} alt="create" className='w-full h-full'/>
                        </div>

                        <div className='pl-[20px] pr-[50px]'>Створити заявку</div>
                    </div>

                    <div className='mt-[20px] pl-[15px] flex items-center cursor-pointer' onClick={() => setShowEdit(true)}>
                        <div className='w-[30px] h-[30px]'>
                            <img src={editer} alt="edit" className='w-full h-full'/>
                        </div>

                        <div className='pl-[20px] pr-[50px]'>Редагувати елемент</div>
                    </div>

                    <div className='mt-[20px] pl-[15px] flex items-center cursor-pointer' onClick={() => setShowProblems(true)}>
                        <div className='w-[30px] h-[30px]'>
                            <img src={problems_img} alt="oldProblems" className='w-full h-full'/>
                        </div>

                        <div className='pl-[20px] pr-[50px]'>Усі заявки</div>
                    </div>
                </div>
            </div>


            {showEdit && <EditElement setShowEdit={setShowEdit} openMenu={openMenu} setOpenMenu={setOpenMenu} setNodes={setNodes}/>}


            <Problems showProblems={showProblems} setShowProblems={setShowProblems} openMenu={openMenu} setOpenMenu={setOpenMenu} setNodes={setNodes}/>
        </>
    )
};