import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ToastHeader } from 'reactstrap';

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  const getJokes = async () => {
    const jokes = await axios.get('http://localhost:3300/api/jokes', {
      headers: { Authorization: localStorage.getItem('djtoken') },
    });

    console.log(jokes);
    setJokes(jokes.data);
  };

  useEffect(() => {
    getJokes();
  }, []);

  return (
    <div>
      <h2>Available Jokes</h2>
      <Container fluid>
        {jokes.map(jokes => (
          <ToastHeader key={jokes.id} icon="primary">
            {jokes.joke}
          </ToastHeader>
        ))}
      </Container>
    </div>
  );
};

export default Jokes;
