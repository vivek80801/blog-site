import Navbar from "../components/Navbar";
import "../scss/globals.scss";

function MyApp({ Component, pageProps }) {
	return (<>
		<Navbar />
		<Component {...pageProps} />
	</>
	);
}

export default MyApp;
