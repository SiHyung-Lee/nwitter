import React, { useState } from 'react';
import { firebaseInstance, authService } from 'fbase';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
    const onChange = (event) => {
        const {
            target: { value, name },
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };

    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={onChange}
                    required
                />
                <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value={newAccount ? 'Create Account' : 'Log In'}
                />
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? 'Sign In' : 'Create Account'}
            </span>
            <div>
                <button name='google' onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name='github' onClick={onSocialClick}>
                    Continue with GitHub
                </button>
            </div>
            <p>{error}</p>
        </div>
    );
};

export default Auth;