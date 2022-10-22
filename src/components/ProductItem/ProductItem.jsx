import React, {useState} from 'react';
import Button from "../Button/Button";
import './ProductItem.css';
import {useTelegram} from "../../hooks/useTelegram";

const ProductItem = ({product, className, onAdd}) => {

    const [active, setActive] = useState(false)
    const {tg} = useTelegram();

    const onAddHandler = () => {
        onAdd(product);
        setActive(true)
        tg.HapticFeedback.selectionChanged()
    }

    const onDeleteHandler = () => {
        onAdd(product);
        setActive(false)
        tg.HapticFeedback.selectionChanged()
    }

    return (
        <div className={`product ${className}`}>
            <div className={`img ${product.img}`}></div>
            <div className={'title'}><p>{product.title}</p></div>
            <div className={'price'}>
                <span>от <b>{product.price}</b>&#8381;</span>
            </div>
            {!active
                ? <Button  onClick={onAddHandler}>Добавить</Button>
                : <Button className={'activeBtn'} onClick={onDeleteHandler}>Удалить</Button>
            }

        </div>
    );
};

export default ProductItem;
