"use client";

import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "../../../components/ui/card";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { PlusIcon } from "lucide-react";

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
  return (
    <div className="mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold"> Opprett en ny 100 spørsmål </h1>
      <div className="flex w-80 space-x-2">
        <input
          placeholder="Feks 'Hvem er best på takta'"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={addQuestion} size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>
      <h2 className="text-xl font-semibold">Dine spørsmål</h2>
      <ul className="space-y-2">
        {questions.map((question, index) => (
          <li key={index} className="rounded-lg bg-white p-3 shadow">
            <span className="mr-2 font-bold">#{index + 1}</span>
            {question}
          </li>
        ))}
      </ul>
      <Button className="w-full" onClick={() => alert("Spørsmål lagret!")}>
        Lagre
      </Button>
    </div>
  );
}
