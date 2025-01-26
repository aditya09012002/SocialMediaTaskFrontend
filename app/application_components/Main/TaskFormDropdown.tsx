"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, X, Upload } from "lucide-react";
import Image from "next/image";
import { useSubmitTask } from "@/app/client/lib/react-query/TaskHooks";
import toast from "react-hot-toast";

type TaskFormDrowdownProps = {
  invalidateCurrentPage: () => void;
};

const TaskFormDropdown: React.FC<TaskFormDrowdownProps> = ({
  invalidateCurrentPage,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitTask = useSubmitTask();

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      await submitTask.mutateAsync(formData);
      toast.success("Task submitted successfully!");
      invalidateCurrentPage();
      setImages([]);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Failed to submit task:", error);
      toast.error("Failed to submit task. Please try again.");
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 mb-2">
      <Button
        onClick={toggleForm}
        variant="outline"
        className="w-full justify-between text-left font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <span>{isFormVisible ? "Hide Form" : "Add Entry"}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isFormVisible ? "rotate-180 transform" : ""
          }`}
        />
      </Button>

      {isFormVisible && (
        <Card className="border p-6 shadow-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="socialMediaHandle"
                  className="text-sm font-medium"
                >
                  Social Media Handle
                </Label>
                <Input
                  id="socialMediaHandle"
                  name="socialMediaHandle"
                  placeholder="Enter handle (e.g., @username)"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images" className="text-sm font-medium">
                  Upload Images
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Images
                  </Button>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        src={image || "/placeholder.svg"}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
              {submitTask.isPending ? "Submitting":"Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskFormDropdown;
