import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "@/Api/axios";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HeartIcon, PawPrintIcon, CalendarIcon, RulerIcon, Syringe, User } from "lucide-react";

export default function PetProfile() {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const handleonClick = () => {
    navigate("/appform"); // Assuming each pet has a unique _id field
  };

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/pets/${petId}`);
        setPet(response.data);
        // Simulating fetching recommendations
        setRecommendations([
          { id: 1, name: "Max", breed: "Golden Retriever", age: 2 },
          { id: 2, name: "Luna", breed: "Siamese Cat", age: 1 },
          { id: 3, name: "Rocky", breed: "German Shepherd", age: 3 },
        ]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch pet data: " + (err.response?.data?.message || err.message));
        setLoading(false);
      }
    };

    fetchPetData();
  }, [petId]);
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen  ">
        <img src="/src/assets/images/preloader.gif" alt="My Image" className="w-40 h-32" />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!pet) return <div className="text-center">Pet not found</div>;

  const renderDetail = (icon, label, value) => {
    if (value === null || value === undefined) return null;
    return (
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-semibold">{label}:</span>
        <span>{typeof value === "boolean" ? (value ? "Yes" : "No") : value}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1  gap-8">
        <div className="space-y-4 mx-auto">
          <h1 className="text-4xl font-bold">Meet {pet.pet_name}</h1>
          <motion.img
            src={pet.pet_primary_photo_url}
            alt={pet.pet_name}
            className=" rounded-lg h-96 shadow-lg object-cover aspect-square"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        <div className="space-y-4 mt-10">
          <Card>
            <CardContent className="pt-6 mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {renderDetail(<PawPrintIcon size={16} className="text-blue-500" />, "Gender", pet.pet_sex)}
                {renderDetail(<PawPrintIcon size={16} className="text-blue-500" />, "Breed", pet.pet_breed_name)}
                {renderDetail(<CalendarIcon size={16} className="text-blue-500" />, "Age", pet.pet_age)}
                {renderDetail(<RulerIcon size={16} className="text-blue-500" />, "Size", pet.pet_size)}
                {renderDetail(<Syringe size={16} className="text-blue-500" />, "Vaccinated", "Yes")} {/* Changed from VaccineIcon to Syringe */}
                {renderDetail(<User size={16} className="text-blue-500" />, "Neutered", "Yes")} {/* Changed icon */}
              </div>
              <p className="text-sm text-gray-600">{pet.pet_description}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-1/3 ml-96 mt-4" variant="default" onClick={handleonClick}>
                  Apply Today
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>More About {pet.pet_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {pet.pet_home_environment_attributes_good_with_dogs && <Badge variant="secondary">Friendly to other dogs</Badge>}
                {pet.pet_home_environment_attributes_good_with_children && <Badge variant="secondary">Good with Children</Badge>}
                <Badge variant="secondary">Good for Apartments</Badge>
              </div>
              <div className="space-y-2 mt-4">
                <h3 className="font-semibold">Home Environment:</h3>
                {renderDetail(
                  <PawPrintIcon size={16} className="text-blue-500" />,
                  "Good with children",
                  pet.pet_home_environment_attributes_good_with_children
                )}
                {renderDetail(
                  <PawPrintIcon size={16} className="text-blue-500" />,
                  "Good with dogs",
                  pet.pet_home_environment_attributes_good_with_dogs
                )}
                {renderDetail(
                  <PawPrintIcon size={16} className="text-blue-500" />,
                  "Good with cats",
                  pet.pet_home_environment_attributes_good_with_cats
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex justify-center space-x-4"
              >
                {pet.pet_facebook_url && (
                  <a href={pet.pet_facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    Facebook
                  </a>
                )}
                {pet.pet_twitter_url && (
                  <a href={pet.pet_twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    Twitter
                  </a>
                )}
                {pet.pet_pinterest_url && (
                  <a href={pet.pet_pinterest_url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                    Pinterest
                  </a>
                )}
              </motion.div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-100">
            <CardHeader>
              <CardTitle>Adoption Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                <li>Applicants must be at least 21 years old and provide a valid photo ID.</li>
                <li>All household members should agree on adopting a pet before proceeding with the application.</li>
                <li>Adopted pets must live indoors and receive proper veterinary care.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Recommendation Cards */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardContent className="p-4">
                <img src={`https://via.placeholder.com/150?text=${rec.name}`} alt={rec.name} className="w-full h-40 object-cover rounded-md mb-2" />
                <h3 className="text-lg font-semibold">{rec.name}</h3>
                <p className="text-sm text-gray-600">
                  {rec.breed}, {rec.age} years old
                </p>
                <Button className="w-full mt-2" variant="outline">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
