"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getCategoryForFile } from "@/app/dashboard/actions";
import type { TFile } from "@/lib/types";

type UploadDialogProps = {
  onUploadComplete: (file: TFile) => void;
};

export function UploadDialog({ onUploadComplete }: UploadDialogProps) {
  const [isOpen, setOpen] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [isComplete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const resetState = () => {
    setUploading(false);
    setComplete(false);
    setProgress(0);
    setSelectedFile(null);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetState();
    }
    setOpen(open);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        setProgress(percentage);
      }
    };

    reader.onload = async (e) => {
      // Simulate categorization delay
      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const fileDataUri = e.target?.result as string;
      const { category, confidence, error } = await getCategoryForFile({
        filename: selectedFile.name,
        fileDataUri,
      });

      if (error) {
        toast({ title: "Categorization Failed", description: error, variant: "destructive" });
        resetState();
        setOpen(false);
        return;
      }
      
      const newFile: TFile = {
        id: crypto.randomUUID(),
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        uploadDate: new Date(),
        category,
        confidence,
        url: `https://example.com/files/${selectedFile.name}`,
      };
      
      onUploadComplete(newFile);
      setComplete(true);
      
      // Close dialog after a delay
      setTimeout(() => {
        handleOpenChange(false);
      }, 1500);
    };

    reader.onerror = () => {
        toast({ title: "File Read Error", description: "Could not read the selected file.", variant: "destructive" });
        setUploading(false);
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload File
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Choose a file to upload. It will be automatically categorized.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!isUploading && !isComplete && (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">File</Label>
                <Input id="picture" type="file" onChange={handleFileChange} />
              </div>
            )}
            {(isUploading || isComplete) && (
              <div className="flex flex-col items-center gap-2">
                {isComplete ? (
                    <>
                        <CheckCircle className="h-12 w-12 text-green-500" />
                        <p className="font-medium">Upload Complete!</p>
                    </>
                ) : (
                    <>
                        <p className="font-medium">Uploading "{selectedFile?.name}"</p>
                        <Progress value={progress} className="w-[60%]" />
                        <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
                        {progress === 100 && <p className="text-sm text-muted-foreground animate-pulse">Categorizing...</p>}
                    </>
                )}
              </div>
            )}
          </div>
          {!isUploading && !isComplete && (
            <DialogFooter>
              <Button type="submit" disabled={!selectedFile}>
                Upload
              </Button>
            </DialogFooter>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
