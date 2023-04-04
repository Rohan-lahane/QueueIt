import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

function SoundCloudTrial() {
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    playerRef.current?.seekTo(0);
    playerRef.current?.getInternalPlayer()?.play();
  };

  const handlePause = () => {
    setPlaying(false);
    playerRef.current?.getInternalPlayer()?.pause();
  };

  const handleEnded = () => {
    console.log('Song ended');
    setPlaying(false);
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url='https://soundcloud.com/tvdinnertvdinner/honey?si=f0693bd8702a48609624baf8d9bf253f&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
        playing={playing}
        onEnded={handleEnded}
      />
      {!playing ? <button onClick={handlePlay}>Play</button> : <button onClick={handlePause}>Pause</button>}
    </div>
  );
}

export default SoundCloudTrial