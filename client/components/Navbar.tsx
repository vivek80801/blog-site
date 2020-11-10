import navbar from "../styles/Navbar.module.scss";
import Link from "next/link";

const Navbar: React.FC = (): JSX.Element => {
	return (
		<div className={navbar.navbar}>
			<h1 className={navbar.h1}>logo</h1>
			<ul className={navbar.ul}>
				<li className={navbar.li}>
					<Link href="/"> home</Link>
				</li>
				<li className={navbar.li}>
					<Link href="/about">about</Link>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
