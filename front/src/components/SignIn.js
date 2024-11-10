import { useState } from 'react';
import '../styles/styles.css';
import axios from "axios";

function SignIn({ onToggleForm }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sign in:', formData);
        try {
            const response = await axios.post('http://158.160.67.237:8001/authorization', {
                user_email: formData.email, password: formData.password});
            const {TOKEN} = response.data;
            localStorage.setItem('authToken', TOKEN);
            window.location.href = '/dashboard';
        } catch (e) {
            console.error('SignIn error:', e);
            console.error(e);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />
                <button type="submit">Sign In</button>
                <p>
                    Don't have an account?{' '}
                    <span className="form-link" onClick={() => onToggleForm('signup')}>
            Sign Up
          </span>
                </p>
            </form>
        </div>
    );
}

export default SignIn;