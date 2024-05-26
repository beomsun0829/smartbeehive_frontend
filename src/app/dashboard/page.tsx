// src/app/pages/dashboard/index.tsx

"use client";

import Chart from '../../components/chart';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="p-10 text-4xl font-bold text-blue-600">SmartBeehive Dashboard</h1>
      <div className="mt-10 w-full max-w-6xl">
        <Chart />
      </div>
    </div>
  );
}
