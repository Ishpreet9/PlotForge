import React from 'react'

const Home = () => {

  type howItWorksType = {
    title: string,
    content: string
  }

  const howItWorksContent: howItWorksType[] = [
    {
      title: "Begin Your Journey",
      content: "Enter your own story idea or choose from one of our exciting prompts to get started"
    },
    {
      title: "Choose Your Path",
      content: "Our AI will present you with multiple paths forward. Select the one that best fits your vision for the story"
    },
    {
      title: "Finalize & Weave",
      content: "Once your choices are complete, our AI will expertly weave them into a coherent and polished final story"
    }
  ]

  return (
    <div className='scroll-container overflow-y-scroll custom-scroll snap-y snap-mandatory h-screen bg-neutral-800'>
      <div className='relative w-full flex flex-col justify-center items-center gap-[3vw] snap-section'>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full flex justify-between items-center border-b-[0.2vw] border-neutral-700 py-[1vw] px-[3vw]">
          {/* Left side */}
          <span className="text-blue-300 text-3xl font-bold">PlotForge</span>

          {/* Right side */}
          <span className="text-white text-xl font-semibold cursor-pointer hover:text-blue-400 hover:underline">
            How to Use ?
          </span>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-[3.4vw] font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent'>Forge Your Own Stories</h1>
          <span className='text-white font-semibold text-[1.7vw]'>"Don't Generate Stories, Build Them"</span>
        </div>
        <button className='relative flex justify-center min-w-[190px] min-h-[55px] items-center rounded-[0.35vw] overflow-hidden border-[0.2vw] border-transparent hover:border-neutral-200 font-semibold text-white transition-all duration-500 group cursor-pointer'>
          <div className='absolute bg-gradient-to-r from-violet-400 to-blue-400 w-full h-full group-hover:opacity-0 transition-opacity duration-500'></div>
          <div className='absolute bg-gradient-to-r from-blue-400 to-violet-400 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          <span className='absolute text-2xl group-hover:scale-110 transition-all duration-500'>
            Build A Story
          </span>
        </button>

      </div>
      <div className='flex justify-center items-center w-full snap-section'>
        <div className='flex flex-col justify-evenly items-center w-full bg-neutral-700 h-[80vh]'>
          <span className='text-2xl font-semibold text-white'>How It Works ?</span>

          <div className='w-full grid grid-cols-3 grid-rows-1'>
            {howItWorksContent.map((item, index) => (
              <div key={index} className='flex flex-col justify-evenly items-center bg-red-400 col-span-1'>
                <span>{index+1}</span>
                <span>{item.title}</span>
                <span>{item.content}</span>
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
