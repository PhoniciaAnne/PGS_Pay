import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import videoSrc from './hero.mp4';

const Home = () => (
  <section className="home-hero">
    <video
      className="home-video"
      src={videoSrc}
      autoPlay
      muted
      loop
      playsInline
    />

    {}
    <div className="home-overlay" />

    <div className="home-content">
      <h1>Welcome to PGS Pay</h1>
      <p>Your one‑stop platform to pay, manage, and track all your bills securely.</p>
      <Link to="/auth/signup">
        <button className="learn-btn">Learn More</button>
      </Link>
    </div>
  </section>
);

export default Home;
