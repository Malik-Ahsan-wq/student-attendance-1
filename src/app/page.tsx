'use client';

import React, { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import StudentManager from '@/components/StudentManager';
import AttendanceSheet from '@/components/AttendanceSheet';
import AdminDashboard from '@/components/AdminDashboard';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'mark' | 'students' | 'admin'>('mark');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const ADMIN_PASSWORD = '112233abc';

  const handleAdminClick = () => {
    if (activeTab === 'admin') return;
    setShowAdminLogin(true);
    setLoginError('');
    setPasswordInput('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setActiveTab('admin');
      setShowAdminLogin(false);
      setPasswordInput('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-slate-800">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Student Attendance
                </span>
                <p className="hidden sm:block text-xs text-slate-500">Track & Manage</p>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              {/* Desktop Tabs */}
              <div className="hidden sm:flex space-x-2 bg-slate-100/80 p-1.5 rounded-xl backdrop-blur-sm border border-slate-200/50">
                <button
                  onClick={() => setActiveTab('mark')}
                  className={`px-5 py-2.5 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'mark' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  Mark Attendance
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-5 py-2.5 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'students' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`px-5 py-2.5 cursor-pointer rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === 'admin' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  Admin Report
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Tabs */}
        <div className="sm:hidden border-t border-slate-200/50 bg-white/60 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-px bg-slate-200">
             <button
                onClick={() => setActiveTab('mark')}
                className={`py-3.5 text-xs cursor-pointer sm:text-sm font-semibold text-center transition-all duration-300 relative ${
                  activeTab === 'mark' 
                    ? 'bg-white text-indigo-600' 
                    : 'bg-white/80 text-slate-600'
                }`}
              >
                {activeTab === 'mark' && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                )}
                <div className="flex flex-col items-center space-y-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>Mark</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-3.5 text-xs cursor-pointer sm:text-sm font-semibold text-center transition-all duration-300 relative ${
                  activeTab === 'students' 
                    ? 'bg-white text-indigo-600' 
                    : 'bg-white/80 text-slate-600'
                }`}
              >
                {activeTab === 'students' && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                )}
                <div className="flex flex-col items-center space-y-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Students</span>
                </div>
              </button>
              <button
                onClick={handleAdminClick}
                className={`py-3.5 text-xs cursor-pointer sm:text-sm font-semibold text-center transition-all duration-300 relative ${
                  activeTab === 'admin' 
                    ? 'bg-white text-indigo-600' 
                    : 'bg-white/80 text-slate-600'
                }`}
              >
                {activeTab === 'admin' && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                )}
                <div className="flex flex-col cursor-pointer items-center space-y-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Admin</span>
                </div>
              </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab === 'mark' && <AttendanceSheet />}
          {activeTab === 'students' && <StudentManager />}
          {activeTab === 'admin' && <AdminDashboard />}
        </div>
      </main>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Admin Access Required</h3>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Password</label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Password"
                  autoFocus
                />
                {loginError && <p className="text-red-500 text-sm mt-1">{loginError}</p>}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Access Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}