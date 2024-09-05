import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PawPrint, Heart, Users, CheckCircle, Flower, Flower2, Calendar, FileText, Gift } from "lucide-react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useEffect } from "react";
import axios from "@/Api/axios";

export default function ServicesPage() {
  const { ref: rehomeRef, inView: rehomeInView } = useInView({ triggerOnce: false });
  const { ref: funeralRef, inView: funeralInView } = useInView({ triggerOnce: false });
  const { ref: supportRef, inView: supportInView } = useInView({ triggerOnce: false });
  const { ref: infoRef, inView: infoInView } = useInView({ triggerOnce: false });

  const scaleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  useEffect(() => {
    const res = axios.get("/user/shelters", {
      params: {
        userType: "animal_shelter",
      }
    })

    res.then((response) => {
      console.log(response.data.shelters);
    })

  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b bg-[#f4f1ea] pt-8">
        {/* Hero Section */}
        <section className="relative h-[40vh] overflow-hidden ">
          <img
            src="https://media.istockphoto.com/id/1393591964/photo/dog-walkers-enjoying-their-work-pets-walkers-service.jpg?s=1024x1024&w=is&k=20&c=K6Bh2AX8qSfMHun3gD40l50t47pkZi7NvaUObZlAaF0="
            alt="Pets collage"
            width={1200}
            height={600}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white font-serif text-center">Our Services</h1>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Pet Re-home Card */}
            <motion.div
              ref={rehomeRef}
              variants={scaleVariants}
              initial="hidden"
              animate={rehomeInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src="https://i.pinimg.com/originals/0f/21/4e/0f214e422710b893695c8db81be64570.jpg"
                      alt="Happy adopted pet"
                      width={600}
                      height={400}
                      className="h-96 w-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-1/2 p-4  md:p-4 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center space-x-2">
                        <PawPrint className="h-6 w-6 text-orange-500" />
                        <CardTitle className="text-2xl font-bold">Pets Re-home</CardTitle>
                      </div>
                    </CardHeader>
                    <CardDescription className="text-base ">
                      Our pet re-homing service ensures that <b>every animal finds a loving forever home</b>. We carefully match pets with potential
                      adopters, considering factors such as lifestyle, living space, and experience to create perfect partnerships.
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            </motion.div>

            {/* Pet Funeral Card */}
            <motion.div
              ref={funeralRef}
              variants={scaleVariants}
              initial="hidden"
              animate={funeralInView ? "visible" : "hidden"}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="overflow-hidden">
                <div className="md:flex flex-row-reverse">
                  <div className="md:w-1/2">
                    <img
                      src="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2012/September/120914/544620-g-biz-120912-pet-cemetary-02.jpg"
                      alt="Peaceful pet memorial"
                      width={600}
                      height={400}
                      className="h-96 w-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-red-500" />
                        <CardTitle className="text-2xl font-bold">Pet Funeral</CardTitle>
                      </div>
                    </CardHeader>
                    <CardDescription className="text-base">
                      We understand the deep bond between pets and their families. Our compassionate pet funeral services provide a dignified{" "}
                      <b> farewell for your beloved companion</b>, offering support and comfort during this difficult time.
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
            <motion.div
              ref={infoRef}
              variants={scaleVariants}
              animate={infoInView ? "visible" : "hidden"}
              className="mb-16"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h2 className="text-3xl font-semibold text-center mb-8 font-serif">How It Works</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">ReHome Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <PawPrint className="mr-4 text-primary" />
                        <span>Submit Pet Information</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="mr-4 text-primary" />
                        <span>Match with Potential Adopters</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-4 text-primary" />
                        <span>Meet & Greet</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="mr-4 text-primary" />
                        <span>Finalize Adoption</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Funeral Process</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Flower className="mr-4 text-primary" />
                        <span>Choose Memorial Service</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-4 text-primary" />
                        <span>Schedule the Ceremony</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="mr-4 text-primary" />
                        <span>Personalize the Service</span>
                      </div>
                      <div className="flex items-center">
                        <Gift className="mr-4 text-primary" />
                        <span>Select Keepsakes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Additional Support Card */}
            <motion.div
              ref={supportRef}
              variants={scaleVariants}
              initial="hidden"
              animate={supportInView ? "visible" : "hidden"}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Card>
                <CardContent className="p-6 md:p-8 text-center">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Flower2 className="h-6 w-6 text-green-500" />
                      <CardTitle className="text-2xl font-bold">Additional Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardDescription className="text-base max-w-2xl mx-auto">
                    At PetPals, we're here for you every step of the way. Whether you need advice on pet care, behavioral training, or emotional
                    support, our team of experts is always ready to help.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-orange-800 mb-4">Ready to Use Services?</h2>
            <p className="text-lg text-orange-700 mb-8">Discover how PetPals can support you and your furry friends.</p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Our Services
            </Button>
          </div>
        </section>
      </div>
      <motion.section
        className="mb-16 ml-10 mt-4 max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold text-center mt mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long does the ReHome process take?</AccordionTrigger>
            <AccordionContent>
              The ReHome process duration can vary, but typically takes 2-4 weeks. We work diligently to find the perfect match for your pet while
              ensuring a thorough screening process.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What types of funeral services do you offer?</AccordionTrigger>
            <AccordionContent>
              We offer a range of services including private cremation, communal cremation, and memorial ceremonies. Each service can be personalized
              to honor your pet's unique life and personality.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I meet potential adopters before finalizing the rehoming?</AccordionTrigger>
            <AccordionContent>
              Absolutely! We encourage meet-and-greet sessions between you, your pet, and potential adopters to ensure it's a good match for everyone
              involved.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.section>
      <Footer />
    </>
  );
}
