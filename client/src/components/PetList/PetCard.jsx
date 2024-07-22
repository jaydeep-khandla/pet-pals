import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import "@/components/ui/button.css";

const PetCard = ({ pet }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-72 overflow-hidden shadow-lg hover:shadow-2xl bg-white cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative w-full h-48 overflow-hidden">
          <AnimatePresence>
            <motion.img
              key="pet-image"
              src={pet.pet_primary_photo_url}
              alt={pet.pet_name}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{pet.pet_name}</h2>
          <div className="space-y-1 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Gender:</span> {pet.pet_sex}
            </p>
            <p>
              <span className="font-semibold">Age:</span> {pet.pet_age} years
            </p>
            <p>
              <span className="font-semibold">Breed:</span> {pet.pet_breed_name}
            </p>
            <p>
              <span className="font-semibold">Size:</span> {pet.pet_size}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <Button className="w-full button-hover">
          <span className="font-bold flex items-center justify-center">
            Adoption
            <img className="h-5 mt-1 pl-1" src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon/w_pawprint.png" alt="Paw Print" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
