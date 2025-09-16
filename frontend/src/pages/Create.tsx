import { useContext, useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { RxCross2 } from 'react-icons/rx';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../contexts/AppContext';


const Create = () => {

  const context = useContext(AppContext);
  if (!context) throw new Error("AppContext must be used within AppProvider");
  const { backendUrl, storyEvents, setStoryEvents } = context;
  const location = useLocation();
  const idea = location.state?.idea ?? null; // safe access

  const [prevChoices, setPrevChoices] = useState<string[]>([]);
  const [nextChoices, setNextChoices] = useState<string[]>([]);

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
      const response = await axios.post(backendUrl + '/api/story/next-choices', {storyEvents: updatedStoryEvents}, { withCredentials: true })
      if(response.data.success)
      {
        console.log("generating next choices working");
        const finalArray = response.data.message;
        setNextChoices(finalArray);
      }
      else
      {
        console.log("Unable to generate next choices");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInitialChoices();
    console.log(idea);
  }, [])

  return (
    <div className='flex justify-center items-center bg-neutral-800 w-screen h-screen px-[3vw]'>
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
          <div className={`absolute -bottom-[1.4vw] w-full left-0 flex justify-start items-center translate-y-[100%]`}>
            <button onClick={() => setShowAddNode(!showAddNode)} className={`bg-neutral-700/30 border-2 border-neutral-500 px-[1vw] py-[0.5vw] text-lg font-semibold text-white ${showAddNode ? 'hidden' : 'block'} cursor-pointer transition-all duration-300`}>Add Next Node +</button>
            <div className={`${showAddNode ? 'opacity-100 w-full' : 'opacity-0'} flex justify-center items-center border-[0.15vw] border-neutral-400 focus-within:border-white rounded-[0.5vw] bg-neutral-700/40 transition-all duration-500`}>
              <span onClick={() => setShowAddNode(false)} className='border-[0.15vw] border-neutral-500 hover:border-violet-400 rounded-[0.3vw] ml-[0.5vw] cursor-pointer transition-all duration-300'>
                <RxCross2 className='text-[2vw] hover:text-violet-400 text-neutral-500 transition-all duration-300' />
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
