import React, { useState, useEffect } from "react";
import axios from "@/Api/axios";
import PetCard from "@/components/PetList/PetCard";
import FilterSidebar from "@/components/PetList/FilterPetbar";
import PaginationComponent from "@/components/PetList/PaginationComponent";
import SearchEngine from "@/components/PetList/SearchEngine";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const PetSearchPage = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    pet_type: [],
    pet_age: [],
    pet_breed_name: "",
    pet_sex: [],
    pet_size: [],
  });
  const [search, setSearch] = useState({ city: "", postalCode: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [pets, filters]);

  useEffect(() => {
    applySearch();
  }, [pets, search]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/pets/petlist");
      setPets(response.data);
      setFilteredPets(response.data);
    } catch (error) {
      setError("Failed to fetch pets. Please try again later.");
      console.error("Error fetching pets:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const result = pets.filter((pet) => {
      const matchesType = filters.pet_type.length === 0 || filters.pet_type.includes(pet.pet_type);
      const matchesAge = filters.pet_age.length === 0 || filters.pet_age.includes(pet.pet_age);
      const matchesBreed = !filters.pet_breed_name || pet.pet_breed_name.toLowerCase().includes(filters.pet_breed_name.toLowerCase());
      const matchesSex = filters.pet_sex.length === 0 || filters.pet_sex.includes(pet.pet_sex);
      const matchesSize = filters.pet_size.length === 0 || filters.pet_size.includes(pet.pet_size);

      return matchesType && matchesAge && matchesBreed && matchesSex && matchesSize;
    });

    setFilteredPets(result);
    setCurrentPage(1);
  };

  const applySearch = () => {
    const result = pets.filter((pet) => {
      const matchesCity = !search.city || pet.pet_location_address.city.toLowerCase().includes(search.city.toLowerCase());
      const matchesPostalCode = !search.postalCode || pet.pet_location_address.postal_code.includes(search.postalCode);

      return matchesCity && matchesPostalCode;
    });

    setFilteredPets(result);
    setCurrentPage(1);
  };

  const handleSearch = ({ city, postalCode }) => {
    setSearch({ city, postalCode });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  return (
    <div className="bg-[#f4f1ea]">
      <Header />
      <div className="container mx-auto p-4 relative">
        <div className="flex flex-col md:flex-row">
          {/* Filter Sidebar for large screens */}
          <div className="hidden md:block  md:w-64 p-4 mt-10">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              petTypes={["Dog", "Cat", "Rabbit", "Bird", "Other"]}
              genders={["Male", "Female"]}
              breeds={["Golden Retriever", "Labrador", "Persian", "Siamese", "Dwarf Rabbit", "Lop", "Parakeet", "Cockatiel"]}
              sizes={["Small", "Medium", "Large", "Extra Large"]}
            />
          </div>

          {/* Filter Sidebar for small screens  */}
          <div
            className={`fixed top-0 left-0 h-full bg-gray-100 p-4 z-20 transition-transform  md:hidden duration-300 ease-in-out ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ width: "250px" }}
          >
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              petTypes={["Dog", "Cat", "Rabbit", "Bird", "Other"]}
              genders={["Male", "Female"]}
              breeds={["Golden Retriever", "Labrador", "Persian", "Siamese", "Dwarf Rabbit", "Lop", "Parakeet", "Cockatiel"]}
              sizes={["Small", "Medium", "Large", "Extra Large"]}
            />
          </div>

          {/* Main Content Area */}
          <div className={`flex-1 ${isFilterOpen ? "md:ml-64" : "ml-0"} transition-all ml-9 mt-10 duration-300 relative`}>
            <section className="flex flex-col md:flex-row  p-4 md:w-full">
              <div className="flex-1 w-3/4 mx-auto">
                <SearchEngine onSearch={handleSearch} />
              </div>
              <Button onClick={() => setIsFilterOpen(!isFilterOpen)} className="md:hidden mt-4 w-1/3  mx-auto">
                {isFilterOpen ? "Close Filters" : "Open Filters"}
              </Button>
            </section>

            {/* Pet Cards */}
            <section className={`mt-4 ml-2 flex-1`}>
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pets.map((pet) => (
                  <div key={pet.id} className="flex justify-center">
                    <PetCard pet={pet} />
                  </div>
                ))}
              </div> */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentPets.map((pet) => (
                  <div key={pet._id} className="flex justify-center">
                    <PetCard pet={pet} />
                  </div>
                ))}
              </div>
              {/* <div className="mt-4">
                <PaginationComponent currentPage={1} totalPages={5} onPageChange={() => {}} />
              </div> */}
              <div className="mt-4">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredPets.length / petsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PetSearchPage;
