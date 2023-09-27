import './About.scss'
import Card from "../../components/Card/index.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";



function About() {
    const about = useFirebaseData('about');
    console.log(about)
    return (
        <div className={"content about"}>
            {about.map((item, index) => (
                <div key={index}>
                    <div className="container-wrap">
                        <div className="about__top">
                            <div className="about__info">
                                <div className="about__info-subtitle">{item.about}</div>
                                <div className="about__info-title">{item.title}</div>
                                <div className="about__info-text">
                                    <p>{item.text}</p>
                                </div>
                            </div>
                            <div className="about__img">
                                <img src={item.img} alt=""/>
                            </div>
                        </div>
                        <div className="about__benefit benefit">
                            <div className="benefit__title">{item.benefit.title}</div>
                            {Object.values(item.benefit.items).map((subItem, subIndex) => (
                                <div className='benefit__item' key={subIndex}>
                                    <div className="benefit__item-img">
                                        <img src={subItem.img} alt=""/>
                                    </div>
                                    <div className="benefit__item-text">
                                        <span>{subItem.title}</span>
                                        {subItem.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="about__offers offers">
                        <div className="container-wrap">
                            {Object.values(item.offers.items).map((subItem, subIndex) => (
                                <div className='offers__item' key={subIndex}>
                                    <div className="offers__title">{subItem.title}</div>
                                    <div className="offers__text">
                                        {subItem.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="container-wrap">
                        <div className="about__order order">
                            {Object.values(item.order.items).map((subItem, subIndex) => (
                                <div key={subIndex} className="order__item">
                                    <div className="order__title">{subItem.title}</div>
                                    <div className="order__text">{subItem.text}</div>
                                </div>
                            ))}
                        </div>
                        <div className="about__saving saving">
                            <div className="saving__title">
                                Мы поможем сэкономить время, силы и деньги!
                            </div>
                            {Object.values(item.saving.items).map((subItem, subIndex) => (
                                <div key={subIndex} className="saving__item">
                                    <div className="saving__info">
                                        <img src={subItem.img} alt=""/>
                                        <div className="saving__title-">{subItem.title}</div>
                                        <div className="saving__text">{subItem.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default About;