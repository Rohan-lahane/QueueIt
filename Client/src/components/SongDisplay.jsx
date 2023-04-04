import React from "react";
import ReactPlayer from "react-player";

const SongDisplay = ({ index, title, link, platform }) => {
  const spotifylink = link.substr(25);

  if (platform === "spotify") {
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
};

export default SongDisplay;
