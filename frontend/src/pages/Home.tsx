import { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';

const Home = () => {

  const navigate = useNavigate();

  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppProvider");
  const { backendUrl } = context;

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

  const [prevIdeas, setPrevIdeas] = useState<string[]>(
    [
      "A world where dreams can be traded as currency",
      "A detective who solves crimes through memories",
      "An AI gaining consciousness and exploring human emotions",
      "A hidden city under the ocean inhabited by humans",
      "A time traveler stuck in a loop trying to prevent a disaster",
      "A musician whose songs can control reality",
      "A society where emotions are illegal",
      "A post-apocalyptic world where plants rule",
      "A young inventor building machines to communicate with animals",
      "A cursed book that changes the reader's life with each page"
    ]
  );

  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);

  const getInitialIdeas = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/story/initial-ideas', {}, { withCredentials: true });
      if (response.data.success) {
        console.log("GetInitialIdeas working");
        const finalArray = response.data.message;
        setPrevIdeas(finalArray);
      }
      else {
        console.log("Error generating initial ideas");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getSimilarIdeas = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/story/similar-ideas', { userIdea: idea }, { withCredentials: true });
      if (response.data.success) {
        console.log("GetSimilarIdeas working");
        console.log(response.data.message);
        const finalArray = response.data.message;
        setGeneratedIdeas(finalArray);
      }
      else {
        console.log("Error generating similar ideas");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleContinueClick = () => {
    if (idea === "") {
      console.log('Idea can not be empty');
    }
    else {
      navigate("/create", { state: { idea: idea } });
    }
  }

  const [idea, setIdea] = useState<string>("");
  const [showInitialIdeaBox, seetShowInitialIdeaBox] = useState<boolean>(false);

  useEffect(() => {
    getInitialIdeas();
  }, [])

  return (
    <div className='scroll-container overflow-y-scroll custom-scroll snap-y snap-mandatory h-screen bg-neutral-800'>
      <div className='relative w-full flex flex-col justify-center items-center gap-[3vw] snap-section'>
        <div className={`${showInitialIdeaBox ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute flex justify-center items-center z-30 w-full h-full inset-0 backdrop-blur-sm transition-opacity duration-300`}>
          <div className='relative flex flex-col justify-start items-start gap-[2.1vw] w-[82vw] h-[82vh] py-[2vw] px-[3.5vw] bg-black/50 rounded-[0.5vw] text-white'>
            <button onClick={() => seetShowInitialIdeaBox(false)} className='absolute top-[1vw] right-[0.9vw] sm:p-[0.25vw] p-[0.3rem] border-2 border-transparent hover:border-neutral-400 rounded-lg cursor-pointer transition-all duration-300'>
              <RxCross2 size={32} className='text-white' />
            </button>
            <span className='text-2xl w-full flex justify-center items-center font-semibold'>Initial Idea</span>
            <textarea onChange={(e) => setIdea(e.target.value)} value={idea} className='w-full text-xl bg-neutral-700/30 placeholder:text-neutral-400 h-[20vh] px-[1.5vw] py-[0.9vw] rounded-[0.5vw] border-[0.13vw] border-neutral-500 outline-none focus:border-neutral-200' placeholder='What is your initial idea for the storyline ?' name="" id=""></textarea>
            <button onClick={() => getSimilarIdeas()} className={`text-lg font-medium px-[1vw] py-[0.4vw] bg-black/70 border-[0.12vw] ${idea ? 'text-white bg-gradient-to-r from-violet-400/30 to-blue-400/30 border-violet-400 hover:border-blue-400 hover:from-blue-400/30 hover:to-violet-400/30 cursor-pointer' : 'border-neutral-600 text-neutral-600 pointer-events-none'} transition-all duration-500 rounded-[0.3vw]`}>
              Generate Similar Ideas
            </button>
            <div className='flex flex-col justify-start items-center gap-[1vw] w-full max-h-[23vh] overflow-scroll custom-scroll py-[0.1vw]'>
              {(generatedIdeas.length > 0 ? generatedIdeas : prevIdeas).map((item, index) => (
                <div onClick={() => setIdea(item)}
                  key={index}
                  className='w-full px-[1vw] py-[0.4vw] text-md rounded-[0.4vw] 
               bg-gradient-to-r from-neutral-700 to-neutral-700 
               hover:from-violet-400/50 hover:to-blue-400/50 
               transition-colors duration-300 cursor-pointer'
                >
                  {item}
                </div>
              ))}
            </div>
            <div className='w-full flex justify-center items-center'>
              <button onClick={() => handleContinueClick()} className='relative flex justify-center min-w-[180px] min-h-[50px] items-center rounded-[0.35vw] overflow-hidden border-[0.2vw] border-transparent hover:border-neutral-200 font-semibold text-white transition-all duration-500 group cursor-pointer'>
                <div className='absolute bg-gradient-to-r from-violet-400 to-blue-400 w-full h-full group-hover:opacity-0 transition-opacity duration-500'></div>
                <div className='absolute bg-gradient-to-r from-blue-400 to-violet-400 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <span className='absolute text-xl group-hover:scale-110 transition-all duration-500'>
                  Continue
                </span>
              </button>
            </div>

          </div>
        </div>
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
        <button onClick={() => seetShowInitialIdeaBox(true)} className='relative flex justify-center min-w-[230px] min-h-[65px] items-center rounded-[0.35vw] overflow-hidden border-[0.2vw] border-transparent hover:border-neutral-200 font-semibold text-white transition-all duration-500 group cursor-pointer'>
          <div className='absolute bg-gradient-to-r from-violet-400 to-blue-400 w-full h-full group-hover:opacity-0 transition-opacity duration-500'></div>
          <div className='absolute bg-gradient-to-r from-blue-400 to-violet-400 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
          <span className='absolute text-2xl group-hover:scale-110 transition-all duration-500'>
            Begin Your Story
          </span>
        </button>

      </div>
      <div className='flex justify-center items-center w-full snap-section'>
        <div className='flex flex-col justify-evenly items-center w-full bg-neutral-700 h-[80vh]'>
          <span className='text-3xl font-semibold text-white'>How It Works ?</span>

          <div className='w-full grid grid-cols-3 gap-[3.5vw] px-[3.5vw] grid-rows-1'>
            {howItWorksContent.map((item, index) => (
              <div key={index} className='flex flex-col justify-evenly items-center bg-neutral-800 py-[2.5vw] px-[3.5vw] gap-[2.2vw] col-span-1 rounded-[1.1vw] border-[0.2vw] border-neutral-900 hover:border-neutral-400 transition-color duration-200'>
                <span className='text-[2.3vw] bg-gradient-to-r from-violet-500 to-blue-500 w-[3.5vw] h-[3.5vw] flex justify-center items-center text-white border-[0.2vw] border-slate-400 rounded-full'>{index + 1}</span>
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
