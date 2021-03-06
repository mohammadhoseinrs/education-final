import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './TeacherSession.css'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useEffect } from 'react';
import { getdetail } from '../../../api/userApi';
import axios from 'axios';
export default function TeacherSession() {
    const params=useParams()
    console.log(params);
    const [loading,setloading]=useState(false)
    const [color, setColor] = useState("#525fe1");
    const [success,setSuccess]=useState(false)
    const [dataloading,setdataloading]=useState(false)

    const [newinput,setnewinput]=useState('')
    const [selectedFile, setSelectedFile] = useState();
    
    const [session,setsession]=useState(null)
    const [percentage, setPercentage] = useState(0)

    const [errmsg,setErrmsg]=useState('')

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    	};
    const submit=  newinput &&  selectedFile
    console.log(submit);
     
        const handleSubmission=(e)=>{
            e.preventDefault()
            if(submit){
                
            
            setloading(true)
            let percent = 0
           
            const formData = new FormData();

		    formData.append('video', selectedFile);
            formData.append('name',newinput)
            formData.append('topic',params.teachersession)

        const config = {
            onUploadProgress: (progressEvent) => {
            const {loaded, total} = progressEvent;
            percent = Math.floor((loaded * 100) / total)
            console.log( `${loaded}kb of ${total}kb | ${percent}%` ) // just to see whats happening in the console
            if(percent <= 100) {
            setPercentage(percent) // hook to set the value of current level that needs to be passed to the progressbar
            }
            },
            headers: { 
            // custom headers goes here
             'Content-Type': 'multipart/form-data' ,

            }
            }
        axios.post('https://cafevira.com/api/api/v1/Teacher/courseTittle/video',formData ,config).then(res=>{
            console.log(res);
            setsession(session.concat(res.data))
            setPercentage(percent)
            setloading(false)
            setSuccess(true)
            setTimeout(() => {
                setPercentage(0)
            }, 1000);
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
         })
            }else{
                setErrmsg('???????? ?????? ???????? ???? ???? ???? ????????')
                setTimeout(() => {
                    setErrmsg('')
                }, 3000);
            }
    
        }

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
        font-weight:bold;
        border:4px solid white;
  `;

  useEffect(()=>{
    setdataloading(true)
    getdetail(`Teacher/courseTittle/video?topic=${params.teachersession}`).then(
        item=>{
            setsession(item.data)
            setdataloading(false)
        }
    )

  },[])

  if (dataloading) return (
    <div className="teacherdetail__inner__loading">
        <PropagateLoader color={color} loading={dataloading} css={override} size={40} />
    </div>
  )
  return (
    <div className='teachersession'>
        <div className="teachersession__top">
             ???????? ?????? ???????? 
             <p>{params.teachersession}</p>
        </div>
        <div className="teachersession__main">
            {session?.map(data=>(
                <div className="teachercourseadd__main__item">
                <div key={data.id}>
                    <p>???????? :</p>
                    <div>{data.name}</div>
                </div>
               <div className="teachercourseadd__main__item__btn">
                    <button className='teachercourse__main__item__btn__red'
                     >?????? ????????</button>
                </div>
   
             </div>  
            ))}
        </div>
        {success &&  <p className='success'>   ???????? ???????? ???? ???????????? ?????????? ???? </p>}
        <form className='teachercourseadd__input' onSubmit={handleSubmission}>
        {errmsg && <p className='signin__error'>{errmsg}</p>}
        <label htmlFor="">?????????? ???????? ???????? ????????</label>
        <input className='teachercourseadd__input_input' value={newinput} type="text" onChange={(e)=>setnewinput(e.target.value)} />
        <label htmlFor="" className='upload__label'>?????????? ?????????? :</label>
        <input className='teachercourseadd__input_input3' type="file" onChange={changeHandler}  />
        <div className="teachercourseadd__percent">
            {percentage>0 ?(<>
                <p className='teachercourseadd__percent__text'> ?????????? ?????????? ???? ?????? ?????????? ?????? ???????? ?????? ????????</p>
                <div className='teachercourseadd__percent__percent'>
                    <p>???????? ??????????</p>
                    {percentage}%</div>
            </>):(
                <>
                </>
            )}
        </div>
            <button className='teachercourseadd__input__btn'> 
            {loading ? (
                 <ClipLoader color={color} loading={loading} css={override} size={30} />

            ):(
                <p>?????????? ????????</p>
            )}                
                </button>
        </form>
    </div>
  )
}
