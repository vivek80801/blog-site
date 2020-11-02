import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar"

 const Home:React.FC=():JSX.Element =>{
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <h1>Test</h1>
    </>
  )
}

export default Home