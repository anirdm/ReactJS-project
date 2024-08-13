import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/AuthContext';
import styles from './AuthForm.module.css'
import { loginSchema } from '../../schemas/loginSchema';
import { useFormik } from 'formik';
import ButtonSpinner from '../buttonSpinner/ButtonSpinner';

const LoginForm = () => {
    const { login, loading } = useUserAuth();
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await login(values);
            navigate('/');
        } catch (err) {
            setErr(err.message);
            /** */
        }
    }

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit
    });

    return (
        <div>
            <form
                className="flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center"
                onSubmit={handleSubmit}
            >
                <div>
                    <h1>Login</h1>
                    <h2>Let's sign you in</h2>
                </div>
                <div className="flex flex-col gap-6 mt-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.email}</p>) : null}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.password}</p>) : null}
                    </div>

                    {err && (
                        <p className="text-red-500 text-sm mt-1 w-96 break-word">{err}</p>
                    )}

                    <button
                        type='submit'
                        className="primary-button self-center"
                    >
                        { loading && (
                            <ButtonSpinner />
                        )}
                        {loading ? '' : 'Log in'}
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
