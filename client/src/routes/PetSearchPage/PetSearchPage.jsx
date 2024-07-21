import React, { useState } from "react";
import PetCard from "@/components/PetCard/PetCard";
import FilterSidebar from "@/components/PetCard/FilterPetbar";

import PaginationComponent from "@/components/PetCard/PaginationComponent";
import SearchEngine from "@/components/PetCard/SearchEngine";
import { Button } from "@/components/ui/button";

const PetSearchPage = () => {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      image:
        "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/british-cat-lying-cat-tree-scratching-post-2021-09-02-16-15-40-utc-1024x683.jpg",
      description: "Buddy is a friendly and energetic dog who loves to play fetch.",
      age: 5,
      size: 65,
      gender: "Male",
    },
    {
      id: 2,
      name: "Whiskers",
      breed: "Persian",
      image: "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/rabbit-bunny-2021-08-26-20-16-59-utc-1024x684.jpg",
      description: "Whiskers is a calm and affectionate cat who enjoys cuddling.",
      age: 3,
      size: 8,
      gender: "Female",
    },
    {
      id: 3,
      name: "Hoppy",
      breed: "Dwarf Rabbit",
      image: "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/twenty20_11401931-f092-4214-861c-c8ea63b45e67-1024x683.jpg",
      description: "Hoppy is a playful and curious rabbit who loves to hop around.",
      age: 2,
      size: 3,
      gender: "Male",
    },
    {
      id: 3,
      name: "Hoppy",
      breed: "Dwarf Rabbit",
      image:
        "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/cute-jack-russell-terrier-chewing-ball-dog-toy-ind-2021-08-30-01-27-23-utc.jpg",
      description: "Hoppy is a playful and curious rabbit who loves to hop around.",
      age: 2,
      size: 3,
      gender: "Male",
    },
    {
      id: 3,
      name: "Hoppy",
      breed: "Dwarf Rabbit",
      image:
        "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/most-beautiful-dog-in-the-world-with-her-paws-in-the-sand_t20_YQBl6m-1024x683.jpg",
      description: "Hoppy is a playful and curious rabbit who loves to hop around.",
      age: 2,
      size: 3,
      gender: "Male",
    },
    {
      id: 3,
      name: "Hoppy",
      breed: "Dwarf Rabbit",
      image:
        "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/most-beautiful-dog-in-the-world-with-her-paws-in-the-sand_t20_YQBl6m-1024x683.jpg",
      description: "Hoppy is a playful and curious rabbit who loves to hop around.",
      age: 2,
      size: 3,
      gender: "Male",
    },
    {
      id: 3,
      name: "Hoppy",
      breed: "Dwarf Rabbit",
      image:
        "https://tailwag.progressionstudios.com/wp-content/uploads/2022/04/most-beautiful-dog-in-the-world-with-her-paws-in-the-sand_t20_YQBl6m-1024x683.jpg",
      description: "Hoppy is a playful and curious rabbit who loves to hop around.",
      age: 2,
      size: 3,
      gender: "Male",
    },
  ]);
  const [filters, setFilters] = useState({
    petType: [],
    ageRange: { min: 0, max: 20 },
    breed: "",
    gender: [],
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    // Implement search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <div className="flex-1 mb-4 md:mb-0">
          <SearchEngine onSearch={handleSearch} />
        </div>
        <Button onClick={() => setIsFilterOpen(!isFilterOpen)} className="md:hidden mt-4 md:mt-0 md:ml-4 fixed top-4 left-4 z-10">
          {isFilterOpen ? "Close Filters" : "Open Filters"}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className={`md:block ${isFilterOpen ? "block" : "hidden"} md:w-64`}>
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
        <main className="flex-1">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pets.map((pet) => (
                <div key={pet.id} className="flex justify-center">
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <PaginationComponent currentPage={1} totalPages={5} onPageChange={() => {}} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PetSearchPage;
