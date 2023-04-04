import {useState, useEffect} from 'react'
import YouTube from 'react-youtube';

const YoutubeTrial = () => {
  const [player, setPlayer] = useState(null);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onPlay = () => {
    player.playVideo();
  };

  const onPause = () => {
    player.pauseVideo();
  };

  const onStop = () => {
    player.stopVideo();
  };

  const onEnd = () => {
    console.log('Video ended');
  };

  return (
    <div>
      <YouTube videoId="stmAV96l_E0" onReady={onReady} onEnd={onEnd} />
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onStop}>Stop</button>
    </div>
  );

}

export default YoutubeTrial