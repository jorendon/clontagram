import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Main from '../Componentes/Main';
import Loading from '../Componentes/Loading';
import Post from '../Componentes/Post';

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

  if (cargandoPostIniciales) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }

  if (!cargandoPostIniciales && posts.length === 0) {
    return (
      <Main center>
        <NoSiguesANadie />
      </Main>
    );
  }

  return (
    <Main center>
      <div className="Feed">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </Main>
  );
}

function NoSiguesANadie() {
  return (
    <div className="NoSiguesANadie">
      <p className="NoSiguesANadie__mensaje">
        Tu feed no tiene fotos porque no sigues a nadie, o porque no han
        publicado fotos.
      </p>
      <div className="text-center">
        <Link to="/explore" className="NoSiguesANadie__boton">
          Explora Clontagram
        </Link>
      </div>
    </div>
  );
}
