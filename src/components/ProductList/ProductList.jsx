import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const products = [
    {id: 1, title: 'Замена масла в моторе', price: 500, img: 'engineOil'},
    {id: 2, title: 'Замена масла в АКПП', price: 2000, img: 'atf'},
    {id: 3, title: 'Замена масла в МКПП', price: 1200, img: 'mtf'},
    {id: 4, title: 'Замена воздушного фильтра', price: 300, img: 'airFilter'},
    {id: 5, title: 'Замена салонного фильтра', price: 300, img: 'cabinFilter'},
    {id: 6, title: 'Замена топливного фильтра', price: 300, img: 'fuelFilter'},
    {id: 7, title: `Замена свечей зажигания (4шт)`, price: 1500, img: 'sparkPlug'},
    {id: 8, title: 'Замена антифриза', price: 800, img: 'antifreeze'},
    {id: 9, title: 'Замена тормозной жидкости', price: 2000, img: 'brakeFluid'},
    {id: 10, title: 'Ремонт двигателя (капитальный)', price: 30000, img: 'engine'},
    {id: 11, title: 'Ремонт АКПП или МКПП', price: 5000, img: 'transmission'},
    {id: 12, title: 'Ремонт ходовой части', price: 990, img: 'suspension'},
    {id: 13, title: 'Ремонт кондиционера', price: 3000, img: 'conditioner'},
    {id: 14, title: 'Ремонт электрики', price: 200, img: 'electrics'},
    {id: 15, title: 'Ремонт глушителя', price: 990, img: 'muffler'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = ({setDataProductList}) => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId, user} = useTelegram();
    const navigate = useNavigate()


    const onSendData = useCallback(() => {

        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
            user
        }
        setDataProductList(data)

        navigate('/form')

    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])


    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: 'Продолжить'
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
