import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/helperFuncs/admin';
import { userColumns } from './userColumns';
import DataTable from '@/components/ui/datatable';

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once


  if (loading) return (
    <div className="flex justify-center items-center min-h-screen  ">
      <img src="/src/assets/images/preloader.gif" alt="My Image" className="w-40 h-32" />
    </div>
  );
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div className='flex w-full h-full px-6'>
      {!!users.length && <DataTable columns={userColumns} data={users} filterCol="email" />}
      {!users.length && <div>No users found.</div>}
    </div>
  );
}
