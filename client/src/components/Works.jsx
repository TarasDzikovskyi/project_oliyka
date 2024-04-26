import React, {useState} from 'react';
import {IoMdClose} from "react-icons/io";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {MdDelete} from "react-icons/md";
import WorkModalWindow from "./WorkModalWindow";

function Works({showWorks, setShowWorks}) {
    const problem = useSelector((state) => state.problem);
    const dispatch = useDispatch();
    const {map} = useSelector((state) => state.map);

    const [works, setWorks] = useState(problem.Works);
    const [showNewWorkWindow, setShowNewWorkWindow] = useState(false);

    console.log(problem.Works)
    console.log(works)

    const sendWorks = async () => {

    };


    const getDiff = (startWork, endWork) => {
        const moment1 = moment(endWork);
        const moment2 = moment(startWork);

        const diff = moment1.diff(moment2);
        const duration = moment.duration(diff);

        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
        let difference = '';
        days === 0 ? difference = `(${hours}год ${minutes}хв)` : difference = `(${days}д ${hours}год ${minutes}хв)`;

        return difference;
    };


    return (
        <>
            <div style={showWorks ? {display: 'flex'} : {display: 'none'}}
                 className='absolute top-0 left-0 z-[200] h-full w-full flex justify-center items-center blur-bg overflow-hidden '>
                <div className='pt-4 bg-[#216AD8] rounded-t-[20px] shadow-xl'>
                    <div className='relative bg-white px-[50px] pb-[50px] pt-[25px]'>

                        <div className='absolute text-3xl text-black  cursor-pointer right-[8px] top-[8px]'
                             onClick={() => {
                                 setShowWorks(false)
                             }}>
                            <IoMdClose/>
                        </div>

                        <div className='text-[#2069D7] text-[16px]'>
                            {moment(problem.data).format('DD.MM.YY HH:mm:ss')
                            + ` / ` + problem.applicant
                            + ` / ` + map.first_level + `>` + map.name
                            + ` / ` + problem.element}
                        </div>

                        <h2 className='pt-[25px] text-[24px] font-medium text-[#206AD9]'>Виконані роботи</h2>


                        <div className='overflow-y-scroll max-h-[70vh] scrollbar'>
                            <table className='py-[30px]'>
                                <tr className=''>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>№</th>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>Робота</th>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>Опис</th>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>Видалити</th>
                                </tr>

                                {works.map((item, index) => (
                                    <tr key={index} className=''>
                                        <th className='font-normal px-[13px] py-[10px] text-[18px] text-black bg-[#EEF4FC] border-[white]'>{index + 1}</th>
                                        <th className='font-normal px-[13px] py-[10px] text-[18px] text-[#696969] bg-[#EEF4FC] border-[white]'>{item.Work}</th>
                                        <th className='font-normal px-[13px] py-[10px] text-[18px] text-[#696969] bg-[#EEF4FC] border-[white]'>{getDiff(item.StartDate, item.EndDate)}</th>

                                        <th className='font-normal text-[18px] text-black bg-[#EEF4FC] border-[white] text-center'>
                                            <div className='center-flex'>
                                                <MdDelete className='text-[17px] cursor-pointer' onClick={() => {
                                                    let arr = works.filter((work) => {
                                                        return work.Key !== item.Key
                                                    });

                                                    setWorks(arr)
                                                }}/>
                                            </div>

                                        </th>
                                    </tr>
                                ))}
                            </table>
                        </div>


                        <div className='flex w-full justify-end pt-[30px]'>

                            <button className='btn btn-option w-[270px] justify-center' onClick={() => {
                                setShowNewWorkWindow(true)
                            }}>Додати роботу
                            </button>

                            {/*<button className='btn bg-[#49AA31] ml-[30px] w-[270px] justify-center' onClick={sendWorks}>*/}
                            {/*    Зберегти зміни*/}
                            {/*</button>*/}

                        </div>
                    </div>

                </div>
            </div>

            {showNewWorkWindow && <WorkModalWindow setWorks={setWorks} showWindow={showNewWorkWindow} setShowWindow={setShowNewWorkWindow}/>}
        </>
    );
}

export default Works;




