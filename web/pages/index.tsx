import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import { Template } from '../components/Template';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Exercise</title>
        <meta name="description" content="It's only an exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Template>
        <div className="container mx-auto mt-8 md:mt-0 md:space-x-10 md:grid grid-cols-3 justify-center md:py-40">
          <div className="grid justify-center items-center order-1 col-span-1">
            <Image
              className="lg:h-80 md:h-64 h-40 rounded-full"
              src="https://avatars.githubusercontent.com/u/19687157?v=4"
              alt="Touraj Khatibi"
              width="250rem"
              height="250rem"
            />
          </div>
          <div className="mt-8 md:mt-0 lg:justify-end col-span-2">
            <h1 className="text-4xl text-white text-center md:text-left font-bold mb-6">
              Hi, I am Touraj Khatibi, and this is an exercise.
            </h1>
            <p className="text-xl text-white text-center md:text-left">
              The tools that I used in these project are Docker, Mariadb, PHP,
              Symfony, Api Platform, Bash, React, Next.js and Tailwind. You can
              register to see all the pages in this exercise project.
            </p>
            <br />
            <Link href="/register">
              <a className="mt-8 mx-auto md:mx-0 text-2xl py-3 px-6 text-red-50 font-semibold rounded bg-red-400">
                Register
              </a>
            </Link>
          </div>
        </div>
      </Template>
    </>
  );
};

export default Home
