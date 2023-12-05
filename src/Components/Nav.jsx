import React from 'react';
import './Nav.css';

export const Nav = ({ state, send }) => {
  const sendCancel = () => {
    send({type: 'CANCEL'})
  }

  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Book a fly ✈</h1>
      {!state.matches('inicial') &&
        <button onClick={sendCancel} className='Nav-cancel button-secondary'>Cancelar</button>
      }
    </nav>
  );
}; 