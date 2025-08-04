"use client";

import { CloudIcon, RemoveIcon } from "@/assets/common-icons";
import React, { useState, useRef, ChangeEvent } from "react";

interface DropDownProps {
  width?: string; // e.g., "w-48", "w-64", "w-full"
}

const DropDown: React.FC<DropDownProps> = ({ width = "w-48" }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type);
      const isWithinSize = file.size <= 10 * 1024 * 1024; // 10MB
      const isDuplicate = selectedFiles.some((f) => f.name === file.name && f.size === file.size);
      return isValidType && isWithinSize && !isDuplicate;
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex flex-col items-start bg-white">
      <h2 className="text-sm font-medium text-gray-800 mb-4">Attach Image(s)</h2>

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
            multiple
            accept=".jpg,.jpeg,.png,.svg"
            className="hidden"
          />
          {CloudIcon}

          <div className="flex gap-1">
            <span className="text-sm font-semibold text-gray-600">Browse</span>
            <span className="text-sm text-gray-400">Images here</span>
          </div>
          <span className="text-xs text-gray-400 mt-1">Max size 10MB</span>
        </div>

        {/* Previews */}
        {selectedFiles.map((file) => (
          <div
            key={file.name}
            className={`relative h-20 w-20 overflow-hidden rounded-xl shadow-md`}
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

export default DropDown;
