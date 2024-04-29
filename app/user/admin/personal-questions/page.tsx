'use client';
import React from 'react';
import { useState } from 'react';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"



const InputField = ({ id, value, onChange }: 
      { id: number, value: string, onChange:
      (id: number, newValue: string) => void}) =>{
    return (

      <div className='flex flex-wrap p-3 ml-3 mr-14 rounded-md'>
        <div className="box-content h-10 w-8">
            <Label>{id}</Label>
        </div>
        <div>
            <Input type="text" value={value} onChange={(e) => onChange(id, e.target.value)} 
            className='border-b-2 border-gray-500 text-black dark:text-white 
            h-10 p-4 dark:bg-[rgb(21,24,49)]'/>
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
        inputs.length < 100 ?
        setInputs([...inputs, { id: newId, value: '' }])
        : console.log('maximum limit');
      };

      const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
        const pastedData = event.clipboardData.getData('text');
        const pastedQuestions = pastedData.split('\n').map((question, index) => ({ id: index + 1, value: question }));
        setInputs(pastedQuestions);
    }

       const handleSubmit = () => {
            
        }

      const editSubmit = () => {
        console.log('edit:', inputs);
      }

    return (
        <div className='flex flex-col bg-[rgb(40,10,80)] text-white min-h-screen w-full'>
            <div>
                <div className='p-3 ml-20 text-xl text-[#d8cde4]'>
                    Legg til spørsmål
                </div>
                <textarea 
                    placeholder="Lim inn spørsmålene her." 
                    onPaste={handlePaste}
                    className="p-3 ml-9 mr-14 rounded-md border-gray-500 border text-black dark:text-white dark:bg-[rgb(21,24,49)] focus:outline-none"
                    style={{ minHeight: '100px', minWidth: '300px' }}
                    />
                    
                {inputs.map(input => (
                <InputField
                    key={input.id}
                    id={input.id}
                    value={input.value}
                    onChange={handleInputChange}
                />
                ))}
                
                   <div className="m-6 p-6 pb-11 gap-3 ">
                    <Button onClick={addInputField} variant="outline"
                        className="bg-[rgb(40,10,80)] hover:bg-[rgb(146,108,186)] py-5 w-40 text-[#d8cde4]">
                        Legg til nytt felt + 
                    </Button>
                    <div className="flex flex-row wrap gap-1">
                        <Button onClick={handleSubmit} 
                            className="bg-[rgb(40,10,80)] text-[#d8cde4] hover:bg-[rgb(40,10,40)] border">
                                Lagre
                        </Button>
                        <Button onClick={editSubmit}
                            className="bg-[rgb(40,10,80)] text-[#d8cde4] hover:bg-[rgb(40,10,40)] border">
                                Rediger
                        </Button>
                    </div>
                  </div>
        </div>
    </div>
 );
};

export default AdminPersonalQuestionsPage;
