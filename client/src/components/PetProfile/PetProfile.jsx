import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/Api/axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Calendar, Mail, Facebook, Twitter, Instagram, Home, Dog, Cat } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function PetProfile() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  const handleonClick = () => {
    navigate("/adoption-form", { state: { petId, orgId: pet?.pet_organization_id } }); // Assuming each pet has a unique _id field
  };

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/pets/${petId}`);
        setPet(response.data);
        console.log(response.data);

        // Simulating fetching recommendations

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
    <>
      <Header />
      <div className="min-h-screen bg-[#f4f1ea] pt-24">
        <div className="container mx-auto p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-[#E0F7FA] border-orange-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-orange-800">{pet.pet_name}</CardTitle>
                  <CardDescription className="text-orange-600">{pet.pet_breeds}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      {/* <Paw className="w-4 h-4 mr-2 text-orange-500" /> */}
                      <span className="font-semibold">{pet.pet_type}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-semibold">{pet.pet_sex}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-semibold">{pet.pet_age}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="font-semibold">
                        {pet.pet_location_address_city}, {pet.pet_location_address_state}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Adoption Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge className="mb-4 text-lg" variant="secondary">
                    {pet.pet_adoption_status}
                  </Badge>
                  <Button onClick={handleonClick} className="w-full bg-orange-500 hover:bg-orange-400">
                    Adopt Me
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={`mailto:${pet.pet_contact_email}`} className="flex items-center text-orange-600 hover:text-orange-700">
                    <Mail className="mr-2 h-4 w-4" />
                    {pet.pet_contact_email}
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Follow {pet.pet_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <a href={pet.pet_facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href={pet.pet_twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a href={pet.pet_pinterest_url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img src={pet.pet_primary_photo_cropped_url} alt={pet.pet_name} className="w-full h-full object-contain" />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About {pet.pet_name}</h2>
                  <p className="text-gray-700">{pet.pet_description}</p>
                </CardContent>
              </Card>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="organization">Organization</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Pet Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <dt className="font-medium text-gray-500">Breed</dt>
                          <dd>{pet.pet_breed_name}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Species</dt>
                          <dd>{pet.pet_species_name}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Size</dt>
                          <dd>{pet.pet_size}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Mixed Breed</dt>
                          <dd>{pet.is_pet_mixed_breed ? "Yes" : "No"}</dd>
                        </div>
                        <div>
                          <dt className="font-medium text-gray-500">Published Date</dt>
                          <dd>{pet.pet_published_date}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="compatibility">
                  <Card>
                    <CardHeader>
                      <CardTitle>Compatibility</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                          <Home
                            className={`h-8 w-8 mr-3 ${pet.pet_home_environment_attributes_good_with_children ? "text-green-500" : "text-red-500"}`}
                          />
                          <div>
                            <p className="font-semibold">Children</p>
                            <p>{pet.pet_home_environment_attributes_good_with_children ? "Good" : "Not Ideal"}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                          <Dog className={`h-8 w-8 mr-3 ${pet.pet_home_environment_attributes_good_with_dogs ? "text-green-500" : "text-red-500"}`} />
                          <div>
                            <p className="font-semibold">Dogs</p>
                            <p>{pet.pet_home_environment_attributes_good_with_dogs ? "Good" : "Not Ideal"}</p>
                          </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                          <Cat className={`h-8 w-8 mr-3 ${pet.pet_home_environment_attributes_good_with_cats ? "text-green-500" : "text-red-500"}`} />
                          <div>
                            <p className="font-semibold">Cats</p>
                            <p>{pet.pet_home_environment_attributes_good_with_cats ? "Good" : "Not Ideal"}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="location">
                  <Card>
                    <CardHeader>
                      <CardTitle>Location Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">
                        <strong>Address:</strong> {pet.pet_location_address_address1}, {pet.pet_location_address_city},{" "}
                        {pet.pet_location_address_state} {pet.pet_location_address_postal_code}, {pet.pet_location_address_country}
                      </p>
                      <div className="flex space-x-4">
                        <Badge variant="outline">{pet.location_open_to_public ? "Open to Public" : "Not Open to Public"}</Badge>
                        <Badge variant="outline">{pet.location_by_appointment_only ? "By Appointment Only" : "No Appointment Needed"}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="organization">
                  <Card>
                    <CardHeader>
                      <CardTitle>Organization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        <strong>Organization Name:</strong> {pet.pet_organization_name}
                      </p>
                      <p className="text-gray-700">
                        <strong>Organization ID:</strong> {pet.pet_organization_id}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
