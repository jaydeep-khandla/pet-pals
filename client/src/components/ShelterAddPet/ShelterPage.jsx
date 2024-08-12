import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ShelterPage = () => {
  const [pet, setPet] = useState({
    name: "",
    breed: "",
    image: "",
    description: "",
    age: "",
    size: "",
    gender: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      });
      if (response.ok) {
        alert("Pet added successfully!");
        setPet({
          name: "",
          breed: "",
          image: "",
          description: "",
          age: "",
          size: "",
          gender: "",
        });
      } else {
        alert("Failed to add pet");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the pet");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Add a New Pet</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" value={pet.name} onChange={handleInputChange} placeholder="Pet Name" />
        <Input name="breed" value={pet.breed} onChange={handleInputChange} placeholder="Breed" />
        <Input name="image" value={pet.image} onChange={handleInputChange} placeholder="Image URL" />
        <Textarea name="description" value={pet.description} onChange={handleInputChange} placeholder="Description" />
        <Input name="age" value={pet.age} onChange={handleInputChange} placeholder="Age" type="number" />
        <Select onValueChange={(value) => handleSelectChange("size", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleSelectChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Add Pet</Button>
      </form>
    </motion.div>
  );
};

export default ShelterPage;
