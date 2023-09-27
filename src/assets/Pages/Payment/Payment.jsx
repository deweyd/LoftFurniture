import './Delivery.scss'
import Card from "../../components/Card/index.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";



function Payment() {
    const payment = useFirebaseData('payment');
    return (
        <div className={"content payment"}>
            {payment.map((item, index) => (
                <div key={index}>
                    <div className="payment__title">{item.title}</div>
                    <div className="payment__main">
                        <div className="payment__img">
                            <img src={item.img} alt=""/>
                        </div>
                        <div className="payment__info">
                            <div className="payment__info-title">
                                {item.titleMain}
                            </div>
                            <p>{item.text}</p>
                            <p>{item.text1}</p>
                            <p>{item.text2}</p>
                            <p>{item.text3}</p>
                            <p>{item.text4}</p>
                        </div>
                        <div className="payment__info">
                            <div className="payment__info-title">
                                {item.titleElse}
                            </div>
                            {item.textElse}
                        </div>
                        <div className="payment__important">
                            {item.subtitle}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Payment;