import styles from './AuthForm.module.css'

const RegisterForm = () => {
    return (
        <div>
            <form className="flex flex-col border border-blue-mana rounded-lg w-fit p-6 shadow-lg justify-center">
                <div>
                    <h1>Register</h1>
                    <h2>Let's sign you up</h2>
                </div>
                <div className="flex flex-col gap-6 mt-5">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        name="rePassword"
                    />
                    <button className="self-center">Sign up</button>
                </div>
            </form>

            <div className={styles.authBlock}>
                <p>
                    Already have an account?
                    <a href="/auth/login" className='font-bold ml-2'>Login</a>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;
