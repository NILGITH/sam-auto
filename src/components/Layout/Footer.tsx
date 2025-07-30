
import Link from "next/link";
import { Car, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">SAM AUTO</h3>
                <p className="text-sm text-gray-400">Véhicules & Pièces détachées</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Votre partenaire de confiance pour l'achat de véhicules d'occasion 
              et de pièces détachées de qualité. Plus de 10 ans d'expérience 
              dans l'automobile.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/vehicules" className="text-gray-300 hover:text-white transition-colors">
                  Véhicules
                </Link>
              </li>
              <li>
                <Link href="/pieces" className="text-gray-300 hover:text-white transition-colors">
                  Pièces détachées
                </Link>
              </li>
              <li>
                <Link href="/apropos" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-300">contact@samauto.fr</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-gray-300">
                  123 Avenue de l'Automobile<br />
                  75001 Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SAM AUTO. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
