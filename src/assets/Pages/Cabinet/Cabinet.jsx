import './Cabinet.scss'
import Card from "../../components/Card/index.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";

import firebase from 'firebase/compat/app';
import { useParams } from 'react-router-dom';
import * as fs from "fs";


function Cabinet() {
    const basket = useFirebaseData('basket');
    const { userId } = useParams();
    const usersId = useFirebaseData('usersId');

    const [tel, setTel] = useState('');
    const [mail, setMail] = useState('');
    const [blocks, setBlocks] = useState([]);
    const collectionName1 = 'authorization';
    const authorization = useFirebaseData(collectionName1);

const [lastId, setLastId] = useState(null);
    useEffect(() => {
        setLastId(userId);
    }, []);


    const [lasId, setLasId] = useState('');
    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id; // Возвращаем значение поля 'id' из объекта
        });
        const resultString = mappedArray.join(', ')
        console.log(resultString)
        setLasId(resultString);
    }, [usersId]);
    console.log(lasId)


    useEffect(() => {
        // При изменении объекта authorization, обновляем lastId
        if (authorization.length > 0) {
            const currentId = authorization[authorization.length - 1].id;
            setLastId(parseInt(currentId) + 1);
        } else {
            setLastId(0);
        }
    }, [authorization]);

    console.log(lastId)
    const [autho, setAutho] = useState(authorization);
    const authoArray = Object.values(autho || {});
    console.log(authoArray)

    useEffect(() => {
        if (usersId) {
            const newFount = authorization.filter((item) => item.id === lasId);
            if (newFount.length > 0) {
                setAutho(newFount[0].confirmed);
            }
        }
    }, [lasId, authorization]);

    useEffect(() => {
        const mappedArray = usersId.map((item) => {
            return item.id;
        });
        const resultString = mappedArray.join(', ')
        setLasId(resultString);
    }, [usersId]);

    const filteredUserAuthorizations = authorization.filter((user) => {
        return user.id === lasId
    });
    console.log(filteredUserAuthorizations)
    const initialName = authorization.map((item) => item.name);
    const initialId = authorization.map((item) => item.id);
    const initialSoName = authorization.map((item) => item.soname);
    const initialCity = authorization.map((item) => item.city);
    const initialEmail = authorization.map((item) => item.email);
    const initialPassword = authorization.map((item) => item.password);
    const initialPhone = authorization.map((item) => item.phone);
    const [name, setName] = useState(initialName);
    const [soname, setSoname] = useState(initialSoName);
    const [city, setCity] = useState(initialCity);
    const [password, setPassword] = useState(initialPassword);
    const [email, setEmail] = useState(initialEmail);
    const [phone, setPhone] = useState(initialPhone);
    const [id, setId] = useState(initialId);
    const [disabled, setDisabled] = useState(false);
    const [show, setShow] = useState(true);
    useEffect(() => {

    }, [show]);

    const updateCardData = (index, updatedData) => {
        console.log(index)
        console.log(updatedData)
        const database = firebase.database();
        const collectionName = collectionName1; // Замените на имя вашей коллекции
        const id = index; // Предполагаем, что id совпадает с индексом элемента в вашем списке

        database.ref(`${collectionName}/${id}`).update(updatedData)
            .then(() => {
                console.log('Данные успешно обновлены на Firebase');
            })
            .catch((error) => {
                console.error(`Ошибка при обновлении данных на Firebase: ${error}`);
            });
    };
    const [newBlock, setNewBlock] = useState([]);
    useEffect(() => {
        // При изменении lastId, обновляем newBlock
        const updatedNewBlock = [
            {
                "email": "",
                "password": "",
                "id": lastId,
                "city": "",
                "name": "",
                "soname": "",
                "phone": ""
            }
        ];
        setNewBlock(updatedNewBlock);
    }, [lastId]);
    const handleChange = async (index, fieldName, value) => {
        const updatedData = { ...fieldName };
        updatedData[index] = value;
        switch (fieldName) {
            case 'name':
                setName(updatedData);
                break;
            case 'soname':
                setSoname(updatedData);
                break;
            case 'password':
                setPassword(updatedData);
                break;
            case 'phone':
                setPhone(updatedData);
                break;
            case 'city':
                setCity(updatedData);
                break;
            case 'email':
                setEmail(updatedData);
                break;
            default:
                break;
        }
        // updateCardData(index, fieldName, value);
    }
    const handleClick = () => {
        setDisabled(true)
    }
    const handleSave = (index) => {
        setDisabled(false)
        const updatedData = {
            ...(name[index] !== undefined && { name: name[index] }),
            ...(soname[index] !== undefined && { soname: soname[index] }),
            ...(password[index] !== undefined && { password: password[index] }),
            ...(phone[index] !== undefined && { phone: phone[index] }),
            ...(city[index] !== undefined && { city: city[index] }),
            ...(email[index] !== undefined && { email: email[index] }),
        };
        updateCardData(index, updatedData);
    }
    const handleSubmit = (e, item) => {
        e.preventDefault()
        handleSave1(item)
    }
    const handleSave1 = (index) => {
        setDisabled(false)
        setShow(false)
        if (newBlock[0].id){
            setLasId(String(newBlock[0].id))
        }
        const updatedData = {
            ...(name[index] !== undefined && { name: name[index] }),
            ...(soname[index] !== undefined && { soname: soname[index] }),
            ...(password[index] !== undefined && { password: password[index] }),
            ...(phone[index] !== undefined && { phone: phone[index] }),
            ...(city[index] !== undefined && { city: city[index] }),
            ...(email[index] !== undefined && { email: email[index] }),
            ...(filteredUserAuthorizations.length > 0 ? {} : { id: String(newBlock[0].id) })
        };
        updateCardData(index, updatedData);
    }
    console.log(authoArray)
    const [numberBlocks, setNumberBlocks] = useState(2);

    const loadMoreBlocks = () => {
        setNumberBlocks(prevBlocks => prevBlocks + 2);
    };


    return (
        <div className={"content cabinet"}>
            <div className="cabinet__form">
                {
                    filteredUserAuthorizations.length > 0 && show ? (filteredUserAuthorizations.map((item, index) => (
                        <div className="contacts__left-block" key={index}>
                            <div className="contacts__title">Личные данные</div>
                            <div className="contacts__input">
                                <label>Имя</label>
                                <input
                                    type="text"
                                    placeholder={item.name}
                                    value={name[item.id]}
                                    name={`name_${item.id}`}
                                    className={disabled ? 'disabled' : ''}
                                    required
                                    onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                                />
                            </div>
                            <div className="contacts__input">
                                <label>Е-mail</label>
                                <input
                                    type="email"
                                    required
                                    placeholder={item.email}
                                    value={email[item.id]}
                                    name={`email_${item.id}`}
                                    className={disabled ? 'disabled' : ''}
                                    onChange={(e) => handleChange(item.id, 'email', e.target.value)}
                                />
                            </div>
                            <div className="contacts__input">
                                <label>Фамилия</label>
                                <input
                                    type="text"
                                    required
                                    placeholder={item.soname}
                                    value={soname[item.id]}
                                    name={`soname_${item.id}`}
                                    className={disabled ? 'disabled' : ''}
                                    onChange={(e) => handleChange(item.id, 'soname', e.target.value)}
                                />
                            </div>
                            <div className="contacts__input">
                                <label>Телефон</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder={item.phone}
                                    value={phone[item.id]}
                                    name={`phone_${item.id}`}
                                    className={disabled ? 'disabled' : ''}
                                    onChange={(e) => handleChange(item.id, 'phone', e.target.value)}
                                />
                            </div>
                            <div className="contacts__input">
                                <label>Город</label>
                                <input
                                    type="text"
                                    required
                                    placeholder={item.city}
                                    value={city[item.id]}
                                    name={`city_${item.id}`}
                                    className={disabled ? 'disabled' : ''}
                                    onChange={(e) => handleChange(item.id, 'city', e.target.value)}
                                />
                            </div>
                            <div className="contacts__input">
                                <label>Пароль</label>
                                <input
                                    required
                                    type="password"
                                    placeholder={item.password}
                                    value={password[item.id]}
                                    name={`password_${item.id}`}
                                    className={disabled ? 'disabled' : ''}
                                    onChange={(e) => handleChange(item.id, 'password', e.target.value)}
                                />
                            </div>
                            {disabled ? <button onClick={(e) => handleSave(item.id, e)} className="contacts__button">Сохранить</button>:
                            <button onClick={(e) => handleClick(item.id, e)} className="contacts__button">Изменить</button>}
                        </div>
                    ))
                    ) : (newBlock.map((item, index) => (
                        <form key={index} onSubmit={(e) => handleSubmit(e, item.id)}>
                            {show ? <div className="contacts__left-block" >
                                <div className="contacts__title">Личные данные</div>
                                <div className="contacts__input">
                                    <label>Имя</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={item.name}
                                        value={name[item.id]}
                                        name={`name_${item.id}`}
                                        className={'disabled'}
                                        onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="contacts__input">
                                    <label>Е-mail</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder={item.email}
                                        value={email[item.id]}
                                        name={`email_${item.id}`}
                                        className={'disabled'}
                                        onChange={(e) => handleChange(item.id, 'email', e.target.value)}
                                    />
                                </div>
                                <div className="contacts__input">
                                    <label>Фамилия</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={item.soname}
                                        value={soname[item.id]}
                                        name={`soname_${item.id}`}
                                        className={'disabled'}
                                        onChange={(e) => handleChange(item.id, 'soname', e.target.value)}
                                    />
                                </div>
                                <div className="contacts__input">
                                    <label>Телефон</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder={item.phone}
                                        value={phone[item.id]}
                                        name={`phone_${item.id}`}
                                        className={'disabled'}
                                        onChange={(e) => handleChange(item.id, 'phone', e.target.value)}
                                    />
                                </div>
                                <div className="contacts__input">
                                    <label>Город</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={item.city}
                                        value={city[item.id]}
                                        name={`city_${item.id}`}
                                        className={'disabled'}
                                        onChange={(e) => handleChange(item.id, 'city', e.target.value)}
                                    />
                                </div>
                                <div className="contacts__input">
                                    <label>Пароль</label>
                                    <input
                                        type="password"
                                        required
                                        placeholder={item.password}
                                        value={password[item.id]}
                                        name={`password_${item.id}`}
                                        className={'disabled'}
                                        onChange={(e) => handleChange(item.id, 'password', e.target.value)}
                                    />
                                </div>
                                {<button type="submit" className="contacts__button">Зарегистрироваться</button>}
                            </div> : <span className="info-autho">Пожалуйста войдите теперь под своим логином и паролем</span>
                            }
                        </form>
                        ))
                    )
                }

                <div className="contacts__right-block">
                    {authoArray.length !== 0 ? <div className="contacts__title">Мои заказы</div> : null}
                    <div className="cabinet__table">
                        {authoArray.slice(0, numberBlocks).map((item, index) => (
                            <div key={index}>
                                <div className="cabinet__date" key={index}>Дата заказа: {item.orderDate}</div>
                                <div>
                                    <table>
                                        <tr>
                                            <th> </th>
                                            <th>Товар</th>
                                            <th>Група товара</th>
                                            <th>Цена</th>
                                        </tr>
                                        {Object.values(item).map((innerItem, innerIndex) => (
                                            <tbody key={innerIndex}>
                                                {Object.values(innerItem).map((inner, innerIndex) => (
                                                    <tr key={innerIndex}>
                                                        {inner.img ? <td><img src={inner.img} alt=""/></td> : null}
                                                        {inner.title ? <td>{inner.title}</td> : null}
                                                        {inner.text ? <td>{inner.text}</td> : null}
                                                        {inner.price ? <td>{inner.price} грн.</td>: null}
                                                        {/*{innerItem[innerIndex].value ? <td>{innerItem[innerIndex].value} грн.</td>: null}*/}
                                                        {/*{console.log(innerItem.number)}*/}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {numberBlocks < authoArray.length && (
                    <button className="contacts__button" id="loadMore" onClick={loadMoreBlocks}>
                        Загрузить еще
                    </button>
                )}
            </div>
        </div>
    );
}

export default Cabinet;