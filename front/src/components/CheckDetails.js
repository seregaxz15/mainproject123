import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/styles.css';
import {Button} from "react-bootstrap";
import {useChecks} from "../CheckContext";

const CheckDetails = () => { // TODO: Work with radiobutton
    const { id } = useParams();
    const checks = useChecks()
    const check = checks.checks.find(check => check.id === Number(id));

    // const handleChange = () => {
    //     setChecked(!isChecked);
    // }

    const totalSum = (check) => {
        let sm = 0;
        let i;
        for (i of check.items) {
            sm += Number(i.sum)
        }
        return sm;
    }

    if (!check) {
        return (
            <div className="dark-theme-wrapper">
                <div>Чек не найден</div>
            </div>
        );
    }
    return (
        <div className="full-window">
            <div className={'checks-list-container'}>
                <h1 className="title" style={{textAlign: 'left'}}>Детали чека: {check.name}</h1>
                <p className="paragraph" style={{textAlign: 'left'}}>Сумма: {check.items.reduce((acc, el) => acc + Number(el.sum_dolg), 0)} ₽</p>
                <h3 className="title" style={{fontSize: 20, textAlign: 'left'}}>Список:</h3>
                <ul className="item-list">
                    {check.items.map((item, index) => (
                        <li className="item" key={index}>
                            {/*<input*/}
                            {/*    type={'radio'}*/}
                            {/*    checked={isChecked}*/}
                            {/*    onChange={handleChange}*/}
                            {/*    className={isChecked ? 'checked' : 'unchecked'}*/}
                            {/*    style={{marginRight: 6}}*/}
                            {/*/>*/}
                            <strong>{item.name}</strong>: {item.sum_dolg}₽ - {item.description.length !== 0 ? item.description : '(Описания нет)'}
                        </li>
                    ))}
                </ul>
                {/*<Button style={{backgroundColor: "#e74c3c",justifyContent: 'right'}}>Удалить</Button>*/}
                <Button style={{backgroundColor: "red", justifyContent: 'right', width: '40%', marginRight: '-60%'}}>Удалить</Button>
            </div>
        </div>
    );
};

export default CheckDetails
