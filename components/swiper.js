// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel, Autoplay } from "swiper";
// Import Swiper styles
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/effect-fade/effect-fade.min.css";
// import "../styles/CustomSwiper.css";

// import akin from '../images';

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";

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

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Autoplay]);

export default function CustomSwiper() {
    const pictures = ["akin.jpg", "girl1.jpg", "girl2.jpg", "girl3.jpg"];
    const picturesimport = [];
    pictures.forEach((element, i) => {
        picturesimport.push(require(`../public/images/${element}`));
    });
    console.log(picturesimport);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div className="CustomSwiperContainer">
            <Swiper
                // modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel, Autoplay]}
                spaceBetween={50}
                direction="horizontal"
                slidesPerView={2}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.update();
                }}
                loop
                pagination={{
                    dynamicBullets: true,
                    type: "progressbar",
                    el: ".progress",
                }}
                spaceBetween={30}
                centeredSlides={true}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => {
                    console.log(swiper);
                }}
                onSlideChange={() => console.log("slide change")}
                mousewheel={true}
                // autoplay={{
                //     delay: 2000,
                //     disableOnInteraction: false,
                // }}
                className="swiperwrapper"
            >
                {picturesimport.map((i, el) => {
                    return (
                        <SwiperSlide>
                            <img src={`${i.default.src}`} alt={`${pictures[el]}`} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className="progress" id="progress"></div>
        </div>
    );
}
