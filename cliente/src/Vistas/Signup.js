import React from 'react';
import Main from '../Componentes/Main';
import imagenSignup from '../imagenes/signup.png';

export default function Signup() {
  const usuario = {
    email: '',
    username: '',
    password: '',
    bio: '',
    nombre: ''
  };

  function handleInputChange(e) {
    usuario[e.target.name] = e.target.value;
    console.log(usuario);
  }

  return (
    <Main center={true}>
      <div className="Signup">
        <img src={imagenSignup} alt="" className="Signup__img" />
        <div className="FormContainer">
          <h1 className="Form__titulo">Clontagram</h1>
          <p className="FormContainer__info">
            Regístrate para que veas el clon de Instagram
          </p>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="Form__field"
              required
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y Apellido"
              className="Form__field"
              required
              minLength="3"
              maxLength="100"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="Form__field"
              required
              minLength="3"
              maxLength="30"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="bio"
              placeholder="Cuéntanos de ti..."
              className="Form__field"
              required
              maxLength="150"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="Form__field"
              required
              onChange={handleInputChange}
            />
            <button className="Form__submit" type="submit">
              Sign up
            </button>
            <p className="FormContainer__info">
              Ya tienes cuenta? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </Main>
  );
}
