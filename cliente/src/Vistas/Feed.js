import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';

async function cargarPosts(fechaDelUltimoPost) {
  const query = fechaDelUltimoPost ? `?fecha=${fechaDelUltimoPost}` : '';
  const { data: nuevosPosts } = await Axios.get(`/api/posts/feed${query}`);

  return nuevosPosts;
}

export default function Feed({ mostrarError }) {
  const [posts, setPosts] = useState([]);
  const [cargandoPostIniciales, setCargandoPostIniciales] = useState(true);

  useEffect(() => {
    async function cargarPostsIniciales() {
      try {
        const nuevosPosts = await cargarPosts();
        setPosts(nuevosPosts);
        console.log(nuevosPosts);
        setCargandoPostIniciales(false);
      } catch (error) {
        mostrarError('Hubo un problema cargando tu feed.');
        console.log(error);
      }
    }

    cargarPostsIniciales();
  }, []);

  return (
    <Main center>
      <div>{JSON.stringify(posts)}</div>
    </Main>
  );
}
