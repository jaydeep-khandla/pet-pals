import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FilterSidebar = ({ filters, setFilters, petTypes, genders, breeds, sizes, ages }) => {
  // const petTypes = ["Dog", "Cat", "Rabbit", "Bird", "Other"];
  // const genders = ["Male", "Female"];
  // const breeds = ["Golden Retriever", "Labrador", "Persian", "Siamese", "Dwarf Rabbit", "Lop", "Parakeet", "Cockatiel"];

  return (
    <aside className=" md:w-64 p-4 bg-[#f8f9fa] space-y-6 h-full ">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div>
        <h3 className="font-semibold mb-2 ">Pet Type</h3>
        {petTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              className="m-1"
              id={`type-${type}`}
              checked={filters.pet_type.includes(type)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters({ ...filters, pet_type: [...filters.pet_type, type] });
                } else {
                  setFilters({ ...filters, pet_type: filters.pet_type.filter((t) => t !== type) });
                }
              }}
            />
            <Label htmlFor={`type-${type}`}>{type}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Breed</h3>
        <select
          className="w-full p-2 border rounded"
          value={filters.pet_breed_name}
          onChange={(e) => setFilters({ ...filters, pet_breed_name: e.target.value })}
        >
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
              className="m-1"
              id={`gender-${gender}`}
              checked={filters.pet_sex.includes(gender)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters({ ...filters, pet_sex: [...filters.pet_sex, gender] });
                } else {
                  setFilters({ ...filters, pet_sex: filters.pet_sex.filter((g) => g !== gender) });
                }
              }}
            />
            <Label htmlFor={`gender-${gender}`}>{gender}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Size</h3>
        {sizes.map((size) => (
          <div key={size} className="flex items-center space-x-2">
            <Checkbox
              className="m-1"
              id={`size-${size}`}
              checked={filters.pet_size.includes(size)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilters({ ...filters, pet_size: [...filters.pet_size, size] });
                } else {
                  setFilters({ ...filters, pet_size: filters.pet_size.filter((s) => s !== size) });
                }
              }}
            />
            <Label htmlFor={`size-${size}`}>{size}</Label>
          </div>
        ))}
      </div>
      <div class="flex justify-center items-center  ">
        <Button className="bg-bgred "> Filter Pet</Button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
