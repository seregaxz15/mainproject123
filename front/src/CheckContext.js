import React, {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';

const ChecksContext = createContext()

export const ChecksContextProvider = ({children}) => {
    const [checks, setChecks] = useState([{id: 2, name: 'bob', items: [
        {user_email: 'bob@gmail.com', sum: "1200", description: '12'},
        {user_email: 'aa@a', sum: '1130', description: ''}]}]);
    const [loading, setLoading] = useState(true);

    const fetchChecks = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8001/all_lists',
                {token: localStorage.getItem('authToken')},
            );
            setChecks(response.data);
            setLoading(false);
            console.log(">>>", response.data.length);
        } catch (error) {
            console.error('Ошибка при загрузке данных');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChecks();
    }, [])

    return (
        <ChecksContext.Provider value={{checks, loading, fetchChecks}}>
            {children}
        </ChecksContext.Provider>
    )
}

export const useChecks = () => useContext(ChecksContext);