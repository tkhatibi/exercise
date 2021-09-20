import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Wrapper } from '../components';
import { AuthProvider, ProfileProvider } from '../hooks';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ProfileProvider>
    </AuthProvider>
  );
}
export default MyApp
