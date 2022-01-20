import Head from "next/head";
import Layout from "../components/layout";

export async function getStaticProps() {
    const projects = [];
    return {
        props: { projects },
    };
}

export default function Home({ projects }) {
    return (
        <Layout>
            <Head>
                <title>Ogo Jonathan</title>
            </Head>
            MAIN PAGE
        </Layout>
    );
}
