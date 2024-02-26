'use client';

import {
  DrinkingGameResponse,
  getDrinkingGameById,
} from '@/app/api/drinking_game';
import QuestionInputs from './_components/makeQuestions';

interface QuestionGameDetailsPageProps {
  params: { id: number };
}

const QuestionGameDetailsPage = async ({
  params,
}: QuestionGameDetailsPageProps) => {
  const questionGame: DrinkingGameResponse = await getDrinkingGameById(
    params.id,
  );

  return (
    <div className="flex justify-center bg-[rgb(40,10,80)] text-white min-h-screen w-full">
      <QuestionInputs />
    </div>
  );
};

export default QuestionGameDetailsPage;
