import React from 'react'
import styles from './AuthPage.module.css'
import RegisterForm from '../../components/authForm/RegisterForm';
import LoginForm from '../../components/authForm/LoginForm';
import { useLocation } from 'react-router-dom';

const AuthPage = () => {
  const location = useLocation();
  const isRegister = location.pathname === '/auth/register';

  return (
    <div className={styles.contentContainer}>
      <img src="/auth.png" alt="Welcome img" className="hidden lg:block"/>
      {!isRegister ? <LoginForm/> : <RegisterForm/>}
    </div>
  )
}

export default AuthPage;

