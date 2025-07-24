import type { LucideProps } from "lucide-react";
import {
  File,
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileText,
  FileVideo,
} from "lucide-react";

type FileIconProps = {
  category: string;
} & LucideProps;

export function FileIcon({ category, ...props }: FileIconProps) {
  switch (category) {
    case "Image":
      return <FileImage {...props} />;
    case "Video":
      return <FileVideo {...props} />;
    case "Audio":
      return <FileAudio {...props} />;
    case "Documents":
      return <FileText {...props} />;
    case "Code":
      return <FileCode {...props} />;
    case "Archives":
      return <FileArchive {...props} />;
    default:
      return <File {...props} />;
  }
}
