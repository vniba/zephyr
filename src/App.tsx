import GlobalStyles from './styles/GlobalStyles.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.tsx';
import Bookings from './pages/Bookings.tsx';
import Cabins from './pages/Cabins.tsx';
import Login from './pages/Login.tsx';
import Settings from './pages/Settings.tsx';
import Users from './pages/Users.tsx';
import PageNotFound from './pages/PageNotFound.tsx';
import Account from './pages/Account.tsx';
import AppLayout from './ui/AppLayout.tsx';
import {
  ACCOUNT,
  BOOKINGS,
  CABINS,
  DASHBOARD,
  LOGIN,
  SETTINGS,
  USERS,
} from './utils/constants.ts';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to={DASHBOARD} />} />
            <Route path={DASHBOARD} element={<Dashboard />} />
            <Route path={BOOKINGS} element={<Bookings />} />
            <Route path={CABINS} element={<Cabins />} />
            <Route path={ACCOUNT} element={<Account />} />
            <Route path={SETTINGS} element={<Settings />} />
            <Route path={USERS} element={<Users />} />
          </Route>
          <Route path={LOGIN} element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
