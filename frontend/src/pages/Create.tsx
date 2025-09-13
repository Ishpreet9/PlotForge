import React, { useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from 'react-icons/rx';


const Create = () => {

  const prevChoices: string[] = [
    "You wake up in a mysterious forest with no memory of how you got there",
    "You follow a narrow path leading deeper into the forest",
    "You explore the clearing nearby and find a strange glowing artifact"
  ]
  const nextChoices: string[] = [
    "You touch the glowing artifact and are instantly transported to a mysterious, otherworldly realm.",
    "You carefully examine the artifact, discovering an ancient inscription that hints at a hidden treasure.",
    "Suddenly, the artifact starts levitating and emits a strange sound, attracting nearby creatures.",
    "Suddenly, the artifact starts levitating and emits a strange sound, attracting nearby creatures.",
    "Suddenly, the artifact starts levitating and emits a strange sound, attracting nearby creatures.",
    "Suddenly, the artifact starts levitating and emits a strange sound, attracting nearby creatures.",
    "Suddenly, the artifact starts levitating and emits a strange sound, attracting nearby creatures.",
    "Deciding it’s too dangerous, you leave the artifact behind and continue exploring the forest cautiously."
  ]

  const [showAddNode, setShowAddNode] = useState(false);

  return (
    <div className='flex justify-center items-center bg-neutral-800 w-screen h-screen px-[3vw]'>
      <div className='w-full h-full flex flex-col justify-start items-center py-[4vw] overflow-scroll custom-scroll'>
        {/* previous choices */}
        {prevChoices.map((item, index) => (
          <>
            <div key={index} className='text-xl border-[0.15vw] border-neutral-400 rounded-[0.45vw] px-[2vw] py-[0.5vw] text-white bg-neutral-700'>{item}</div>
            <div className='relative h-[2.5vw] w-[5vw] border-r-[0.2vw] border-neutral-300 -translate-x-[50%] flex-shrink-0'>
              <MdKeyboardArrowRight className='absolute text-[1.7vw] text-neutral-300 rotate-[90deg] right-0 translate-x-[56%] bottom-0 translate-y-[36%]' />
            </div>
          </>
        ))}
        {/* choices div */}
        <div className='relative flex flex-wrap text-xl justify-center items-center border-[0.2vw] border-dashed border-neutral-500 px-[3vw] py-[1vw] gap-[2vw]'>
          {nextChoices.map((item, index) => (
            <div key={index} className='px-[1vw] py-[0.5vw] bg-neutral-700 text-white border-[0.15vw] border-neutral-400 max-w-[20vw] gradient-border hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-violet-600/10 cursor-pointer'>{item}</div>
          ))}
          <div className={`absolute -bottom-[1.4vw] w-full left-0 flex justify-start items-center translate-y-[100%]`}>
            <button onClick={() => setShowAddNode(!showAddNode)} className={`bg-neutral-700/30 border-2 border-neutral-500 px-[1vw] py-[0.5vw] text-lg font-semibold text-white ${showAddNode ? 'hidden' : 'block'} cursor-pointer transition-all duration-300`}>Add Next Node +</button>
            <div className={`${showAddNode ? 'opacity-100 w-full' : 'opacity-0'} flex justify-center items-center border-[0.15vw] border-neutral-400 focus-within:border-white rounded-[0.5vw] bg-neutral-700/40 transition-all duration-500`}>
              <span onClick={()=>setShowAddNode(false)} className='border-[0.15vw] border-neutral-500 hover:border-violet-400 rounded-[0.3vw] ml-[0.5vw] cursor-pointer transition-all duration-300'>
                <RxCross2 className='text-[2vw] hover:text-violet-400 text-neutral-500 transition-all duration-300'/>
              </span>
              <input type="text" className='text-lg h-full w-[94%] px-[2vw] py-[0.7vw] text-white placeholder:text-neutral-300 outline-none' placeholder='Enter what happens next, to continue your storyline...' />
              <span className='h-full flex-1 py-[0.5vw] flex justify-center items-center text-neutral-200 hover:text-blue-400 cursor-pointer transition-all duration-300'>
                <IoSend className='text-2xl' />
              </span>
            </div>
          </div>
        </div>
        {/* custom choice */}
      </div>
    </div>
  )
}

export default Create
