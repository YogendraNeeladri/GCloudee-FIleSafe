"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Share2, Trash2, Eye, Download, Copy } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import type { TFile } from "@/lib/types";
import { FileIcon } from "@/components/file-icon";
import { UploadDialog } from "@/components/upload-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Image from "next/image";

const initialFiles: TFile[] = [
    { id: '1', name: 'Annual-Report-2023.pdf', type: 'application/pdf', size: 1234567, uploadDate: new Date('2023-10-26'), category: 'Documents', confidence: 0.95, url: 'https://placehold.co/800x1100.png' },
    { id: '2', name: 'product-launch-video.mp4', type: 'video/mp4', size: 54321098, uploadDate: new Date('2023-10-24'), category: 'Video', confidence: 0.88, url: 'https://placehold.co/1280x720.png' },
    { id: '3', name: 'logo-final-transparent.png', type: 'image/png', size: 45678, uploadDate: new Date('2023-10-22'), category: 'Image', confidence: 0.99, url: 'https://placehold.co/400x400.png' },
    { id: '4', name: 'main-app.js', type: 'application/javascript', size: 12345, uploadDate: new Date('2023-10-20'), category: 'Code', confidence: 0.92, url: 'https://placehold.co/800x400.png' },
];

export default function FilesPage() {
  const { toast } = useToast();
  const [files, setFiles] = useState<TFile[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<TFile | null>(null);
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  
  const handleUploadComplete = (newFile: TFile) => {
    setFiles((prevFiles) => [newFile, ...prevFiles]);
    toast({
      title: "Upload complete!",
      description: `${newFile.name} has been uploaded and categorized as ${newFile.category}.`,
    });
  };

  const handleShare = (file: TFile) => {
    setSelectedFile(file);
    setShareOpen(true);
  }

  const handlePreview = (file: TFile) => {
    setSelectedFile(file);
    setPreviewOpen(true);
  }

  const handleDelete = (fileId: string) => {
    setFiles(files => files.filter(f => f.id !== fileId));
    toast({
        title: "File Deleted",
        description: "The file has been moved to the trash.",
        variant: "destructive",
    })
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(selectedFile?.url || '');
    toast({
        title: "Link Copied",
        description: "Share link has been copied to your clipboard.",
    })
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">My Files</h1>
        <UploadDialog onUploadComplete={handleUploadComplete} />
      </div>

      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <FileIcon
                    category={file.category}
                    className="h-6 w-6 text-muted-foreground"
                  />
                </TableCell>
                <TableCell className="font-medium">{file.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{file.category}</Badge>
                </TableCell>
                <TableCell>{formatBytes(file.size)}</TableCell>
                <TableCell>{file.uploadDate.toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => handlePreview(file)}>
                        <Eye className="mr-2 h-4 w-4" /> Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => handleShare(file)}>
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" /> Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onSelect={() => handleDelete(file.id)}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {/* File Preview Sheet */}
      <Sheet open={isPreviewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{selectedFile?.name}</SheetTitle>
            <SheetDescription>
              {selectedFile?.category} - {selectedFile?.size && formatBytes(selectedFile.size)}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 flex items-center justify-center rounded-lg bg-muted p-4 h-[80%]">
            {selectedFile?.category === 'Image' ? (
                <Image src={selectedFile.url} alt={`Preview of ${selectedFile.name}`} width={400} height={400} className="max-h-full max-w-full object-contain" data-ai-hint="abstract image"/>
            ) : (
                <div className="flex flex-col items-center gap-4 text-center">
                    <FileIcon category={selectedFile?.category || 'Other'} className="h-24 w-24 text-muted-foreground" />
                    <p className="text-muted-foreground">No preview available for this file type.</p>
                    <Button>Download File</Button>
                </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Share Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setShareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share "{selectedFile?.name}"</DialogTitle>
            <DialogDescription>
              Anyone with the link can view this file.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="link">Shareable Link</Label>
                <div className="flex gap-2">
                    <Input id="link" defaultValue={selectedFile?.url} readOnly />
                    <Button size="icon" className="shrink-0" onClick={copyShareLink}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Permissions</Label>
                <RadioGroup defaultValue="view" className="flex gap-4">
                    <div>
                        <RadioGroupItem value="view" id="view" />
                        <Label htmlFor="view" className="ml-2">View Only</Label>
                    </div>
                     <div>
                        <RadioGroupItem value="edit" id="edit" />
                        <Label htmlFor="edit" className="ml-2">Can Edit</Label>
                    </div>
                </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShareOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
