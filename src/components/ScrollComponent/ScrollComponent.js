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
          <h1>GPT-5 Prompting Guide: Best Practices for General Usage</h1>
          <p>
            GPT-5 represents a significant shift in how language models process
            and respond to prompts. Unlike previous models, GPT-5 is
            particularly sensitive to instruction structure, style, and tone.
            This guide extrapolates from coding-specific behaviors to provide
            comprehensive prompting strategies for all use cases.
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
          <h1>GPT-5 Prompting Guide: Best Practices for General Usage</h1>
          <p>
            GPT-5 represents a significant shift in how language models process
            and respond to prompts. Unlike previous models, GPT-5 is
            particularly sensitive to instruction structure, style, and tone.
            This guide extrapolates from coding-specific behaviors to provide
            comprehensive prompting strategies for all use cases.
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
