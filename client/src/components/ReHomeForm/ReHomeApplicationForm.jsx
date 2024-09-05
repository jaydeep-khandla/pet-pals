import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import axios from "@/Api/axios";
import { toast } from "react-toastify";
import { set } from "date-fns";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  applicantName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  applicantEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  applicantAddress: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  applicantCity: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  applicantState: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  applicantZipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Invalid ZIP code. Use 5 digits or 5+4 format.",
  }),
  applicantPhoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number. Please enter 10 digits.",
  }),
  petName: z.string().min(2, {
    message: "Pet name must be at least 2 characters.",
  }),
  petAge: z.number().int().nonnegative({
    message: "Pet age must be a positive integer.",
  }),
  petBreed: z.string().min(2, {
    message: "Pet breed must be at least 2 characters.",
  }),
  petGender: z.enum(["male", "female"], {
    message: "Please select a valid gender.",
  }),
  petVaccinationStatus: z.boolean(),
  petNeuteredStatus: z.boolean(),
  petGoodWithKids: z.boolean(),
  petGoodWithPets: z.boolean(),
  petHouseTrained: z.boolean(),
  petRehomeReason: z.string().min(10, {
    message: "Please provide a detailed reason for rehoming (min 10 characters).",
  }),
});

export default function ReHomeApplicationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantAddress: "",
      applicantCity: "",
      applicantState: "",
      applicantZipCode: "",
      applicantPhoneNumber: "",
      petName: "",
      petAge: 0,
      petBreed: "",
      petGender: "",
      petVaccinationStatus: false,
      petNeuteredStatus: false,
      petGoodWithKids: false,
      petGoodWithPets: false,
      petHouseTrained: false,
      petRehomeReason: "",
    },
  });

  const location = useLocation();
  const { orgId } = location.state;
  const { user } = useAuth();
  const userId = user?.id;

  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(prev => ({ ...prev, organizationId: orgId, applicantId: userId }));
  }, [orgId, userId]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function onSubmit(values) {
    console.log(values);
    setFormData({
      ...values,
      organizationId: orgId,
      applicantId: userId,
    });
    setOpenDialog(true);
  }

  const handleFormSubmit = async () => {
    try {
      // Replace with your actual API endpoint
      const apiEndpoint = 'application/rehome';

      // Make the POST request
      const response = await axios.post(apiEndpoint, formData);

      // Handle successful response
      console.log('Form submitted successfully:', response.data);
      toast.success("Application submitted successfully!");

      setFormData({});
      form.reset();
      setOpenDialog(false);

      // You might want to add further actions here, such as showing a success message or redirecting
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
      toast.error("An error occurred. Please try again.");

      setFormData({});
      form.reset();

      // Optionally, you might want to show an error message to the user
    } finally {
      // Close the dialog after submission attempt
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <h1 className="text-4xl font-bold mt-6 mb-2 text-center text-gray-800">ReHome Application</h1>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-20">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="applicantName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicantEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="applicantAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicantCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Springfield" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="applicantState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="IL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applicantZipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="62704" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="applicantPhoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Fluffy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="petAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petBreed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Breed</FormLabel>
                    <FormControl>
                      <Input placeholder="Labrador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="petGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pet Gender</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="male" id="petGenderMale" />
                            <label htmlFor="petGenderMale" className="ml-2">Male</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="female" id="petGenderFemale" />
                            <label htmlFor="petGenderFemale" className="ml-2">Female</label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petVaccinationStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vaccination Status</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value ? "true" : "false"} onValueChange={value => field.onChange(value === "true")}>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="true" id="petVaccinationYes" />
                            <label htmlFor="petVaccinationYes" className="ml-2">Vaccinated</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="false" id="petVaccinationNo" />
                            <label htmlFor="petVaccinationNo" className="ml-2">Not Vaccinated</label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="petNeuteredStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Neutered Status</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value ? "true" : "false"} onValueChange={value => field.onChange(value === "true")}>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="true" id="petNeuteredYes" />
                            <label htmlFor="petNeuteredYes" className="ml-2">Neutered</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="false" id="petNeuteredNo" />
                            <label htmlFor="petNeuteredNo" className="ml-2">Not Neutered</label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petGoodWithKids"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Good with Kids</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value ? "true" : "false"} onValueChange={value => field.onChange(value === "true")}>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="true" id="petGoodWithKidsYes" />
                            <label htmlFor="petGoodWithKidsYes" className="ml-2">Yes</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="false" id="petGoodWithKidsNo" />
                            <label htmlFor="petGoodWithKidsNo" className="ml-2">No</label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="petGoodWithPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Good with Other Pets</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value ? "true" : "false"} onValueChange={value => field.onChange(value === "true")}>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="true" id="petGoodWithPetsYes" />
                            <label htmlFor="petGoodWithPetsYes" className="ml-2">Yes</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="false" id="petGoodWithPetsNo" />
                            <label htmlFor="petGoodWithPetsNo" className="ml-2">No</label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petHouseTrained"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House Trained</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value ? "true" : "false"} onValueChange={value => field.onChange(value === "true")}>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="true" id="petHouseTrainedYes" />
                            <label htmlFor="petHouseTrainedYes" className="ml-2">Yes</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="false" id="petHouseTrainedNo" />
                            <label htmlFor="petHouseTrainedNo" className="ml-2">No</label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="petRehomeReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Rehoming</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Please provide a detailed explanation..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button type="submit" className="w-1/2">
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <ConfirmDialog openDialog={openDialog} closeDialog={handleCloseDialog} onSubmit={handleFormSubmit} />
    </>

  );
}
