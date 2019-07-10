import React, { useState } from 'react';
import Axios from 'axios';
import Main from '../Componentes/Main';

export default function Login({ login }) {
  const [emailYPassword, setEmailYPassword] = useState({
    email: '',
    password: ''
  });

  function handleInputChange(e) {
    setEmailYPassword({
      ...emailYPassword,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      login(emailYPassword.email, emailYPassword.password);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Main center>
      <div className="FormContainer">
        <h1 className="Form__titulo">Clontagram</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={emailYPassword.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="Form__field"
              required
              onChange={handleInputChange}
              value={emailYPassword.password}
            />
            <button type="submit" className="Form__submit">
              Login
            </button>
            <p className="FormContainer__info">
              No tienes cuenta? <a href="/signup">Signup</a>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
}
