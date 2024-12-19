import React, { useState, useEffect } from 'react';

export default function Modal({ isOpen, onClose, initialData, onSubmit }) {
    const [formData, setFormData] = useState(initialData || {});

    useEffect(() => {
        setFormData(initialData || {});
    }, [initialData]);
    
    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:3000/api', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            onSubmit(formData);
            onClose();
        } catch (error) {
            console.error('Errore durante l\'invio dei dati:', error);
        }
    };


    return (
        <div className="modal z-50 fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ">
            <div className="modal-content bg-gray-400 bg-opacity-50 backdrop-blur-sm  p-4 rounded-md border border-gray-300">
                <button className="close" onClick={onClose}>&times;</button>
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 ">
                    <input
                        type="text"
                        name="wordFirstLang"
                        value={formData.wordFirstLang || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    <input
                        type="text"
                        name="sentenceFirstLang"
                        value={formData.sentenceFirstLang || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    <input
                        type="text"
                        name="wordSecondLang"
                        value={formData.wordSecondLang || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                    <input
                        type="text"
                        name="sentenceSecondLang"
                        value={formData.sentenceSecondLang || ''}
                        onChange={handleChange}
                        className='w-full p-2 border border-gray-300 rounded-md text-black'
                    />
                    <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}