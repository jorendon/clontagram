import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors
} from './Helpers/auth-helpers';
import Nav from './Componentes/Nav';
import Loading from './Componentes/Loading';
import Error from './Componentes/Error';

import Signup from './Vistas/Signup';
import Login from './Vistas/Login';
import Upload from './Vistas/Upload';
import Feed from './Vistas/Feed';
import Main from './Componentes/Main';

initAxiosInterceptors();

export default function App() {
  const [usuario, setUsuario] = useState(null); // no sabemos si hay un usuario autenticado
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }

      try {
        const { data: usuario } = await Axios.get('/api/usuarios/whoami');
        setUsuario(usuario);
        setCargandoUsuario(false);
      } catch (error) {
        console.log(error);
      }
    }

    cargarUsuario();
  }, []);

  async function login(email, password) {
    const { data } = await Axios.post('/api/usuarios/login', {
      email,
      password
    });
    setUsuario(data.usuario);
    setToken(data.token);
  }

  async function signup(usuario) {
    const { data } = await Axios.post('/api/usuarios/signup', usuario);
    setUsuario(data.usuario);
    setToken(data.token);
  }

  function logout() {
    setUsuario(null);
    deleteToken();
  }

  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function esconderError() {
    setError(null);
  }

  if (cargandoUsuario) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  return (
    <Router>
      <Nav usuario={usuario} />
      <Error mensaje={error} esconderError={esconderError} />
      {usuario ? (
        <LoginRoutes mostrarError={mostrarError} usuario={usuario} />
      ) : (
        <LogoutRoutes
          login={login}
          signup={signup}
          mostrarError={mostrarError}
        />
      )}
    </Router>
  );
}

function LoginRoutes({ mostrarError, usuario }) {
  return (
    <Switch>
      <Route
        path="/upload"
        render={props => <Upload {...props} mostrarError={mostrarError} />}
      />

      <Route
        path="/"
        render={props => (
          <Feed {...props} mostrarError={mostrarError} usuario={usuario} />
        )}
        default
      />
    </Switch>
  );
}

function LogoutRoutes({ login, signup, mostrarError }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={props => (
          <Login {...props} login={login} mostrarError={mostrarError} />
        )}
      />
      <Route
        render={props => (
          <Signup {...props} signup={signup} mostrarError={mostrarError} />
        )}
        default
      />
    </Switch>
  );
}
