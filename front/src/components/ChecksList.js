import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/listStyles.css';
import CheckElement from "./CheckElement";
import {useChecks} from "../CheckContext";

const ChecksList = () => {
    const {checks, loading} = useChecks();
    const navigate = useNavigate()

    if (loading) {
        return <div className="loading">Загрузка чеков...</div>;
    }
    return (
        <div className="full-window">
            <div className="checks-list-container">
                <h1 className="title">Список чеков</h1>
                {checks.length === 0 ? (
                    <p>Нет доступных чеков</p>
                ) : (
                    <ul>
                        {checks.map((check) => (
                            <div key={check.id}>
                                <CheckElement check={check}/>
                            </div>
                        ))}
                    </ul>
                )}
                <hr/>
                <button style={{marginTop: 5}} onClick={() => {navigate('/create')}}>Создать чек</button>
            </div>
        </div>
    );
};

export default ChecksList;
