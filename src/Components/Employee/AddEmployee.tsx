'use client';

import React, { useState } from 'react';
import CardsInput from '@/Components/CardsInput';
import AddButton from '../Menu/AddButton';
import { Calender } from '@/assets/common-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddCardProps {
  onClose: () => void;
  onAddRow: (newData: { Name: string; Email: string; Date: string; status: string; }) => void;
}

const AddEmployee: React.FC<AddCardProps> = ({ onClose, onAddRow }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [email, setEmail] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const [errors, setErrors] = useState({
    employeeName: '',
    email: '',
    joiningDate: '',
  });

  const validate = () => {
    const newErrors: typeof errors = {
      employeeName: '',
      email: '',
      joiningDate: '',
    };

    if (!employeeName.trim()) {
      newErrors.employeeName = 'Employee name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!joiningDate.trim()) {
      newErrors.joiningDate = 'Joining date is required.';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((msg) => msg !== '');
  };

  const handleSubmit = () => {
    if (validate()) {
      const newRow = {
        Name: employeeName,
        Email: email,
        Date: joiningDate,
        status: 'Active',
      };
      onAddRow(newRow);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl relative w-full max-w-md sm:max-w-lg lg:w-115">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-2xl"
        >
          ×
        </button>

        <div className="flex flex-col gap-5 justify-center">
          <h2 className="text-xl font-medium mb-4 sm:mb-6">New Employee</h2>

          <div>
            <CardsInput
              label="Employee Name"
              required
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Ahsan Khan"
            />
            {errors.employeeName && <p className="text-red-500 text-sm mt-1">{errors.employeeName}</p>}
          </div>

          <div>
            <CardsInput
              label="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ahsankhan@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <CardsInput
              label="Date of Joining"
              required
              value={joiningDate}
              onChange={() => {}}
              placeholder="Set a Date"
            />
            {errors.joiningDate && <p className="text-red-500 text-sm mt-1">{errors.joiningDate}</p>}

            <div
              className="border border-gray-300 w-8 h-8 rounded-full bg-secondary flex items-center justify-center cursor-pointer absolute top-7 right-2"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {Calender}
            </div>

            {showCalendar && (
              <div className="absolute right-0 top-[70px] z-50">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setSelectedDate(date);
                      setJoiningDate(date.toLocaleDateString());
                      setShowCalendar(false);
                    }
                  }}
                  inline
                />
              </div>
            )}
          </div>

          <AddButton label="Add Employee" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
