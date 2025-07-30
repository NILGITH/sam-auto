import Layout from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Share2, Eye } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { mockVehicles } from '@/lib/mockData';
import { Vehicle } from '@/types';

// Utilisation des données de mockData
const cars = mockVehicles;

// Logos de marque (URL Unsplash ou SVG public)
const brandLogos: Record<string, string> = {
  Renault: '/image/logoRenault.jpg',
  Suzuki: '/image/logo-suziki.png',
  Volkswagen: '/image/logo-Volkswagen.png',
  Peugeot: '/image/logo-peugeot.png',
  MG: '/image/logo-MG.png',
  Nissan: '/image/logo-nissan.png',
  BMW: '/image/logo-BMW.webp',
  Mercedes: '/image/logo-mercedes.jpg',
  Audi: '/image/logo-audi.avif',
  Toyota: '/image/logo-toyota.png',
  Honda: '/image/logo-honda.png',
  Kia: '/image/logo-picanto.jpg',
  Volvo: '/image/logo-volvo.png',
  Dacia: '/image/logo-dacia.jpg',
  yundai: '/image/logo-yundai.jpeg', // Correction de l'orthographe
  Fiat: '/image/logo-peugeot.png', // Utilise un logo temporaire
};

function formatFCFA(price: number) {
  return price.toLocaleString('fr-FR') + ' FCFA';
}

function CarCard({ car }: { car: Vehicle }) {
  const router = useRouter();

  return (
    <Card 
      className="overflow-hidden border border-gray-200 shadow-sm group relative hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-44">
        <Image
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover bg-gray-100 rounded"
        />
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 right-2"
          onClick={(e) => {
            e.stopPropagation();
            // Action pour le bouton cœur
          }}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {/* Logo de la marque */}
          <img
            src={brandLogos[car.brand] || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}
            alt={car.brand}
            className="h-8 w-8 object-contain"
            style={{ 
              background: 'white', 
              borderRadius: '8px', 
              border: '2px solid #e5e7eb',
              padding: '2px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <span className="font-semibold text-gray-700 text-base">{car.brand} {car.model}</span>
          <span className="text-gray-400 text-sm">{car.year}</span>
        </div>
        <div className="text-lg font-bold text-blue-700 mb-1">{formatFCFA(car.price)}</div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span>{car.transmission}</span>
          <span>•</span>
          <span>{car.fuel}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Eye className="h-4 w-4" />
          <span>{car.mileage.toLocaleString()} KM</span>
        </div>
        {/* Badges en bas */}
        <div className="flex gap-2 mt-6">
          <Badge className="bg-green-600 text-xs">Certifiée</Badge>
          <Badge className="bg-blue-600 text-xs">Inspectée</Badge>
          <Badge className="bg-gray-800 text-white text-xs">6 Mois</Badge>
        </div>
        <div className="flex gap-2 mt-3">
          <Button 
            size="icon" 
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              // Action pour le bouton partage
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/details?id=${car.id}&type=vehicle`)}
          >
            Détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Vehicules() {
  // Section 1 : Voitures à 8 000 000 FCFA et moins
  const cheapCars = cars.filter(v => v.price <= 8000000);
  // Section 2 : Les autres voitures (plus de 8 000 000 FCFA)
  const otherCars = cars.filter(v => v.price > 8000000);

  return (
    <>
      <Layout />
      <main className="container mx-auto py-10 mb-12">
        {/* Section 1 */}
        <section className="mb-14">
          <div className="flex justify-between items-center mt-16 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Voitures à 8 000 000 FCFA et moins</h2>
           
          </div>
          <p className="text-gray-600 mb-5 text-sm sm:text-base">Ici vous pouvez voir différentes voitures à 8 000 000 FCFA et moins</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {cheapCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </section>

        {/* Section 2 */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Autres voitures</h2>
           
          </div>
          <p className="text-gray-600 mb-5 text-sm sm:text-base">Ici vous pouvez voir toutes les autres voitures disponibles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {otherCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}