import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RootLayout from './components/RootLayout/RootLayout';
import MainSidebarBottom from './components/MainSidebarBottom/MainSidebarBottom';
import RootHeader from './components/RootHeader/RootHeader';
import { SIDEBAR_MENUS } from './constants/menu';

function App() {
  return (
    <RootLayout>
      <RootHeader />
      <Routes>
        {
          SIDEBAR_MENUS.map(
            menu => 
            <Route key={menu.id} path={menu.path} element={menu.element}/>
          )
        }
      </Routes>
      <MainSidebarBottom />
    </RootLayout>
  );
}

export default App;
