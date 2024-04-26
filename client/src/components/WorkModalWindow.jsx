import React, {useState} from 'react';
import {IoMdClose} from "react-icons/io";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {updateProblem} from "../api/axios.api";
import {addProblem} from "../store/slices/problemSlice";

function WorkModalWindow({setWorks, showWindow, setShowWindow}) {
    const problem = useSelector((state) => state.problem);
    const dispatch = useDispatch();
    const {map} = useSelector((state) => state.map);
    const [work, setWork] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState({
        startWork: moment().format('YYYY-MM-DDTHH:mm'),
        endWork: moment().format('YYYY-MM-DDTHH:mm')
    });

    const addWork = async () => {
        if (moment(time.endWork).unix() - moment(time.startWork).unix() < 0) return toast.error('Невірно вказано час!');

        const data = {
            type: "add_works_to_repair",
            uid: problem.uid,
            works: [{
                quantity: 1,
                work: work,
                startWork: moment(time.startWork).format('YYYYMMDDHHmmss'),
                endWork: moment(time.endWork).format('YYYYMMDDHHmmss')
            }]
        };

        const res = await updateProblem(data);


        if (res.status === 200) {
            setShowWindow(false);
            dispatch(addProblem(res.data));
            setWorks(res.data.Works);
            toast.success('Роботу додано успішно!');
        }
    };



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

                    <div className='text-[#2069D7] text-[16px]'>
                        {moment(problem.data).format('DD.MM.YY HH:mm:ss')
                        + ` / ` + problem.applicant
                        + ` / ` + map.first_level + `>` + map.name
                        + ` / ` + problem.element}
                    </div>

                    <h2 className='pt-[25px] text-[24px] font-medium text-[#206AD9]'>Виконані роботи</h2>

                    <div className='pt-[25px]'>
                        <select className='py-1 input w-[320px]'
                                onChange={(e) => setWork(e.target.value)}>
                            <option value="----" selected disabled>Виберіть роботу</option>
                            <option value="Заміна сальників">Заміна сальників</option>
                            <option value="Заміна підшипників">Заміна підшипників</option>
                            <option value="Використано ремкоплект">Використано ремкоплект</option>
                        </select>
                    </div>


                    {/*TIME*/}
                    <div className='flex w-[350px] justify-between pt-[30px] '>
                        <div>
                            <p className='text-[#206AD9] font-medium pb-[15px]'>Почав:</p>
                            <input type="datetime-local" value={time.startWork} onChange={(e) => setTime({
                                ...time,
                                startWork: moment(e.target.value).format('YYYY-MM-DDTHH:mm')
                            })} className='w-[160px]'/>
                        </div>

                        <div>
                            <p className='text-[#206AD9] pb-[15px]'>Закінчив:</p>
                            <input type="datetime-local" value={time.endWork} onChange={(e) => setTime({
                                ...time,
                                endWork: moment(e.target.value).format('YYYY-MM-DDTHH:mm')
                            })} className='w-[160px]'/>
                        </div>

                    </div>


                    <textarea className='my-[30px] w-full border h-[70px] rounded-md' placeholder='Опис...'
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}>
                    </textarea>

                    <div className='w-full flex justify-end'>

                        <button className='btn btn-option w-[270px] justify-center' onClick={addWork}>
                            Надіслати
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default WorkModalWindow;
