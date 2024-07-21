import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchEngine = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSearch = () => {
    onSearch({ city, postalCode });
  };

  return (
    <div className="flex space-x-4 p-4">
      <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <Input placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchEngine;
