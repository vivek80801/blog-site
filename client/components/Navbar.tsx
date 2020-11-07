import navbar from "../styles/Navbar.module.scss";

const Navbar: React.FC = (): JSX.Element => {
	return (
		<div className={navbar.navbar}>
			<h1 className={navbar.h1}>logo</h1>
			<ul className={navbar.ul}>
				<li className={navbar.li}>home</li>
				<li className={navbar.li}>about</li>
				<li className={navbar.li}>contact</li>
			</ul>
		</div>
	);
};

export default Navbar;
