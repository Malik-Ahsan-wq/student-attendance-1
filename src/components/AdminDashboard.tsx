'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';

export default function AdminDashboard() {
  const { students, attendanceHistory } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

  const daysInMonth = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  }, [selectedMonth]);

  const monthData = useMemo(() => {
    // Filter history for selected month
    // attendanceHistory is [{ date: '2023-10-01', records: [...] }]
    const filtered = attendanceHistory.filter(r => r.date.startsWith(selectedMonth));
    
    // Map: day (number) -> { studentId -> status }
    const map: Record<number, Record<string, string>> = {};
    filtered.forEach(record => {
      const day = parseInt(record.date.split('-')[2], 10);
      if (!map[day]) map[day] = {};
      record.records.forEach(r => {
        map[day][r.studentId] = r.status;
      });
    });
    return map;
  }, [selectedMonth, attendanceHistory]);

  const stats = useMemo(() => {
    const res: Record<string, { P: number; A: number; L: number }> = {};
    students.forEach(s => {
      res[s.id] = { P: 0, A: 0, L: 0 };
    });

    Object.values(monthData).forEach(dayRecords => {
      Object.entries(dayRecords).forEach(([studentId, status]) => {
        if (res[studentId]) {
            if (status === 'Present') res[studentId].P++;
            else if (status === 'Absent') res[studentId].A++;
            else if (status === 'Late') res[studentId].L++;
        }
      });
    });
    return res;
  }, [students, monthData]);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  if (students.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
        <p className="text-gray-500 text-lg">No students found. Data will appear here once students are added.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Monthly Attendance Report</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of student attendance for the selected month</p>
        </div>
        <div>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 sticky left-0 bg-gray-50 z-10 border-r border-gray-200 min-w-[150px]">Student Name</th>
                {daysArray.map(day => (
                  <th key={day} className="px-1 py-3 text-center w-8 min-w-[32px] border-r border-gray-100">
                    {day}
                  </th>
                ))}
                <th className="px-2 py-3 text-center bg-green-50 text-green-700 border-l border-gray-200">P</th>
                <th className="px-2 py-3 text-center bg-red-50 text-red-700">A</th>
                <th className="px-2 py-3 text-center bg-yellow-50 text-yellow-700">L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => {
                const studentStats = stats[student.id] || { P: 0, A: 0, L: 0 };
                return (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2 font-medium text-gray-900 sticky left-0 bg-white hover:bg-gray-50 z-10 border-r border-gray-200">
                      <div className="truncate">{student.name}</div>
                      <div className="text-[10px] text-gray-400">{student.rollNo}</div>
                    </td>
                    {daysArray.map(day => {
                      const status = monthData[day]?.[student.id];
                      let colorClass = 'bg-gray-50'; // default empty
                      let text = '';
                      
                      if (status === 'Present') {
                        colorClass = 'bg-green-100 text-green-700';
                        text = 'P';
                      } else if (status === 'Absent') {
                        colorClass = 'bg-red-100 text-red-700';
                        text = 'A';
                      } else if (status === 'Late') {
                        colorClass = 'bg-yellow-100 text-yellow-700';
                        text = 'L';
                      }

                      return (
                        <td key={day} className="p-0 border-r border-gray-100">
                          <div className={`w-full h-8 flex items-center justify-center ${status ? colorClass : ''}`}>
                            {text}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-2 py-2 text-center font-bold text-green-600 border-l border-gray-200 bg-green-50/30">
                      {studentStats.P}
                    </td>
                    <td className="px-2 py-2 text-center font-bold text-red-600 bg-red-50/30">
                      {studentStats.A}
                    </td>
                    <td className="px-2 py-2 text-center font-bold text-yellow-600 bg-yellow-50/30">
                      {studentStats.L}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
