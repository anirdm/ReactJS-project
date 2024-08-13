import * as yup from 'yup';

export const editPostSchema = yup.object().shape({
    title: yup.string()
        .max(35, 'Title must be less than 35 characters.'),
    description: yup.string()
        .max(100, 'Caption must be less than 100 characters.'),
})