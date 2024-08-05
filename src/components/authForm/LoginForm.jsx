import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import styles from './AuthForm.module.css'

const LoginForm = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const { login } = useUserAuth();
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(inputs);
            navigate('/');         
        } catch (error) {
            setErr(error.message);
        }
    }

    return (
        <div>
            <form
                className="flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center"
                onSubmit={handleLogin}
            >
                <div>
                    <h1>Login</h1>
                    <h2>Let's sign you in</h2>
                </div>
                <div className="flex flex-col gap-6 mt-5">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        required
                    />

                    {err && (
                        <p className="text-red-500 text-sm mt-1 w-96 break-word">{err}</p>
                    )}

                    <button
                        type='submit'
                        className="primary-button self-center"
                    /*onClick={handleAuth}*/
                    >   {/*{ loading ? '...' : 'Log in' } */} Log in
                    </button>
                </div>
            </form>

            <div className={styles.authBlock}>
                <p>
                    Don't have an account?
                    <Link to='/auth/register' className='text-blue-mana font-bold ml-2'>Register</Link>
                </p>
            </div>
        </div>

    )
}

export default LoginForm;
