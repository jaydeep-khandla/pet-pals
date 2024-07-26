import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/Api/axios";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, PawPrintIcon, MapPinIcon, CalendarIcon } from "lucide-react";

export default function PetProfile() {
  const { petId } = useParams();
  const navigate = useNavigate(); 
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/pets/${petId}`);
        console.log("Pet data:", response.data);
        setPet(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pet data:", err);
        setError("Failed to fetch pet data: " + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchPetData();
  }, [petId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pet) return <div>Pet not found</div>;

  const renderDetail = (icon, label, value) => {
    if (value === null || value === undefined) return null;
    return (
      <p className="flex items-center">
        {icon}
        <span>
          {label}: {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
        </span>
      </p>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-4">{pet.pet_name || "Unknown Name"}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.img
            src={pet.pet_primary_photo_cropped_url || "/placeholder-pet-image.jpg"}
            alt={pet.pet_name}
            className="w-full h-auto rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Pet Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {pet.pet_species_name && <Badge variant="secondary">{pet.pet_species_name}</Badge>}
                {pet.pet_breeds && <Badge variant="secondary">{pet.pet_breeds}</Badge>}
                {pet.pet_age && <Badge variant="secondary">{pet.pet_age}</Badge>}
                {pet.pet_sex && <Badge variant="secondary">{pet.pet_sex}</Badge>}
                {pet.pet_size && <Badge variant="secondary">{pet.pet_size}</Badge>}
              </div>
              {pet.pet_description && <p className="text-gray-700">{pet.pet_description}</p>}
              <div className="space-y-2">
                {renderDetail(
                  <PawPrintIcon size={16} className="mr-2" />,
                  "Good with children",
                  pet.pet_home_environment_attributes_good_with_children
                )}
                {renderDetail(<PawPrintIcon size={16} className="mr-2" />, "Good with dogs", pet.pet_home_environment_attributes_good_with_dogs)}
                {renderDetail(<PawPrintIcon size={16} className="mr-2" />, "Good with cats", pet.pet_home_environment_attributes_good_with_cats)}
                {renderDetail(
                  <MapPinIcon size={16} className="mr-2" />,
                  "Location",
                  pet.pet_location_address_city && pet.pet_location_address_state
                    ? `${pet.pet_location_address_city}, ${pet.pet_location_address_state}`
                    : pet.pet_location_address_city || pet.pet_location_address_state
                )}
                {renderDetail(<CalendarIcon size={16} className="mr-2" />, "Adoption Status", pet.pet_adoption_status)}
              </div>
              <motion.button
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HeartIcon size={20} />
                <span>Adopt Me</span>
              </motion.button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
