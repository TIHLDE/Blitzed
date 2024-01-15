'use client';

import React from 'react';
import { useState } from 'react';

export function Header() {
    return (
        <div className='flex'>
        <header className='p-12 text-center'>
            <h1 className='md:text-5xl sm:text-6xl text-4xl font-bold'>
            Legg til spørsmål
            </h1>
        </header>
        </div>
    );
}


const InputField = ({ id, value, onChange }: { id: number, value: string, onChange(id: number, newValue: string) => void}) => {
    return (
      <div className='flex flex-wrap p-3 ml-3 mr-14 rounded-md bg-[rgb(27,8,47)]'>
        <div className=''>
            <label className='box-border h-8 w-5 p-4'>{id}</label>
        </div>
        <div className=''>
            <input type="text" value={value} onChange={(e) => onChange(id, e.target.value)} 
        className='text-black box-border h-10 p-4 border-2'/>
        </div>
      </div>
    );
  };

function AdminPersonalQuestionsPage() {
    
    const [inputs, setInputs] = useState([{ id: 1, value: '' }]);
    
    const handleInputChange = (id: number, newValue: string) => {
        setInputs(inputs.map(input => input.id === id ? { ...input, value: newValue } : input));
      };

      const addInputField = () => {
        const newId = inputs.length + 1;
        setInputs([...inputs, { id: newId, value: '' }]);
      };
      const handleSubmit = () => {
        console.log('Submitted:', inputs);
    };

    return (
        <div className='bg-[rgb(40,10,80)] text-white min-h-screen w-full'>
            <Header />
            <div>
                {inputs.map(input => (
                <InputField
                    key={input.id}
                    id={input.id}
                    value={input.value}
                    onChange={handleInputChange}
                />
                ))}
                <button onClick={addInputField} 
                className='hover:bg-[rgb(27,8,47)] p-5 text-[#a18aba] border-none rounded-md'>
                    Legg til nytt felt +</button><br />
                <button onClick={handleSubmit} className=''>
                    Lagre</button>
            </div>
    </div>
 );
};


export default AdminPersonalQuestionsPage;
