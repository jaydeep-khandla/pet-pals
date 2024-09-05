import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  funeralServiceType: z.enum(["Cremation", "Burial", "Memorial"], {
    required_error: "Please select a funeral service type.",
  }),
  preferredDate: z.date({
    required_error: "Please select a date.",
  }),
  additionalRequests: z.string().optional(),
});

export function FuneralArrangementForm() {
  const [date, setDate] = useState(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      phoneNumber: "",
      petId: "",
      funeralServiceType: undefined,
      preferredDate: undefined,
      additionalRequests: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Pet Funeral Arrangement</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="applicantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage>{errors.applicantName?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="applicantEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage>{errors.applicantEmail?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormMessage>{errors.phoneNumber?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Controller
          name="petId"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Pet</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* Replace with actual pet data */}
                  <SelectItem value="pet1">Fluffy</SelectItem>
                  <SelectItem value="pet2">Buddy</SelectItem>
                  <SelectItem value="pet3">Max</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{errors.petId?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Controller
          name="funeralServiceType"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funeral Service Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cremation">Cremation</SelectItem>
                  <SelectItem value="Burial">Burial</SelectItem>
                  <SelectItem value="Memorial">Memorial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage>{errors.funeralServiceType?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Controller
          name="preferredDate"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preferred Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setDate(date);
                    }}
                    disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage>{errors.preferredDate?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="additionalRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Requests (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any special requests or considerations..." className="resize-none" {...field} />
              </FormControl>
              <FormMessage>{errors.additionalRequests?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit Arrangement Request
        </Button>
      </form>
    </div>
  );
}
