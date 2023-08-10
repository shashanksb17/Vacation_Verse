import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function HostProfile() {

    //side images
    let token=localStorage.getItem("hostToken")||null;
    
    const [sideImage,setSideImage]=useState()
    const [sd,setSd]=useState([])

    const addSideImage=(e)=>{
        e.preventDefault()
        setSd([...sd,sideImage]) 
    }

    const SideImageValue=(e)=>{
        setSideImage(e.target.value)
    }
   
    useEffect(()=>{
        console.log(sd)
    },[sd])


//----------------------amenteies images---------------------------------

    const [amenteies,setAmenteies]=useState()
    const [sa,setSa]=useState([])

    const addAmenteies=(e)=>{
        e.preventDefault()
        setSa([...sa,amenteies]) 
    }

    const AmenteiesValue=(e)=>{
        setAmenteies(e.target.value)
    }
   
    useEffect(()=>{
        console.log(sa)
    },[sa])

    //----------------------handle change---------------------------------
    const [formData,setFormData]=useState({ })
    const [img,setImg]=useState({ })

    const handleChange=(e)=>{
        const {id,value}=e.target
        setFormData({...formData,[id]:value})
        console.log(formData)
    }

    const handleChange1=(e)=>{
       setImg(e.target.value)
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        setFormData({
            ...formData,
            images:{
                main:img,
                gallery:sd
            },
            amenteies:sa
        })
        //------------------
        console.log(token)
        fetch('https://puzzled-cow-coveralls.cyclic.app/properties', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            'Authorization': token,
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((data) => {
                alert("added data")
              console.log(data);
            })
            .catch((error) => {
             alert("invalid")
              console.error( error);
            });

    //     axios.post("https://puzzled-cow-coveralls.cyclic.app/properties",formData)
    //     .then((res)=>{
    //         console.log(res);
    //    })
    }

    useEffect(()=>{
        console.log(formData)
    },[formData])

  return (
    <div>
        <form action="">
            <label htmlFor="">Name</label>
            <input type="text"  onChange={handleChange} id='name'/>

            <label htmlFor="">About</label>
            <input type="text"  onChange={handleChange}  id='about'/>

            <label htmlFor="">property_type</label>
            <input type="text"  onChange={handleChange}  id='property_type'/>

            <label htmlFor="">price</label>
            <input type="text"  onChange={handleChange}  id='price'/>

            <label htmlFor="">location</label>
            <input type="text"  onChange={handleChange}  id='location'/>

            <label htmlFor="">Main-images</label>
            <input type="text"  onChange={handleChange1}  id='main'/>
            <label htmlFor="">Side-images</label>
            <input type="text"   id='gallery' onChange={SideImageValue}/>
            <br />
            <button onClick={addSideImage}>Add</button>

            <label htmlFor="">amenities</label>
            <input type="text"  id='amenities' onChange={AmenteiesValue}/>
            <br />
            <button  onClick={addAmenteies}>Add</button>
            <br />
            <button onClick={handleSubmit} type="submit" >submit</button>
        </form>
    </div>
  )
}
