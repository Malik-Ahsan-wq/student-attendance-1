'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function StudentManager() {
  const { students, addStudent, deleteStudent } = useApp();
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [className, setClassName] = useState('');
  const [fatherName, setFatherName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rollNo.trim() || !className.trim() || !fatherName.trim()) return;
    
    // Check for duplicate roll no
    if (students.some(s => s.rollNo === rollNo)) {
      alert('Roll Number already exists!');
      return;
    }

    addStudent({ name, rollNo, className, fatherName });
    setName('');
    setRollNo('');
    setClassName('');
    setFatherName('');
  };

  const addSampleStudents = () => {
    const samples = [
      { name: 'John Doe', rollNo: '101', className: '10th', fatherName: 'Richard Doe' },
      { name: 'Jane Smith', rollNo: '102', className: '10th', fatherName: 'Robert Smith' },
      { name: 'Michael Johnson', rollNo: '103', className: '10th', fatherName: 'David Johnson' },
      { name: 'Emily Davis', rollNo: '104', className: '10th', fatherName: 'William Davis' },
      { name: 'Robert Wilson', rollNo: '105', className: '10th', fatherName: 'Thomas Wilson' }
    ];

    let addedCount = 0;
    samples.forEach(sample => {
      if (!students.some(s => s.rollNo === sample.rollNo)) {
        addStudent(sample);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      alert(`${addedCount} sample students added successfully!`);
    } else {
      alert('Sample students already exist!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Student</h2>
          <button
            type="button"
            onClick={addSampleStudents}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            Load Sample Data
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Roll No"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Class"
              required
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Father Name</label>
            <input
              type="text"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Father Name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
          >
            Add Student
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Student List</h2>
          <span className="text-sm text-gray-500 font-medium">{students.length} Students</span>
        </div>
        
        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No students added yet. Add some students to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Roll No</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Father Name</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{student.rollNo}</td>
                    <td className="px-6 py-3 text-gray-700">{student.name}</td>
                    <td className="px-6 py-3 text-gray-700">{student.className}</td>
                    <td className="px-6 py-3 text-gray-700">{student.fatherName}</td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => deleteStudent(student.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-xs bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
