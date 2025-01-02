import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/listStyles.css';

const ChecksList = () => {
    const [checks, setChecks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchChecks = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8001/all_lists',
                    {"token": localStorage.getItem('authToken')},
                );
                console.log(response);
                setChecks(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Ошибка при загрузке данных');
                setLoading(false);
            }
        };

        fetchChecks();
    }, []);

    if (loading) {
        return <div className="loading">Загрузка чеков...</div>;
    }

    return (
        <div className="full-window">
            <div className="checks-list-container">
                <h1 className="title">Список чеков</h1>
                {/* Если список пустой */}
                {checks.length === 0 ? (
                    <p>Нет доступных чеков</p>
                ) : (
                    <ul>
                        {checks.map((check) => (
                            <li key={check.id} className="check-item">
                                <Link to={`/${check.id}`}>
                                    <h3>{check.name}</h3>
                                    <p className="check-amount">{check.sum} ₽</p>
                                    <p className="check-status">
                                        {check.items.length} {check.items.length > 1 ? 'человек' : 'человек'}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={() => {navigate('/create')}}>Create check</button>
            </div>
        </div>
    );
};

export default ChecksList;
