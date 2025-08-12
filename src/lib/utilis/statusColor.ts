
export const getStatusDotColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'completed':
      return 'bg-green-500';
    case 'canceled':
      return 'bg-red-500';
    case 'active':
      return 'bg-green-500';
    case 'inactive':
      return 'bg-red-400';
    default:
      return 'bg-gray-300';
  }
};
