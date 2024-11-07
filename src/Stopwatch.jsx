import React, { useState, useEffect, useCallback} from 'react';

const Stopwatch = () => {

    const [start, setStart] = useState(false);
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        let timer;
        if(start)
        {
            timer = setInterval(() => {
                setTime((prevTime) => {
                    const newSeconds = prevTime.seconds + 1;
                    const newMinutes = newSeconds === 60 ? prevTime.minutes + 1 : prevTime.minutes;
    
                    return {
                        minutes: newMinutes,
                        seconds: newSeconds % 60,
                    };
                });
        }, 1000);
        }
        return () => clearInterval(timer);
    }, [start]);

    const reset = useCallback(() => {
        setTime({ minutes: 0, seconds: '00' });
        setStart(false);
    }, []);

    const toggleStart = () => {
        setStart(!start);
    };

    return (
        <div style={{position: 'absolute', left: '10px', display:'flex', flexDirection: 'column',alignItems:'left', textAlign:'left'}}>
            <h1>Stopwatch</h1>
            <p>Time: {time.minutes}:{time.seconds}</p>
            <div>
                {start? <button onClick={toggleStart}>Stop</button> : <button onClick={toggleStart}>Start</button>}
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default Stopwatch;