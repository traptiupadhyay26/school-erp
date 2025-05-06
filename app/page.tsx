'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState({
    studentCount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/students');
        setStats({
          studentCount: data.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-[#1a365d] text-white px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <Link href="/">School ERP</Link>
          </div>
          <div className="flex gap-6">
            <Link href="/" className="py-2 hover:underline">Dashboard</Link>
            <Link href="/students" className="py-2 hover:underline">Students</Link>
            <Link href="/students/add" className="py-2 hover:underline">Add Student</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-gray-800">School ERP Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Student Count Card */}
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h2 className="text-xl font-semibold mb-2 text-gray-700">Total Students</h2>
                  <p className="text-4xl font-bold text-[#2c5282]">{stats.studentCount}</p>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">Quick Actions</h2>
                  <div className="flex flex-col gap-3">
                    <Link href="/students/add" className="bg-[#2c5282] text-white py-2 px-4 rounded text-center hover:bg-[#1a365d] transition-colors">
                      Add New Student
                    </Link>
                    <Link href="/students" className="bg-gray-100 py-2 px-4 rounded text-center hover:bg-gray-200 transition-colors">
                      View All Students
                    </Link>
                  </div>
                </div>

                {/* System Info Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h2 className="text-xl font-semibold mb-4 text-gray-700">System Info</h2>
                  <div className="text-sm">
                    <p className="flex justify-between py-1 border-b">
                      <span>Version:</span>
                      <span className="font-medium">1.0.0</span>
                    </p>
                    <p className="flex justify-between py-1 border-b">
                      <span>Last Update:</span>
                      <span className="font-medium">May 6, 2025</span>
                    </p>
                    <p className="flex justify-between py-1">
                      <span>Status:</span>
                      <span className="text-green-600 font-medium">Online</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Activity</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <p className="text-gray-500">No recent activities to display</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <div className="max-w-6xl mx-auto">School ERP System © 2025 - All Rights Reserved</div>
      </footer>
    </div>
  );
}