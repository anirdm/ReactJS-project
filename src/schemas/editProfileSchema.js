import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({
    bio: yup.string()
        .max(105, 'Bio must be less than 105 characters.'),
    name: yup.string()
        .required('Name cannot be an empty field.')
        .max(50, 'Name must be less than 50 characters.')
})