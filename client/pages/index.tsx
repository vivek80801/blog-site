import Head from "next/head";
import Navbar from "../components/Navbar";

const Home: React.FC = (): JSX.Element => {
	return (
		<>
			<Head>
				<title>My blog website</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<h1>My Blogs</h1>
		</>
	);
};

export default Home;
