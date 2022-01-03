import Layout from "../../components/layout";
import Head from "next/head";
import {
    getAllProjectIds,
    getProjectData,
    getAssets,
} from "../../lib/projectsLib";

import projectsPageStyles from "../../styles/ID.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Autoplay,
    Mousewheel,
    Navigation,
    Pagination,
} from "swiper";
SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay]);

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
    const projectPictures = await getAssets(projectData.Files);

    return {
        props: {
            projectData,
            projectPictures,
        },
    };
}

export default function work({ projectData, projectPictures }) {
    let data = () => {
        return projectPictures.map((el) => {
            return (
                <div className={projectsPageStyles.projectImageWrapper}>
                    <img
                        key={`${projectData.Name}_${el.index}_pic`}
                        src={el.pic}
                        className={projectsPageStyles.image}
                    ></img>
                    {/* <div>{el.index}</div> */}
                </div>
            );
        });
    };

    return (
        <Layout>
            <Head>
                <title>{projectData.Name}</title>
            </Head>
            {/* <div className={projectsPageStyles.projectImagesWrapper}>
                {data()}
            </div> */}

            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination
                className="swiper-wrapper2"
            >
                {projectPictures.map((el, index) => {
                    return (
                        <SwiperSlide key={`${el.id}_${index}_slide2`}
                        className="swiper-slide2"
                        >
                            {/* <Link href={`/projects/${el.id}`}> */}
                            {/* <a> */}
                            <div
                                key={`${projectData.Name}_${el.index}_pic2`}
                                // src={el.pic}
                                className={projectsPageStyles.swiperImage}
                            >
                                {el.pic}
                            </div>
                            {/* </a> */}
                            {/* </Link> */}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Layout>
    );
}
