import React, {useEffect, useState} from 'react';
import {IoMdClose} from "react-icons/io";
import {IoCloseCircleOutline} from "react-icons/io5";
import ModalWindow from "./ModalWindow";
import {updateProblem} from "../api/axios.api";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {MdDelete} from "react-icons/md";
import {addProblem} from "../store/slices/problemSlice";
import moment from "moment";

function Materials({showMaterials, setShowMaterials}) {
    const problem = useSelector((state) => state.problem);
    const dispatch = useDispatch();
    const {map} = useSelector((state) => state.map);

    // const mtrls = problem.Materials.map(item => {return {...item, Code: ''}});
    // console.log(mtrls)

    const [materials, setMaterials] = useState(problem.Materials.map(item => {return {...item, Code: ''}}));
    const [showScanWindow, setShowScanWindow] = useState(false);
    const [code, setCode] = useState('');


    // console.log(problem)


    const handleCountClick = (index, type) => {
        const counterEl = document.getElementById(`counter_${index}`);
        let count = counterEl.textContent;

        // const material = materials.find((item) => item.bar_code === index);
        const material = materials[index];

        const obj = {...material};

        if (type === 'inc') {
            count++;
            obj.Quantity = count;
            counterEl.textContent = count;
        } else {
            if (count > 1) {
                count--;
                obj.Quantity = count;
                counterEl.textContent = count;
            }
        }

        materials[index] = obj
    };

    useEffect(() => {
        if (code.length === 3) {
            const material = {
                bar_code: code,
                Quantity: 1,
                Code: '',
                Nomenclature: '',
                Characteristics: '',
                Series: ''
            };

            materials.unshift(material);
            setMaterials(materials);
            setShowScanWindow(false);
            setCode('');
        }
    }, [code]);


    const sendMaterials = async () => {
        materials.forEach((item) => {
            if(item.bar_code) item.bar_code = '';
        });

        const data = {
            type: "add_material_to_repair",
            uid: problem.uid,
            Materials: materials
        };


        const res = await updateProblem(data);

        if (res.status === 200) {
            dispatch(addProblem(res.data));
            toast.success('Матеріали списано успішно!');
            setShowMaterials(false)
        }
    };


    return (
        <>
            <div style={showMaterials ? {display: 'flex'} : {display: 'none'}}
                 className='absolute top-0 left-0 z-[200] h-full w-full flex justify-center items-center blur-bg overflow-hidden '>
                <div className='pt-4 bg-[#216AD8] rounded-t-[20px] shadow-xl'>
                    <div className='relative bg-white px-[50px] pb-[50px] pt-[25px]'>
                        <div className='absolute text-3xl text-black  cursor-pointer right-[8px] top-[8px]'
                             onClick={() => {
                                 setShowMaterials(false)
                             }}>
                            <IoMdClose/>
                        </div>

                        <div className='text-[#2069D7] text-[16px]'>
                            {moment(problem.data).format('DD.MM.YY HH:mm:ss')
                            + ` / ` + problem.applicant
                            + ` / ` + map.first_level + `>` + map.name
                            + ` / ` + problem.element}
                        </div>

                        <h2 className='pt-[25px] text-[24px] font-medium text-[#206AD9]'>Списання матеріалів</h2>

                        <div className='overflow-y-scroll max-h-[70vh] scrollbar'>
                            <table className='py-[30px]'>
                                <tr className=''>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>№</th>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>Код
                                        зі штрих-коду
                                    </th>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>К-сть</th>
                                    <th className='font-normal px-[30px] py-[10px] text-[18px] text-white bg-[#2069D7] border-[white]'>Видалити</th>
                                </tr>

                                {materials.map((item, index) => (
                                    <tr key={index} className=''>
                                        <th className='font-normal px-[13px] py-[10px] text-[18px] text-black bg-[#EEF4FC] border-[white]'>{index+1}</th>
                                        <th className='font-normal px-[13px] py-[10px] text-[18px] text-[#696969] bg-[#EEF4FC] border-[white]'>{item.bar_code}</th>
                                        <th className='font-normal px-[13px] py-[10px] text-[18px] text-black bg-[#EEF4FC] border-[white]'>
                                            <div className="flex items-center justify-center">
                                                <button onClick={() => handleCountClick(index, 'dec')}
                                                        className="flex justify-center items-center w-[14px] h-[14px] rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2" d="M20 12H4"/>
                                                    </svg>
                                                </button>

                                                <span id={`counter_${index}`}
                                                      className="text-[16px] leading-none font-bold mx-3">{item.Quantity}</span>

                                                <button onClick={() => handleCountClick(index, 'inc')}
                                                        className="flex justify-center items-center w-[14px] h-[14px] rounded-full text-white focus:outline-none bg-green-500 hover:bg-green-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2" d="M12 6v12M6 12h12"/>
                                                    </svg>
                                                </button>
                                            </div>

                                        </th>
                                        <th className='font-normal text-[18px] text-black bg-[#EEF4FC] border-[white] text-center'>
                                            <div className='center-flex' >
                                                <MdDelete className='text-[17px] cursor-pointer' onClick={() => {
                                                    let arr = materials.filter((material) => {
                                                        return material.bar_code !== item.bar_code
                                                    });

                                                    setMaterials(arr)
                                                }}/>
                                            </div>

                                        </th>
                                    </tr>
                                ))}
                            </table>
                        </div>

                            <div className='flex w-full justify-center pt-[30px]'>

                                <button className='btn btn-option w-[270px] justify-center' onClick={() => {
                                    setShowScanWindow(true)
                                }}>Сканувати
                                </button>

                                <button className='btn bg-[#49AA31] ml-[30px] w-[270px] justify-center' onClick={sendMaterials}>
                                    Зберегти зміни
                                </button>

                            </div>
                    </div>

                </div>
            </div>

            {showScanWindow && (<ModalWindow setCode={setCode} showWindow={showScanWindow} setShowWindow={setShowScanWindow}/>)}
        </>

    );
}

export default Materials;