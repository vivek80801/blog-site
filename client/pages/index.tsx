import Link from "next/link";
import Head from "next/head";
import loader from "../styles/loader.module.scss";
import blog from "../styles/blogs.module.scss";

export interface Blog {
	_id: string;
	title: string;
	img: string;
	des: string;
}

const getBlog = async () => {
	const res = await fetch("http://localhost:5000/myblog");
	const data: Blog[] = await res.json();
	return data;
};
export const myBlog = getBlog();

export const getStaticProps = async () => {
	const blogs = await getBlog();
	return {
		props: { blogs },
		revalidate: 1000 * 60 * 24,
	};
};

const Home: React.FC<{ blogs: Blog[] }> = (props): JSX.Element => {
	const { blogs } = props;
	return (
		<>
			<Head>
				<title>My blog website</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 style={{ textAlign: "center" }}>My Blogs</h1>
			{blogs.length > 0 ? (
				blogs.map((b) => (
					<div key={b._id} className={blog.blogs}>
						<Link href={`/details/${b._id}`}>
							<a>
								<h4>{b.title}</h4>
							</a>
						</Link>
					</div>
				))
			) : (
				<div className={blog.blogs}>
					<div className={loader.loader}></div>
				</div>
			)}
		</>
	);
};

export default Home;
