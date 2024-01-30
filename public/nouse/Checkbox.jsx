import React from 'react'
import "./style.css"



const Switch = () => {
  return (
    <div><label className="switch">
    <input type="checkbox"/>
    <span className="slider round"></span>
  </label></div>
  )
}


const Checkbox = ({ item}) => {
  return (
    <div className='checkbox'>
    <Switch/>
    <h1>{item}</h1>
  
    </div>
    
  )
}

export default Checkbox