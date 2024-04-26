import React, {useEffect, useState} from 'react';
import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {addNode} from "../store/slices/nodeSlice";
import {GiCheckMark} from "react-icons/gi";
import {IoIosArrowDown, IoIosArrowForward} from "react-icons/io";


function Dropdown({nodes, setNodes, setOpenMenu, schema, getMap, isOpened, openMenu, name, type, allMaps, handleSchemaClick}) {


    const [isOpen, setIsOpen] = useState(isOpened);
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.user);
    const currentNode = useSelector(state => state.node);

    useEffect(() => {
        if (allMaps !== undefined)
            allMaps.length > 0 && setIsOpen(true);

    }, [allMaps]);

    useEffect(() => {
        if (nodes !== undefined)
            nodes.length > 0 && setIsOpen(true);

    }, [nodes]);

    useEffect(() => {
        if (schema !== undefined)
            schema.length > 0 && setIsOpen(true);

    }, [schema]);


    const handleActiveBorder = (id) => {
        setNodes((nds) =>
            nds.map((node) => {
                const newNode = {...node, style: {...node.style}};

                if (node.id === id || (currentNode.node !== null && currentNode.node.id === node.id)){
                    newNode.style.border = node.activeBorder;
                    newNode.style.backgroundColor = 'rgba(231, 46, 46, 0.3)';
                }

                else {
                    newNode.style.border = node.defaultBorder;
                    newNode.style.backgroundColor = 'transparent';
                }
                return newNode;
            })
        );
    };


    const onDragStart = (event, node) => {
        dispatch(addNode(node));

        event.dataTransfer.setData('name', node.data.name);
        event.dataTransfer.effectAllowed = 'move';
    };



    // console.log(nodes)
    return (
        <div className='py-4 mx-2'>
            <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white flex items-center justify-center w-full btn btn-custom
                    font-medium rounded-md text-md px-5 py-2 text-center inline-flex items-center" type="button">
                {name}


                {isOpen ? (
                    <div className='pl-4 text-[26px] text-[#2069D7]'>
                        {/*<MdKeyboardArrowUp/>*/}
                        <IoIosArrowDown />

                    </div>
                ) : (
                    <div className='pl-4 text-[26px] text-[#2069D7]'>
                        <IoIosArrowForward />
                        {/*<MdKeyboardArrowDown/>*/}
                    </div>
                )}
            </button>

            {isOpen && (
                <div id="dropdownDivider " className="w-full bg-white divide-y divide-gray-600 rounded-lg shadow">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDividerButton">

                        {type === 'fourth' && nodes.map((node, index) => (
                            <li id={`${node.id}`}
                                draggable={user.authType === 'rfid' && node.position.x === 0 && node.position.y === 0}
                                onMouseOver={() => !openMenu && handleActiveBorder(node.id)}
                                onMouseLeave={() => !openMenu && handleActiveBorder()}

                                onDragStart={(event) => onDragStart(event, node)}

                                onClick={() => {
                                    if (node.position.x !== 0 && node.position.y !== 0) {
                                        // setActiveNode(node);
                                        setOpenMenu(true);
                                        dispatch(addNode(node))
                                    }

                                }}
                                key={index}
                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center select-none">
                                {node.data.name}

                                <span>
                                    {node.position.x !== 0 && node.position.y !== 0 && (
                                        <GiCheckMark className='text-[20px] text-emerald-500'/>
                                    )}
                                </span>
                            </li>
                        ))}



                        {type === 'first' && schema.map((item, index) => (
                            <li key={index} onClick={() => {
                                handleSchemaClick(item);
                                setIsOpen(false)
                            }}
                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                {item.Map_name}
                            </li>
                        ))}


                        {type === 'second' && allMaps.map((item, index) => (
                            <li key={index} onClick={() => {
                                getMap(item);
                                setIsOpen(false)
                            }}
                                className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                {item.Map_name}
                            </li>
                        ))}

                    </ul>
                </div>
            )}


        </div>
    );
}

export default Dropdown;