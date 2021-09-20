import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Alert, Button, Layout } from '../components';
import { useLogin } from '../hooks';

const Login: NextPage = () => {
  const { alert, register, submit, submitting } = useLogin();
  return (
    <>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Responsible for sending users' credentials"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <header className="max-w-lg mx-auto">
          <a href="#">
            <h1 className="text-4xl font-bold text-white text-center">Login</h1>
          </a>
        </header>

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Registered already?</h3>
            <p className="text-gray-600 pt-2">Sign in to your account.</p>
          </section>

          <section className="mt-6">
            <form className="flex flex-col" onSubmit={submit}>
              {alert && (
                <div className="mb-6">
                  <Alert value={alert} />
                </div>
              )}
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  {...register('username')}
                />
              </div>
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  {...register('password')}
                />
              </div>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                type="submit"
                disabled={submitting}
              >
                Login
              </Button>
            </form>
          </section>
        </main>

        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <p className="text-white">
            {"Don't have an account? "}
            <Link href="/register">
              <a className="font-bold hover:underline">Register</a>
            </Link>
            .
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Login;
