import React, { useState, useRef } from 'react';

function DriveTrial() {
  const audioPlayer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    setDuration(audioPlayer.current.duration);
  };

  const handleEnd = () => {
    console.log('Audio has ended');
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const getProgressWidth = () => {

    if(currentTime === duration) {
        console.log("handle song end")
    }
    return `${(currentTime / duration) * 100}%`;
   
  };

  return (
    <div>
      <audio
        ref={audioPlayer}
        src="https://drive.google.com/uc?id=1tlUns7VaIAFUunRxrdHmdRjeH1ghQKzl&export=download"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnd}
      />
      <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div style={{ width: '100%', height: '10px', backgroundColor: 'white' }}>
        <div
          style={{
            width: getProgressWidth(),
            height: '100%',
            backgroundColor: 'black',
          }}
        />
      </div>
    </div>
  );
}
export default DriveTrial