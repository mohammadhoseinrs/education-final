import React, { useEffect, useRef, useState } from 'react'
import EditorContainer from '../../teacherpost/editorcontainer/EditorContainer'
import './../../teacherpost/Teacherpost.css'
import {HiOutlineArrowNarrowLeft} from 'react-icons/hi'
import { NavLink, useParams } from 'react-router-dom'
import { getdetail } from '../../../../api/userApi'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import axios from 'axios'


export default function Teachercourseedit() {
  const [alldata,setalldata]=useState(null)
  const [select,setselect]=useState('')  
  const [image1,setimage1]=useState(null)
  const [image2,setimage2]=useState(null)

  const [options,setoptions]=useState([])
  const [coursename,setcoursename]=useState('')
  const [coursetopic,setcoursetopic]=useState('')
  const [coursehour,setcoursehour]=useState('')
  const [coursenumber,setcoursenumber]=useState('')
  const [courseprice,setcourseprice]=useState('')
  const [coursediscount,setcoursediscount]=useState('')
  const [coursedescription,setcoursedescription]=useState('')
  const [level,setlevel]=useState('')
  const [lang,setlang]=useState('')
  const [evidence,setevidence]=useState('')

  const [loading,setloading]=useState(false)
  const [color, setColor] = useState("#525fe1");
  const [success,setSuccess]=useState(false)
  
  const [dataloading,setdataloading]=useState(false)


  const teacherdetail=JSON.parse(localStorage.getItem('educationsite'))

  const params=useParams()

  const override = css`
        display: block;
        margin: 0 auto;
        border-color: white;
        font-weight:bold;
         border:4px solid white;
        `;
  
  
  const getdescription=(text)=>{
    setcoursedescription(text);
  }
  useEffect(()=>{
    setdataloading(true)
    getdetail(`Teacher/editCourse?courses_name=${params.teachercourseedit}`)
    .then(data=>{
      setalldata(data.data)
      setoptions(data.data[0])
      setdataloading(false)
      console.log(alldata);
    })
  },[])
  useEffect(()=>{
    if(alldata){
      setcoursename(alldata?.courses_name)
      setcoursetopic(alldata?.courses_topic)
      setcoursehour(alldata?.time_courses)
      setcoursenumber(alldata?.number_of_lesson)
      setcourseprice(alldata?.courses_price)
      setcoursediscount(alldata?.discount)
      setcoursedescription(alldata?.courses_description)
      setlevel(alldata?.level)
      setlang(alldata?.lang)
      setevidence(alldata?.evidence)
      setselect(alldata?.lesson_group_id)
    }
  },[alldata ,alldata?.courses_description ])
  console.log(select);
  const fileselectedHandler=(e)=>{
    setimage1(e.target.files[0])
  }
  const fileselectedHandler2=(e)=>{
    setimage2(e.target.files[0])
  }


  const createcoursehandler= async()=>{
    setloading(true)
    let courseitem={
      id:alldata?.id,
      lesson_group_id:select,
      courses_name:coursename,
      courses_topic:coursetopic,
      courses_teacher:teacherdetail.id,
      number_of_lesson:coursenumber,
      courses_description:coursedescription,
      courses_price:courseprice,
      discount:coursediscount,
      time_courses:coursehour,
      courses_pic:image1,
      pic_backround:image2,
      level,
      lang,
      evidence,
    }
console.log(courseitem);
    await axios.post('https://cafevira.com/api/api/v1/Teacher/editCourse',courseitem,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
   }
    ).then(res=>{
      console.log(res);
      if(res.status==200){
        setSuccess(true)
        setloading(false)
      }
      if(res.data.status==='100'){
        alert('erroe')
        setloading(false)
      }
    })
  }

  if (dataloading) return (
    <div className="teacherdetail__inner__loading">
        <PropagateLoader color={color} loading={dataloading} css={override} size={40} />
    </div>
  )
  return (
    <>
    <div className='teacherpost'>
      <div className="teacherpost__top">
        ایجاد دوره جدید
      </div>
      <div className="teacherpost__main">
        <div className="teacherpost__main__top">
          <div className="teacherpost__main__top__select">
            <p>انتخاب دسته بندی</p>
          <select  name="coursecategory" id="coursecategory" onChange={(e)=>setselect(e.target.value)}>
            {options.map(option=>(
                  <option key={option.id} value={option.id}>{option.group_name}</option>
            ))}
             
          </select>
          </div>

          <div className="teacherpost__number teacherpost__number2">
          <div>
          <label htmlFor=""> نام دوره</label>
            <input required value={coursename} type="text" onChange={(e)=>setcoursename(e.target.value)} />
          </div>
          <div>
          <label htmlFor=""> ساعت دوره
          <p>(فقط عدد مجاز می باشد)</p>
          </label>
          <input required 
             pattern="[0-9]*"
             value={coursehour}
            type="text" onChange={(e)=>setcoursehour((v) => (e.target.validity.valid ? e.target.value : ''))}   />
          </div>
          <div>
          <label htmlFor=""> تعداد دروس
          <p>(فقط عدد مجاز می باشد)</p>
          </label>
          <input required type="text" 
             pattern="[0-9]*"
            value={coursenumber}
            onChange={(e)=>setcoursenumber((v) => (e.target.validity.valid ? e.target.value : ''))}  />
          </div>
        </div>

        <div className="teacherpost__number teacherpost__number2">
        <div>
          <label htmlFor=""> عنوان دوره</label>
            <input value={coursetopic} required type="text"  onChange={(e)=>setcoursetopic(e.target.value)}  />
          </div>
          <div>
          <label htmlFor=""> قیمت دوره
          <p>(فقط عدد مجاز می باشد)</p>
          </label>
          <input required type="text"
            pattern="[0-9]*"
            value={courseprice}
            onChange={(e)=>setcourseprice((v) => (e.target.validity.valid ? e.target.value : ''))}  />
          </div>
          <div>
          <label htmlFor="">  تخفیف
          <p>(فقط عدد مجاز می باشد)</p>
          </label>
            <input required type="text"
            pattern="[0-9]*"
            value={coursediscount}
            onChange={(e)=>setcoursediscount((v) => (e.target.validity.valid ? e.target.value : ''))}   />
          </div>
        </div>

        <div className="teacherpost__number teacherpost__number2">
        <div>
          <label htmlFor=""> سطح دوره</label>
            <input value={level} required type="text"  onChange={(e)=>setlevel(e.target.value)}  />
          </div>
          <div>
          <label htmlFor=""> زبان دوره</label>
            <input value={lang} required type="text"  onChange={(e)=>setlang(e.target.value)}  />
          </div>
          <div>
          <label htmlFor="">  مدرک</label>
            <input value={evidence} required type="text" onChange={(e)=>setevidence(e.target.value)}   />
          </div>
        </div>

        <div className="teacherpost__explain">
          <p>توضیحات دوره</p>
          <EditorContainer getdescription={getdescription} coursedescription={coursedescription}/>
        </div>


        <div className="teacherpost__number teacherpost__number2">
          <div>
          <label htmlFor="">عکس دوره</label>
            <input  type="file" onChange={fileselectedHandler}/>
          </div>
          <div>
          <label htmlFor="">عکس پس زمینه دوره</label>
            <input  type="file" onChange={fileselectedHandler2}/>
          </div>
        </div>
        <p></p>
              
        {success &&  <p className='success'> دوره  با موفقیت ویرایش شد 
              </p>}
          <button className='techerpost__create' onClick={createcoursehandler}>
          {loading ? (
                 <ClipLoader color={color} loading={loading} css={override} size={30} />
                ):(
                 <p>            ایجاد دوره
                 </p>
                )}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}
