import { getSortedProjectsData } from '../lib/projectsLib'

import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import CustomSwiper from '../components/swiper'
// import styles from '../styles/Home.module.css'
export async function getStaticProps() {
  const allProjectsData = getSortedProjectsData()
  console.log("hi", allProjectsData)
  return {
    props: {
      allProjectsData
    }
  }
}


export default function Home({ allProjectsData }) {
  console.log("projects data", allProjectsData)
  return (
    <Layout>
      <Head>
        <title>Ogo Jonathan</title>
      </Head>
      <section className={`${utilStyles.center} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allProjectsData.map(({ id, date, title, description, cover, size }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/projects/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <medium className={utilStyles.lightText}>
                <Date dateString={date} />
              </medium>
              <div>
                {`Desc:${description}`}
                <br />
                <Image
                  src={cover}
                  height={1080}
                  width={720}
                  alt={cover}
                ></Image>
                <br />
                {`Picture Size:${size}`}
              </div>
            </li>
          ))}
        </ul>
      </section>
      {/* <CustomSwiper></CustomSwiper> */}
    </Layout>

  )
}
