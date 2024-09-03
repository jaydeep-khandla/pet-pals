import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import * as z from "zod";
import Bg from "@/assets/images/bg.jpg";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code. Use 5 digits or 5+4 format." }),
  phoneNumber: z.string().regex(/^\d{10}$/, { message: "Invalid phone number. Please enter 10 digits." }),
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
  adoptionReason: z.string().min(1, { message: "Please provide a reason for adoption." }),
  financialCommitment: z.string().min(1, { message: "Please describe your financial commitment." }),
  agreeTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms." }),
});

const AdoptionForm = () => {
  const methods = useForm({
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
      ownRent: "",
      numAdults: 1,
      numChildren: 0,
      currentPets: "",
      previousPets: "",
      workSchedule: "",
      adoptionReason: "",
      financialCommitment: "",
      agreeTerms: false,
    },
  });

  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit = (values) => {
    console.log("Submitted values:", values);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="pl-1">Phone Number</FormLabel>
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
                  name="residenceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residence Type</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
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
                  name="ownRent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you own or rent?</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
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
            </div>

            <hr className="border-dashed border-stone-800" />

            <div>
              <h2 className="text-xl font-semibold mb-4">Pet History and Care</h2>
              <FormField
                name="currentPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Pets</FormLabel>
                    <FormControl>
                      <Textarea placeholder="List any current pets" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="previousPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Previous Pets</FormLabel>
                    <FormControl>
                      <Textarea placeholder="List any previous pets" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="workSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Schedule</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your work schedule" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="adoptionReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Adoption</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Why are you adopting?" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="financialCommitment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Commitment</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your financial commitment" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="agreeTerms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="checkbox" {...field} />
                  </FormControl>
                  <FormLabel className="ml-2">I agree to the terms and conditions</FormLabel>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit">Submit Application</Button>
            </div>
          </CardContent>
        </Card>

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
      </form>
    </FormProvider>
  );
};

export default AdoptionForm;
