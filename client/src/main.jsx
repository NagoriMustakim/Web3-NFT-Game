import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, CreateBattle, Battle, BattleGround } from './page';
import PageNotFound from './page/PageNotFound';
import { GlobalContextProvider } from './context/index';
import './index.css';
import OnboardModal from './components/OnboardModal';
import JoinBattle from './page/JoinBattle'; 
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <OnboardModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/battleground' element={<BattleGround />} />
        <Route path='/createbattle' element={<CreateBattle />} />
        <Route path='/joinbattle' element={<JoinBattle />} />
        <Route path='/battle/:battleName' element={<Battle />} />  {/* /battle/:battleName means we have dynamic route here it can be any thing */}
        <Route path='*' element={<PageNotFound />} /> {/* Incase invalid url */}
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>,
);

