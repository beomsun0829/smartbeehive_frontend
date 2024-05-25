// src/components/Sidebar.tsx

"use client";

import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">Menu</h1>
      </div>
      <nav className="mt-10">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/">
              Dashboard
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/reports">
              Reports
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <Link href="/settings">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
