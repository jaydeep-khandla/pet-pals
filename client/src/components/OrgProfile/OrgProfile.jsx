/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/UnOb3wiSVZg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Archivo } from 'next/font/google'

archivo({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    pet_adoption_status: "Available",
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
    pet_home_environment_attributes_good_with_children: null,
    pet_home_environment_attributes_good_with_dogs: null,
    pet_home_environment_attributes_good_with_cats: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        console.log("Pet added successfully");
        // Reset form or close dialog
      } else {
        console.error("Failed to add pet");
      }
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };
  return (
    <div className="bg-background text-foreground mt-20">
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Paws & Claws Pet Shelter</h1>
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
              <p>123 Main St, Anytown USA</p>
              <p>Anytown, CA 12345</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@pawsandclaws.org</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p>Monday - Friday: 10am - 6pm</p>
              <p>Saturday - Sunday: 12pm - 4pm</p>
            </div>
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Pets Available for Adoption</h2>
            <div className="flex items-center gap-2">
              <Label htmlFor="filter">Filter by:</Label>
              <Select id="filter">
                <SelectTrigger>
                  <SelectValue placeholder="Select filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="breed">Breed</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="bg-card text-card-foreground">
              <img src="/placeholder.svg" width={300} height={200} alt="Pet" className="rounded-t-lg object-cover w-full h-48" />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Buddy</h3>
                <p className="text-sm text-muted-foreground mb-4">Labrador Retriever, 3 years old</p>
                <p className="text-sm">Buddy is a friendly and energetic Labrador Retriever who loves to play fetch and go for long walks.</p>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground">
              <img src="/placeholder.svg" width={300} height={200} alt="Pet" className="rounded-t-lg object-cover w-full h-48" />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Bella</h3>
                <p className="text-sm text-muted-foreground mb-4">Domestic Shorthair, 1 year old</p>
                <p className="text-sm">Bella is a playful and affectionate cat who loves to cuddle and explore new toys.</p>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground">
              <img src="/placeholder.svg" width={300} height={200} alt="Pet" className="rounded-t-lg object-cover w-full h-48" />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Max</h3>
                <p className="text-sm text-muted-foreground mb-4">German Shepherd, 5 years old</p>
                <p className="text-sm">Max is a loyal and protective German Shepherd who loves going on hikes and playing fetch.</p>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground">
              <img src="/placeholder.svg" width={300} height={200} alt="Pet" className="rounded-t-lg object-cover w-full h-48" />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Daisy</h3>
                <p className="text-sm text-muted-foreground mb-4">Poodle, 2 years old</p>
                <p className="text-sm">Daisy is a friendly and intelligent Poodle who loves to learn new tricks and cuddle with her owners.</p>
              </CardContent>
            </Card>
          </div>
        </section>
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
            <form className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="pet_name">Name</Label>
                <Input id="pet_name" name="pet_name" value={petData.pet_name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_breeds">Breed</Label>
                <Input id="pet_breeds" name="pet_breeds" value={petData.pet_breeds} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_age">Age</Label>
                <Input id="pet_age" name="pet_age" value={petData.pet_age} onChange={handleInputChange} />
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
                <Input id="pet_type" name="pet_type" value={petData.pet_type} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_species_name">Species</Label>
                <Input id="pet_species_name" name="pet_species_name" value={petData.pet_species_name} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_description">Description</Label>
                <Textarea id="pet_description" name="pet_description" rows={3} value={petData.pet_description} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_primary_photo_url">Primary Photo URL</Label>
                <Input id="pet_primary_photo_url" name="pet_primary_photo_url" value={petData.pet_primary_photo_url} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_contact_email">Contact Email</Label>
                <Input id="pet_contact_email" name="pet_contact_email" value={petData.pet_contact_email} onChange={handleInputChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_location_address_city">City</Label>
                <Input
                  id="pet_location_address_city"
                  name="pet_location_address_city"
                  value={petData.pet_location_address_city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_location_address_state">State</Label>
                <Input
                  id="pet_location_address_state"
                  name="pet_location_address_state"
                  value={petData.pet_location_address_state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pet_organization_name">Organization Name</Label>
                <Input id="pet_organization_name" name="pet_organization_name" value={petData.pet_organization_name} onChange={handleInputChange} />
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Save Pet</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
