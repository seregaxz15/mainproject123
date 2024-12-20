import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/listStyles.css';

const ChecksList = () => {
    const [checks, setChecks] = useState([{
        "token": null,
        "name": "123",
        "items": [
          {
            "user_email": "123@1",
            "sum": 123,
            "name": "123"
          },
          {
            "user_email": "12311@1",
            "sum": 123123123,
            "name": "1231231231232"
          }
        ]
      }]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                console.error(err);
                setError('Ошибка при загрузке данных');
                setLoading(false);
            }
        };

        fetchChecks();
    }, []);
    if (loading) {
        return <div className="loading">Загрузка чеков...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
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
                                <Link to={`/check/${check.id}`}>
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
