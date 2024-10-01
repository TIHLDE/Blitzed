import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export default function CreateQuestionPage() {
    return (
        <div>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Opprett en ny 100 spørsmål</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="title">Tittel</Label>
                                <Input id="title" placeholder="Feks Tihlde Plask" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="icon">Ikon</Label>
                            </div>
                        </div> 
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </div>
    )
}