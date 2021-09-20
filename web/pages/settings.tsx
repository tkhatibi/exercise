import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Template } from '../components/Template';

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta
          name="description"
          content="Responsible for setting users' adjustments"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Template>
        <header className="max-w-lg mx-auto">
          <a href="#">
            <h1 className="text-4xl font-bold text-white text-center">
              Settings
            </h1>
          </a>
        </header>

        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">
              {'Want to update your profile? '}
            </h3>
            <p className="text-gray-600 pt-2">
              Except your username everything is editable :)
            </p>
          </section>

          <section className="mt-10">
            <form className="flex flex-col" method="POST" action="#">
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
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
                  id="password"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                />
              </div>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                type="submit"
              >
                Update
              </button>
            </form>
          </section>
        </main>

        <div className="max-w-lg mx-auto text-center mt-12 mb-6">
          <p className="text-white">
            {"It's too boring? "}
            <Link href="/login">
              <a className="font-bold hover:underline">Delete </a>
            </Link>
            your account.
          </p>
        </div>
      </Template>
    </>
  );
};

export default Settings;
