import React from 'react';
import Header from './components/Header';
import Post from './components/Post';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import './App.css';
import ParticleAnimation from 'react-particle-animation'
import IndexPages from './pages/IndexPages';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContext, UserContextProvider } from './UserContext';
// import { Router } from 'express';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import Userpage from './pages/Userpage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPages />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'/edit/:id'} element={<EditPost />} />
          <Route path={'/user/:id'} element={<Userpage />} />
          
         
        </Route>

      </Routes>
    </UserContextProvider>


  );
}

export default App;
