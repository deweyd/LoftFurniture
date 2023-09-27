import './Delivery.scss'
import Card from "../../components/Card/index.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";



function Delivery() {
    const delivery = useFirebaseData('delivery');
    return (
        <div className={"content delivery"}>
            {delivery.map((item, index) => (
                <div key={index}>
                    <div className="delivery__title">{item.title}</div>
                    <div className="delivery__main">
                        <div className="delivery__img">
                            <img src={item.img} alt=""/>
                        </div>
                        <div className="delivery__info">
                            <div className="delivery__subtitle">
                                {item.subtitle}
                            </div>
                            <div className="delivery__text">
                                <div className="delivery__text-title">{item.titleMain}</div>
                                {item.text}
                                <div className="delivery__text-title">{item.titleElse}</div>
                                {item.textElse}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Delivery;