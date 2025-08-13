import DetailsCard from '@/components/customers/DetailsCard';
import DetailsTable from '@/components/customers/DetailsTable';
import React from 'react';

interface CustomerDetailsPageProps {
  params: {
    id: string;
  };
}

function CustomerDetailsPage({ params }: CustomerDetailsPageProps) {
  const { id } = params;

  return (
    <div className="flex flex-col gap-3 p-4 justify-center">
      <DetailsCard customerId={id}/>
      <DetailsTable customerId={id} />
    </div>
  );
}

export default CustomerDetailsPage;
