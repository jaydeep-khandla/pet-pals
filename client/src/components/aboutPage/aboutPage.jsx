import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Shield, Users, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import image1 from "@/assets/images/DogHome.jpg";
import image2 from "@/assets/images/catHome.jpg";
import image3 from "@/assets/images/cat 2.jpg";

const useAutoChangingSlides = (totalSlides, interval) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, interval);

    return () => clearInterval(timer);
  }, [totalSlides, interval]);

  return [currentSlide, setCurrentSlide];
};

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const scaleUp = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6 },
  };

  const slideIn = {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
  };

  const slides = [image1, image2, image3];

  const [currentSlide, setCurrentSlide] = useAutoChangingSlides(slides.length, 5000);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f4f1ea]">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <img
            src="https://t3.ftcdn.net/jpg/04/81/85/46/360_F_481854656_gHGTnBscKXpFEgVTwAT4DL4NXXNhDKU9.jpg"
            alt="Happy pets"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold font-serif mt-6 mb-4">Pat Pal's</h1>
              <p className="text-xl md:text-3xl">Connecting Pets with Loving Homes</p>
            </motion.div>
          </div>
        </section>

        {/* Mission and Vision */}
        <motion.section className="py-20 px-4 md:px-8 bg-[#f4f1ea]" {...fadeInUp}>
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold mb-12 text-center font-serif">Our Mission & Vision</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 font-serif">Our Mission</h3>
                  <p className="text-lg leading-relaxed">
                    At PatPal's, we're dedicated to finding loving homes for every pet in need. Our mission encompasses: we work tirelessly to make
                    the adoption process easy, transparent, and accessible to everyone, ensuring that every pet has a chance to find their perfect
                    match.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                    <li>Educating communities about responsible pet ownership</li>
                    <li>Facilitating loving and lasting adoptions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4 font-serif">Our Vision</h3>
                  <p className="text-lg leading-relaxed">We envision a world where:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2 text-lg">
                    <li>Every pet has a loving home and proper care</li>
                    <li>Animal shelters become obsolete due to responsible ownership</li>
                    <li>Communities actively participate in animal welfare</li>
                    <li>The bond between humans and animals is celebrated</li>
                  </ul>
                </div>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide]}
                    alt={`Mission slide ${currentSlide + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/50 hover:bg-white/75"
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/50 hover:bg-white/75"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Core Values */}
        <motion.section className="py-20 px-4 md:px-8 bg-gray-100" {...slideIn}>
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-4xl font-bold mb-12 text-center font-serif">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Heart className="w-12 h-12 text-red-500" />,
                  title: "Compassion",
                  description: "We treat every animal with love and care, ensuring their well-being is our top priority.",
                },
                {
                  icon: <Shield className="w-12 h-12 text-blue-500" />,
                  title: "Responsibility",
                  description: "We take ownership of our actions and ensure the highest standards of care for all pets.",
                },
                {
                  icon: <Users className="w-12 h-12 text-green-500" />,
                  title: "Community",
                  description: "We foster a supportive network of animal lovers, working together to make a difference.",
                },
                {
                  icon: <ShieldAlert className="w-12 h-12 text-yellow-500" />,
                  title: "Dedication",
                  description: "We're committed to finding the perfect home for every pet, no matter how long it takes.",
                },
              ].map((value, index) => (
                <motion.div key={index} {...scaleUp} transition={{ delay: index * 0.1 }}>
                  <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <CardContent className="flex flex-col items-center text-center p-6 h-full">
                      {value.icon}
                      <h3 className="font-semibold text-xl mt-4 mb-2">{value.title}</h3>
                      <p className="text-gray-600 flex-grow">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <section className="py-24 bg-[#f4f1ea]">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-16 text-center font-serif">Success Stories</motion.h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: "John & Sarah",
                  quote: "Adopting Max from Paws & Hearts was the best decision we ever made. He's brought so much joy into our lives!",
                  image: "https://images.pexels.com/photos/4918102/pexels-photo-4918102.jpeg?auto=compress&cs=tinysrgb&w=600",
                },
                {
                  name: "Emily",
                  quote: "The team at Paws & Hearts was incredibly supportive throughout the entire adoption process.",
                  image: "https://images.pexels.com/photos/1975989/pexels-photo-1975989.jpeg?auto=compress&cs=tinysrgb&w=600",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} transition={{ delay: index * 0.2 }}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-0 flex flex-col md:flex-row">
                      <div className="md:w-1/2">
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name} with their adopted pet`}
                          width={400}
                          height={600}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-1/2 p-6 flex flex-col justify-center">
                        <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
                        <p className="font-semibold text-right">- {testimonial.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 md:px-8 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8">Join us in our mission to provide loving homes for pets in need.</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
