'use client'
import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api');
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (data: any) => {
    // console.log('editing')
    setSelectedData(data);
    setIsModalOpen(true);
  };
  const updateWord = (updatedData: any) => {
    setWords((prevWords) =>
      prevWords.map((word) =>
        word.id === updatedData.id ? updatedData : word
      )
    );
  };
  const filteredWords = words.filter((word) =>
    (word.wordFirstLang?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (word.wordSecondLang?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (word.sentenceFirstLang?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (word.sentenceSecondLang?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold  text-center text-white-800 mt-4">Words CMS</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border flex self-center border-gray-300 rounded-md mb-4 text-black mt-4"
      />
      {filteredWords.map((item: any) => (
        <div key={item.id} className="flex flex-col items-center justify-center bg-green-600 bg-opacity-50 backdrop-blur-md border border-blue-400 p-4 rounded-md shadow-md w-fit mx-auto my-4">
          <h3 className="text-lg font-bold text-center text-blue-100">ID: {item.id}</h3>
          <p className="text-blue-200 text-center"><b>First Lang:</b> {item.wordFirstLang}</p>
          <p className="text-blue-200 text-center"><b>Second Lang:</b> {item.wordSecondLang}</p>
          <p className="text-blue-200 text-center"><b>Sentence First Lang:</b> {item.sentenceFirstLang}</p>
          <p className="text-blue-200 text-center"><b>Sentence Second Lang:</b> {item.sentenceSecondLang}</p>
          <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => handleEdit(item)}>Edit</button>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedData}
        onSubmit={updateWord}
      />
    </div>
  );
}