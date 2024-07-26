import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";

const SearchEngine = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSearch = () => {
    onSearch({ citySearch: city, postalCodeSearch: postalCode });
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white border rounded-lg shadow-lg">
        <div className="relative w-full md:w-2/5">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-lg  transition-colors duration-300"
          />
        </div>
        <div className="relative w-full md:w-2/5">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-lg  transition-colors duration-300"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="w-full md:w-1/5 bg-bgred hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          <Search className="mr-2" />
          Search
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 text-center text-gray-600"
      >
        Find your perfect pet companion in your area!
      </motion.div>
    </motion.div>
  );
};

export default SearchEngine;
