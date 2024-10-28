"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

export default function UserHomePage() {
  const [questions, setQuestions] = useState([
    "Har finest dialekt?",
    "Kommer til å gifte seg først?",
    "Nørder mest?",
    "Har dårligst musikksmak?",
    "Kunne du vært med på en øde øy med?",
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold"> Opprett en ny 100 spørsmål </h1>

      <div className="flex w-full space-x-2">
        <input
          placeholder="Feks 'Hvem er best på takta'"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-grow rounded-lg bg-white p-3 shadow"
          style={{ height: "48px" }}
        />

        <Button
          onClick={addQuestion}
          className="flex h-12 items-center justify-center"
          size="icon"
        >
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <h2 className="text-xl font-semibold">Dine spørsmål</h2>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded-lg bg-white p-3 shadow"
          >
            <div className="flex-grow">
              <span className="mr-2 w-full font-bold">#{index + 1}</span>
              {question}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteQuestion(index)}
              className="h-8 w-8 p-0"
            >
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only"> Delete question </span>
            </Button>
          </li>
        ))}
      </ul>
      <Button className="w-full" onClick={() => alert("Spørsmål lagret!")}>
        Lagre
      </Button>
    </div>
  );
}
