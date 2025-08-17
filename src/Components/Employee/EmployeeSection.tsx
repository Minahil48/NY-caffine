'use client';

import React, { useState, useEffect } from 'react';
import { edit, Trash } from '@/assets/common-icons';
import OrderFilters from '@/components/order/Filters';
import { OrderSearch } from '@/components/order/Search';
import AddButton from '../menu/AddButton';
import AddEmployee from './AddEmployee';
import { getAllEmployees, addEmployee, deleteEmployee } from '@/lib/api/employee/employee';
import { UpdateUserDetails } from '@/lib/api/auth/settings/settings';
import DynamicTable from '../order/Table';

interface Employee {
  _id: string;
  Name: string;
  Email: string;
  Date: string;
  status: string;
}

const EmployeeShimmer: React.FC = () => (
  <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl animate-pulse">
    <div className="flex w-full justify-between items-center">
      <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
      <div className="h-8 w-40 bg-gray-300 rounded"></div>
    </div>

    <div className="flex flex-row justify-between w-full mt-3">
      <div className="h-10 w-32 bg-gray-200 rounded"></div>
      <div className="h-10 w-48 bg-gray-200 rounded"></div>
    </div>

    <div className="flex items-center justify-between pb-3 mt-4">
      <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
      <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
      <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
      <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
    </div>

    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="flex items-center justify-between pb-3">
        <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/5 bg-gray-200 rounded"></div>
        <div className="h-4 w-1/6 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

const EmployeeSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [tableData, setTableData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllEmployees();
      if (res.success && Array.isArray(res.data)) {
        const employees = res.data
          .filter((user: any) => user.role === 'employee')
          .map((emp: any) => ({
            _id: emp._id,
            Name: emp.name,
            Email: emp.email,
            Date: new Date(emp.createdAt).toLocaleDateString('en-CA'),
            status: emp.isActive ? 'Active' : 'Inactive',
          }));
        setTableData(employees);
      } else setError('Failed to load employees');
    } catch (err: any) {
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (employeeId: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      const res = await deleteEmployee(employeeId);
      if (!res.success) return;
      setTableData((prev) => prev.filter((emp) => emp._id !== employeeId));
    } catch (err) {
      console.error(err);
    }
  };


  const handleAddEmployee = async (formData: { Name: string; Email: string; Date: string }) => {
    try {
      const payload = {
        name: formData.Name,
        email: formData.Email,
        phone: '03438390230',
        isActive: true,
        password: '123456',
        role: 'employee' as const,
        extra: { branchId: '689a6e88210ce445b1ecf48a' },
      };
      const res = await addEmployee(payload);
      if (res.success && res.data) {
        setTableData((prev) => [
          ...prev,
          {
            _id: res.data._id,
            Name: payload.name,
            Email: payload.email,
            Date: formData.Date,
            status: payload.isActive ? 'Active' : 'Inactive',
          },
        ]);
        setShowAddCard(false);
      }
    } catch (err) {
      console.error(err);
    }
  };


  const handleEdit = async (updatedRow: Record<string, any>) => {
    try {
      const payload = { name: updatedRow.Name, email: updatedRow.Email };
      const res = await UpdateUserDetails(updatedRow.ID, payload);

      if (!res.success) return false;

      setTableData((prev) =>
        prev.map((emp) =>
          emp._id === updatedRow.ID
            ? { ...emp, Name: updatedRow.Name, Email: updatedRow.Email, Date: updatedRow.Date }
            : emp
        )
      );
      return true;
    } catch (err) {
      console.error('Error updating employee:', err);
      return false;
    }
  };

  const filteredEmployees = tableData.filter(
    (emp) =>
      emp.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedStatus ? emp.status === selectedStatus : true) &&
      (selectedDate ? emp.Date === selectedDate : true)
  );

  const mappedData = filteredEmployees.map((emp) => ({
    ID: emp._id,
    Name: emp.Name,
    Email: emp.Email,
    Date: emp.Date,
    status: emp.status,
  }));


  const actionIcons = [
    { icon: Trash, action: 'delete' },
    { icon: edit, action: 'edit' },
  ];

  if (loading) return <EmployeeShimmer />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-5 m-2 bg-white p-7 rounded-2xl">
      <div className="flex w-full justify-between">
        <h1 className="text-xl font-medium">All Employees</h1>
        <AddButton label="+ Add Employee" onClick={() => setShowAddCard(true)} />
      </div>

      <div className="flex flex-row justify-between w-full">
        <div className="flex gap-2">
          <OrderFilters
            label="By Status"
            options={[...new Set(tableData.map((emp) => emp.status))]}
            selected={selectedStatus}
            onSelect={setSelectedStatus}
          />
        </div>
        <OrderSearch value={searchTerm} onChange={setSearchTerm} />
      </div>

      <DynamicTable
        data={mappedData}
        icons={actionIcons}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {showAddCard && (
        <AddEmployee onClose={() => setShowAddCard(false)} onAddRow={handleAddEmployee} />
      )}
    </div>
  );
};

export default EmployeeSection;
