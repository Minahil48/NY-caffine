'use client';

import React, { useState, useEffect } from 'react';
import AddButton from '@/components/menu/AddButton';
import AddReward from '@/components/rewards/AddReward';
import RewardCard from '@/components/rewards/RewardCard';
import RewardsShimmer from './loading';

import { getAllRewards, addReward } from '@/lib/api/rewards/reward';

interface Reward {
  _id: string;
  headline: string;
  description: string;
  allocatePoints: number;
  image: string;
}

function RewardPage() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRewards() {
      try {
        setLoading(true);
        const data = await getAllRewards();
        if (data.success && Array.isArray(data.rewards)) {
          setRewards(data.rewards);
        } else {
          setError("Failed to load rewards");
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load rewards');
      } finally {
        setLoading(false);
      }
    }

    fetchRewards();
  }, []);

  const handleAddReward = async (newReward: {
    headline: string;
    description: string;
    points: number;
    imageSrc: string;
  }) => {
    setError(null);
    try {
      const res = await addReward({
        headline: newReward.headline,
        description: newReward.description,
        allocatePoints: newReward.points,
        image: newReward.imageSrc,
      });
      console.log('Add Reward API response:', res);

      if (res.success && res.data) {
        setRewards(prev => [...prev, res.data]);
        setShowAddCard(false);
      } else {
        setError("Failed to add reward");
      }
    } catch (err: any) {
      setError(err.message || "Failed to add reward");
    }
  };


  if (loading) return <RewardsShimmer />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
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
        {rewards.map((reward) => (
          <RewardCard
            key={reward._id}
            imageSrc={reward.image}
            title={reward.headline}
            subtitle={reward.description}
            points={`${reward.allocatePoints} Points`}
          />
        ))}
      </div>
    </div>
  );
}

export default RewardPage;
