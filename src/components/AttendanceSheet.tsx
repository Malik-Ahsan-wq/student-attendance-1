'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { DailyAttendance, AttendanceStatus } from '@/types';

export default function AttendanceSheet() {
  const { students, saveAttendance, getAttendanceForDate } = useApp();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const existing = getAttendanceForDate(date);
    if (existing) {
      const map: Record<string, AttendanceStatus> = {};
      existing.forEach(r => map[r.studentId] = r.status);
      setAttendance(map);
      setIsSaved(true);
    } else {
      setAttendance({});
      setIsSaved(false);
    }
  }, [date, getAttendanceForDate]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
    setIsSaved(false);
  };

  const isAllMarked = students.length > 0 && students.every(s => attendance[s.id]);

  const handleSave = () => {
    const records: DailyAttendance[] = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status
    }));
    saveAttendance(date, records);
    setIsSaved(true);
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
        <p className="text-gray-500 text-lg">No students found. Please add students first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Mark Attendance</h2>
          <p className="text-sm text-gray-500 mt-1">Select date and mark status for all students</p>
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Father Name</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => {
                const status = attendance[student.id];
                return (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{student.rollNo}</td>
                    <td className="px-6 py-4 text-gray-700">{student.name}</td>
                    <td className="px-6 py-4 text-gray-700">{student.className}</td>
                    <td className="px-6 py-4 text-gray-700">{student.fatherName}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2 sm:gap-4">
                        {(['Present', 'Absent', 'Late'] as const).map((s) => (
                          <label key={s} className={`
                            relative flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-md cursor-pointer border transition-all select-none
                            ${status === s 
                              ? s === 'Present' ? 'bg-green-100 border-green-500 text-green-700' 
                              : s === 'Absent' ? 'bg-red-100 border-red-500 text-red-700' 
                              : 'bg-yellow-100 border-yellow-500 text-yellow-700'
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                          `}>
                            <input
                              type="radio"
                              name={`attendance-${student.id}`}
                              value={s}
                              checked={status === s}
                              onChange={() => handleStatusChange(student.id, s)}
                              className="sr-only"
                            />
                            <span className="font-medium text-xs sm:text-sm">{s}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!isAllMarked}
            className={`
              px-8 py-3 rounded-md font-semibold text-white shadow-sm transition-all
              ${isAllMarked 
                ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
                : 'bg-gray-300 cursor-not-allowed'}
            `}
          >
            {isSaved ? 'Updated' : 'Save Attendance'}
          </button>
        </div>
      </div>
    </div>
  );
}
