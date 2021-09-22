import Link from 'next/link';
import { useRouter } from 'next/router';

export interface NavBarItemProps {
  title: string;
  handler: string | (() => void);
}

export const NavBarItem: React.FunctionComponent<NavBarItemProps> = ({
  handler,
  title,
}) => {
  const { pathname } = useRouter();
  const styles =
    pathname === handler
      ? "inline-block py-2 px-4 text-white no-underline"
      : "inline-block text-gray-400 no-underline hover:text-gray-100 hover:text-underline py-2 px-4";
  const item =
    typeof handler === 'string' ? (
      <Link href={handler}>
        <a className={styles}>{title}</a>
      </Link>
    ) : (
      <button className={styles} onClick={handler}>
        {title}
      </button>
    );
  return <li className="mr-3">{item}</li>;
};
