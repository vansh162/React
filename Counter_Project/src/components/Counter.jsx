import React, { useState } from 'react'
import './Counter.css';

const Counter = () => {
    const [count,setCount] = useState(0)
  return (
    <>
    <div className='main'>
        <h1>{count}</h1>
        <button className='incbtn' onClick={()=>{setCount(count+1)}}>Increment</button>
        <button className='decbtn' disabled={count==0} onClick={()=>{setCount(count-1)}}>Decrement</button>
        <button className='resetbtn' disabled={count==0} onClick={()=>{setCount(0)}}>Reset</button>
    </div>
    </>
  )
}

export default Counter