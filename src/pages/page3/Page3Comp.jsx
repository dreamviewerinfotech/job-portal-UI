import React from 'react'
import "./page3.css"
import { CiLocationOn } from 'react-icons/ci'

const Page3Comp = ({item}) => {
  return (
<div className='category-block col-lg-3 col-md-3 col-sm-12'>
       <div class="inner-box">
       <img src={item.img} alt="Udemy" />
       <div className="text">{item.companyName}</div>
       <div className='page3_location'>
       <CiLocationOn/>
      <p>{item.location}</p>

   </div>
   </div>
{/* <button>15 Open Position</button> */}

  
</div>

  )
}


export default Page3Comp