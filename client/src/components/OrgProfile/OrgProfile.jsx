import { useState, useRef, useEffect } from "react";
import PetCard from "@/components/PetList/PetCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import { imageUpload } from "@/helperFuncs/cloudUpload";
import axios from "@/Api/axios";

export default function OrgProfile({ user }) {
  const [petData, setPetData] = useState({
    pet_name: "",
    pet_breeds: "",
    is_pet_mixed_breed: false,
    pet_age: "",
    pet_sex: "",
    pet_size: "",
    pet_description: "",
    pet_primary_photo_url: "",
    pet_primary_photo_cropped_url: "",
    pet_adoption_status: "adoptable",
    pet_published_date: new Date(),
    pet_type: "",
    pet_species_name: "",
    pet_breed_name: "",
    pet_facebook_url: "",
    pet_twitter_url: "",
    pet_pinterest_url: "",
    pet_contact_email: "",
    location_is_map_hidden: false,
    location_open_to_public: true,
    location_by_appointment_only: false,
    pet_location_address_address1: "",
    pet_location_address_address2: "",
    pet_location_address_city: "",
    pet_location_address_state: "",
    pet_location_address_postal_code: "",
    pet_location_address_country: "",
    pet_organization_name: "",
    pet_organization_id: user?.id,
    pet_home_environment_attributes_good_with_children: null,
    pet_home_environment_attributes_good_with_dogs: null,
    pet_home_environment_attributes_good_with_cats: null,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Update pet_organization_id when user.id changes
    if (user?.id) {
      setPetData((prevData) => ({
        ...prevData,
        pet_organization_id: user.id,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setPetData({ ...petData, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const fileUrl = URL.createObjectURL(file); // Replace this with actual file upload logic
      setThumbnailUrl(fileUrl);
    } else {
      toast.error("Invalid file type. Please select an image file.");
      fileInputRef.current.value = null;
      setThumbnailUrl("");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  }

  const handleCheckboxChange = (name, value) => {
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const imgUrl = await imageUpload(fileInputRef.current.files[0]);

      if (!imgUrl) {
        toast.error("Error uploading image. Please try again.");
        return;
      }

      setPetData({ ...petData, pet_primary_photo_url: imgUrl });

      const response = await axios.post("/pets/add", petData);

      console.log(response);

      if (response.status === 201) {
        toast.success("Pet added successfully.");
        setOpenDialog(false);
      }

    } catch (error) {
      toast.error("Error adding pet. Please try again.");
    }
  };

  return (
    <div className="bg-background text-foreground my-20">
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{user?.username}</h1>
            <p className="text-sm">Helping pets find their forever homes</p>
          </div>
          {/* <Button variant="secondary" className="hidden md:inline-flex">
            Add Pet
          </Button> */}
        </div>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Shelter Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className=" w-52 break-words">{user?.address || "Not Available"}</p>
              {/* <p>Anytown, CA 12345</p> */}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p>Phone: {user?.phoneNo || "Not Available"}</p>
              <p>Email: {user?.email || "Not Available"}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">City and Country</h3>
              <p>City: {user?.city || "Not Available"}</p>
              <p>Country: {user?.country || "Not Available"}</p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pets Available for Adoption</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {user?.pet_ids && user.pet_ids.length > 0 ? (
              user.pet_ids.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))
            ) : (
              <p>Sorry, no pets available for adoption at this time.</p>
            )}

          </div>
        </section>
        {/* <section>
          <div className="flex items-center justify-between my-6">
            <h2 className="text-xl font-bold">Adoption Applications</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {user?.adoption_applications && user.adoption_applications.length > 0 ? (
              user?.adoption_applications.map((application) => (
                <div key={application._id} className="w-full p-2 border-2 border-black">Hello</div>
              ))
            ) : (
              <p>Sorry, no pets available for adoption at this time.</p>
            )}

          </div>
        </section> */}
      </main>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6">Add Pet</Button>
        </DialogTrigger>
        <DialogContent className="bg-card text-card-foreground bg-[#f4f2eb] p-6 rounded-lg sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add a New Pet</DialogTitle>
            <DialogDescription>Fill out the form below to add a new pet to the shelter.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-6 pl-6">
            <form onSubmit={onSubmit} className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pet_name">Name</Label>
                <Input id="pet_name" name="pet_name" value={petData.pet_name} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_breeds">Breed</Label>
                <Input id="pet_breeds" name="pet_breeds" value={petData.pet_breeds} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="is_pet_mixed_breed">Is Mixed Breed?</Label>
                <Select name="is_pet_mixed_breed" onValueChange={(value) => handleSelectChange("is_pet_mixed_breed", value === "true")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select if pet is mixed breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_age">Age (e.g., Adult, Puppy, etc.)</Label>
                <Input id="pet_age" name="pet_age" value={petData.pet_age} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_sex">Sex</Label>
                <Select name="pet_sex" onValueChange={(value) => handleSelectChange("pet_sex", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pet's sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_breed_name">Breed Name</Label>
                <Input id="pet_breed_name" name="pet_breed_name" value={petData.pet_breed_name} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_facebook_url">Facebook URL</Label>
                <Input id="pet_facebook_url" name="pet_facebook_url" value={petData.pet_facebook_url} onChange={handleInputChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_twitter_url">Twitter URL</Label>
                <Input id="pet_twitter_url" name="pet_twitter_url" value={petData.pet_twitter_url} onChange={handleInputChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_pinterest_url">Pinterest URL</Label>
                <Input id="pet_pinterest_url" name="pet_pinterest_url" value={petData.pet_pinterest_url} onChange={handleInputChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_size">Size</Label>
                <Select name="pet_size" onValueChange={(value) => handleSelectChange("pet_size", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pet's size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_type">Type</Label>
                <Input id="pet_type" name="pet_type" value={petData.pet_type} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_species_name">Species</Label>
                <Input id="pet_species_name" name="pet_species_name" value={petData.pet_species_name} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_description">Description</Label>
                <Textarea id="pet_description" name="pet_description" rows={3} value={petData.pet_description} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_primary_photo_url">Primary Photo</Label>
                <Input
                  id="pet_primary_photo_url"
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  ref={fileInputRef} required
                />
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt="Pet Thumbnail"
                    className="w-24 h-24 object-cover mt-2"
                  />
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_contact_email">Contact Email</Label>
                <Input id="pet_contact_email" name="pet_contact_email" value={petData.pet_contact_email} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_organization_name">Organization Name</Label>
                <Input id="pet_organization_name" name="pet_organization_name" value={petData.pet_organization_name} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_location_address_postal_code">Postal Code</Label>
                <Input id="pet_location_address_postal_code" name="pet_location_address_postal_code" value={petData.pet_location_address_postal_code} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_location_address_city">City</Label>
                <Input
                  id="pet_location_address_city"
                  name="pet_location_address_city"
                  value={petData.pet_location_address_city}
                  onChange={handleInputChange} required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_location_address_state">State</Label>
                <Input
                  id="pet_location_address_state"
                  name="pet_location_address_state"
                  value={petData.pet_location_address_state}
                  onChange={handleInputChange} required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_location_address_country">Country</Label>
                <Input id="pet_location_address_country" name="pet_location_address_country" value={petData.pet_location_address_country} onChange={handleInputChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_home_environment_attributes_good_with_children">
                  <Checkbox
                    className="mr-2"
                    id="pet_home_environment_attributes_good_with_children"
                    name="pet_home_environment_attributes_good_with_children"
                    checked={petData.pet_home_environment_attributes_good_with_children}
                    onChange={(e) => handleCheckboxChange("pet_home_environment_attributes_good_with_children", e.target.checked)}
                  />
                  Good with Children?
                </Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_home_environment_attributes_good_with_dogs">
                  <Checkbox
                    className="mr-2"
                    id="pet_home_environment_attributes_good_with_dogs"
                    name="pet_home_environment_attributes_good_with_dogs"
                    checked={petData.pet_home_environment_attributes_good_with_dogs}
                    onChange={(e) => handleCheckboxChange("pet_home_environment_attributes_good_with_dogs", e.target.checked)}
                  />
                  Good with Dogs?
                </Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pet_home_environment_attributes_good_with_cats">
                  <Checkbox
                    className="mr-2"
                    id="pet_home_environment_attributes_good_with_cats"
                    name="pet_home_environment_attributes_good_with_cats"
                    checked={petData.pet_home_environment_attributes_good_with_cats}
                    onChange={(e) => handleCheckboxChange("pet_home_environment_attributes_good_with_cats", e.target.checked)}
                  />
                  Good with Cats?
                </Label>
              </div>


              <DialogFooter>
                <Button type="submit">Save Pet</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <ConfirmDialog openDialog={openDialog} closeDialog={() => setOpenDialog(false)} onSubmit={handleSubmit} />
    </div>
  );
}
