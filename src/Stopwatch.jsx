import { useState, useEffect, useRef } from "react";


function Stopwatch ()
{
    // let [currTime, setCurr] = useState(Date.now());
    // let startTime = useRef(Date.now());
    // let elapsedTime = useRef(0);
    // let intervalId = useRef(null);

    // useEffect(() => 
    // {
    //     return () => clearInterval(intervalId.current);
    // }
    // , []);

    // function startTimer ()
    // {
    //     console.log(`Start ${intervalId.current} ${currTime} ${startTime.current} ${formatTime()}`);
    //     if (!intervalId.current)
    //     {
    //         startTime.current = Date.now() - elapsedTime.current;
    //         intervalId.current = setInterval(() => setCurr(Date.now()), 100);
    //     }
    // }

    // function stopTimer ()
    // {
    //     console.log(`Stop ${intervalId.current} ${currTime} ${startTime.current} ${formatTime()}`);
    //     clearInterval(intervalId.current);
    //     intervalId.current = null;
    // }

    // function resetTimer ()
    // {
    //     startTime.current = currTime;
    //     console.log(`Reset ${intervalId.current} ${currTime} ${startTime.current} ${formatTime()}`);
    // }

    // function formatTime ()
    // {
    //     elapsedTime.current = currTime - startTime.current;

    //     let hours = Math.floor(elapsedTime.current / (60 * 60 * 1000));
    //     let minutes = Math.floor(elapsedTime.current / (60 * 1000) % 60);
    //     let seconds = Math.floor(elapsedTime.current / (1000) % 60);
    //     let centiSeconds = Math.floor(elapsedTime.current % 1000 / 10);

    //     hours = hours.toString().padStart(2, 0);
    //     minutes = minutes.toString().padStart(2, 0);
    //     seconds = seconds.toString().padStart(2, 0);
    //     centiSeconds = centiSeconds.toString().padStart(2, 0);

    //     return `${hours}:${minutes}:${seconds}:${centiSeconds}`;
    // }


    // let [elapsedTime, setElapsedTime] = useState(0);
    // let startTime = useRef(Date.now());
    // let intervalId = useRef(null);
    // let [lapTimes, setLapTimes] = useState([]);

    // useEffect(() =>
    // {
    //     clearInterval(intervalId.current);
    // }
    // , []);


    // function startTimer ()
    // {
    //     startTime.current = Date.now() - elapsedTime;

    //     if (!intervalId.current)
    //     {
    //         intervalId.current = setInterval(() => setElapsedTime(Date.now() - startTime.current), 50);
    //     }
    // }

    // function stopTimer ()
    // {
    //     clearInterval(intervalId.current);
    //     intervalId.current = null;
    // }

    // function resetTimer ()
    // {
    //     setLapTimes([]);

    //     startTime.current = Date.now();
    //     setElapsedTime(0);
    // }

    // function formatTime ()
    // {
    //     let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    //     let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    //     let seconds = Math.floor(elapsedTime / (1000) % 60);
    //     let centiSeconds = Math.floor(elapsedTime % 1000 / 10);

    //     hours = hours.toString().padStart(2, 0);
    //     minutes = minutes.toString().padStart(2, 0);
    //     seconds = seconds.toString().padStart(2, 0);
    //     centiSeconds = centiSeconds.toString().padStart(2, 0);

    //     return `${hours}:${minutes}:${seconds}:${centiSeconds}`;
    // }

    // function lapTimer ()
    // {
    //     if(intervalId.current)
    //     {
    //         let newLapTime = formatTime();
    //         setLapTimes([...lapTimes, newLapTime]);
    //     }
    // }


    let [isRunning, setIsRunning] = useState(false);
    let [elapsedTime, setElapsedTime] = useState(0);
    let startTime = useRef(0);
    let intervalId = useRef(null);
    let [lapTimes, setLapTimes] = useState([]);


    useEffect(() =>
    {
        if (isRunning)
        {
            startTime.current = Date.now() - elapsedTime;
            intervalId.current = setInterval(() => setElapsedTime(Date.now() - startTime.current), 50);
        }

        return () =>
        {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    }
    , [isRunning]);


    function startTimer ()
    {
        setIsRunning(true);
    }

    function stopTimer ()
    {
        setIsRunning(false);        
    }

    function resetTimer ()
    {
        setLapTimes([]);
        startTime.current = Date.now();
        setElapsedTime(0);
    }

    function formatTime ()
    {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let centiSeconds = Math.floor(elapsedTime % 1000 / 10);

        hours = hours.toString().padStart(2, 0);
        minutes = minutes.toString().padStart(2, 0);
        seconds = seconds.toString().padStart(2, 0);
        centiSeconds = centiSeconds.toString().padStart(2, 0);

        return `${hours}:${minutes}:${seconds}:${centiSeconds}`;
    }

    function lapTimer ()
    {
        if (isRunning)
        {
            let newLapTime = formatTime();
            setLapTimes([...lapTimes, newLapTime]);
        }
    }


    return (
        <>
            <h1 className="pageTitle">StopWatch</h1>

            <div className="watchContainer">

                <h1 className="watchLabel">{formatTime()}</h1>

                <ol className="lapsContainer">
                    {lapTimes.map((lapTime, index) => <li key={index} className="lapTime">{lapTime}</li>)}
                </ol>
                
                <div className="buttonsContainer">
                    <button className="watchButtons" id="startButton" onClick={startTimer}>Start</button>
                    <button className="watchButtons" id="stopButton" onClick={stopTimer}>Stop</button>
                    <button className="watchButtons" id="resetButton" onClick={resetTimer}>Reset</button>
                    <button className="watchButtons" id="lapButton" onClick={lapTimer}>Lap</button>
                </div>

            </div>
        </>
    );
}

export default Stopwatch;