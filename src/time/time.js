import React, {useState} from 'react';
import './time.css';

const Time = () => {
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }

    setInterval(updateTime, 1000);

    return (
        <div className="clock">
            <h5 class="current">{currentTime}</h5>
        </div>
    );
}

export default Time;