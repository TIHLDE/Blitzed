import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import AddQuestion from './dialog';

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
            <CardFooter>
                <div>
                    <Label>Dine spørsmål</Label>
                </div>
            </CardFooter>
        </Card>
      </form> 
    )
}

export default QuestionInputs;

