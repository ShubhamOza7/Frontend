import React from "react";
import "../pagesCSS/styleCSS.css";

const EmailSignupCard = () => {
  return (
    <div className="email-signup-card">
      <h1>Want First Dibs?</h1>
      <p>
        Join our email list and be the first to know about new limited edition
        products, material innovations, and lots of other fun updates.
      </p>
      <input type="email" placeholder="Enter Your Email Address" />
      <button>SIGN UP</button>
      <p className="opt-out-note">
        Note: You can opt-out at any time. See our{" "}
        <a href="/privacy-policy">Privacy Policy</a> and{" "}
        <a href="/terms">Terms</a>.
      </p>
    </div>
  );
};

export default EmailSignupCard;
