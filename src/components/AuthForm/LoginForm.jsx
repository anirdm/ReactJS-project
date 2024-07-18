import styles from './AuthForm.module.css'

const LoginForm = () => {
    return (
        <div>
            <form className="flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center">
                <div>
                    <h1>Login</h1>
                    <h2>Let's sign you in</h2>
                </div>
                <div className="flex flex-col gap-6 mt-5">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <button className="self-center">Log in</button>
                </div>
            </form>

            <div className={styles.authBlock}>
                <p>
                    Don't have an account?
                    <a href="/auth/register" className='font-bold ml-2'>Register</a>
                </p>
            </div>
        </div>

    )
}

export default LoginForm;
