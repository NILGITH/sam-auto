
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { 
  Car, 
  Settings, 
  Search, 
  Star,
  Users,
  Shield,
  Truck,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { mockVehicles, mockSpareParts } from "@/lib/mockData";

export default function HomePage() {
  const featuredVehicles = mockVehicles.slice(0, 3);
  const featuredParts = mockSpareParts.slice(0, 3);

  return (
    <>
      <Head>
        <title>SAM AUTO - Véhicules d'occasion et pièces détachées</title>
        <meta name="description" content="Découvrez notre sélection de véhicules d'occasion et pièces détachées de qualité. SAM AUTO, votre partenaire automobile de confiance." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Bienvenue chez <span className="text-yellow-400">SAM AUTO</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Votre destination de confiance pour les véhicules d'occasion 
                et les pièces détachées de qualité
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/vehicules">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                    <Car className="mr-2 h-5 w-5" />
                    Voir les véhicules
                  </Button>
                </Link>
                <Link href="/pieces">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-800">
                    <Settings className="mr-2 h-5 w-5" />
                    Pièces détachées
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Car className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Véhicules vendus</p>
              </div>
              <div className="p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
                <p className="text-gray-600">Pièces en stock</p>
              </div>
              <div className="p-6">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">2000+</h3>
                <p className="text-gray-600">Clients satisfaits</p>
              </div>
              <div className="p-6">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">10+</h3>
                <p className="text-gray-600">Années d'expérience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Véhicules en vedette
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez notre sélection de véhicules d'occasion soigneusement inspectés
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={vehicle.images[0]}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-green-600">
                      {vehicle.status === "available" ? "Disponible" : "Vendu"}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {vehicle.brand} {vehicle.model}
                    </h3>
                    <p className="text-gray-600 mb-4">{vehicle.year} • {vehicle.mileage.toLocaleString()} km</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">
                        {vehicle.price.toLocaleString()} FCFA
                      </span>
                      <Link href={`/details?id=${vehicle.id}&type=vehicle`}>
                        <Button size="sm">
                          Voir détails
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/vehicules">
                <Button size="lg" variant="outline">
                  Voir tous les véhicules
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Spare Parts */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pièces détachées populaires
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Trouvez les pièces dont vous avez besoin pour votre véhicule
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredParts.map((part) => (
                <Card key={part.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600">
                      {part.condition === "new" ? "Neuf" : "Occasion"}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{part.name}</h3>
                    <p className="text-gray-600 mb-2">{part.brand}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Compatible: {part.compatibility.join(", ")}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">
                        {part.price} FCFA
                      </span>
                      <Link href={`/details?id=${part.id}&type=spare_part`}>
                        <Button size="sm">
                          Voir détails
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/spare-parts">
                <Button size="lg" variant="outline">
                  Voir toutes les pièces
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section flex items-center  py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pourquoi choisir SAM AUTO ?
              </h2>
              <p className="text-gray-600">une excellence inégalée et la satisfaction du client</p>
            </div>

            {/* <div className="bg-blue-50">
              <Image src="/images/car.png" alt="Why Choose Us" width={1060} height={420} />

            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Qualité garantie</h3>
                <p className="text-gray-600">
                  Tous nos véhicules sont inspectés et nos pièces sont certifiées 
                  pour vous garantir la meilleure qualité.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Livraison rapide</h3>
                <p className="text-gray-600">
                  Livraison gratuite pour les pièces détachées et assistance 
                  pour la livraison des véhicules.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Service client</h3>
                <p className="text-gray-600">
                  Notre équipe d'experts est là pour vous conseiller et vous 
                  accompagner dans vos achats.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
