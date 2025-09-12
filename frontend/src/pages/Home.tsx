import React from 'react'
import { NavLink } from 'react-router-dom';

const Home = () => {

  type howItWorksType = {
    title: string,
    content: string
  }

const howItWorksContent: howItWorksType[] = [
  {
    title: "Begin Your Journey",
    content: "Start by entering your own story idea or selecting from one of our prompts. This step helps you define the theme, setting, and tone, giving your story a strong foundation from the very beginning."
  },
  {
    title: "Choose Your Path",
    content: "Our AI presents several options for the next step in your story. Explore different directions, consider the consequences, and pick the path that best fits your vision, shaping the narrative as you go."
  },
  {
    title: "Finalize & Weave",
    content: "Once all choices are made, our AI weaves them into a cohesive, polished story. Dialogue, plot, and flow are refined to create a final narrative that reflects your creativity and decisions."
  }
];



  return (
    <div className='scroll-container overflow-y-scroll custom-scroll snap-y snap-mandatory h-screen bg-neutral-800'>
      <div className='relative w-full flex flex-col justify-center items-center gap-[3vw] snap-section'>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-between items-center border-b-[0.2vw] border-neutral-700 py-[1vw] px-[3vw]">
          {/* Left side */}
          <span className="text-blue-300 text-3xl font-bold">PlotForge</span>

          {/* Right side */}
          <span className="text-white text-xl font-semibold cursor-pointer hover:text-blue-400 leading-none border-b-[0.13vw] py-[0.1vw] border-transparent hover:border-blue-400 transition-all duration-300">
            How to Use ?
          </span>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-[3.4vw] font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent'>Forge Your Own Stories</h1>
          <span className='text-white font-semibold text-[1.7vw]'>"Don't Generate Stories, Build Them"</span>
        </div>
        <NavLink to={'/create'} className='relative flex justify-center min-w-[230px] min-h-[65px] items-center rounded-[0.35vw] overflow-hidden border-[0.2vw] border-transparent hover:border-neutral-200 font-semibold text-white transition-all duration-500 group cursor-pointer'>
          <div className='absolute bg-gradient-to-r from-violet-400 to-blue-400 w-full h-full group-hover:opacity-0 transition-opacity duration-500'></div>
          <div className='absolute bg-gradient-to-r from-blue-400 to-violet-400 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          <span className='absolute text-2xl group-hover:scale-110 transition-all duration-500'>
            Begin Your Story
          </span>
        </NavLink>

      </div>
      <div className='flex justify-center items-center w-full snap-section'>
        <div className='flex flex-col justify-evenly items-center w-full bg-neutral-700 h-[80vh]'>
          <span className='text-3xl font-semibold text-white'>How It Works ?</span>

          <div className='w-full grid grid-cols-3 gap-[3.5vw] px-[3.5vw] grid-rows-1'>
            {howItWorksContent.map((item, index) => (
              <div key={index} className='flex flex-col justify-evenly items-center bg-neutral-800 py-[2.5vw] px-[3.5vw] gap-[2.2vw] col-span-1 rounded-[1.1vw] border-[0.2vw] border-neutral-900 hover:border-neutral-400 transition-color duration-200'>
                <span className='text-[2.3vw] bg-gradient-to-r from-violet-500 to-blue-500 w-[3.5vw] h-[3.5vw] flex justify-center items-center text-white border-[0.2vw] border-slate-400 rounded-full'>{index+1}</span>
                <span className='text-4xl bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent font-semibold'>{item.title}</span>
                <span className='text-xl text-white'>{item.content}</span>
              </div>
            ))}
            <div className='bg-red-400 col-span-1'></div>
            <div className='bg-red-400 col-span-1'></div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
