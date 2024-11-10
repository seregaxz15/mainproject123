import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/styles.css';

const CheckDetails = () => {
    const { id } = useParams();

    const checkDetails = [];

    const check = checkDetails[id];

    if (!check) {
        return (
            <div className="dark-theme-wrapper">
                <div>Чек не найден</div>
            </div>
        );
    }

    return (
        <div className="dark-theme-wrapper">
            <h1 className="title">Детали чека: {check.name}</h1>
            <p className="paragraph">Сумма: {check.sum}₽</p>
            <h3 className="title">Список:</h3>
            <ul className="item-list">
                {check.items.map((item, index) => (
                    <li className="item" key={index}>
                        <strong>{item.name}</strong>: {item.sum / check.items.length} ₽
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckDetails