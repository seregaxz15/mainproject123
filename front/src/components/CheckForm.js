import React, { useState, useEffect } from 'react';
import '../styles/formStyles.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CheckForm = () => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setToken(token);
    }, []);

    const handleAddItem = (e) => {
        e.preventDefault();
        setItems([...items, { user_email: '', sum: 0, name: '' }]);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = value;
        setItems(updatedItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            token,
            name,
            items,
        };
        console.log(token)
        const response = axios.post('http://158.160.67.237:8001/list', formData);
        console.log('Form Data:', JSON.stringify(formData, null, 2));
        console.log(response);
        navigate('/checks');
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="check-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <h3>Items</h3>
                    {items.map((item, index) => (
                        <div key={index} className="item-group">
                            <div className="form-group">
                                <label htmlFor={`user_email_${index}`}>User Email</label>
                                <input
                                    type="email"
                                    id={`user_email_${index}`}
                                    value={item.user_email}
                                    onChange={(e) =>
                                        handleItemChange(index, 'user_email', e.target.value)
                                    }
                                    required
                                    className="input-field"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`sum_${index}`}>Sum</label>
                                <input
                                    type="number"
                                    id={`sum_${index}`}
                                    value={item.sum}
                                    onChange={(e) =>
                                        handleItemChange(index, 'sum', Number(e.target.value))
                                    }
                                    required
                                    className="input-field"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`name_${index}`}>Name (optional)</label>
                                <input
                                    type="text"
                                    id={`name_${index}`}
                                    value={item.name}
                                    onChange={(e) =>
                                        handleItemChange(index, 'name', e.target.value)
                                    }
                                    className="input-field"
                                />
                            </div>
                            <hr />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddItem} className="add-item-btn">
                        Add Item
                    </button>
                </div>

                <div className="form-group">
                    <button type="submit" className="submit-btn">
                        Create list
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckForm;