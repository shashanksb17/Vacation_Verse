import React from 'react'
import {Link} from "react-router-dom"
import "./Home.css"
export default function Home() {
  return (
    <div>
        <Link to="./login">
        <button>HostLogin</button>
        </Link>

    

        <Link to="./signup">
        <button>Signup</button>
        </Link>

    </div>
  )
}