import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AddQuestion from './addQuestion';

const QuestionInputs = () => {
    return (
       <form className="max-w-lg w-full mt-32">
        <Card>
            <CardHeader>
                <CardTitle>
                    Legg til spørsmålene dine
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <AddQuestion />   
            </CardContent>
            <CardFooter className='space-y-6'>
                <div>
                    <Label>Dine spørsmål</Label>
                </div>
                {/* <ul>
                    {questions.map((question) => ( 
                    <li key={question.id}>
                        {question.description}
                        </li>
                    ))}
                </ul> */}
            </CardFooter>
        </Card>
      </form> 
    )

}

export default QuestionInputs;
