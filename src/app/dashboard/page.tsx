import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon } from "@/components/file-icon";
import { formatBytes } from "@/lib/utils";
import type { TFile } from "@/lib/types";
import { HardDrive, File as FileIconLucide, Users } from "lucide-react";
import Image from "next/image";

const recentFiles: TFile[] = [
  {
    id: "1",
    name: "Project-Alpha-Brief.pdf",
    size: 120489,
    type: "application/pdf",
    category: "Documents",
    confidence: 0.9,
    uploadDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    url: "https://placehold.co/600x400.png",
  },
  {
    id: "2",
    name: "Q3-financials.xlsx",
    size: 2500123,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    category: "Documents",
    confidence: 0.95,
    uploadDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    url: "https://placehold.co/600x400.png",
  },
  {
    id: "3",
    name: "Website-mockup-v3.png",
    size: 3102480,
    type: "image/png",
    category: "Image",
    confidence: 0.98,
    uploadDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    url: "https://placehold.co/600x400.png",
  },
  {
    id: "4",
    name: "Team-meeting-rec.mp4",
    size: 125890123,
    type: "video/mp4",
    category: "Video",
    confidence: 0.88,
    uploadDate: new Date(new Date().setDate(new Date().getDate() - 5)),
    url: "https://placehold.co/600x400.png",
  },
];


export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileIconLucide className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,257</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27.4 GB</div>
            <p className="text-xs text-muted-foreground">
              out of 100 GB
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shared Files</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+52</div>
            <p className="text-xs text-muted-foreground">
              3 active shares
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
            <CardDescription>
              An overview of your most recently uploaded files.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {recentFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <FileIcon category={file.category} className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="grid flex-1 gap-1">
                    <p className="font-medium">{file.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{formatBytes(file.size)}</span>
                      <span className="text-xs">•</span>
                      <span>{file.category}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {file.uploadDate.toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
