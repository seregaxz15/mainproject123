import React from 'react';
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CheckElement = ({check}) => {
    const navigate = useNavigate();
    return (
        <div  style={{paddingTop: 5}}>
            <Button onClick={() => {navigate('/checks/' + check.id)}} style={{fontWeight: "bold"}}>{check.name}</Button>
        </div>
    );
};

export default CheckElement;