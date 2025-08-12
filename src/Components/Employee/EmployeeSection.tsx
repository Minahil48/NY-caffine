'use client';

import React, { useState, useEffect } from 'react';
import { edit, Trash } from '@/assets/common-icons';
import OrderFilters from '@/components/order/Filters';
import { OrderSearch } from '@/components/order/Search';
import DynamicTable from '@/components/order/Table';
import AddButton from '../menu/AddButton';
import AddEmployee from './AddEmployee';
import { getAllEmployees, addEmployee, deleteEmployee } from '@/lib/api/employee/employee';

interface Employee {
  _id: string;
  Name: string;
  Email: string;
  Date: string;
  status: string;
}

const EmployeeSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [tableData, setTableData] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


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
      } else {
        setError('Failed to load employees');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (employeeId: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    try {
      const res = await deleteEmployee(employeeId);
      if (!res.success) {
        console.error('Failed to delete employee:', res.message);
        return;
      }
      setTableData((prev) => prev.filter((emp) => emp._id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
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
      } else {
        console.error('Failed to add employee:', res.message);
      }
    } catch (err) {
      console.error('Error adding employee:', err);
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

  if (loading) return <p>Loading employees...</p>;
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
      />

      {showAddCard && (
        <AddEmployee
          onClose={() => setShowAddCard(false)}
          onAddRow={handleAddEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeSection;
