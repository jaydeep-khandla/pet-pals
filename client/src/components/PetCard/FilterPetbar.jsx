import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FilterSidebar = ({ filters, setFilters }) => {
  const petTypes = ["Dog", "Cat", "Rabbit", "Bird", "Other"];
  const genders = ["Male", "Female"];
  const breeds = ["Golden Retriever", "Labrador", "Persian", "Siamese", "Dwarf Rabbit", "Lop", "Parakeet", "Cockatiel"];

  return (
    <aside className="hidden md:block md:w-64 p-4 bg-gray-100 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div>
        <h3 className="font-semibold mb-2">Pet Type</h3>
        {petTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={`type-${type}`}
              checked={filters.petType.includes(type)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters({ ...filters, petType: [...filters.petType, type] });
                } else {
                  setFilters({ ...filters, petType: filters.petType.filter((t) => t !== type) });
                }
              }}
            />
            <Label htmlFor={`type-${type}`}>{type}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Breed</h3>
        <select className="w-full p-2 border rounded" value={filters.breed} onChange={(e) => setFilters({ ...filters, breed: e.target.value })}>
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Gender</h3>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center space-x-2">
            <Checkbox
              id={`gender-${gender}`}
              checked={filters.gender.includes(gender)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters({ ...filters, gender: [...filters.gender, gender] });
                } else {
                  setFilters({ ...filters, gender: filters.gender.filter((g) => g !== gender) });
                }
              }}
            />
            <Label htmlFor={`gender-${gender}`}>{gender}</Label>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;
