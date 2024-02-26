import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

const AddQuestion = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Legg til spørsmål</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Skriv et spørsmål</DialogTitle>
                        <DialogDescription>
                            Feks "Hvem er den største forbrukeren av Tihlder?"
                        </DialogDescription>
                </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Input id="name" className="col-span-4" />
                        </div>
                    </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddQuestion;
