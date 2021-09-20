import { useEffect } from 'react';
import { useProfile } from '../hooks';

export const Wrapper: React.FunctionComponent = ({ children }) => {
  const { fetchProfile } = useProfile();
  useEffect(() => {
    fetchProfile();
  }, []);
  return <>{children}</>;
};
