

import { Button } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function Trailer({ location }) {
  const [trailerView, setTrailerView] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const showTrailer = useCallback(() => {
    fetch(`https://api.themoviedb.org/3/movie/${location.state.movie.id}/videos?api_key=2a28409e0945791f45c61a3ecc5b7b93&language=en-US`)
      .then(res => res.json())
      .then(json => {
        if (json.results && json.results.length > 0) {
          const trailer = json.results.find(video => video.site === "YouTube" && video.type === "Trailer");
          if (trailer) {
            setTrailerView(trailer.key);
            setError(null); // Reset any previous error
          } else {
            setError("Trailer not available.");
          }
        } else {
          setError("Trailer not available.");
        }
      })
      .catch(err => {
        setError("Failed to fetch trailer data.");
      });
  }, [location.state.movie.id]);

  useEffect(() => {
    showTrailer();
  }, [showTrailer]);

  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button variant='contained' sx={{ color: "black", bgcolor: "white" }} onClick={openModal}>Play trailer</Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Watch Trailer</h2>
        {trailerView ? (
          <YouTube videoId={trailerView} />
        ) : (
          <p>{error ? error : "Loading..."}</p>
        )}
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default Trailer;
