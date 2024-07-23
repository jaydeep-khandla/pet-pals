import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FilterSidebar = ({ filters, setFilters, petTypes, genders, breeds, sizes, ages }) => {
  // Provide default values for props in case they're undefined
  const safeFilters = filters || {};
  const safePetTypes = petTypes || [];
  const safeGenders = genders || [];
  const safeBreeds = breeds || [];
  const safeSizes = sizes || [];

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = Array.isArray(prevFilters[filterType])
        ? prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value]
        : value;

      return {
        ...prevFilters,
        [filterType]: updatedFilter,
      };
    });
  };

  return (
    <aside className="md:w-64 p-4 bg-[#f8f9fa] space-y-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div>
        <h3 className="font-semibold mb-2">Pet Type</h3>
        {safePetTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              className="m-1"
              id={`type-${type}`}
              checked={safeFilters.pet_type?.includes(type) || false}
              onCheckedChange={(checked) => handleFilterChange("pet_type", type)}
            />
            <Label htmlFor={`type-${type}`}>{type}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Breed</h3>
        <select
          className="w-full p-2 border rounded"
          value={safeFilters.pet_breed_name || ""}
          onChange={(e) => handleFilterChange("pet_breed_name", e.target.value)}
        >
          <option value="">All Breeds</option>
          {safeBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Gender</h3>
        {safeGenders.map((gender) => (
          <div key={gender} className="flex items-center space-x-2">
            <Checkbox
              className="m-1"
              id={`gender-${gender}`}
              checked={safeFilters.pet_sex?.includes(gender) || false}
              onCheckedChange={(checked) => handleFilterChange("pet_sex", gender)}
            />
            <Label htmlFor={`gender-${gender}`}>{gender}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Size</h3>
        {safeSizes.map((size) => (
          <div key={size} className="flex items-center space-x-2">
            <Checkbox
              className="m-1"
              id={`size-${size}`}
              checked={safeFilters.pet_size?.includes(size) || false}
              onCheckedChange={(checked) => handleFilterChange("pet_size", size)}
            />
            <Label htmlFor={`size-${size}`}>{size}</Label>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <Button className="bg-bgred">Filter Pet</Button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
