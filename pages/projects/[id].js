import Layout from "../../components/layout";
import Head from "next/head";
import { getAllProjectIds, getProjectData } from "../../lib/projectsLib";

export async function getStaticPaths() {
    const paths = await getAllProjectIds();
    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const projectID = params.id;
    const projectData = await getProjectData(projectID);
    return {
        props: {
            projectData,
        },
    };
}

export default function work({ projectData }) {
    let data = () => {
        return Object.entries(projectData).map((el) => {
            return (
                <div>
                    <div>{el[0]}</div>
                    <div>{el[1]}</div>
                </div>
            );
        });
    };

    return (
        <Layout>
            <Head>
                <title>{projectData.Name}</title>
            </Head>
            <div>{data()}</div>
        </Layout>
    );
}
