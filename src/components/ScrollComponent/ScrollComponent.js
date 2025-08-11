import React from "react";
import "./ScrollComponent.css"; // You will use this for styling

const ScrollComponent = () => {
  return (
    <>
      <div className="mybody">
        <img
          className="video"
          src="https://www.bengalurutechsummit.com/img/opt04_revised.gif"
          autoPlay
          muted
          loop
        ></img>
        <div className="Rectabgle">
          <h1>Announcing BTS 2025: A New Venue, A Bigger Impact</h1>
          <p>
            With a legacy spanning more than 27 years, the Bengaluru Tech Summit
            enters a bold new chapter in 2025, from November 18 to 20, at a
            brand-new venue: the Bangalore International Exhibition Centre
            (BIEC).
          </p>
          <p>
            BTS2025 welcomes you with the theme Futurise: To Futurise is to
            shape the unknown, scale the unimaginable, and shift the world
            forward. From Quantum leaps to Space tech, Healthtech to AI, let’s
            Futurise the World. Together.
          </p>
        </div>
        <div className="ParentOuter">
          <div className="scrolling-text">
            <h1>Announcing BTS 2025: A New Venue, A Bigger Impact</h1>
            <p>
              With a legacy spanning more than 27 years, the Bengaluru Tech
              Summit enters a bold new chapter in 2025, from November 18 to 20,
              at a brand-new venue: the Bangalore International Exhibition
              Centre (BIEC).
            </p>
            <p>
              BTS2025 welcomes you with the theme Futurise: To Futurise is to
              shape the unknown, scale the unimaginable, and shift the world
              forward. From Quantum leaps to Space tech, Healthtech to AI, let’s
              Futurise the World. Together.
            </p>
          </div>
        </div>
        <div className="Rectabgle">
          <h1>Announcing BTS 2025: A New Venue, A Bigger Impact</h1>
          <p>
            With a legacy spanning more than 27 years, the Bengaluru Tech Summit
            enters a bold new chapter in 2025, from November 18 to 20, at a
            brand-new venue: the Bangalore International Exhibition Centre
            (BIEC).
          </p>
          <p>
            BTS2025 welcomes you with the theme Futurise: To Futurise is to
            shape the unknown, scale the unimaginable, and shift the world
            forward. From Quantum leaps to Space tech, Healthtech to AI, let’s
            Futurise the World. Together.
          </p>
        </div>
      </div>
    </>
  );
};

export default ScrollComponent;
