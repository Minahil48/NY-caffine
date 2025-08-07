'use client';

import React, { useState } from 'react';
import CardsInput from '@/Components/CardsInput';
import AddButton from '../Menu/AddButton';
import DropDown from '../Menu/New-Item/ImageDropDown';
import ImageDropDown from '../Menu/New-Item/ImageDropDown';

interface AddCardProps {
  onClose: () => void;
  onAddReward: (reward: {
    headline: string;
    description: string;
    points: number;
    imageSrc: string;
  }) => void;
}

const AddReward: React.FC<AddCardProps> = ({ onClose, onAddReward }) => {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(''); // ✅ selected image from dropdown

  const [errors, setErrors] = useState({
    headline: '',
    description: '',
    points: '',
    image: '',
  });

  const handleAdd = () => {
    let hasError = false;
    const newErrors = { headline: '', description: '', points: '', image: '' };

    if (!headline.trim()) {
      newErrors.headline = 'Headline is required.';
      hasError = true;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required.';
      hasError = true;
    }

    const numericPoints = parseInt(points, 10);
    if (!points.trim()) {
      newErrors.points = 'Points are required.';
      hasError = true;
    } else if (numericPoints <= 0 || isNaN(numericPoints)) {
      newErrors.points = 'Points must be a number greater than 0.';
      hasError = true;
    }

    if (!selectedImage) {
      newErrors.image = 'Please select an image.';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      onAddReward({
        headline,
        description,
        points: numericPoints,
        imageSrc: selectedImage,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl relative w-115">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-xl font-medium mb-6">Add New Reward</h2>

          <div>
            <CardsInput
              label="Add Headline"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Vanilla Latte (medium)"
            />
            {errors.headline && <p className="text-red-500 text-sm mt-1">{errors.headline}</p>}
          </div>

          <div>
            <CardsInput
              label="Add Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Applies on order above $50"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <CardsInput
              label="Allocate Points"
              required
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="200"
            />
            {errors.points && <p className="text-red-500 text-sm mt-1">{errors.points}</p>}
          </div>

          <ImageDropDown width="w-100" onSelectImage={setSelectedImage} />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}

          <AddButton label="Add Reward" onClick={handleAdd} />
        </div>
      </div>
    </div>
  );
};

export default AddReward;
