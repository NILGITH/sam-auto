
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  Settings, 
  Search, 
  Menu, 
  X, 
  User,
  ShoppingCart
} from "lucide-react";

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white shadow-lg border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Car className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">SAM AUTO</h1>
              <p className="text-xs text-gray-500">Véhicules & Pièces</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Rechercher véhicules ou pièces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/vehicules">
              <Button variant="ghost" className="hover:bg-blue-50">
                Véhicules
              </Button>
            </Link>
            <Link href="/pieces">
              <Button variant="ghost" className="hover:bg-blue-50">
                Pièces détachées
              </Button>
            </Link>
            
           
          </nav>

          {/* Mobile menu button */}
          {/* <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button> */}
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* {isMenuOpen && (
          <div className="md:hidden pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/vehicules">
                <Button variant="ghost" className="w-full justify-start">
                  Véhicules
                </Button>
              </Link>
              <Link href="/pieces">
                <Button variant="ghost" className="w-full justify-start">
                  Pièces détachées
                </Button>
              </Link>
              <Link href="/apropos">
                <Button variant="ghost" className="w-full justify-start">
                  À propos
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" className="w-full justify-start">
                  Contact
                </Button>
              </Link>
              {isAdmin ? (
                <Link href="/admin">
                  <Button variant="outline" className="w-full justify-start bg-blue-600 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Administration
                  </Button>
                </Link>
              ) : (
                <Link href="/admin/login">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )} */}
      </div>
    </header>
  );
}
