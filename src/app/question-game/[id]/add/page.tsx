"use client";

import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { api } from "~/trpc/react";
import { usePathname } from "next/navigation";

const DEFAULT_QUESTIONS = [
  "Har finest dialekt?",
  "Kommer til å gifte seg først?",
  "Nørder mest?",
  "Har dårligst musikksmak?",
  "Kunne du vært med på en øde øy med?",
];

export default function AddQuestionsPage() {
  const id = parseInt(usePathname().split("/")[2]!);
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState("");

  const { data, isLoading, isError } =
    api.questionGame.question.getAll.useQuery({
      questionGameId: id,
    });

  useEffect(() => {
    if (data?.questions) {
      if (data.questions.length === 0) {
        setQuestions(DEFAULT_QUESTIONS);
      } else {
        setQuestions(data.questions.map((q) => q.question));
      }
    }
  }, [data]);

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions((prev) => [...prev, newQuestion]);
      setNewQuestion("");
    }
  };

  const deleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const createManyMutation = api.questionGame.question.createMany.useMutation();

  const handleSave = async () => {
    try {
      await createManyMutation.mutateAsync({
        questGameId: 1,
        questions,
      });
      alert("Spørsmål lagret i databasen!");
    } catch (error) {
      console.error(error);
      alert("Noe gikk galt under lagring :(");
    }
  };

  if (isLoading) {
    return <p>Laster spørsmål...</p>;
  }
  if (isError) {
    return <p>Kunne ikke laste spørsmål.</p>;
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-bold"> Legg til spørsmål </h1>

      <div className="flex w-full space-x-2">
        <input
          placeholder="Feks 'Hvem er best på takta'"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-grow rounded-lg bg-white p-3 shadow"
          style={{ height: "48px" }}
        />
        <Button onClick={addQuestion} size="icon">
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
            >
              <Trash2Icon className="h-4 w-4" />
              <span className="sr-only">Delete question</span>
            </Button>
          </li>
        ))}
      </ul>

      <Button className="w-full" onClick={handleSave}>
        Lagre
      </Button>
      <Button className="w-full" variant={"outline"}>
        <a href={"/question-game/" + id + "/"}>Tilbake til spill</a>
      </Button>
    </div>
  );
}
