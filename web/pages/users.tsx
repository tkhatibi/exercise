import type { NextPage } from 'next';
import Head from 'next/head';
import { Layout } from '../components/Layout';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="Shows some description about the project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="w-2/3 mx-auto">
          <div className="bg-white shadow-md rounded my-6">
            <table className="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Full Name
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Username
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    Full Name
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    New York
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    <a
                      href="#"
                      className="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark"
                    >
                      View
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
