import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Blog } from "../index";
import blogs from "../../styles/blogs.module.scss";

const getPost = async (id: string) => {
	const res = await fetch(`http://localhost:5000/myblog/${id}`);
	const data: Blog = await res.json();
	return data;
};

export const getStaticProps = async ({ params }) => {
	const blog = await getPost(params.blogs);
	return {
		props: { blog },
		revalidate: 1000 * 60 * 24,
	};
};

export const getStaticPaths = () => {
	return {
		paths: [],
		fallback: true,
	};
};

const Blogs: React.FC<{ blog: Blog }> = (props): JSX.Element => {
	const router = useRouter();
	const { title, des, img } =
		props.blog !== null && props.blog !== undefined
			? props.blog
			: { title: "", des: "", img: "" };
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Link href="/">Go Back</Link>
			{router.isFallback ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<>
					<div className={blogs.blogs}>
						<h1>{title}</h1>
						<img src={`http://localhost:5000/upload/${img}`} alt={title} />
						<p>{des}</p>
					</div>
				</>
			)}
		</>
	);
};

export default Blogs;
