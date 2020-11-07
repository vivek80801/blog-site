import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import loader from "../styles/loader.module.scss";
import blogs from "../styles/blogs.module.scss";

interface Blog {
	_id: string;
	title: string;
	img: string;
	des: string;
}

const Home: React.FC = (): JSX.Element => {
	const [blog, setBlog] = useState<Blog[]>([]);
	useEffect(() => {
		setTimeout(() => {
			fetch("http://localhost:5000/myblog")
				.then((res) => res.json())
				.then((data) => setBlog(data))
				.catch((err) => console.log(err));
		}, 5000);
	});
	return (
		<>
			<Head>
				<title>My blog website</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<h1 style={{ textAlign: "center" }}>My Blogs</h1>
			{blog.length > 0 ? (
				blog.map((b) => (
					<div key={b._id} className={blogs.blogs}>
						<h2>{b.title}</h2>
						<img src={`http://localhost:5000/upload/${b.img}`} alt="" />
						<p>{b.des}</p>
					</div>
				))
			) : (
				<div className={blogs.blogs}>
					<div className={loader.loader}></div>
				</div>
			)}
		</>
	);
};

export default Home;
