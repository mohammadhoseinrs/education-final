import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getdetail } from '../../../api/userApi'
import './TeacherComment.css'
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'

export default function TeacherComment() {
    const [color, setColor] = useState("#525fe1");
    const [dataloading,setdataloading]=useState(false)
    const [teachercommnet,setteachercommnet]=useState(null)
    const [message,setmessage]=useState('')
    let [show,setshow]=useState(true)
    const [success,setSuccess]=useState(false)
    const [errmsg,setErrormsg]=useState('')

    const user=JSON.parse(localStorage.getItem('educationsite'))

    useEffect( ()=>{
        setdataloading(true)
        getdetail(`Teacher/ListCourse/comment?teacher_id=${user.id}`)
        .then(item=>{
            setteachercommnet(item.data)
            setdataloading(false)
        })
    },[])

    const approvehandler=(id)=>{
        console.log(id);
        axios.post(`https://cafevira.com/api/api/v1/Teacher/ListCourse/comment/conf?id=${id}&replay_id=''`).then(res=>{
            setdataloading(true)
        getdetail(`Teacher/ListCourse/comment?teacher_id=${user.id}`)
        .then(item=>{
            setteachercommnet(item.data)
            setdataloading(false)
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            },2000)
        })
        })
    }
    const disapprovehandler=(id)=>{
        axios.post(`https://cafevira.com/api/api/v1/Teacher/ListCourse/comment/unConf?id=${id}&replay_id=''`).then(res=>{
            setdataloading(true)
        getdetail(`Teacher/ListCourse/comment?teacher_id=${user.id}`)
        .then(item=>{
            setteachercommnet(item.data)
            setdataloading(false)
            setErrormsg('تایید نشد')
            setTimeout(() => {
                setErrormsg('')
            }, 2000);
        })
        })
    }

    const approvereply=({ replay_id})=>{
        axios.post(`https://cafevira.com/api/api/v1/Teacher/ListCourse/comment/conf?id=&replay_id=${replay_id}`).then(res=>{
            setdataloading(true)
        getdetail(`Teacher/ListCourse/comment?teacher_id=${user.id}`)
        .then(item=>{
            setteachercommnet(item.data)
            setdataloading(false)
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            },2000)
        })
        })
    }

    const disapprovereply=({replay_id})=>{
        axios.post(`https://cafevira.com/api/api/v1/Teacher/ListCourse/comment/unConf?id=&replay_id=${replay_id}`).then(res=>{
            console.log(res);
            setdataloading(true)
        getdetail(`Teacher/ListCourse/comment?teacher_id=${user.id}`)
        .then(item=>{
            setteachercommnet(item.data)
            setdataloading(false)
            setErrormsg('تایید نشد')
            setTimeout(() => {
                setErrormsg('')
            }, 2000);
        })
        })
    }
    
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
        font-weight:bold;
         border:4px solid white;
        `;
        if (dataloading) return (
            <div className="teacherdetail__inner__loading">
                <PropagateLoader color={color} loading={dataloading} css={override} size={40} />
            </div>
          )
  return (
    <div className='teachercomment'>
        <div className="teachercomment__top">
            نظرات دوره
        </div>
        <div className="teachercomment__main">
            <div className="teachercomment__main__set">
                <button onClick={()=>setshow(true)}>کامنت های دوره</button>
                <button onClick={()=>setshow(false)}>ریپلای های دوره</button>
            </div>
            {success &&  <p className='success'>  تایید شد </p>}
            <p className={errmsg ? 'errmsg' : 'offscreen'}>{errmsg}</p>
        {show ? (
            <div className="teachercomment__main__comment">
            {teachercommnet?.comment.map(data=>{
                return(
                    <div className='teachercomment__comment' key={data.id}>
                        <div className='teachercomment__comment__date'>
                            <p className='teachercomment__comment__date__number'>تاریخ ارسال  :</p>
                            <p className='teachercomment__comment__date__number2'>{data.date}</p>
                        </div>
                   <div className="teachercomment__main__item" >
                        <div className='teachercourse__main__item__text'>
                            یک کامنت با محتوای زیر برای دوره 
                            <p>{data.course_name}</p>
                            ثبت گردید.
                        </div>
                        <div className="teachercourse__main__item__btn">
                        <button className='teachercourse__main__item__btn__red'
                        onClick={()=>disapprovehandler(data.id)}
                          >عدم تایید کامنت</button>
                          <button className='teachercomment__main__item__btn__green'
                          onClick={()=>approvehandler(data.id)}
                          >تایید کامنت</button>
                        </div>
                    </div>
                    <div className="teachercourse__main__item__comment">
                        <p>کامنت :</p>
                        <div>{data.comment}</div>
                    </div>
               </div>
           ) })}
            </div>
        ):(
            <div className="teachercomment__main__comment">
                {teachercommnet?.replay.map(data=>{
                    console.log(data);
                return(
                    <div className='teachercomment__comment' key={data.comment_id}>
                        <div className='teachercomment__comment__date'>
                            <p className='teachercomment__comment__date__number'>تاریخ ارسال  :</p>
                            <p className='teachercomment__comment__date__number2'>{data.date}</p>
                        </div>
                   <div className="teachercomment__main__item" >
                        <div className='teachercourse__main__item__text'>
                            یک ریپلای با محتوای زیر برای دوره 
                            <p>{data.course_name}</p>
                            ثبت گردید.
                        </div>
                        <div className="teachercourse__main__item__btn">
                        <button className='teachercourse__main__item__btn__red'
                        onClick={()=>disapprovereply(data)}
                          >عدم تایید ریپلای</button>
                          <button className='teachercomment__main__item__btn__green'
                          onClick={()=>approvereply(data)}
                          >تایید ریپلای</button>
                        </div>
                    </div>
                    <div className="teachercourse__main__item__comment__context">
                    <div className="teachercourse__main__item__comment1">
                        <p> کامنت اصلی  :</p>
                        <div>{data.comment}</div>
                        </div>
                        <div className="teachercourse__main__item__comment2">
                            <p> ریپلای کامنت :</p>
                            <div>{data.replay}</div>
                        </div>
                    </div>
               </div>
           ) })}
            </div>
         )}   
        </div>
    </div>
  )
}
