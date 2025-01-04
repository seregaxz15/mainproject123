import  {useState} from "react";
import  SignIn from "./SignIn";
import SignUp from "./SignUp";
import  '../styles/authStyles.css';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
function Registration() {
    const [currentForm, setCurrentForm] = useState('signin');
    const navigate = useNavigate()
    return (
        <div className="registration-container">
            {/*{currentForm === 'signin' ? (*/}
            {/*    <SignIn onToggleForm={setCurrentForm} />*/}
            {/*) : (*/}
            {/*    <SignUp onToggleForm={setCurrentForm} />*/}
            {/*)}*/}
            <Button onClick={() => navigate('/checks')}>Go to checks</Button>
        </div>
    )
}

export default Registration;