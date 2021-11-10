import Layout from '../../components/layout'
import { getAllProjectIds, getProjectData } from '../../lib/projectsLib'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

//1st
export async function getStaticPaths() {
    const paths = getAllProjectIds();
    console.log("paths", paths);
    return {
        paths,
        fallback: false
    }
}

//2nd
export async function getStaticProps({ params }) {
    const projectData = await getProjectData(params.id);
    console.log("projectData", projectData);
    return {
        props: {
            projectData
        }
    }
}

export default function work({projectData}) {
    return (
        <Layout>
            <Head>
                <title>{projectData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={projectData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
            </article>
        </Layout>
    )
}
