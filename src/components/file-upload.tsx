import { env } from "../env";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import compressImage from "browser-image-compression";

interface FileUploaderProps {
  onUploaded: () => void;
}

export const blobToFile = (blob: Blob, name: string, type: string): File => {
  return new File([blob], name, { type });
};

const uploadFile = async (file: File) => {
  const compressedImage = await compressImage(file, {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1500,
  });

  const newFile = blobToFile(compressedImage, file.name, file.type);

  const response = await fetch(`${env.LEPTON_API_URL}/upload`, {
    method: "POST",
    body: newFile,
  });

  const body = await response.json();
};

export default function FileUploader() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Last opp bilde</Label>
      <Input id="picture" type="file" />
    </div>
  );
}
