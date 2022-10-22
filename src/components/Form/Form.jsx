import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import InputMask from 'react-input-mask';

const Form = ({dataProductList}) => {

    const [customerName, setCustomerName] = useState('');
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
    const [customerCar, setCustomerCar] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            ...dataProductList,
            customerName,
            customerPhoneNumber,
            customerCar
        }
        fetch('https://8917828d313e09.lhr.life/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

    }, [dataProductList, customerName, customerCar, customerPhoneNumber])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    if(!customerName || !customerPhoneNumber) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.show();
        tg.MainButton.setParams({
            text: `Оформить заявку от ${dataProductList.totalPrice}₽`
        })
    }


    const onChangeCustomerName = e => setCustomerName(e.target.value)
    const onChangeCustomerPhoneNumber = e => setCustomerPhoneNumber(e.target.value)
    const onChangeCustomerCar = e => setCustomerCar(e.target.value)


    return (
        <div className={"form"}>
            <div className={"order-list"}>
                <h3>Список</h3>
                {dataProductList.products.map(p =>
                    <div className={"order-item"}>
                        <div className={"order-img"}>
                          <div className={p.img}></div>
                        </div>
                        <div className={"order-description"}>
                            <div className={"order-title"}>
                                {p.title}
                            </div>
                            <div className={"order-price"}>
                                от <b>{p.price}</b>&#8381;
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Имя (обязательно)'}
                value={customerName}
                onChange={onChangeCustomerName}
            />

            <InputMask className={'input-mask'} mask="+7 (999) 999-99-99" maskChar={null}
                       type="tel"
                       placeholder={'Телефон (обязательно)'}
                       value={customerPhoneNumber}
                       onChange={onChangeCustomerPhoneNumber}
            />

            <select value={customerCar} onChange={onChangeCustomerCar} className={'select'}>
                <option value={''}>Выберите автомобиль</option>
                <option value={'LADA (ВАЗ)'}>LADA (ВАЗ)</option>
                <option value={'Audi'}>Audi</option>
                <option value={'BMW'}>BMW</option>
                <option value={'Chery'}>Chery</option>
                <option value={'Chevrolet'}>Chevrolet</option>
                <option value={'Citroen'}>Citroen</option>
                <option value={'Daewoo'}>Daewoo</option>
                <option value={'Ford'}>Ford</option>
                <option value={'Geely'}>Geely</option>
                <option value={'Haval'}>Haval</option>
                <option value={'Honda'}>Honda</option>
                <option value={'Hyundai'}>Hyundai</option>
                <option value={'Infiniti'}>Infiniti</option>
                <option value={'Jeep'}>Jeep</option>
                <option value={'Kia'}>Kia</option>
                <option value={'Land Rover'}>Land Rover</option>
                <option value={'Lexus'}>Lexus</option>
                <option value={'Mazda'}>Mazda</option>
                <option value={'Mercedes-Benz'}>Mercedes-Benz</option>
                <option value={'Mitsubishi'}>Mitsubishi</option>
                <option value={'Nissan'}>Nissan</option>
                <option value={'Opel'}>Opel</option>
                <option value={'Peugeot'}>Peugeot</option>
                <option value={'Renault'}>Renault</option>
                <option value={'Skoda'}>Skoda</option>
                <option value={'Subaru'}>Subaru</option>
                <option value={'Suzuki'}>Suzuki</option>
                <option value={'Toyota'}>Toyota</option>
                <option value={'Volkswagen'}>Volkswagen</option>
                <option value={'Volvo'}>Volvo</option>
            </select>
        </div>
    );
};

export default Form;
