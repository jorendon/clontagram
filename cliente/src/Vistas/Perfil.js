import React, { useState, useEffect } from 'react';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';
import Grid from '../Componentes/Grid';
import RecursoNoExiste from '../Componentes/RecursoNoExiste';
import Axios from 'axios';

export default function Perfil({ mostrarError, usuario, match }) {
  const username = match.params.username;
  const [usuarioDueñoDelPerfil, setUsuarioDueñoDelPerfil] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cargandoPerfil, setCargandoPefil] = useState(true);
  const [perfilNoExiste, setPerfilNoExiste] = useState(false);

  useEffect(() => {
    async function cargarPostsYUsuario() {
      try {
        setCargandoPefil(true);
        const { data: usuario } = await Axios.get(`/api/usuarios/${username}`);
        const { data: posts } = await Axios.get(
          `/api/posts/usuario/${usuario._id}`
        );
        setUsuarioDueñoDelPerfil(usuario);
        setPosts(posts);
        setCargandoPefil(false);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 404 || error.response.status === 400)
        ) {
          setPerfilNoExiste(true);
        } else {
          mostrarError('Hubo un problema cargando este perfil.');
        }
        setCargandoPefil(false);
      }
    }

    cargarPostsYUsuario();
  }, [username]);

  console.log(usuarioDueñoDelPerfil);
  console.log(posts);

  return (
    <Main>
      <h2>Este es el perfil de {username}</h2>
    </Main>
  );
}
