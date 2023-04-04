import React from "react";
import "../styles/footer.css";
const Footer = () => {
  return (
    <div id="footer" className="footer">
      <h2>A project by Rohan Lahane</h2>

      <p>Queue it is a multi platform song curation platform.</p>
      <p>Love that one cover that is on youtube but not on spotify ?</p>
      <p>
        Want to add that concert clip ou recorded live last week to the queue?
      </p>
      <p>Now you can listen to all of them in one place! </p>
      <p>Just create a playlist! select a platform, and add the song link </p>
      <p>
        Currently supported platforms: youtube, spotify, soudcloud, mp3(google
        drive files)
      </p>
      <p>
        Note: when adding google drive music files, make sure file sharing is
        set to "anyone can view"
      </p>
      <p>
        P.s you can also upload apple music links but Queue It currently only
        supports previews for apple music
      </p>
      <p>
        We're working on getting full song support and many more features very
        soon!
      </p>
      <p>
        Want to support the project / give feedback / work with the developer ?{" "}
      </p>
      <p>Reach out to me here! : </p>
      <p>
        We DO NOT pirate music from any of the websites, or offer free
        alternatives for any of thier subscription services{" "}
      </p>
      <p>Thanks for visiting :) </p>

      <div></div>
    </div>
  );
};

export default Footer;
