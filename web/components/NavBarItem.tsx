import Link from 'next/link';

export interface NavBarItemProps {
  active: boolean;
  title: string;
  href: string;
}

export const NavBarItem: React.FunctionComponent<NavBarItemProps> = ({
  href,
  title,
  active,
}) => {
  const styles = active
    ? 'inline-block py-2 px-4 text-white no-underline'
    : 'inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4';
  return (
    <li className="mr-3">
      <Link href={href}>
        <a className={styles}>{title}</a>
      </Link>
    </li>
  );
};
