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

const formSchema = z.object({
  applicantName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  applicantEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  applicantPhone: z.string().regex(/^\d{10}$/, {
    message: "Invalid phone number. Please enter 10 digits.",
  }),
  applicantAddress: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  deceasedName: z.string().min(2, {
    message: "Deceased name must be at least 2 characters.",
  }),
  deceasedAge: z.number().int().nonnegative({
    message: "Deceased age must be a positive integer.",
  }),
  deceasedBreed: z.string().min(2, {
    message: "Deceased breed must be at least 2 characters.",
  }),
  deceasedSpecies: z.string().min(2, {
    message: "Deceased species must be at least 2 characters.",
  }),
  reasonForDeath: z.string().min(10, {
    message: "Reason for death must be at least 10 characters.",
  }),
  funeralServiceType: z.enum(["Cremation", "Burial", "Memorial"], {
    message: "Please select a valid funeral service type.",
  }),
  funeralServiceDate: z.string().refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }, {
    message: "Please provide a valid date.",
  }),
  funeralServiceTime: z.string().min(5, {
    message: "Please provide a valid time.",
  }),
  additionalRequest: z.string().optional(),
});

export default function FuneralApplicationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantPhone: "",
      applicantAddress: "",
      deceasedName: "",
      deceasedAge: 0,
      deceasedBreed: "",
      deceasedSpecies: "",
      reasonForDeath: "",
      funeralServiceType: "Cremation",
      funeralServiceDate: new Date().toISOString().split('T')[0],
      funeralServiceTime: "",
      additionalRequest: "",
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
      funeralServiceDate: new Date(values.funeralServiceDate),
    });
    setOpenDialog(true);
  }

  const handleFormSubmit = async () => {
    try {
      const apiEndpoint = 'application/funeral';

      const response = await axios.post(apiEndpoint, formData);

      console.log('Form submitted successfully:', response.data);
      toast.success("Application submitted successfully!");

      setFormData({});
      form.reset();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("An error occurred. Please try again.");

      setFormData({});
      form.reset();
    } finally {
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <h1 className="text-4xl font-bold mt-6 mb-2 text-center text-gray-800">Funeral Application</h1>
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
                name="applicantPhone"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="deceasedName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deceased Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Fluffy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deceasedAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deceased Age</FormLabel>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="deceasedBreed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deceased Breed</FormLabel>
                    <FormControl>
                      <Input placeholder="Labrador" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deceasedSpecies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deceased Species</FormLabel>
                    <FormControl>
                      <Input placeholder="Dog" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reasonForDeath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Death</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Please provide a detailed explanation..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="funeralServiceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funeral Service Type</FormLabel>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange}>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <RadioGroupItem value="Cremation" id="funeralServiceCremation" />
                            <label htmlFor="funeralServiceCremation" className="ml-2">Cremation</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="Burial" id="funeralServiceBurial" />
                            <label htmlFor="funeralServiceBurial" className="ml-2">Burial</label>
                          </div>
                          <div className="flex items-center">
                            <RadioGroupItem value="Memorial" id="funeralServiceMemorial" />
                            <label htmlFor="funeralServiceMemorial" className="ml-2">Memorial</label>
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
                name="funeralServiceDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funeral Service Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)} // Keep the value as a string
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="funeralServiceTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funeral Service Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalRequest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Request</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any special requests or instructions..." className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-6 w-full">Submit Application</Button>
          </form>
        </Form>
      </div>

      {openDialog && (
        <ConfirmDialog
          openDialog={openDialog}
          cloaseDialog={handleCloseDialog}
          onSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
