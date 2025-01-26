import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

interface ImageDrawerProps {
  images: { url: string; _id: string }[];
  taskName: string;
}

export const ImageDrawer: React.FC<ImageDrawerProps> = ({
  images,
  taskName,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Show Images</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Images for {taskName}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-4 overflow-y-auto max-h-[calc(100vh-100px)]">
          {images.map((image) => ( 
            <Image
              width={0}
              height={0}
              sizes="100vw"
              key={image._id}
              src={image.url || "/placeholder.svg"}
              alt={`Image for ${taskName}`}
              className="w-full h-auto object-cover rounded-md border border-black border-solid "
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
