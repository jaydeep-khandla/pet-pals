import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  applicantName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  applicantEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string().optional(),
  petId: z.string().min(1, {
    message: "Please select a pet.",
  }),
  reasonForRehoming: z.string().min(10, {
    message: "Please provide a detailed reason for rehoming (min 10 characters).",
  }),
  rehomingFee: z.number().min(0).optional(),
  preferredNewHomeType: z.string().min(1, {
    message: "Please select a preferred home type.",
  }),
});

export default function ReHomeApplicationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      phoneNumber: "",
      petId: "",
      reasonForRehoming: "",
      rehomingFee: 0,
      preferredNewHomeType: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    // Here you would typically send the form data to your backend
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ReHome Application</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (optional)</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a pet" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pet1">Fluffy (Cat)</SelectItem>
                    <SelectItem value="pet2">Buddy (Dog)</SelectItem>
                    <SelectItem value="pet3">Tweety (Bird)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reasonForRehoming"
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
          <FormField
            control={form.control}
            name="rehomingFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rehoming Fee (optional)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormDescription>Enter the amount in dollars</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredNewHomeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred New Home Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select home type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="farm">Farm</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </Form>
    </div>
  );
}
