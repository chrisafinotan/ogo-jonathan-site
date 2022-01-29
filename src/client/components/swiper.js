import { forwardRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

// import Swiper core and required modules
import SwiperCore, {
    Autoplay,
    Mousewheel,
    Navigation,
    Pagination,
} from "swiper";

import projectsPageStyles from "../styles/Projects.module.css";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay]);

export const CustomSwiper = forwardRef(({ pictures }, ref) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    // console.log(pictures);
    return (
        // <div className="CustomSwiperContainer">
        <Swiper
            spaceBetween={0}
            // direction="vertical"
            slidesPerView={1}
            // navigation={{
            //     prevEl: navigationPrevRef.current,
            //     nextEl: navigationNextRef.current,
            // }}
            // onInit={(swiper) => {
            //     swiper.params.navigation.prevEl = navigationPrevRef.current;
            //     swiper.params.navigation.nextEl = navigationNextRef.current;
            //     swiper.navigation.update();
            // }}
            // loop
            // pagination={{
            //     dynamicBullets: true,
            //     type: "progressbar",
            //     el: ".progress",
            // }}
            mousewheel={true}
            // autoplay={{
            //     delay: 2000,
            //     disableOnInteraction: false,
            // }}
            ref={ref}
            // className="swiperwrapper"
        >
            {pictures.map((el, index) => {
                return (
                    <SwiperSlide key={`${el.id}_${index}_slide`}>
                        <Link href={`/projects/${el.id}`}>
                            {/* <a> */}
                                <img
                                    key={`${el.id}_${index}_pics`}
                                    src={el.pic}
                                    className={projectsPageStyles.image}
                                ></img>
                            {/* </a> */}
                        </Link>
                    </SwiperSlide>
                );
            })}
        </Swiper>

        /* <div className="progress" id="progress"></div> */
        // </div>
    );
});
