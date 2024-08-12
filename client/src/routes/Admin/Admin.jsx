import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '@/components/ui/sidebar'; // Adjust the path as needed
import Dashboard from '@/components/AdminDashboard/AdminDashboard'; // Adjust the path as needed
import Users from '@/components/AdminUserList/AdminUserList'; // Adjust the path as needed
import Pets from '@/components/AdminPetsList/AdminPetsList'; // Adjust the path as needed
import AdoptionApplication from '@/components/AdminAdoptList/AdminAdoptList'; // Adjust the path as needed

function App() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/pets" element={<Pets />} />
                    <Route path="/adoption-application" element={<AdoptionApplication />} />
                    {/* Add a default route */}
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
