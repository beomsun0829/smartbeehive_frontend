// src/components/Sidebar.tsx

"use client";

import Link from 'next/link';

const menu = ['Dashboard', 'Reports', 'Settings'];

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-5 align-center">
        <h1 className="text-xl font-bold">SmartBeehive</h1>
      </div>
      <nav className="mt-10">
        <ul>
          {menu.map((item) => {
            return (
              <Link href={`/${item.toLowerCase()}`}>
                <li key={item} className="px-4 py-2 hover:bg-gray-700">
                  {item}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
