import React, {useEffect, useState} from 'react';
import {removeNode} from "../store/slices/nodeSlice";
import {IoMdClose} from "react-icons/io";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {addWorker, updateProblem} from "../api/axios.api";
import {addProblem, removeProblem} from "../store/slices/problemSlice";
import {toast} from "react-toastify";
import Materials from "./Materials";
import Works from "./Works";


function Problem({showProblem, setShowProblem, setShowProblems}) {
    const dispatch = useDispatch();

    const problem = useSelector((state) => state.problem);
    const {map} = useSelector((state) => state.map);
    const [description, setDescription] = useState(problem.reason);

    const [showOptions, setShowOptions] = useState(false);
    const [typeProblem, setTypeProblem] = useState(0);
    const [userRfid, setUserRfid] = useState('');
    const [reason, setReason] = useState('');

    const [showMaterials, setShowMaterials] = useState(false);
    const [showWorks, setShowWorks] = useState(false);

    useEffect(() => {
        setDescription(problem.reason)
    }, [problem]);


    const updateReason = async () => {
        if (description !== '') {

            const data = {
                type: "update_repair",
                uid: problem.uid,
                reason: description
            };

            const res = await updateProblem(data);

            if (res.status === 200) {
                dispatch(addProblem(res.data));
                toast.success('Причину змінено успішно!');
            }
        }
    };


    const addUserToReason = async () => {
        if (userRfid.length === 3) {
            setUserRfid('');
            // setShowRfid(false);
            // setShowModalProblem(false);

            let data = {
                "type": "login",
                "credentials": '1234567890',
                "login_type": "physical_key"
            };

            // const res = await loginUser(data);
            const res = await addWorker(data);
            setTypeProblem(0);
            setShowOptions(false);

            toast.success(`Користувач ${res.data.user_full_name} почав роботу`);
        }
    };


    const addPauseRepair = async () => {
        if (reason !== '') {

            let data = {
                type: "set_pause_reason_repair",
                uid: problem.uid,
                pause_reason: reason,
            };

            const res = await updateProblem(data);
            // console.log(res)

            if (res.status === 200) {
                dispatch(addProblem(res.data));
                toast.success('Причину паузи додано!');
            }
            setTypeProblem(0);
            setShowOptions(false)
        } else toast.error('Виберіть причину паузи!')
    };


    const closeProblem = async () => {
        if (userRfid !== '') {
            const data = {
                type: "set_pause_reason_repair",
                uid: problem.uid,
                pause_reason: 'closed',
                user: userRfid
            };

            const res = await updateProblem(data);

            if (res.status === 200) {
                dispatch(addProblem(res.data));
                setShowOptions(false);
                setTypeProblem(0);
                toast.success('Заявку закрито успішно!');
            }
        } else toast.error('Ідентифікуйте особистість!')
    };

    return (
        <>
            <div style={showProblem ? {display: 'flex'} : {display: 'none'}}
                 className='absolute top-0 left-0 z-[200] h-full w-full flex justify-center items-center blur-bg overflow-hidden '>

                <div className='pt-4 bg-[#216AD8] rounded-t-[20px] shadow-xl'>

                    {!showOptions ? (
                        <div className='relative bg-white px-[50px] pb-[50px] pt-[25px]'>
                            <div className='absolute text-3xl text-black  cursor-pointer right-[8px] top-[8px]'
                                 onClick={() => {
                                     setShowProblem(false);
                                     setShowProblems(true);
                                     dispatch(removeProblem())
                                 }}>
                                <IoMdClose/>
                            </div>

                            <div className='flex justify-between mb-[50px]'>
                                <div className='flex flex-col justify-between h-[200px] text-[16px]'>
                                    <div className='  '>
                                        <span className='font-medium text-[#216AD8]'>Дата створення:</span>
                                        {` ` + moment(problem.data).format('DD.MM.YY HH:mm:ss')}
                                    </div>

                                    {/*<div className='  '>*/}
                                    {/*    <span className='font-medium text-[#216AD8]'>Причина:</span>*/}
                                    {/*    {` ` + problem.reason}*/}
                                    {/*</div>*/}

                                    <div>
                                        <span className='font-medium text-[#216AD8]'>Заявник:</span>
                                        {` ` + problem.applicant}
                                    </div>

                                    <div>
                                        <span className='font-medium text-[#216AD8]'>Поточний стан:</span>
                                        <span className={`font-medium text-[#216AD8]
                                            ${problem.status === 'open' && 'text-[#70c927]'}
                                            ${problem.status === 'pause' && 'text-[#f4ac23]'}
                                            ${problem.status === 'closed' && 'text-[#de0a26]'}
                                        `}>
                                            {problem.status === 'open' && ' В роботі'}
                                            {problem.status === 'pause' && ' Пауза'}
                                            {problem.status === 'closed' && ' Закрито'}
                                        </span>
                                    </div>

                                    <div>
                                        <span className='font-medium text-[#216AD8]'>Пауза в ремонті:</span>
                                        {` ` + problem.pause_reason}
                                    </div>


                                    <div>
                                        <span className='font-medium text-[#216AD8]'>Елемент:</span>
                                        {` ` + problem.element}
                                    </div>

                                    <div>
                                        <span className='font-medium text-[#216AD8]'>Будівля:</span>
                                        {map !== null && ` ${map.first_level} > ${map.name}`}
                                    </div>
                                </div>

                                <div className='pl-[50px]'>
                                    <button className='btn btn-option w-[260px] justify-center mb-[15px]'
                                            onClick={() => {
                                                setShowOptions(true);
                                                setTypeProblem(1);
                                            }}>
                                        Почати ремонт
                                    </button>

                                    <button className='btn btn-option w-[260px] justify-center mb-[15px]'
                                            onClick={() => {
                                                setShowOptions(true);
                                                setTypeProblem(2);
                                            }}>
                                        Пауза в ремонті
                                    </button>

                                    <button className='btn btn-option w-[260px] justify-center mb-[15px]'
                                            onClick={() => {
                                                setShowOptions(true);
                                                setTypeProblem(3);
                                            }}>
                                        Завершити
                                    </button>
                                </div>
                            </div>

                            <div className='flex justify-between items-center'>
                                <div className='flex flex-col'>
                                    <label className='font-medium text-[#216AD8]'>Опис:</label>
                                    <textarea className='px-2 py-1 w-[340px] h-[130px] border rounded-md'
                                              placeholder='Опис...' value={description}
                                              onChange={(e) => setDescription(e.target.value)}>
                                    </textarea>
                                </div>

                                <div className='pl-[50px]'>
                                    <button className='btn btn-option w-[260px] justify-center mb-[15px]'
                                            onClick={updateReason}>
                                        Змінити опис
                                    </button>

                                    <button className='btn btn-option w-[260px] justify-center mb-[15px]'
                                            onClick={() => {
                                                setShowMaterials(true);
                                            }}>
                                        Матеріали
                                    </button>

                                    <button className='btn btn-option w-[260px] justify-center '
                                            onClick={() => {
                                                setShowWorks(true);
                                            }}>
                                        Виконані роботи
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='relative bg-white px-[50px] pb-[50px] pt-[25px]'>
                            <div className='absolute text-3xl text-black  cursor-pointer right-[8px] top-[8px]'
                                 onClick={() => {
                                     setShowOptions(false);
                                 }}>
                                <IoMdClose/>
                            </div>


                            <div className='text-[#2069D7] text-[16px]'>
                                {moment(problem.data).format('DD.MM.YY HH:mm:ss')
                                + ` / ` + problem.applicant
                                + ` / ` + map.first_level + `>` + map.name
                                + ` / ` + problem.element}
                            </div>

                            <div className='px-[35px]'>

                                <h2 className='pt-[30px] text-[24px] font-medium text-[#206AD9]'>
                                    {typeProblem === 1 && 'Почати ремонт'}
                                    {typeProblem === 2 && 'Причини паузи в ремонті'}
                                    {typeProblem === 3 && 'Завершити ремонт'}
                                </h2>


                                {typeProblem === 2 ? (
                                    <div className='py-[30px]'>
                                        <select value={reason} className='py-1 input w-[300px] h-[34px] '
                                                onChange={(e) => setReason(e.target.value)}>
                                            <option value="" selected disabled>Виберіть причину</option>
                                            <option value="Сніданок">Сніданок</option>
                                            <option value="Обід">Обід</option>
                                            <option value="Вечеря">Вечеря</option>
                                            <option value="-">Немає</option>
                                        </select>
                                    </div>
                                ) : (
                                    <div className='py-[30px]'>
                                        <input type="text" value={userRfid} placeholder='Мітка зчитувач'
                                               className='input py-2 w-[320px]' autoFocus
                                               onChange={(e) => setUserRfid(e.target.value)}/>
                                    </div>
                                )}


                                <textarea className=' w-full border h-[70px] rounded-md' placeholder='Опис...'
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}>

                            </textarea>

                                <div className='pt-[30px] w-full flex justify-end'>
                                    <button className='btn btn-option px-10' onClick={() => {

                                        if (typeProblem === 1) addUserToReason();
                                        if (typeProblem === 2) addPauseRepair();
                                        if (typeProblem === 3) closeProblem();

                                    }}>
                                        {typeProblem === 1 && 'Почати ремонт'}
                                        {typeProblem === 2 && 'Пауза'}
                                        {typeProblem === 3 && 'Завершити ремонт'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                {showMaterials && (<Materials showMaterials={showMaterials} setShowMaterials={setShowMaterials}/>)}

                {showWorks && (<Works showWorks={showWorks} setShowWorks={setShowWorks}/>)}
            </div>

        </>

    );
}

export default Problem;

