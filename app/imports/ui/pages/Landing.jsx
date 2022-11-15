import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Landing = () => (

  <Carousel variant="dark">
    <Carousel.Item>
      <img
        id="img"
        className="d-block w-100"
        src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
        alt="First slide"
      />

      <Carousel.Caption>
        <Button className="justify-content-center" href="http://localhost:3000/signup">Sign Up Today</Button>
        <p>The goal of this site is to help improve the nutritional content and variety of foods eaten by students and help them limit the use of vending machines or fast food products by providing tasty, realistic alternatives.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        id="img"
        className="d-block w-100"
        src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Second slide"
      />

      <Carousel.Caption>
        <Button className="justify-content-center" href="http://localhost:3000/signup">Sign Up Today</Button>
        <p>The goal of this site is to help improve the nutritional content and variety of foods eaten by students and help them limit the use of vending machines or fast food products by providing tasty, realistic alternatives.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        id="img"
        className="d-block w-100"
        src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Third slide"
      />

      <Carousel.Caption>
        <Button className="justify-content-center" href="http://localhost:3000/signup">Sign Up Today</Button>
        <p>
          The goal of this site is to help improve the nutritional content and variety of foods eaten by students and help them limit the use of vending machines or fast food products by providing tasty, realistic alternatives.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Landing;
