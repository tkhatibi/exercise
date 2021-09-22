import Link from 'next/link';

export interface NavBarProps {
  brand: string;
}

export const NavBar: React.FunctionComponent<NavBarProps> = ({ brand, children }) => (
  <nav className="bg-gray-600 bg-opacity-30 p-2 mt-0 fixed w-full z-10 top-0">
    <div className="container mx-auto flex flex-wrap items-center">
      <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
        <Link href="/">
          <a className="text-white no-underline hover:text-white hover:no-underline">
            <span className="text-2xl pl-2">
              <i className="em em-grinning"></i> {brand}
            </span>
          </a>
        </Link>
      </div>
      <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
          {children}
        </ul>
      </div>
    </div>
  </nav>
);
