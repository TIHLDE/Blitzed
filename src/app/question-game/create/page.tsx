import { QuestionGameForm } from "~/components/questiongame/form";


export default function CreateQuestionPage() {
    return (
        <main className="w-full h-[80vh] py-12 px-2 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold">
                    Opprett en ny 100 spørsmål
                </h1>
                <p className="text-sm text-secondary-foreground">
                    Her kan du lage din personlige “100 spørsmål”
                </p>
            </div>
            
            <QuestionGameForm />
        </main>
    )
}