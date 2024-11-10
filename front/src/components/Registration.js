import  {useState} from "react";
import  SignIn from "./SignIn";
import SignUp from "./SignUp";
import  '../styles/authStyles.css';
function Registration() {
    const [currentForm, setCurrentForm] = useState('signin');

    return (
        <div className="registration-container">
            {currentForm === 'signin' ? (
                <SignIn onToggleForm={setCurrentForm} />
            ) : (
                <SignUp onToggleForm={setCurrentForm} />
            )}
        </div>
    )
}

export default Registration;