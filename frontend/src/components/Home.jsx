import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "./Home.css"
import { AiTwotoneStar } from 'react-icons/ai';


export default function Home() {

  const [data,setData]=useState([])


  useEffect(()=>{
    fetch(`https://staynest.onrender.com/properties`)
    .then((res)=>res.json())
    .then((data)=>setData(data))
    .catch((err)=>console.log(err))

  },[])

  return (
    <div>
   
       <div className='container'>
        {data.map((ele)=>{
          return (
            <Link to={`./detail/${ele.id}`}>
            <div className='card'>
              <div>
                 <img src={ele.images.main} alt="photo" />
              </div>

              <div>
                 <div>
                 <h3>{ele.name}</h3>
                <p><AiTwotoneStar/>{ele.rating[0]}</p>
              </div>
             
              <p>{ele.location}</p>
              <h4>{ele.price} night</h4>
              </div>
             
            </div>
            </Link>
          )
        })}
       </div>

    </div>
  )
}
