import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import axios from "@/Api/axios";
import { fetchAllData } from "@/helperFuncs/adoptionData";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Dialog, DialogDescription, DialogTitle, DialogHeader, DialogContent, DialogClose, DialogFooter } from "../ui/dialog";
import Bg from "@/assets/images/bg.jpg";
import useAuth from "@/hooks/useAuth";

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
  yard: z.string().optional(),
  currentPets: z.string().optional(),
  previousPets: z.string().optional(),
  petExperience: z.string().optional(),
  workSchedule: z.string().min(1, { message: "Please describe your work schedule." }),
  aloneTime: z.number().min(0).max(24),
  adoptionReason: z.string().min(1, { message: "Please provide a reason for adoption." }),
  financialCommitment: z.string().min(1, { message: "Please describe your financial commitment." }),
  agreeTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms." }),
});

const AdoptionForm = () => {
  const [data, setData] = useState({
    petData: null,
    adopterData: null,
    organizationData: null
  });
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const location = useLocation();
  const { petId, orgId } = location?.state ?? {};

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
      ageRange: "adult",
      residenceType: "",
      ownRent: "own",
      landlordContact: "",
      numAdults: 1,
      numChildren: 0,
      yard: "",
      currentPets: "",
      previousPets: "",
      petExperience: "",
      workSchedule: "",
      aloneTime: 0,
      adoptionReason: "",
      financialCommitment: "",
      agreeTerms: false,
    },
  });
  // useEffect(() => {

  //   if (!user || !user?.id) return;

  //   const init = async () => {
  //     try {
  //       const response = await fetchUser(user?.id);
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.log(error);

  //     }
  //   }

  //   init();

  // }, [user]);

  useEffect(() => {
    if (!user || !user.id) return;

    const userIds = [user.id, orgId]; // Fetch data for the current user; modify if needed to fetch multiple users

    const fetchData = async () => {
      try {
        // setLoading(true);
        const result = await fetchAllData(petId, userIds);
        setData(result);
        console.log(result);

      } catch (err) {
        // setError(err);
        console.log(err);

      } finally {
        // setLoading(false);
        console.log(1);

      }
    };

    fetchData();
  }, [user, orgId, petId]);

  useEffect(() => {
    if (data.adopterData) {
      Object.keys(data.adopterData).forEach((key) => {
        if (form.getValues(key) !== undefined) {
          form.setValue(key, data.adopterData[key]);
        }
      });
    }
  }, [data.adopterData, form]);

  function onSubmit(values) {
    console.log("Form submitted with values:", values);
    // Here you would typically send the form data to your backend
    setOpenDialog(true);
  }

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Form errors:", errors))}
        className="container mx-auto p-4 space-y-6"
        style={{ backgroundImage: `url(${Bg})` }}
      >
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
                      <FormMessage />
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
                      <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIP Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="10 digit number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <hr className="border-dashed border-stone-800" />

            {/* Household Information */}
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
                      <FormMessage />
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
                      <FormMessage />
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
                        <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} min={1} />
                      </FormControl>
                      <FormMessage />
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
                        <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="yard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have a yard? (if applicable)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} min={0} max={24} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr className="border-dashed border-stone-800" />

            {/* Agreement */}
            <div>
              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I agree to the terms and conditions</FormLabel>
                      <FormDescription>You must agree to the terms to submit the form.</FormDescription>
                    </div>
                    <FormMessage />
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

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank you for your application!</DialogTitle>
            <DialogDescription>Your application has been submitted successfully.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AdoptionForm;