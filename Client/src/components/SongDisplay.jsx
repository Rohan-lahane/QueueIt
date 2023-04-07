import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import YouTube from 'react-youtube';

const SongDisplay = ({
  index,
  title,
  link,
  platform,
  spotifyToken,
  count,
  setCount,
  spotifyPlayer,
  deviceId
}) => {


  // console.log("spotifyPlayer", spotifyPlayer)
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [soundcloudPlaying, setSoundcloudPlaying] = useState(false)
  const soundcloudPlayerRef = useRef(null);

  const onReady = (event) => {
    setYoutubePlayer(event.target);
   
  };

  const ytonEnd = () => {
    if(youtubePlayer){
    console.log('Video ended');
    youtubePlayer.stopVideo();
    setCount(1)
    }
  };

  const schandleEnded = () => {
    console.log('Song ended');
    setPlaying(false);
    soundcloudPlayerRef.current?.getInternalPlayer()?.pause();
    setCount(1)
  };

  const handlePlay = () => {
    if (platform === "spotify") {

     
// spotifyPlayer.pause().then(()=>{
//       console.log("paused for drama ")
   
  
//     })

    axios({
      method: 'PUT',
      url: 'https://api.spotify.com/v1/me/player/play',
      headers: {
        'Authorization': `Bearer ${spotifyToken}`
      },
      data: {
        uris: ["spotify:track:6e6HDpdRGv2QJCrUn3pXFP"]
      }
    })
      .then(response => {
        console.log('Song played successfully');
         spotifyPlayer.resume().then(() => {
        console.log("Resumed!");
      });
      })
      .catch(error => {
        console.error(error ," uri passed: ", "spotify:track:6e6HDpdRGv2QJCrUn3pXFP", "\n acess token ", spotifyToken);
      });


      

    }

    
 
    if (platform === "youtube") {
      if(youtubePlayer){
      youtubePlayer.playVideo();
      }
    }
    if (platform === "soundcloud") {
      setSoundcloudPlaying(true);
      soundcloudPlayerRef.current?.seekTo(0);
      soundcloudPlayerRef.current?.getInternalPlayer()?.play();
    }
  };

  const handlePause = () => {

    if (platform === "spotify") {
      spotifyPlayer.pause()
    }
    if (platform === "youtube") {
      if(youtubePlayer){
      youtubePlayer.pauseVideo() ;
      }

      console.log("pausing yt")
    }
    if(platform ==="soundcloud")
    {
      setSoundcloudPlaying(false);
      soundcloudPlayerRef.current?.getInternalPlayer()?.pause();
    }
  

  };

  const handleSpotifyEnd=()=>{
    spotifyPlayer.pause()
    setCount(1)
  }
  useEffect(() => {
    if (spotifyToken) {

      if (index === count) {

        handlePlay()
       
      }

      if (count === -1) {
        handlePause();
      }

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
  
        if (state.position === state.duration) {
          console.log("Track ended.");
          handleSpotifyEnd();
         
        }
      });
      
    }
  }, [count]);

  if (spotifyToken) {


    if(platform==="spotify"){
    return (
      <>
        <div>{title}: Spotify song </div>
        {/* <button onClick={()=>handlePlay()}>Play</button> */}
        <br/>
      </>
    );
  }

  if(platform==="youtube")
  {
    return(
      <YouTube videoId="stmAV96l_E0" onReady={onReady} onEnd={ytonEnd} />
    )
  }

  if(platform==="soundcloud")
  {
    return(
      <div>
      <ReactPlayer
        ref={soundcloudPlayerRef}
        url='https://soundcloud.com/tvdinnertvdinner/honey?si=f0693bd8702a48609624baf8d9bf253f&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
        playing={soundcloudPlaying}
        onEnded={schandleEnded}
      />
      {!soundcloudPlaying ? <button onClick={handlePlay}>Play</button> : <button onClick={handlePause}>Pause</button>}
    </div>
    )
  }

  } 
  
  
  else {
    if (platform === "spotify") {
      const spotifylink = link.substr(25);
      return (
        <div>
          <iframe
            src={`https://open.spotify.com/embed/${spotifylink}?utm_source=generator&theme=0`}
            width="90%"
            height="80"
            frameborder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      );
    }

    if (platform === "youtube") {
      const ytlink = link.substr(17);

      return (
        <div>
          <iframe
            width="90%"
            height="120"
            src={`https://www.youtube.com/embed/${ytlink}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      );
    }

    if (platform === "soundcloud") {
      return (
        <div>
          <ReactPlayer height={120} width="90%" url={link} />
        </div>
      );
    }

    if (platform === "apple") {
      //https://music.apple.com/us/album/emmylou/487053599?i=487053601
      // <iframe allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" frameborder="0" height="175" style="width:100%;max-width:660px;overflow:hidden;border-radius:10px;" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/emmylou/487053599?i=487053601"></iframe>
      const applelink = link.substr(8);

      return (
        <div>
          {index}
          <iframe
            id="embedPlayer"
            src={`https://embed.${applelink}&amp;app=music&amp;itsct=music_box_player&amp;itscg=30200&amp;ls=1&amp;theme=dark" height="150px" width="500px" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation" allow="autoplay *; encrypted-media *; clipboard-write`}
          ></iframe>
        </div>
      );
    }

    if (platform === "drive") {
      return <div>{index}embed drive</div>;
    }

    return <>sorry,platform: {platform} is not a supported platform</>;
  }
};

export default SongDisplay;
