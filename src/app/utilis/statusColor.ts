
export const getStatusDotColor = (status: string): string => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-500';
    case 'Completed':
      return 'bg-green-500';
    case 'Canceled':
      return 'bg-red-500';
    case 'Active':
      return 'bg-green-500';
    case 'Inactive':
      return 'bg-red-400';
    default:
      return 'bg-gray-300';
  }
};
