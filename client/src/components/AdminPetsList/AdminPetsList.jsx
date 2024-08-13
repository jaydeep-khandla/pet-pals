import React, { useState, useEffect } from 'react';
import { getAllPets } from '@/helperFuncs/admin';
import { petColumns } from './petColumns';
import DataTable from '@/components/ui/datatable';

export default function AdminPetsList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await getAllPets();
        setPets(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []); // Empty dependency array ensures this runs only once


  if (loading) return (
    <div className="flex justify-center items-center min-h-screen  ">
      <img src="/src/assets/images/preloader.gif" alt="My Image" className="w-40 h-32" />
    </div>
  );
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div className='flex w-full h-full px-6'>
      {!!pets.length && <DataTable columns={petColumns} data={pets} filterCol="pet_name" />}
      {!pets.length && <div>No users found.</div>}
    </div>
  );
}
