'use client';

import React, { useState } from 'react';
import Header from '@/Components/Header';
import AddButton from '@/Components/Menu/AddButton';
import AddReward from '@/Components/Rewards/AddReward';
import RewardCard from '@/Components/Rewards/RewardCard';
import Sidebar from '@/Components/Sidebar';

function Page() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [rewards, setRewards] = useState([
    {
      imageSrc: '/Rewards/Img1.svg',
      title: 'Pack of 6 Glazed Donuts',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
    {
      imageSrc: '/Rewards/Img2.svg',
      title: 'Vanilla Latte',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
    {
      imageSrc: '/Rewards/Img3.svg',
      title: 'Chocolate Croissant',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
    {
      imageSrc: '/Rewards/Img3.svg',
      title: 'Chocolate Croissant',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
    {
      imageSrc: '/Rewards/Img2.svg',
      title: 'Vanilla Latte',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
     {
      imageSrc: '/Rewards/Img1.svg',
      title: 'Pack of 6 Glazed Donuts',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
     {
      imageSrc: '/Rewards/Img3.svg',
      title: 'Chocolate Croissant',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
    {
      imageSrc: '/Rewards/Img2.svg',
      title: 'Vanilla Latte',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
     {
      imageSrc: '/Rewards/Img1.svg',
      title: 'Pack of 6 Glazed Donuts',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
     {
      imageSrc: '/Rewards/Img3.svg',
      title: 'Chocolate Croissant',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
    {
      imageSrc: '/Rewards/Img2.svg',
      title: 'Vanilla Latte',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },
     {
      imageSrc: '/Rewards/Img1.svg',
      title: 'Pack of 6 Glazed Donuts',
      subtitle: 'Applies on order above $90',
      points: '200 Points',
    },

  ]);

  const handleAddReward = (newReward: {
    headline: string;
    description: string;
    points: number;
    imageSrc: string;
  }) => {
    setRewards((prev) => [
      ...prev,
      {
        imageSrc: newReward.imageSrc,
        title: newReward.headline,
        subtitle: newReward.description,
        points: `${newReward.points} Points`,
      },
    ]);
  };

  return (
    <div className="bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr]">
      <div><Sidebar /></div>
      <div className="flex flex-col gap-3 p-4 justify-center">
        <Header heading="Rewards" subheading="Manage your rewards from here" />
        <div className="flex flex-col p-5 bg-white rounded-2xl gap-3">
          <div className="flex justify-between mb-5">
            <h1 className="text-xl font-medium">Rewards</h1>
            <AddButton label="+ Add Reward" onClick={() => setShowAddCard(true)} />
          </div>

          {showAddCard && (
            <AddReward
              onClose={() => setShowAddCard(false)}
              onAddReward={handleAddReward}
            />
          )}

          <div className="flex gap-7 w-full justify-start flex-wrap">
            {rewards.map((reward, index) => (
              <RewardCard
                key={index}
                imageSrc={reward.imageSrc}
                title={reward.title}
                subtitle={reward.subtitle}
                points={reward.points}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
