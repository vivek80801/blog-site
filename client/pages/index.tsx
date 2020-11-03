import { useEffect, useState } from "react";
import Head from 'next/head'
// import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar"

interface Blog {
  title: string,
  img: string,
  des: string
}

const Home: React.FC = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    fetch("/myblogs").then((res) => res.json()).then((data: Blog[]) => setBlogs(data)).catch((err) => console.log(err)).finally(() => console.log("fetch is completed")
    )
  })
  return (
    <>
      <Head>
        <title>My blog website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <h1>My Blogs</h1>
      {blogs.map((blog, idx) =>
        <div key={idx}>
          <h2>{blog.title}</h2>
          <img src={blog.img} alt={blog.title} />
          <p>{blog.des}</p>
        </div>
      )}
    </>
  )
}

export default Home