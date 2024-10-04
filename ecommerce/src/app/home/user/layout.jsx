"use client"

import Link from 'next/link';
import React, { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
      const username = localStorage.getItem('user');
      setUser(username);
  }, []);

  const onLogoutSubmit = () => {
    setLoading(true); 
    setTimeout(() => {
      localStorage.removeItem('cart'); 
      localStorage.removeItem('username'); 
      router.push('/auth'); 
    }, 1000); 
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-500 text-white flex-shrink-0">
        <div className="p-4 text-justify">
          <h1 className="text-2xl font-bold text-center m-2">{user?user:"User"}</h1>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="userDetails/" className="block py-2 px-4 hover:bg-gray-700 rounded">
                User Details
              </Link>
            </li>
            <li>
              <Link href="allCart/" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Wish List
              </Link>
            </li>
            <li>
              <Link href="trackOrder/" className="block py-2 px-4 hover:bg-gray-700 rounded">
                Track Order
              </Link>
            </li>
            <li
              className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer"
              onClick={onLogoutSubmit}
            >
        
              {loading ? 'Logging out...' : 'Logout'}
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
