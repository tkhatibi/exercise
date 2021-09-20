import type { NextPage } from 'next';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { NavBarItem } from './NavBarItem';

export const Layout: NextPage = ({ children }) => (
  <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
    <NavBar brand="Exercise">
      <NavBarItem active={false} href="/login" title="Login" />
      <NavBarItem active={false} href="/register" title="Register" />
      <NavBarItem active={false} href="/users" title="Users" />
      <NavBarItem active={false} href="/settings" title="Settings" />
      <NavBarItem active={false} href="/logout" title="Logout" />
    </NavBar>

    {children}

    <Footer />
  </div>
);
