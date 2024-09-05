import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen to-black">
        {/* Hero Section */}
        <div className="relative h-[300px] overflow-hidden  ">
          <img
            src="https://t3.ftcdn.net/jpg/00/53/83/38/240_F_53833882_Y6oL2JC5n2TYPR5YWktr6zObnlpPc2p0.jpg"
            alt="Dogs playing"
            className="h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center ">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold font-serif mt-8 text-white">Get in Touch</h1>
            </motion.div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="container mx-auto py-16 px-4  to-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">We'd love to hear from you. Fill out the form, and we'll get back to you as soon as possible.</p>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <Phone className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium">Call Anytime</p>
                      <p className="text-gray-600">(800) 123-45789</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <Mail className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium">Write Email</p>
                      <p className="text-gray-600">help@yourcompany.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <MapPin className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <p className="font-medium">Visit Office</p>
                      <p className="text-gray-600">214 Golden Street Round Road New York, USA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Your Name" className="bg-gray-50" />
                      <Input placeholder="Your Email" type="email" className="bg-gray-50" />
                    </div>
                    <Input placeholder="Your Subject" className="bg-gray-50" />
                    <Input placeholder="Your Phone Number" type="tel" className="bg-gray-50" />
                    <Textarea placeholder="Your Message" rows={6} className="bg-gray-50" />
                    <Button className="w-full">Send a Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
