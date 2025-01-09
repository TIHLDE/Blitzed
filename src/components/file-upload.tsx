"use client";

import { useState } from "react";
import { env } from "../env";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import compressImage from "browser-image-compression";
import { useToast } from "../hooks/use-toast";
import { useSession } from "next-auth/react";

export const blobToFile = (blob: Blob, name: string, type: string): File => {
  return new File([blob], name, { type });
};

const uploadFile = async (file: File, tihldeAccessToken: string) => {
  const compressedImage = await compressImage(file, {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 300,
    fileType: file.type,
  });

  const newFile = blobToFile(compressedImage, file.name, file.type);

  const data = new FormData();

  data.append("file", newFile);

  const response = await fetch(`${env.NEXT_PUBLIC_LEPTON_API_URL}/upload/`, {
    method: "POST",
    body: data,
    headers: {
      "X-CSRF-Token": tihldeAccessToken,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to upload file: ${response}`);
  }

  const body = await response.json();

  return body.url as string;
};

interface FileUploaderProps {
  onSelect: (url: string) => void;
}

export default function FileUploader({ onSelect }: FileUploaderProps) {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const { toast } = useToast();
  const { data } = useSession();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<undefined | string>(
    undefined,
  );

  const onChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setImageFile(file);
        if (file && data?.user.tihldeJWT) {
          const url = await uploadFile(file, data.user.tihldeJWT);
          setUploadedImageUrl(url!);

          toast({
            title: "Filen din ble lastet opp",
          });
          onSelect(url);
        } else {
          throw new Error("Du er ikke logget inn")
        }
      }
    } catch (e) {
      toast({
        title: "Oops, det skjedde noe galt",
        description: "Vennligst prøv igjen",
      });
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Last opp bilde</Label>
      <Input id="picture" type="file" onChange={onChanged} />
      {uploadedImageUrl && (
        <img src={uploadedImageUrl} alt="Ditt opplastede bilde" />
      )}
    </div>
  );
}
