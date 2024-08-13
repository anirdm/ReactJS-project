import { useState } from 'react'

const usePreviewImg = () => {
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const maxFileSize = 10 * 1024 * 1024; //20MB
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jfif'];

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!allowedFileTypes.includes(file.type)) {
                setError('Please select a jpg, png, or jfif image file');
                setSelectedFile(null);
                return;
            }

            if (file.size > maxFileSize) {
                setError('File size must be less than 10MB');
                setSelectedFile(null);
                return;
            }

            setSelectedFile(URL.createObjectURL(file));
            setError('');
        }
    }

    return { selectedFile, handleImageChange, setSelectedFile, error };
}

export default usePreviewImg;
