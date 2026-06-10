import React from 'react';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h2>Welcome to Paradise Nursery</h2>
        <div className="mission-statement">
          <p>
            Our mission is to reconnect people with the healing power of nature
            through the beauty of plants. We believe that every home deserves
            a touch of greenery.
          </p>
        </div>
        <div className="about-us-image">
          <img
            src="https://images.unsplash.com/photo-1530968033775-2c92736b131e?auto=format&fit=crop&w=600&q=80"
            alt="Paradise Nursery"
            style={{ width: '100%', borderRadius: 12, marginBottom: '1rem' }}
          />
        </div>
        <div className="about-us-description">
          <p>
            <strong>Paradise Nursery</strong> is where nature meets your home.
            We believe that plants not only beautify our living spaces but also
            contribute to mental well-being. Our team of passionate botanists
            and plant enthusiasts curates a wide selection of plants — from
            air-purifying wonders to stunning blooms — making it easy for
            everyone to find their perfect plant companion.
          </p>
          <p>
            Our goal is simple: to make plant ownership accessible, enjoyable,
            and sustainable. We provide comprehensive care guides and dedicated
            customer support to ensure your plants thrive. Join our community
            of plant lovers and let's grow together!
          </p>
          <p>
            Whether you are a seasoned gardener or just starting your plant
            journey, Paradise Nursery offers something for everyone. Visit us
            today and bring the beauty of nature into your life.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
