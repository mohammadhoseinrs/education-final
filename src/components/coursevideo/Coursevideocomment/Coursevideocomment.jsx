import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './Coursevideocomment.css'
import {MdOutlineSubdirectoryArrowLeft} from 'react-icons/md'
import { getdetail } from '../../../api/userApi';
import axios from 'axios';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from '../../CourseDetail/CourseDetailMain/Pagination';
import Framer2 from './../../../Framer2'
const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
  font-weight:bold;
  border:5px solid white;
`;

export default function Coursevideocomment({coursecomment , commentlist , refreshfunction ,inputToggle ,replyinput ,setreplyinput  ,courseid }) {
    const[currentpage,setcurrentpage]=useState(0)
    const commentperpage=6
    const indexoflastcomment=currentpage*commentperpage
    const currencomment=commentlist.slice(indexoflastcomment,indexoflastcomment+commentperpage)
    const {user}=useSelector(state=>state.login)
    const [comment,setcomment]=useState('')
    const [reply,setreply]=useState('')
    const [success,setsuccess]=useState(false)
    const [loading,setloading]=useState(false)
    const [loading2,setloading2]=useState(false)
    const [color, setColor] = useState("#ffffff");
    const [success2,setsuccess2]=useState(false)
    const submitHandler=(e)=>{
        e.preventDefault()
        setloading(true)
        const item={
            comment:comment,
            name:user?.name,
            video_id:courseid
        }
        setloading(true)
             axios.post('https://cafevira.com/api/api/v1/Courses/{Tittle}/VideoComment',item)
            .then(response=>{
                if(response.data){
                    setcomment('')
                    setsuccess(true)
                    setTimeout(()=>{
                        setsuccess(false)
                    },5000)
                    setloading(false)

                }
            })
    }
    const replyhandler=(id)=>{
        setloading2(true)
        const item={
            comment_id:id,
            name:user?.name,
            replay:reply
        }
        axios.post('https://cafevira.com/api/api/v1/Courses/{Tittle}/VideoComment',item)
        .then(response=>{
            if(response.data){
                setreply('')
                setsuccess2(true)
                setTimeout(()=>{
                    setsuccess2(false)
                    setreplyinput(false)
                },3000)
                setloading2(false)
            }
        })
    }  
    const closehandler=()=>{
        setreplyinput(false)
        setreply('')
    }
    
    
  return (
    <div className='coursecomment'>
        <div className="coursecomment__container">
            <h2 className='coursecomment__titele'>
            ???????????? ?? ????????
            </h2>
             <div className="coursecomment__section">
              <div className="coursecomment__section__inner">
                  {currencomment?.map(item=>(
                  <div key={item.id}>
                 <div className="coursecomment__section__item">
                     <div className="coursecomment__section__item__top">
                         <div className='coursecomment__section__item__top__right'>
                            <div className="coursecomment__section__item__top__name">
                                {item?.name}
                            </div>
                            <div className="coursecomment__section__item__top__time">
                                {item.date}
                            </div>
                         </div>
                         {user?.name &&
                         <div className="coursecomment__section__item__top__left"
                         onClick={()=>inputToggle(item.id)}
                         >
                                <MdOutlineSubdirectoryArrowLeft />
                                <p>????????</p>
                         </div>
                         }
                     </div>
                     <div className="coursecomment__section__item__content">
                         {item.comment}
                     </div>
                 </div>
            <section className='coursecomment__section__item__reply__all'>
            {item?.[0]?.map(data=>{
                return(
                    <div key={data.id}>
                     <div className="coursecomment__section__item__reply">
                     <div className="coursecomment__section__item__reply1">
                         <div className="coursecomment__section__item__reply1__right">
                                 <div className="coursecomment__section__item__reply__name">
                                    {data?.name}
                                </div>
                                <div className="coursecomment__section__item__reply__time">
                                    {data?.date} 
                                </div>
                         </div>
                         {user.name && 
                         <div className="coursecomment__section__item__reply1__left">
                            <div className="coursecomment__section__item__top__left"
                         onClick={()=>{inputToggle(item.id)}}
                         >
                                <MdOutlineSubdirectoryArrowLeft />
                                <p
                                >????????</p>
                            </div>
                         </div>
                         }
                    </div>
                         <div className="coursecomment__section__item__content__reply">
                             {data?.replay}
                         </div>
                     </div>
                    </div>
                        ) })}
                 </section>
                 
                 {item?.open && replyinput &&
                 <div className='reply__comment__section'>
                     {success2 ? (<p className='success'> 
                 ?????????? ?????? ???? ???????????? ?????? ????
              </p>):('')}
                  <textarea
                 onChange={(e)=>setreply(e.target.value)}
                 type="text" />
                 <div className="reply__comment__section__btn">
                    <button
                   onClick={()=>replyhandler(item.id)}
                    className='reply__comment__section__btn__submit'
                    >
                     {loading2 ?(
                         <ClipLoader color={color} loading={loading2} css={override} size={20} />
                     ):(
                         <p>?????? ????????????</p>
                     )}   
                    </button>
                    <button
                        className='reply__comment__section__btn__vaz'
                        onClick={closehandler}
                    >
                        ????????????
                    </button>
                 </div>
                 </div>
                 }
                 </div>
                 ))}  
            </div>
             </div>
             {commentlist.length > 0 ?(
             <>
             <Pagination productperpage={commentperpage} prodata={commentlist} setcurrentpage={setcurrentpage}/> 
             <div>
             {success ? (<p className='success succes2'> 
                 ?????????? ?????? ???? ???????????? ?????? ????
              </p>):('')}
              </div>
              </>):(
                  <p className='coomentlist__length'>?????????? ???????? ?????????? ???? ?????? ???? ????????</p>
              )
            }
            {user?.name ? (
                 <form className='coursecomment__form' onSubmit={submitHandler}>
                     <p className='coursecomment__form__para'>????????????</p>
                 <textarea  cols="40" rows="10"
                 value={comment}
                 onChange={(e)=>setcomment(e.target.value)}
                 />
                 <button className='coursecomment__form__btn'
                 disabled={!user?.name}
                 onClick={()=>setloading(true)}
                 >
                {loading ? (
                  <ClipLoader color={color} loading={loading} css={override} size={30} />
                ):(
                    <p> ??????????</p>
                )}                     
                </button>
              </form>
            ):(
                <p className='coursecomment__login'>
                    ???????? ?????????? ?????? ???????? ???????? ???????? ???????????? ?????? ?????? ??????????.
                </p>
            )}
        </div>
    </div>
  )
}
