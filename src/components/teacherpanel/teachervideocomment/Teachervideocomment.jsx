import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getdetail } from '../../../api/userApi'
import './teachervideocomment.css'
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios'

export default function Teachervideocomment() {
    const [color, setColor] = useState("#525fe1");
    const [dataloading,setdataloading]=useState(false)
    const [teachercommnet,setteachercommnet]=useState(null)
    const [message,setmessage]=useState('')
    const [show1,setshow1]=useState(true)
    const [success,setSuccess]=useState(false)
    const [errmsg,setErrormsg]=useState('')

    const user=JSON.parse(localStorage.getItem('educationsite'))

    useEffect( ()=>{
        setdataloading(true)
        getdetail(`Teacher/courseTittle/video/comment?teacher_id=${user.id}`)
        .then(item=>{
            console.log(item.data);
            setteachercommnet(item.data)
            setdataloading(false)
        })
    },[])
        console.log(teachercommnet);
    const approvehandler=(id)=>{
        axios.post(`https://cafevira.com/api/api/v1/Teacher/courseTittle/video/comment/conf?id=${id}&replay_id=''`).then(res=>{
            setdataloading(true)
            getdetail(`Teacher/courseTittle/video/comment?teacher_id=${user.id}`)
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
        axios.post(`https://cafevira.com/api/api/v1/Teacher/courseTittle/video/comment/unConf?id=${id}&replay_id=''`).then(res=>{
            setdataloading(true)
            getdetail(`Teacher/courseTittle/video/comment?teacher_id=${user.id}`)
            .then(item=>{
            setteachercommnet(item.data)
            setdataloading(false)
            setErrormsg('?????????? ??????')
            setTimeout(() => {
                setErrormsg('')
            }, 2000);
        })
        })
    }

    const approvereply=({ replay_id})=>{
        axios.post(`https://cafevira.com/api/api/v1/Teacher/courseTittle/video/comment/conf?id=&replay_id=${replay_id}`).then(res=>{
            setdataloading(true)
            getdetail(`Teacher/courseTittle/video/comment?teacher_id=${user.id}`)
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
            getdetail(`Teacher/courseTittle/video/comment?teacher_id=${user.id}`)
            .then(item=>{
            setteachercommnet(item.data)
            setdataloading(false)
            setErrormsg('?????????? ??????')
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

          console.log(show1);
  return (
    <div className='teachercomment'>
        <div className="teachercomment__top">
            ?????????? ???????? ?????? ?????????????? ??????
        </div>
        <div className="teachercomment__main">
            <div className="teachercomment__main__set">
                <button onClick={()=>setshow1(true)}>?????????? ?????? ????????</button>
                <button onClick={()=>setshow1(false)}>???????????? ?????? ????????</button>
            </div>
            {success &&  <p className='success'>  ?????????? ???? </p>}
            <p className={errmsg ? 'errmsg' : 'offscreen'}>{errmsg}</p>
        {show1 ? (
            <div className="teachercomment__main__comment">
            {teachercommnet?.comment.map(data=>{
                return(
                    <div className='teachercomment__comment' key={data.id}>
                        <div className='teachercomment__comment__date'>
                            <p className='teachercomment__comment__date__number'>?????????? ??????????  :</p>
                            <p className='teachercomment__comment__date__number2'>{data.date}</p>
                        </div>
                   <div className="teachercomment__main__item2" >
                        <div className='teachercourse__main__item__text'>
                            ???? ?????????? ???? ???????????? ?????? ???????? ???????? 
                            <p>{data.course_name}</p>
                            ?????? ??????????.
                        </div>
                        <div className='teachervideocomment__session'>
                        <p>???????? :</p>
                            <div>{data?.video_name}</div>
                        </div>
                        <div className="teachercourse__main__item__btn__second">
                        <button className='teachercourse__main__item__btn__red'
                        onClick={()=>disapprovehandler(data.id)}
                          >?????? ?????????? ??????????</button>
                          <button className='teachercomment__main__item__btn__green'
                          onClick={()=>approvehandler(data.id)}
                          >?????????? ??????????</button>
                        </div>
                    </div>
                    <div className="teachercourse__main__item__comment">
                        <p>?????????? :</p>
                        <div>{data.comment}</div>
                    </div>
               </div>
           ) })}
            </div>
        ):(
            <div className="teachercomment__main__comment">
                {teachercommnet?.replay.map(data=>{
                return(
                    <div className='teachercomment__comment' key={data.replay_id}>
                        <div className='teachercomment__comment__date'>
                            <p className='teachercomment__comment__date__number'>?????????? ??????????  :</p>
                            <p className='teachercomment__comment__date__number2'>{data.date}</p>
                        </div>
                   <div className="teachercomment__main__item2" >
                        <div className='teachercourse__main__item__text'>
                            ???? ???????????? ???? ???????????? ?????? ???????? ???????? 
                            <p>{data.course_name}</p>
                            ?????? ??????????.
                        </div>
                        <div className='teachervideocomment__session'>
                        <p>???????? :</p>
                            <div>{data.video_name}</div>
                        </div>
                        <div className="teachercourse__main__item__btn__second">
                        <button className='teachercourse__main__item__btn__red'
                        onClick={()=>disapprovereply(data)}
                          >?????? ?????????? ????????????</button>
                          <button className='teachercomment__main__item__btn__green'
                          onClick={()=>approvereply(data)}
                          >?????????? ????????????</button>
                        </div>
                    </div>
                    <div className="teachercourse__main__item__comment__context">
                    <div className="teachercourse__main__item__comment1">
                        <p> ?????????? ????????  :</p>
                        <div>{data.comment}</div>
                        </div>
                        <div className="teachercourse__main__item__comment2">
                            <p> ???????????? ?????????? :</p>
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
