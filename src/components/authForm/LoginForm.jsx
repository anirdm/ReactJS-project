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
                className={styles.formContainer}
                onSubmit={handleSubmit}
            >
                <div>
                    <h1>Login</h1>
                    <h2>Let's sign you in</h2>
                </div>
                <div className={styles.inputContainer}>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (<p className={styles.errorText}>{errors.email}</p>) : null}
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
                        {errors.password && touched.password ? (<p className={styles.errorText}>{errors.password}</p>) : null}
                    </div>

                    {err && (
                        <p className={styles.errorText}>{err}</p>
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
                    <Link to='/auth/register' className={styles.authLink}>Register</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;
