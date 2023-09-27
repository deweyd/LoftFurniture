import './Slider_page.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import React, { useRef, useState } from 'react';
import 'swiper/css/pagination';
import {Link} from "react-router-dom";
import useFirebaseData from "../../hooks/useFirebaseData.js";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


function Slider_page() {
    const slider = useFirebaseData('main-slider')
    const pagination = {
        clickable: true,
    };
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const handleItem = (id) => {

    }
    return (
        <div className={"main-slider"}>
            <Swiper
                loop={true}
                spaceBetween={10}
                className="mySwiper2"
            >
                {slider.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Link className="card__img" to="" onClick={()=> handleItem(item.id)}>
                                <img src={item.img}/>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    );
}

export default Slider_page;