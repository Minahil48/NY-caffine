'use client';

import { CloudIcon, RemoveIcon } from "@/assets/common-icons";
import React, { useState, useRef, ChangeEvent } from "react";

interface DropDownProps {
  width?: string;
  onSelectImage?: (imageUrl: string) => void;
}

const ImageDropDown: React.FC<DropDownProps> = ({ width = "w-48", onSelectImage }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      processFiles(filesArray);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type);
      const isWithinSize = file.size <= 10 * 1024 * 1024;
      return isValidType && isWithinSize;
    });

    if (validFiles.length > 0) {
      const file = validFiles[0]; 
      const previewUrl = URL.createObjectURL(file);
      setSelectedFiles([file]);
      onSelectImage?.(previewUrl); // safe call
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles([]);
    onSelectImage?.(''); // safe call
  };

  return (
    <div className="flex flex-col items-start bg-white">
      <h2 className="text-sm font-medium text-gray-800 mb-4">Attach Image</h2>

      <div className="flex flex-wrap gap-3">
        {/* Drop zone */}
        <div
          onClick={handleBrowseClick}
          className={`h-40 ${width} flex flex-col items-center justify-center text-center border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 border-gray-300`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.svg"
            className="hidden"
          />
          {CloudIcon}

          <div className="flex gap-1">
            <span className="text-sm font-semibold text-gray-600">Browse</span>
            <span className="text-sm text-gray-400">an image</span>
          </div>
          <span className="text-xs text-gray-400 mt-1">Max size 10MB</span>
        </div>

        {/* Image preview */}
        {selectedFiles.map((file) => (
          <div
            key={file.name}
            className="relative h-20 w-20 overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-20 h-20 object-cover"
            />
            <button
              onClick={() => handleRemoveFile(file.name)}
              className="absolute top-2 right-2 bg-white bg-opacity-40 hover:bg-opacity-60 transition-opacity duration-200 text-white rounded-full p-1"
              aria-label="Remove image"
            >
              {RemoveIcon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageDropDown;
