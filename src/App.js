import './App.css';
import { useState, useEffect } from 'react';
import Lottie from 'react-lottie'
import animationData from './lotties/stopwatch.json'

function App() {

  const [time, setTime] = useState(0)  
  const [running, setRunning] = useState(false)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  useEffect(()=> {
    let interval;
    if (running) {
      interval = setInterval(()=> {
        setTime((prevTime)=> prevTime+10)
      }, 10)
    } else if (!running) {
      clearInterval(interval)
    }
    return ()=> clearInterval(interval)
  }, [running])

  return (
    <>
    <div className="flex flex-col items-center justify-center mt-20">
    <p className="text-5xl font-bold font-mono text-red-500 mb-5">Stopwatch</p>
    <div><Lottie options={defaultOptions} height={300}/></div>
    <div className="mb-10 mt-5">
      <p className="text-4xl font-bold">
    <span>{("0" + Math.floor((time/60000)%60))}:</span>
    <span>{("0" + Math.floor((time/1000)%60))}:</span>
    <span>{("0"+ ((time/10)%100))}</span>
    </p>
    </div>
    <div className="space-x-6">
      {running ? (
      <button 
      className="bg-red-500 hover:bg-red-700 text-slate-300 font-bold py-2 px-4 rounded-full"
      onClick={()=> { setRunning(false) }}>Stop</button>
    ) : (
    <button 
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
    onClick={()=> { setRunning(true) }}>Start</button>
)}
      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={()=> { setTime(0) }}>Restart</button>
      </div>
      </div>
    </>
  );
}

export default App;
