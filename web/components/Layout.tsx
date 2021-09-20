import { useAuth, useLogout, useProfile } from '../hooks';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { NavBarItem } from './NavBarItem';

export const Layout: React.FunctionComponent = ({ children }) => {
  const {
    state: { loggedIn },
  } = useAuth();
  const { logout } = useLogout();
  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <NavBar brand="Exercise">
        {loggedIn || (
          <NavBarItem active={false} handler="/login" title="Login" />
        )}
        {loggedIn || (
          <NavBarItem active={false} handler="/register" title="Register" />
        )}
        {loggedIn && (
          <NavBarItem active={false} handler="/users" title="Users" />
        )}
        {loggedIn && (
          <NavBarItem active={false} handler="/settings" title="Settings" />
        )}
        {loggedIn && (
          <NavBarItem active={false} handler={logout} title="Logout" />
        )}
      </NavBar>

      {children}

      <Footer />
    </div>
  );
};
