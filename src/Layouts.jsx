import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/code">Code</Link></li>
          <li><Link to="/mcq">MCQ</Link></li>
          <li><Link to="/permissions">Permissions</Link></li>
          <li><Link to="/instructions">Instructions</Link></li>
        </ul>
      </nav>


      <VideoPlayer />

      <Outlet />
    </div>
  );
};

export default Layout;
