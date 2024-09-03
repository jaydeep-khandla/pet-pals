import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import "@/components/ui/button.css";

const PetCard = ({ pet }) => {
  // console.log("petdetails", pet);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleAdoptionClick = () => {
    navigate(`/pet/${pet._id}`); // Assuming each pet has a unique _id field
  };

  return (
    <>
      <Card
        className="w-72 h-[435px] overflow-hidden shadow-lg hover:shadow-2xl bg-white cursor-pointer flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleAdoptionClick}
      >
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="relative w-full h-48 overflow-hidden">
            <AnimatePresence>
              <motion.img
                key="pet-image"
                src={pet.pet_primary_photo_cropped_url}
                alt={pet.pet_name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </div>
          <div className="p-4 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2">{pet.pet_name}</h2>
              <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full whitespace-nowrap ml-2">{pet.pet_species_name}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600 mt-auto">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span>{pet.pet_sex}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                </svg>
                <span>{pet.pet_age}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{pet.pet_breed_name}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
          <Button className="w-full button-hover " onClick={handleAdoptionClick}>
            <span className="font-bold flex items-center justify-center">
              Adoption
              <img className="h-5 mt-1 pl-1" src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon/w_pawprint.png" alt="Paw Print" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default PetCard;
