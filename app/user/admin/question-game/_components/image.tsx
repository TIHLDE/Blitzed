import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

const HandleImage = () => {

    const [image, setImage] = useState("");
    const handleSelectedImage = (event) => {
        const file = event.target.file[0]
        setImage("")
    }

    return(
        <div >
        <Label htmlFor="icon">Logo</Label>
        <Input name="icon" type="file"
        onChange={handleSelectedImage}/>   
        </div>     
    )
}

export default HandleImage;