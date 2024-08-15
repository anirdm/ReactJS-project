import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    username: yup.string()
        .matches(/^[a-zA-Z0-9_.-]*$/, 'Username can only contain letters, numbers, underscores, periods, and hyphens.')
        .min(4, 'Username must be at least 4 characters long.')
        .max(20, 'Username cannot be longer than 20 characters.')
        .required('Username is required.'),
    name: yup.string()
        .matches(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters.')
        .min(2, 'Name must be at least 2 characters long.')
        .max(50, 'Name cannot be longer than 50 characters.')
        .required('Name is required.'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters long.')
        .required('Password is required.'),
    rePassword:  yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match') 
        .required('Password confirmation is required.'),
})