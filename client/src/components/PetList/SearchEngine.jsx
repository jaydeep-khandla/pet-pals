import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchEngine = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSearch = () => {
    onSearch({ searchTerm, city, postalCode });
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white border rounded shadow-md">
      <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full md:w-1/2 ml-2" />
      <Input placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full md:w-1/2" />
      <Button onClick={handleSearch} className="w-full md:w-auto bg-bgred ">
        Search
      </Button>
    </div>
  );
};

export default SearchEngine;
