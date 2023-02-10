import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo} from './assets';
import { Home, CreatePost } from './page';

//

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-[#1F2937] sm:px-8 px-4 py-4 border-b border-b-[#6B7280]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36 object-contain" />
      </Link>

      <Link to="/create-post" className="font-inter font-medium bg-green-700 text-white px-4 py-2 rounded-md">Crear</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#101827] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
