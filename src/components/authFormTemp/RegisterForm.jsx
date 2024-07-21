import styles from './AuthForm.module.css'
import { useState } from 'react';

const RegisterForm = () => {
    const [ inputs, setInputs ] = useState({
        email: '',
        username: '',
        name: '',
        password: '',
        rePassword: ''
    });

    const handleAuth = (e) => {
        e.preventDefault();
        /**/ 
    }

    return (
        <div>
            <form onSubmit={handleAuth} className="flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center">
                <div>
                    <h1>Register</h1>
                    <h2>Let's sign you up</h2>
                </div>
                <div className="flex flex-col gap-6 mt-5">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={inputs.email}
                        onChange={(e) => setInputs({...inputs, email: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={inputs.username}
                        onChange={(e) => setInputs({...inputs, username: e.target.value})}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={inputs.name}
                        onChange={(e) => setInputs({...inputs, name: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onChange={(e) => setInputs({...inputs, password: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="rePassword"
                        value={inputs.rePassword}
                        onChange={(e) => setInputs({...inputs, rePassword: e.target.value})}
                        required
                    />
                    <button className="primary-button self-center">Sign up</button>
                </div>
            </form>

            <div className={styles.authBlock}>
                <p>
                    Already have an account?
                    <a href="/auth/login" className='text-blue-mana font-bold ml-2'>Login</a>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;
