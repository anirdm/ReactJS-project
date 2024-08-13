import styles from './AuthForm.module.css'
import { useState } from 'react';
import { useUserAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/registerShema';
import ButtonSpinner from '../buttonSpinner/ButtonSpinner';

const RegisterForm = () => {
    const [err, setErr] = useState('');
    const { signUp, loading } = useUserAuth();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await signUp(values);
            navigate('/');
        } catch (err) {
            setErr(err.message);
            /** */
        }
    }

    // just destructure and get all the methods we need
    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            email: '',
            username: '',
            name: '',
            password: '',
            rePassword: '',
        },
        validationSchema: registerSchema,
        onSubmit
    });

    return (
        <div className='max-h-screen'>
            <form
                className="flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center"
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div>
                    <h1>Register</h1>
                    <h2>Let's sign you up</h2>
                </div>
                <div className="flex flex-col gap-6 mt-5">
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email" // or id
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur} // validates the form when you click off the input
                        />
                        {/*touched - for when the user clicked out of the input*/}
                        {errors.email && touched.email ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.email}</p>) : null}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.username}</p>) : null}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.name && touched.name ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.name}</p>) : null}
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

                    <div>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            name="rePassword"
                            value={values.rePassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.rePassword && touched.rePassword ? (<p className="text-red-500 text-sm mt-1 w-96 break-word">{errors.rePassword}</p>) : null}
                    </div>

                    {err && (
                        <p className="text-red-500 text-sm mt-1 w-96 break-word">{err}</p>
                    )}

                    <button
                        type='submit'
                        className="primary-button self-center"
                    >
                        {loading && (
                            <ButtonSpinner />
                        )}
                        {loading ? '' : 'Sign up'}
                    </button>
                </div>
            </form>

            <div className={styles.authBlock}>
                <p>
                    Already have an account?
                    <Link to="/auth/login" className='text-blue-mana font-bold ml-2'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;
