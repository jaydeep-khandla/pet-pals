import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Bg from "@/assets/images/bg.jpg";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Invalid ZIP code. Use 5 digits or 5+4 format.",
  }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number. Please enter 10 digits.",
  }),
  ageRange: z.enum(["puppy", "adult", "senior"]),
  residenceType: z.string().min(1, { message: "Please select a residence type." }),
  ownRent: z.enum(["own", "rent"]),
  landlordContact: z.string().optional(),
  numAdults: z.number().min(1),
  numChildren: z.number().min(0),
  Yard: z.string().optional(),
  currentPets: z.string().optional(),
  previousPets: z.string().optional(),
  workSchedule: z.string().min(1, { message: "Please describe your work schedule." }),
  aloneTime: z.number().min(0).max(24),
  adoptionReason: z.string().min(1, { message: "Please provide a reason for adoption." }),
  financialCommitment: z.string().min(1, { message: "Please describe your financial commitment." }),
  agreeTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms." }),
});

const AdoptionForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      petType: "",
      preferredBreed: "",
      ageRange: "adult",
      residenceType: "",
      ownRent: "",
      numAdults: 1,
      numChildren: 0,
      currentPets: "",
      previousPets: "",
      workSchedule: "",
      aloneTime: 0,
      exercisePlan: "",
      adoptionReason: "",
      futurePlans: "",
      agreeTerms: false,
      consentVisit: false,
      consentContact: false,
    },
  });

  function onSubmit(values) {
    console.log(values);
    // Here you would typically send the form data to your backend
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto p-4 space-y-6" style={{ backgroundImage: `url(${Bg})` }}>
        <h1 className="text-3xl font-bold text-center mb-6">Pet Adoption Application</h1>

        <Card>
          <CardHeader>
            <CardTitle>Adoption Application Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street Address" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1">City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1">State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1">Zip</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIP Code" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1">Phone Noumber</FormLabel>
                      <FormControl>
                        <Input placeholder="+91" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <hr className="border-dashed border-stone-800" />

            <div>
              <h2 className="text-xl font-semibold mb-4">Household Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="residenceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residence Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select residence type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownRent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you own or rent?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="own">Own</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="numAdults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of adults in household</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} min={1} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numChildren"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of children in household</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} min={0} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="Yard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do You have Yard (if applicable)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select yard" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <hr className="border-dashed border-stone-800" />

            {/* Pet Experience */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Pet Experience</h2>
              <FormField
                control={form.control}
                name="currentPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Pets (species, breed, age)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe your current pets" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="previousPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Pets (last 5 years)</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe your previous pets and what happened to them" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience with pet care</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe your experience with pet care, training, or special needs" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <hr className="border-dashed border-stone-800" />

            {/* Lifestyle and Commitment */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Lifestyle and Commitment</h2>
              <FormField
                control={form.control}
                name="workSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typical work/school schedule</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Describe your typical daily schedule" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aloneTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours pet will be alone per day</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} min={0} max={24} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <hr className="border-dashed border-stone-800" />

            {/* Adoption Intentions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Adoption Intentions</h2>
              <FormField
                control={form.control}
                name="adoptionReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for wanting to adopt a pet</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Explain why you want to adopt a pet at this time" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specificPet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you interested in a specific pet? If so, which one?</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name or ID of specific pet, if applicable" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financialCommitment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial commitment</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe your understanding of the financial responsibilities of pet ownership" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" size="lg">
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AdoptionForm;
