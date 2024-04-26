import React, {useEffect, useState} from 'react';
import {getProblemsByMap} from "../api/axios.api";
import {useDispatch, useSelector} from "react-redux";
import {IoMdClose} from "react-icons/io";
import moment from 'moment';
import {removeNode} from "../store/slices/nodeSlice";
import Problem from "./Problem";
import {addProblem} from "../store/slices/problemSlice";
import {toast} from "react-toastify";
import {TiArrowUnsorted} from "react-icons/ti";

function Problems({openMenu, setOpenMenu, setNodes, setShowEdit, showProblems, setShowProblems}) {
    const dispatch = useDispatch();

    const [problems, setProblems] = useState([]);
    const currentNode = useSelector((state) => state.node);
    const problem = useSelector((state) => state.problem);
    const {map} = useSelector((state) => state.map);
    const [showProblem, setShowProblem] = useState(false);


    const [sortedProblems, setSortedProblems] = useState([]);
    const [incDate, setIncDate] = useState(false);
    const [incStatus, setIncStatus] = useState(false);


    useEffect(() => {
        const getProblemsByElement = async () => {
            const data = {
                type: "get_repair",
                uid: currentNode.id
            };

            const res = await getProblemsByMap(data);
            console.log(res);

            if(res.status === 200) setSortedProblems(res.data.data);
            else toast.error('Помилка при отриманні заявок!')
            // let activeProblems = [res.data.data];

            // res.data.data.forEach((item) => {
            //     if (item.status === 'open' ) activeProblems.push(item)
            // });

            // setSortedProblems(res.data.data)
        };


        // if(openMenu && currentNode.id !== undefined && problem.namber === undefined) getProblemsByElement()
        if (showProblems) getProblemsByElement()

        // if(problem) setShowProblems(false);
    }, [openMenu, problem, showProblems]);

    const handleClick = (problem) => {
        dispatch(addProblem(problem));
        setShowProblem(true);
        setShowProblems(false);
    };

    function compareStatuses(a, b) {
        const statusOrderMap = {
            open: 0,
            pause: 1,
            closed: 2
        };
        const orderA = statusOrderMap[a.status];
        const orderB = statusOrderMap[b.status];

        if (incStatus) {
            return orderA - orderB;
        } else {
            return orderB - orderA;
        }
    }

    // сортування по даті або статусу
    const handleSort = (name) => {
        switch (name) {
            case 'status': {
                const sorted = sortedProblems.sort(compareStatuses);
                setSortedProblems(sorted);
                setIncStatus(!incStatus);
                break;
            }

            case 'date': {
                if (incDate) {
                    const sorted = sortedProblems.sort((firstItem, secondItem) => moment(firstItem.data).unix() - moment(secondItem.data).unix());
                    setSortedProblems(sorted);
                    setIncDate(!incDate)
                } else {
                    const sorted = sortedProblems.sort((firstItem, secondItem) => moment(secondItem.data).unix() - moment(firstItem.data).unix());
                    setSortedProblems(sorted);
                    setIncDate(!incDate)
                }
                break;
            }

            default:
                toast.error('Something wrong!');
                break;
        }
    };


    // console.log(sortedProblems);

    return (
        <>
            <Problem showProblem={showProblem} setShowProblem={setShowProblem} setShowProblems={setShowProblems}/>

            <div style={showProblems ? {bottom: 0} : {bottom: '-100%'}}
                 className='fixed bottom-0 z-[51] bg-[#2069D7] duration-500 w-full rounded-[20px]'>

                <div className='absolute text-2xl text-black  cursor-pointer right-[8px] top-0'
                     onClick={() => {
                         setShowProblems(false);
                         // dispatch(removeNode())
                     }}>
                    <IoMdClose/>
                </div>


                <div className='mt-5 bg-white overflow-y-scroll max-h-[100vh] scrollbar'>
                    <table>
                        <tbody>
                        <tr>
                            <th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold '>№</th>
                            <th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold center-flex cursor-pointer'
                                onClick={() => handleSort('date')}>
                                Дата створення
                                <span>
                                    <TiArrowUnsorted/>
                                </span>
                            </th>
                            <th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold '>Заявник</th>
                            <th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold '>Елемент</th>
                            <th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold '>Будівля</th>
                            <th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold '>Опис</th>
                            {/*<th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold '>Пауза</th>*/}

                            {/*<th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold '>Власник</th>*/}
                            <th className='px-[13px] py-[10px] text-[20px] text-[#2069D7] font-semibold center-flex cursor-pointer'
                                onClick={() => handleSort('status')}>
                                Статус заявки
                                <span>
                                    <TiArrowUnsorted/>
                                </span>
                            </th>

                        </tr>

                        {sortedProblems.map((problem, index) => (
                            <tr key={index} className='cursor-pointer' onClick={() => handleClick(problem)}>
                                <th className='px-[13px] py-[10px] text-[16px] text-black font-normal '>{index + 1}</th>

                                <th className='px-[13px] py-[10px] text-[16px] text-black font-normal '>{moment(problem.data).format('DD.MM.YY HH:mm:ss')}</th>
                                <th className='px-[13px] py-[10px] text-[16px] text-black font-normal '>{problem.applicant}</th>
                                <th className='px-[13px] py-[10px] text-[16px] text-black font-normal '>{problem.element}</th>


                                <th className='px-[13px] py-[10px] text-[16px] text-black font-normal '> {map !== null && ` ${map.first_level} > ${map.name}`}</th>

                                <th className='px-[13px] py-[10px] text-[16px] text-black font-normal max-w-[180px] text-ellipsis overflow-hidden whitespace-nowrap'>{problem.reason}</th>
                                {/*<th className='px-[13px] py-[10px] text-[16px] text-black font-normal '>{problem.reason}</th>*/}

                                <th className={`px-[13px] py-[10px] text-[16px] font-normal 
                                    ${problem.status === 'open' && 'text-[#70c927]'}
                                    ${problem.status === 'pause' && 'text-[#f4ac23]'}
                                    ${problem.status === 'closed' && 'text-[#de0a26]'}
                                `}>
                                    {problem.status === 'open' && 'Відкрита'}
                                    {problem.status === 'pause' && 'На паузі' }
                                    {problem.status === 'closed' && 'Закрита'}
                                </th>

                                {/*<th className='px-[13px] py-[10px] text-[16px] text-black font-normal '>{problem.pause_reason}</th>*/}


                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Problems;


