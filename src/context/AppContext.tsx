'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Student, AttendanceRecord, DailyAttendance } from '@/types';

interface AppContextType {
  students: Student[];
  attendanceHistory: AttendanceRecord[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
  saveAttendance: (date: string, records: DailyAttendance[]) => void;
  getAttendanceForDate: (date: string) => DailyAttendance[] | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    const savedAttendance = localStorage.getItem('attendanceHistory');
    
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedAttendance) setAttendanceHistory(JSON.parse(savedAttendance));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('attendanceHistory', JSON.stringify(attendanceHistory));
    }
  }, [attendanceHistory, isLoaded]);

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: crypto.randomUUID(),
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const saveAttendance = (date: string, records: DailyAttendance[]) => {
    setAttendanceHistory(prev => {
      const existingIndex = prev.findIndex(r => r.date === date);
      if (existingIndex >= 0) {
        const newHistory = [...prev];
        newHistory[existingIndex] = { date, records };
        return newHistory;
      }
      return [...prev, { date, records }];
    });
  };

  const getAttendanceForDate = (date: string) => {
    return attendanceHistory.find(r => r.date === date)?.records;
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AppContext.Provider value={{ students, attendanceHistory, addStudent, deleteStudent, saveAttendance, getAttendanceForDate }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
