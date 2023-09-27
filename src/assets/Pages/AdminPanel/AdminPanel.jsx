import './AdminPanel.scss'
import Card from "../../components/Card/index.jsx";
import useFirebaseData from "../../hooks/useFirebaseData.js";
import {useState, useEffect} from "react";
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function AdminPanel() {
    const collectionName = 'cards'
    const cards = useFirebaseData(collectionName);
    const order = useFirebaseData('order');
    console.log(order)
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        setOrders(order);
    }, [order]);
    console.log(orders)
    const [blocks, setBlocks] = useState([]);
    const initialTitles = cards.map((item) => item.title);
    const initialTexts = cards.map((item) => item.text);
    const initialGroup = cards.map((item) => item.group);
    const initialPrice = cards.map((item) => item.price);
    const initialDescribe = cards.map((item) => item.describe);
    const initialSize = cards.map((item) => {
        if (item && item.sizes && Array.isArray(item.sizes)) {
            return item.sizes.map((size) => size);
        }
        return [];
    }).flat();
    const [title, setTitle] = useState(initialTitles);
    const [text, setText] = useState(initialTexts);
    const [group, setGroup] = useState(initialGroup);
    const [price, setPrice] = useState(initialPrice);
    const [describe, setDescribe] = useState(initialDescribe);
    const [size, setSize] = useState(initialSize);
    const [order1, setOrder1] = useState();
    const [order2, setOrder2] = useState();
    const [order3, setOrder3] = useState({});
    console.log(order1)
    console.log(order2)
    console.log(order3)

    const authorization = useFirebaseData('authorization');
    const enumerateFolders = (obj) => {
        let folderNumber = 1;
        const enumeratedObj = {};

        for (const key in obj) {
            enumeratedObj[key] = {
                ...obj[key],
                numbers: folderNumber,
            };
            folderNumber++;
        }

        return enumeratedObj;
    };
    useEffect(() => {
        const orderFolder = authorization.find((item) => item.order);
        console.log(orderFolder)
        if (orderFolder && orderFolder.id) {
            setLasId(orderFolder.id);
            setOrder1(orderFolder.order)
        }
    }, [authorization]);
    useEffect(() => {
        const updatedFolders = enumerateFolders(order1);
        console.log(updatedFolders)
        setOrder2(updatedFolders);
        // const orderFolder = order2.find((item) => item.number);
        // if(orderFolder && orderFolder.number){
        //     setOrder3(orderFolder.number)
        // }
    }, [order1]);

    // useEffect(() => {
    //     for (const key in order2) {
    //         const innerObj = order2[key];
    //         if (innerObj.number === 1) {
    //             console.log(innerObj);
    //             setOrder3(innerObj)
    //             return;
    //         } else {
    //             console.log(`Объект ${key} не соответствует заданным значениям.`);
    //         }
    //     }
    // }, [order2]);
    console.log(order3)
    const [lasId, setLasId] = useState('');
    console.log(lasId)
    const usersId = useFirebaseData('usersId');
    console.log(lasId)
    // useEffect(() => {
    //     const mappedArray = usersId.map((item) => {
    //         return item.id;
    //     });
    //     const resultString = mappedArray.join(', ')
    //     setLasId(resultString);
    // }, [usersId]);
    const [autho, setAutho] = useState(authorization);
    const [number, setNumber] = useState(authorization);
    console.log(autho)
    const authoArray = Object.values(autho || {});
    const authoArray2 = Object.values(order2 || {});
    console.log(authoArray)
    console.log(authoArray2)
    const [number1, setNumber1] = useState(authorization);
    console.log(number1)
    useEffect(() => {
        const newFount = authorization.filter((item) => item.id === lasId);
        console.log(newFount)
        if (newFount.length > 0) {
            setAutho(newFount[0].order);
            // const updatedFolders = enumerateFolders(order1);
            // console.log(updatedFolders)
            // setAutho(updatedFolders);
        }
        else {
            // setAutho([])
        }

    }, [lasId, authorization, order1]);
    const [num, setNum] = useState({});
    console.log(num)
    useEffect(() => {
        if (authoArray.length > 0) {
            setNum(authoArray[0].number);
        }

    }, [authorization]);
    const [disabled, setDisabled] = useState(false);
    const [activeItem, setActiveItem] = useState();
    const [imageFile, setImageFile] = useState(null);
    //обновление
    const updateCardData = (index, updatedData) => {
        console.log(index)
        console.log(updatedData)
        const database = firebase.database();
        const id = index; // Предполагаем, что id совпадает с индексом элемента в вашем списке

        database.ref(`${collectionName}/${id}`).update(updatedData)
            .then(() => {
                console.log('Данные успешно обновлены на Firebase');
            })
            .catch((error) => {
                console.error(`Ошибка при обновлении данных на Firebase: ${error}`);
            });
    }


    const [url, setUrl] = useState("");
    console.log(typeof url)

    const handleChange = async (index, fieldName, value) => {
        const updatedData = { ...fieldName };
        console.log(index)
        updatedData[index] = value;
        switch (fieldName) {
            case 'title':
                setTitle(updatedData);
                break;
            case 'group':
                setGroup(updatedData);
                break;
            case 'price':
                setPrice(updatedData);
                break;
            case 'describe':
                setDescribe(updatedData);
                break;
            case 'sizes':
                setSize(updatedData);
                break;
            case 'text':
                setText(updatedData);
                break;
            default:
                break;
        }
        // updateCardData(index, fieldName, value);
    }

    const handleClick = (id) => {
        setActiveItem(id);
    };
     const handleClickTrue = (index) => {
         setActiveItem(true);
         const updatedData = {
             ...(title[index] !== undefined && { title: title[index] }),
             ...(group[index] !== undefined && { group: group[index] }),
             ...(price[index] !== undefined && { price: price[index] }),
             ...(describe[index] !== undefined && { describe: describe[index] }),
             ...(size[index] !== undefined && { sizes: size[index] }),
             ...(text[index] !== undefined && { text: text[index] }),
             ...(url !== undefined && url !== "" && { img: url })
         };
         setUrl('')
         console.log(updatedData)
         updateCardData(index, updatedData);

     }

    useEffect(() => {
        setBlocks(cards.sort((a, b) => parseInt(b.id) - parseInt(a.id)));
        // setBlocks(cards)
    }, [cards]);

    //удалить карточку
    const handleDelete = (id) => {
        console.log(blocks)
        const database = firebase.database();
        const cardRef = database.ref(`${collectionName}/${id}`);
        console.log(cardRef)
        cardRef
            .remove()
            .then(() => {
                const updatedBlocks = blocks.filter((block) => block.id !== id);
                setBlocks(updatedBlocks);
            })
            .catch((error) => {
                console.error("Ошибка: " + error);
            });
    };
    const [newBlock, setNewBlock] = useState({
        "id": "",
        "img": "",
        "title":  "",
        "text": "",
        "group": "",
        "price": "",
        "sizes": {
            "1": "",
            "2": "",
            "3": "",
            "4": ""
        }
    });
    //добавить карточку
    const handleAddBlock = () => {
        const database = firebase.database();
        const cardsRef = database.ref(collectionName);
        cardsRef.once("value")
            .then((snapshot) => {
                const existingCardData = snapshot.val() || {};
                const existingIds = Object.keys(existingCardData).map((key) => key.replace("card", ""));
                console.log(existingIds)
                let nextId = 1;
                while (existingIds.includes(nextId.toString())) {
                    nextId++;
                }
                const desiredId = `${nextId}`;
                setBlocks((prevBlocks) => [
                    ...prevBlocks,
                    { id: desiredId, ...newBlock }
                ]);
                const cardData = {
                    ...newBlock,
                    id: desiredId
                };
                cardsRef.child(desiredId).set(cardData)
                    .then(() => {
                        console.log(`Карточка с id ${desiredId} добавлена`);
                    })
                    .catch((error) => {
                        console.error(`Ошибка ${desiredId}: ${error}`);
                    });

                setNewBlock({
                    "id": "",
                    "img": "",
                    "title":  "",
                    "text": "",
                    "group": "",
                    "price": "",
                    "sizes": {
                        "1": "",
                        "2": "",
                        "3": "",
                        "4": ""
                    }
                });
            })
            .catch((error) => {
                console.error("Ошибка при получении данных: " + error);
            });
    };


    //пагинацмя
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const cardsToDisplay = blocks.slice(startIndex, endIndex);
    const totalPages = Math.ceil(blocks.length / itemsPerPage);

    useEffect(() => {
    }, [blocks, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleAscending = () => {
        const sortedBlocks = [...blocks].sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setBlocks(sortedBlocks);
    }

    const handleDescending = () => {
        const sortedBlocks = [...blocks].sort((a, b) => parseInt(b.id) - parseInt(a.id));
        setBlocks(sortedBlocks);
    }

    //загрузить картинку
    const [imageFiles, setImageFiles] = useState([]);
    const handleImageChange = (event, index) => {

        const selectedImage = event.target.files[0];
        // Создаем новую копию массива imageFiles с обновленным файлом для конкретного индекса
        if (selectedImage) {
            const updatedImageFiles = [...imageFiles];
            updatedImageFiles[index] = selectedImage;
            setImageFiles(updatedImageFiles);
        }
    };

    console.log(imageFiles);

// отправка фото в storage

    const uploadImageToFirebase = async (file, folderName, fileName) => {
        folderName = "images"
        fileName = file.name
        console.log(file)
        const storage = getStorage();
        const storageRef = ref(storage, `${folderName}/${fileName}`);

        try {
            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);

            console.log('URL загруженного изображения:', imageUrl);
            setUrl(imageUrl)
        } catch (error) {
            console.error('Ошибка при загрузке изображения: ', error);
        }
    };

    //удалить заказ
    const handleDeleteOrder = (index) => {
        const database = firebase.database();
        const basketRef = database.ref(
            !lasId
                ? 'order'
                : `authorization/${lasId}/order`
        );

        const onDeleteSuccess = () => {
            console.log(`Папка "order${index}" успешно удалена.`);

            // Теперь пересчитываем и пересоздаем оставшиеся папки с правильной нумерацией
            basketRef.once('value')
                .then((snapshot) => {
                    const basketData = snapshot.val();
                    if (basketData && typeof basketData === 'object') {
                        // Создаем новый объект для переупорядочивания
                        const newBasketData = {};
                        let newIndex = 1;

                        // Пересоздаем элементы с новой нумерацией, пропуская удаленную папку
                        for (let i = 1; i <= Object.keys(basketData).length + 1; i++) {
                            if (i !== index && basketData[`order${i}`]) {
                                newBasketData[`order${newIndex}`] = basketData[`order${i}`];
                                newIndex++;
                            }
                        }

                        // Обновляем данные в basketRef с обновленной нумерацией
                        return basketRef.set(newBasketData);
                    } else {
                        console.log('Данные отсутствуют или являются пустым объектом.');
                        return null;
                    }
                })
                .then(() => {
                    console.log('Папки успешно переупорядочены после удаления.');
                })
                .catch((error) => {
                    console.error('Ошибка при удалении или обновлении данных: ', error);
                });
        };

        // Попытка удаления папки
        basketRef.child(`order${index}`).remove()
            .then(() => {
                // Проверяем, остались ли еще папки
                return basketRef.once('value');
            })
            .then((snapshot) => {
                const basketData = snapshot.val();
                if (basketData && typeof basketData === 'object' && Object.keys(basketData).length === 0) {
                    // Если нет оставшихся папок, обновляем данные с пустым объектом
                    return basketRef.set({});
                }
            })
            .then(onDeleteSuccess)
            .catch((error) => {
                // Если удаление завершается ошибкой, выводим сообщение
                console.error(`Ошибка при удалении папки "order${index}": `, error);
            })
            .then(() => {
                setLasId("");
                console.log(`Заказ ${index} успешно удален.`);
            })
            .catch((error) => {
                console.error('Ошибка при удалении заказа: ', error);
            });
    };
    //замена папки когда заказ принят
    const handleAcceptOrder = async (index) => {
        try {
            const database = firebase.database();
            const basketRef = database.ref(
                !lasId
                    ? 'order'
                    : `authorization/${lasId}/order`
            );
            let orderId = 1;
            let orderRef;
            console.log(JSON.stringify(basketRef))
            // Получаем текущую дату и время
            const currentDate = new Date().toLocaleDateString();

            const checkOrderExists = async (currentOrderId) => {
                while (true) {
                    const orderToCheck = database.ref(
                        !lasId
                            ? `confirmed/order${currentOrderId}`
                            : `authorization/${lasId}/confirmed/order${currentOrderId}`
                    );
                    const orderSnapshot = await orderToCheck.once('value');
                    if (!orderSnapshot.exists()) {
                        return currentOrderId;
                    }
                    currentOrderId++;
                }
            };

            orderId = await checkOrderExists(orderId);

            orderRef = database.ref(
                !lasId
                    ? `confirmed/order${orderId}`
                    : `authorization/${lasId}/confirmed/order${orderId}`
            );

            const snapshot = await basketRef.once('value');
            const basketData = snapshot.val();
            console.log(basketData)

            // Добавляем дату и время к данным заказа
            const orderData = {
                ...basketData,
                orderDate: `${currentDate}`
            };

            await orderRef.set(orderData);

            // Попытка удаления папки
            await basketRef.child(`order${index}`).remove();

            // Проверяем, остались ли еще папки
            const basketSnapshot = await basketRef.once('value');
            const basketDataAfterDelete = basketSnapshot.val();

            if (basketDataAfterDelete && typeof basketDataAfterDelete === 'object' && Object.keys(basketDataAfterDelete).length === 0) {
                // Если нет оставшихся папок, обновляем данные с пустым объектом
                await basketRef.set({});
            }

            console.log(`Папка "order${index}" успешно удалена.`);

            // Теперь пересчитываем и пересоздаем оставшиеся папки с правильной нумерацией
            const basketSnapshotAfterDelete = await basketRef.once('value');
            const basketDataAfterDelete2 = basketSnapshotAfterDelete.val();

            if (basketDataAfterDelete2 && typeof basketDataAfterDelete2 === 'object') {
                // Создаем новый объект для переупорядочивания
                const newBasketData = {};
                let newIndex = 1;

                // Пересоздаем элементы с новой нумерацией, пропуская удаленную папку
                for (let i = 1; i <= Object.keys(basketDataAfterDelete2).length + 1; i++) {
                    if (i !== index && basketDataAfterDelete2[`order${i}`]) {
                        newBasketData[`order${newIndex}`] = basketDataAfterDelete2[`order${i}`];
                        newIndex++;
                    }
                }

                // Обновляем данные в basketRef с обновленной нумерацией
                await basketRef.set(newBasketData);
            } else {
                console.log('Данные отсутствуют или являются пустым объектом.');
            }

            console.log('Папки успешно переупорядочены после удаления.');
            setLasId("");
            console.log(index);
            console.log(`Данные успешно перемещены в папку "order${orderId}".`);
        } catch (error) {
            console.error('Ошибка: ', error);
        }
    };


    return (
        <div className={"content basket admin"}>
            <div className="">
                {orders.length > 0 ? <div className="basket__title">Новые заказы</div> : null}
                {authoArray.length > 0 ? <div className="basket__title">Новые заказы</div> : null}
                {
                    ((orders.length > 0 && authoArray.length > 0) ? orders.concat(authoArray) : orders.length > 0 ? orders : authoArray).map((newOrder, index) =>(
                        <div key={index} className="orders">
                            <div className="orders__user">
                                {newOrder.name === "" ? null : <div>Имя клиента: {newOrder.name}</div>}
                                {newOrder.email === "" ? null : <div>Номер телефона: {newOrder.email}</div>}
                                {console.log(orders.concat(authoArray))}
                                {/*{<div>{newOrder.number[0].value}</div>}*/}
                            </div>
                            {Object.values(newOrder).map((item, index) => (
                                <div key={index}>
                                    {!item.img || !item.title || !item.text  ? null: <div className="orders__item">
                                        {console.log(item)}
                                        <div className="orders__img">
                                            <img src={item.img} alt=""/>
                                        </div>
                                        <div className="orders__text">
                                            <span>Товар: <span>{item.title}</span></span>
                                            <span>Категория: <span>{item.text}</span></span>
                                            {<span>Количество: <span>{newOrder.number[index].value}</span></span>}
                                            <span>Цена за один: <span>{item.price}</span> грн.</span>
                                            <span>Цена общая: <span>{parseInt(item.price.replace(/\s+/g, '')) * newOrder.number[index].value} грн.</span></span>
                                            {console.log(typeof item.price)}
                                            {/*{newOrder.number && newOrder.number[index] ? <span>{newOrder.number[index].value}</span> : <span>{1}</span>}*/}
                                        </div>
                                    </div>
                                    }
                                </div>
                            ))
                            }
                            {/*{<span className="sum-total">*/}
                            {/*     Цена общая: <span>*/}
                            {/*          {(orders.length > 0 ? orders : authoArray).map((order, orderId) => (*/}
                            {/*                 <div key={orderId}>*/}
                            {/*                      {Object.keys(order).reduce((sum, productId) => {*/}
                            {/*                          const product = order[productId];*/}
                            {/*                          const quantity = newOrder.number[productId]?.value || 0;*/}
                            {/*                          const price = product.price ? parseInt(product.price.replace(/\s+/g, '')) : 0;*/}
                            {/*                          console.log(sum);*/}
                            {/*                          return sum + (price * quantity);*/}
                            {/*                      }, 0)}*/}
                            {/*                 </div>*/}
                            {/*           ))}*/}
                            {/*              </span> грн.*/}
                            {/*</span>}*/}
                            <div className="admin__buttons-bl">
                                <button onClick={() => handleAcceptOrder(index+1)} className="admin__button orders__button">Принять заказ</button>
                                <button onClick={() => handleDeleteOrder(index+1)} className="admin__button orders__button">Отклонить заказ</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="admin__top">
                <div className="admin__top-left">
                    <div className="basket__title">Админ панель</div>
                    <button className="admin__button admin__red" onClick={handleAddBlock}>Добавить новую карточку</button>
                </div>
                <div className="admin__top-right">
                    <button className="admin__button" onClick={handleAscending}>Сортировка по возрастанию</button>
                    <button className="admin__button" onClick={handleDescending}>Сортировка по убыванию</button>
                </div>
            </div>
            {cardsToDisplay.map((item, index) => (
                <div className="admin__box" key={index}>
                    <div className={`basket__item ${activeItem === item.id ? 'active' : ''}`}>
                        <div className="basket__main">
                            <div className="basket__img">
                                {imageFiles[item.id] ? (
                                    <img src={URL.createObjectURL(imageFiles[item.id])} alt="" />
                                ) : (
                                    <img src={item.img} alt="" />
                                )}
                                <input
                                    type="file"
                                    id={index}
                                    accept={item.img}
                                    className={disabled ? 'disabled' : ''}
                                    name="image"
                                    onChange={(e) => handleImageChange(e,  item.id)}
                                />
                                <button className="basket__download" onClick={() => uploadImageToFirebase(imageFiles[item.id])}>download</button>
                            </div>
                            <div>
                                <div className="admin__number"><span>Номер</span>{item.id}</div>
                                <div className="basket__subtitle flex-box">
                                    <label>Заговолок:</label>
                                    <input
                                        type="text"
                                        placeholder={item.title}
                                        value={title[item.id]}
                                        name={`title_${item.id}`}
                                        className={disabled ? 'disabled' : ''}
                                        onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                                    />
                                </div>
                                <div className="basket__subtitle basket__group flex-box">
                                    <label>Подзаголовок:</label>
                                    <input
                                        type="text"
                                        placeholder={item.text}
                                        value={text[item.id]}
                                        name={`text_${item.id}`}
                                        className={disabled[index] ? 'disabled' : ''}
                                        onChange={(e) => handleChange(item.id, "text", e.target.value)}
                                    />
                                </div>
                                <div className="basket__subtitle basket__group flex-box">
                                    <label>Група:</label>
                                    <input
                                        type="text"
                                        placeholder={item.group}
                                        value={group[item.id]}
                                        name={`group_${item.id}`}
                                        className={disabled ? 'disabled' : ''}
                                        onChange={(e) => handleChange(item.id, "group", e.target.value)}
                                    />
                                </div>
                                <div className="basket__subtitle basket__group flex-box">
                                    <label>Цена:</label>
                                    <input
                                        type="number"
                                        placeholder={item.price}
                                        value={price[item.id]}
                                        name={`price_${item.id}`}
                                        className={disabled ? 'disabled' : ''}
                                        onChange={(e) => handleChange(item.id, "price", e.target.value)}
                                    />
                                </div>
                                {/*<div className="basket__subtitle basket__group flex-box admin__size">*/}
                                {/*    <label>Размеры:</label>*/}
                                {/*    <div className="admin__block">*/}
                                {/*        {*/}
                                {/*            item.sizes.map((item, index) => (*/}
                                {/*                    <div key={index} className="admin__sizes">*/}
                                {/*                        <input*/}
                                {/*                            type="text"*/}
                                {/*                            placeholder={item}*/}
                                {/*                            value={sizes[index]}*/}
                                {/*                            name={`sizes_${index}`}*/}
                                {/*                            className={disabled ? 'disabled' : ''}*/}
                                {/*                            onChange={(e) => handleChange(item.id, "sizes", e.target.value)}*/}
                                {/*                        />*/}
                                {/*                    </div>*/}
                                {/*                )*/}
                                {/*            )}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div className="basket__subtitle basket__group flex-box">
                                    <label>Описание:</label>
                                    <textarea
                                        placeholder={item.describe}
                                        value={describe[item.id]}
                                        name={`describe_${item.id}`}
                                        className={disabled ? 'disabled' : ''}
                                        onChange={(e) => handleChange(item.id, "describe", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="admin__buttons">
                                <button onClick={(e) => handleClickTrue(item.id, e)} className="admin__change save">Сохранить</button>
                                <button onClick={(e) => handleClick(item.id, e)} className="admin__change change">Изменить</button>
                            <button onClick={(e) => handleDelete(item.id, e)} className="admin__del">Удалить</button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminPanel;