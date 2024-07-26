import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectGroup } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

const FilterSidebar = ({ filters, setFilters, petTypes, genders, breeds, sizes }) => {
  const handleCheckboxChange = (field, value) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters[field] || [];
      const updatedValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];
      return { ...prevFilters, [field]: updatedValues };
    });
  };

  const handleSelectChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const renderCheckboxGroup = (field, label, options) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <Checkbox
              id={`${field}-${option}`}
              checked={(filters[field] || []).includes(option)}
              onCheckedChange={(checked) => handleCheckboxChange(field, option)}
            />
            <Label htmlFor={`${field}-${option}`} className="ml-2 text-sm text-gray-700">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSelect = (field, label, options) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <Select onValueChange={(value) => handleSelectChange(field, value)} value={filters[field] || "All"}>
        <SelectTrigger className="w-full">{filters[field] || `Select ${label.toLowerCase()}`}</SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            <SelectItem value="All">All</SelectItem>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <ScrollArea className="h-full ">
      <div className=" p-4 bg-[#f8f9fa] space-y-6 h-full">
        {renderSelect("pet_type_single", "Pet Type ", [...petTypes, "Other"])}
        {renderSelect("pet_breed_name", "Breed", [...breeds, "Other"])}
        {renderCheckboxGroup("pet_age", "Age", ["Young", "Adult", "Senior"])}
        {renderCheckboxGroup("pet_sex", "Gender", genders)}
        {renderCheckboxGroup("pet_size", "Size", sizes)}
      </div>
    </ScrollArea>
  );
};

export default FilterSidebar;
