import './Slider_main.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import {Link} from "react-router-dom";
import useFirebaseData from "../../hooks/useFirebaseData.js";


function Slider_main() {
    const slider = useFirebaseData('main-slider')
    const pagination = {
        clickable: true,
    };
    const handleItem = (id) => {

    }
    return (
        <div className={"main-slider"}>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
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

export default Slider_main;