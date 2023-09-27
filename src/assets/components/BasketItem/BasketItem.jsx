import {Link} from "react-router-dom";
import './BasketItem.scss'
import useFirebaseData from "../../hooks/useFirebaseData.js";


function BasketItem({item, handleDecrement, counts, handleIncrement, handleDelete}) {
    return (
        <div className="basket__item">
            <div className="basket__main">
                <div className="basket__img">
                    <img src={item.img} alt=""/>
                </div>
                <div className="basket__subtitle">
                    {item.title}
                </div>
                <div className="basket__num">
                    <button onClick={handleDecrement(item.id)}>-</button>
                    Количество: {counts[item.id] || 1 }
                    <button onClick={handleIncrement(item.id)}>+</button>
                </div>
            </div>
            <div className="basket__price">
                Цена: {parseInt(item.price.replace(/\s+/g, '')) * (counts[item.id] || 1)} грн.
            </div>
            <button onClick={handleDelete(item)} className="basket__dell"><span>удалить</span></button>
        </div>
    );
}

export default BasketItem;