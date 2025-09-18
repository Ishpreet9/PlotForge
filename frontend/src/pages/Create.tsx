import { useContext, useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';
import { BsArrowRepeat } from "react-icons/bs";



const Create = () => {

  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppProvider");
  const { backendUrl, storyEvents, setStoryEvents } = context;
  const location = useLocation();
  const idea = location.state?.idea ?? null; // safe access

  const [nextChoices, setNextChoices] = useState<string[]>([]);

  const [customEvent, setCustomEvent] = useState<string>("");

  const [showCompleteStoryBox, setShowCompleteStoryBox] = useState<boolean>(false);
  const [completeStory, setCompleteStory] = useState<string>("");
  const [storyTitle, setStoryTitle] = useState<string>("");

  const [showAddNode, setShowAddNode] = useState(false);

  const getInitialChoices = async () => {
    try {
      console.log("Initial Idea : " + idea);
      const response = await axios.post(backendUrl + '/api/story/initial-choices', { initialIdea: idea }, { withCredentials: true });
      if (response.data.success) {
        console.log("getInitialChoices working");
        const finalArray = response.data.message;
        setNextChoices(finalArray);
      }
      else {
        console.log("Unable to get initial chioces");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewEvent = async (selectedEvent: string) => {
    // append the new event 
    const updatedStoryEvents = [...storyEvents, selectedEvent];
    setStoryEvents(updatedStoryEvents);
    console.log(storyEvents);
    console.log(updatedStoryEvents);
    // override new choices
    try {
      console.log(storyEvents);
      const response = await axios.post(backendUrl + '/api/story/next-choices', { storyEvents: updatedStoryEvents }, { withCredentials: true })
      if (response.data.success) {
        console.log("generating next choices working");
        const finalArray = response.data.message;
        setNextChoices(finalArray);
      }
      else {
        console.log("Unable to generate next choices");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRegenerate = async () => {
    try {
      console.log("handleRegenerate working");
      let response;
      if (storyEvents.length <= 0) {
        console.log("Calling initial choices");
        response = await axios.post(backendUrl + '/api/story/initial-choices', { initialIdea: idea }, { withCredentials: true });
      }
      else {
        response = await axios.post(backendUrl + '/api/story/next-choices', { storyEvents: storyEvents }, { withCredentials: true });
      }
      if (response.data.success) {
        console.log("Regenerating next choices working");
        const finalArray = response.data.message;
        setNextChoices(finalArray);
      }
      else {
        console.log("Unable to regenerate next choices");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleGenerateStory = async () => {
    console.log("handle generate story working");
    console.log("Story Events before generating full story : " + storyEvents);
    try {
      if (storyEvents.length < 3) {
        console.log("Need to have at least 3 evenst to make a complete story");
        return;
      }
      const response = await axios.post(backendUrl + '/api/story/full-story', { storyEvents: storyEvents }, { withCredentials: true });
      if (response.data.success) {
        setShowCompleteStoryBox(true);
        console.log("Genertea story working");
        setStoryTitle(response.data.message[0]);
        setCompleteStory(response.data.message[1]);
      }
      else {
        console.log("Unable to generate complete story");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getInitialChoices();
    console.log(idea);
  }, [])

  return (
    <div className='relative flex justify-center items-center gap-[3vw] bg-neutral-800 w-screen h-screen px-[3vw]'>
      {/* complete story */}
      <div className={`${showCompleteStoryBox ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute flex justify-center items-center w-full h-full z-20 backdrop-blur-lg`}>
        <div className='relative w-[83vw] h-[83vh] px-[1.5vw] py-[3vw] gap-[2vw] flex flex-col justify-evenly items-center bg-black/50 border-[0.23vw] border-black rounded-[0.65vw]'>
          <button onClick={()=>setShowCompleteStoryBox(false)} className='absolute top-[1vw] right-[0.9vw] sm:p-[0.25vw] p-[0.3rem] border-2 border-transparent hover:border-neutral-400 rounded-lg cursor-pointer transition-all duration-300'>
            <RxCross2 size={32} className='text-white' />
          </button>
          <div className='w-full border-b-[0.2vw] py-[0.7vw] text-[2vw] text-white'>{storyTitle}</div>
          <div className='w-full flex-1 text-white text-2xl overflow-scroll custom-scroll'>{completeStory}</div>
        </div>
      </div>

      <div className='w-full h-full flex flex-col justify-start items-center py-[4vw] overflow-scroll custom-scroll'>
        {/* previous choices */}
        {storyEvents.length > 0 && storyEvents.map((item, index) => (
          <>
            <div key={index} className='text-xl border-[0.15vw] border-neutral-400 rounded-[0.45vw] px-[2vw] py-[0.5vw] text-white bg-neutral-700'>{item}</div>
            <div className='relative h-[2.5vw] w-[5vw] border-r-[0.2vw] border-neutral-300 -translate-x-[50%] flex-shrink-0'>
              <MdKeyboardArrowRight className='absolute text-[1.7vw] text-neutral-300 rotate-[90deg] right-0 translate-x-[56%] bottom-0 translate-y-[36%]' />
            </div>
          </>
        ))}
        {/* choices div */}
        <div className='relative flex flex-wrap w-full text-xl justify-center items-center border-[0.2vw] border-dashed border-neutral-500 px-[3vw] py-[1vw] gap-[2vw]'>
          {nextChoices.map((item, index) => (
            <div onClick={() => handleNewEvent(item)} key={index} className='px-[1vw] py-[0.5vw] bg-neutral-700 text-white border-[0.15vw] border-neutral-400 max-w-[20vw] gradient-border hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-violet-600/10 cursor-pointer'>{item}</div>
          ))}
          <BsArrowRepeat onClick={() => handleRegenerate()} className='absolute bottom-0 right-0 cursor-pointer hover:text-white text-[3vw] text-neutral-400 p-[0.5vw] transition-all duration-500' />
          <div className={`absolute -bottom-[1.4vw] w-full left-0 flex justify-start items-center translate-y-[100%]`}>
            <button onClick={() => setShowAddNode(!showAddNode)} className={`bg-neutral-700/30 border-2 border-neutral-500 px-[1vw] py-[0.5vw] text-lg font-semibold text-white ${showAddNode ? 'hidden' : 'block'} cursor-pointer transition-all duration-300`}>Add Next Node +</button>
            <div className={`${showAddNode ? 'opacity-100 w-full' : 'opacity-0'} flex justify-center items-center border-[0.15vw] border-neutral-400 focus-within:border-white rounded-[0.5vw] bg-neutral-700/40 transition-all duration-500`}>
              <span onClick={() => setShowAddNode(false)} className='border-[0.15vw] border-neutral-500 hover:border-violet-400 rounded-[0.3vw] ml-[0.5vw] cursor-pointer transition-all duration-300'>
                <RxCross2 className='text-[2vw] hover:text-violet-400 text-neutral-500 transition-all duration-300' />
              </span>
              <input onChange={(e) => setCustomEvent(e.target.value)} value={customEvent} type="text" className='text-lg h-full w-[94%] px-[2vw] py-[0.7vw] text-white placeholder:text-neutral-300 outline-none' placeholder='Enter what happens next, to continue your storyline...' />
              <span onClick={() => handleNewEvent(customEvent)} className='h-full flex-1 py-[0.5vw] flex justify-center items-center text-neutral-200 hover:text-blue-400 cursor-pointer transition-all duration-300'>
                <IoSend className='text-2xl' />
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* menu */}
      <div className='w-[20vw] h-full flex justify-center items-center'>
        <div className='w-full bg-neutral-900 h-[90%] px-[1.6vw] flex flex-col justify-evenly items-center text-[1.5vw] text-neutral-400 rounded-[0.5vw]'>
          <span className='text-[1.7vw] font-semibold text-white underline'>Tools</span>
          <button className='w-full py-[0.3vw] bg-neutral-800 border-[0.15vw] rounded-[0.3vw] hover:border-white hover:text-white transition-color duration-500 cursor-pointer'>Home</button>
          <button className='w-full py-[0.3vw] bg-neutral-800 border-[0.15vw] rounded-[0.3vw] hover:border-white hover:text-white transition-color duration-500 cursor-pointer'>History</button>
          <button className='w-full py-[0.3vw] bg-neutral-800 border-[0.15vw] rounded-[0.3vw] hover:border-white hover:text-white transition-color duration-500 cursor-pointer'>Generate Characters</button>
          <button className='w-full py-[0.3vw] bg-neutral-800 border-[0.15vw] rounded-[0.3vw] hover:border-white hover:text-white transition-color duration-500 cursor-pointer'>Scene Planner</button>
          <button className='w-full py-[0.3vw] bg-neutral-800 border-[0.15vw] rounded-[0.3vw] hover:border-white hover:text-white transition-color duration-500 cursor-pointer'>Branch Nodes</button>
          <div className='w-full py-[3vw]'>
            <button onClick={() => handleGenerateStory()} className='w-full py-[0.3vw] bg-gradient-to-r from-violet-400/30 to-blue-400/30 border-[0.15vw] border-violet-400/50 text-white hover:to-violet-400/70 hover:from-blue-400/70 rounded-[0.3vw] hover:border-blue-400 hover:text-white transition-color duration-500 cursor-pointer'>Generate Story</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
