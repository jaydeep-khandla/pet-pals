import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "@/Api/axios";
import PetCard from "@/components/PetList/PetCard";
import FilterSidebar from "@/components/PetList/FilterPetbar";
import PaginationComponent from "@/components/PetList/PaginationComponent";
import SearchEngine from "@/components/PetList/SearchEngine";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { FaFilter } from "react-icons/fa";

const PetSearchPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    pet_type_single: "All",
    pet_age: [],
    pet_breed_name: "All",
    pet_sex: [],
    pet_size: [],
  });
  const [searchCriteria, setSearchCriteria] = useState({
    citySearch: "",
    postalCodeSearch: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const petTypes = ["Dog", "Cat", "Rabbit", "Bird"];
  const genders = ["Male", "Female"];
  const breeds = ["Standardbred", "Labrador Retriever", "Domestic Short Hair", "Lionhead", "Cockatiel", "Rex", "Bunny Rabbit"];
  const sizes = ["Small", "Medium", "Large", "Extra Large"];

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/pets/petlist");
      setPets(response.data);
    } catch (error) {
      setError("Failed to fetch pets. Please try again later.");
      console.error("Error fetching pets:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const citySearch = searchCriteria.citySearch.toLowerCase();
      const postalCodeSearch = searchCriteria.postalCodeSearch.toLowerCase();

      const petCity = (pet.pet_location_address_city || "").toLowerCase();
      const matchesCity = citySearch === "" || petCity.includes(citySearch);

      const petPostalCode = (pet.pet_location_address_postal_code || "").toLowerCase();
      const matchesPostalCode = postalCodeSearch === "" || petPostalCode.includes(postalCodeSearch);

      // const matchesTypeMulti =
      //   filters.pet_type_multi.length === 0 ||
      //   filters.pet_type_multi.includes(pet.pet_type) ||
      //   (filters.pet_type_multi.includes("Other") && !petTypes.includes(pet.pet_type));

      const matchesTypeSingle =
        filters.pet_type_single === "All" ||
        filters.pet_type_single === pet.pet_type ||
        (filters.pet_type_single === "Other" && !petTypes.includes(pet.pet_type));

      // const matchesType = matchesTypeMulti && matchesTypeSingle;
      const matchesAge = filters.pet_age.length === 0 || filters.pet_age.includes(pet.pet_age);
      const matchesBreed =
        filters.pet_breed_name === "All" ||
        filters.pet_breed_name === pet.pet_breed_name ||
        (filters.pet_breed_name === "Other" && !breeds.includes(pet.pet_breed_name));
      const matchesSex = filters.pet_sex.length === 0 || filters.pet_sex.includes(pet.pet_sex);
      const matchesSize = filters.pet_size.length === 0 || filters.pet_size.includes(pet.pet_size);

      return matchesCity && matchesPostalCode && matchesTypeSingle && matchesAge && matchesBreed && matchesSex && matchesSize;
    });
  }, [pets, filters, searchCriteria]);
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen  ">
        <img src="/src/assets/images/preloader.gif" alt="My Image" className="w-40 h-32" />
      </div>
    );
  if (error) return <div>{error}</div>;

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  return (
    <div className="bg-[#f4f1ea] min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-4 relative">
        <div className="flex flex-col md:flex-row">
          {/* Filter Sidebar for large screens */}
          <div className="hidden md:block md:w-56 p-4 xl:w-64  mt-10">
            <FilterSidebar filters={filters} setFilters={handleFilterChange} petTypes={petTypes} genders={genders} breeds={breeds} sizes={sizes} />
          </div>

          {/* Filter Sidebar for small screens */}
          <div
            ref={sidebarRef}
            className={`fixed top-0 left-0 h-full mt-10 bg-gray-100 p-4 z-20 transition-transform md:hidden duration-300 ease-in-out ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ width: "250px" }}
          >
            <FilterSidebar filters={filters} setFilters={handleFilterChange} petTypes={petTypes} genders={genders} breeds={breeds} sizes={sizes} />
          </div>

          {/* Main Content Area */}
          <div className={`flex-1 ${isFilterOpen ? "md:ml-64" : "ml-0"} transition-all  mt-10 duration-300 relative`}>
            <section className="flex flex-col md:flex-row p-4 md:w-full">
              <div className="flex-1 lg:w-3/4 ml:w-3/4 sm:w-full mx-auto">
                <SearchEngine onSearch={handleSearch} />
              </div>
              <Button onClick={() => setIsFilterOpen(!isFilterOpen)} className="md:hidden mt-4 w-1/3 mx-auto">
                {isFilterOpen ? (
                  <>
                    <span className="mr-1">Filter</span>
                    <span>
                      <FaFilter />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="mr-1">Filter</span>
                    <span>
                      <FaFilter />
                    </span>
                  </>
                )}
              </Button>
            </section>

            {/* Pet Cards */}
            <section className={`mt-4 ml-2 flex-1`}>
              {filteredPets.length === 0 ? (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! No Pets Available</h2>
                  <p className="text-gray-600">
                    We couldn't find any pets matching your current filters. Try adjusting your search criteria or check back later for new additions!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:6 gap-6">
                  {currentPets.map((pet) => (
                    <div key={pet._id} className="flex justify-center">
                      <PetCard pet={pet} />
                    </div>
                  ))}
                </div>
              )}
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
