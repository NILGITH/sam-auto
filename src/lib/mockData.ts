
import { Vehicle, SparePart, Category } from "@/types";

export const mockVehicles: Vehicle[] = [
  {
    id: "1",
    brand: "Peugeot",
    model: "308",
    year: 2020,
    price: 26000000,
    description: "Véhicule en excellent état, entretien régulier, première main",
    images: [
      "/image/peugeot308.png"
     
    ],
    category: "berline",
    mileage: 45000,
    fuel: "essence",
    transmission: "manuelle",
    color: "blanc",
    status: "available",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "2",
    brand: "Renault",
    model: "Clio",
    year: 2019,
    price: 11600000,
    description: "Citadine économique, parfaite pour la ville",
    images: [
      "/image/RenaultClio.png"
    ],
    category: "citadine",
    mileage: 62000,
    fuel: "diesel",
    transmission: "automatique",
    color: "rouge",
    status: "available",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "3",
    brand: "Toyota",
    model: "Belta",
    year: 2022,
    price: 9500000,
    description: "SUV premium, toutes options, garantie constructeur",
    images: [
      "/image/toyotabelta2022.jpg"
    ],
    category: "suv",
    mileage: 28000,
    fuel: "diesel",
    transmission: "automatique",
    color: "noir",
    status: "available",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    id: "4",
    brand: "Dacia",
    model: "Logan",
    year: 2021,
    price: 7500000,
    description: "Voiture économique et fiable, parfaite pour un premier achat",
    images: [
      "/image/logan.jpg"
    ],
    category: "berline",
    mileage: 35000,
    fuel: "essence",
    transmission: "manuelle",
    color: "gris",
    status: "available",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
  },
  {
    id: "5",
    brand: "Suzuki",
    model: "Alto",
    year: 2020,
    price: 6800000,
    description: "Petite citadine économique, idéale pour la ville",
    images: [
      "/image/alto.avif"
    ],
    category: "citadine",
    mileage: 42000,
    fuel: "essence",
    transmission: "manuelle",
    color: "bleu",
    status: "available",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "6",
    brand: "Hyundai",
    model: "i10",
    year: 2019,
    price: 7200000,
    description: "Citadine compacte avec un excellent rapport qualité-prix",
    images: [
      "/image/hyndai.jpg"
    ],
    category: "citadine",
    mileage: 38000,
    fuel: "essence",
    transmission: "automatique",
    color: "blanc",
    status: "available",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08")
  },
  {
    id: "7",
    brand: "Fiat",
    model: "Panda",
    year: 2020,
    price: 6500000,
    description: "Petite voiture urbaine, parfaite pour les petits trajets",
    images: [
      "/image/panda.png"
    ],
    category: "citadine",
    mileage: 28000,
    fuel: "essence",
    transmission: "manuelle",
    color: "vert",
    status: "available",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03")
  },
  {
    id: "8",
    brand: "Kia",
    model: "Picanto",
    year: 2021,
    price: 7800000,
    description: "Citadine moderne avec un design attractif",
    images: [
      "/image/picanto.avif"
    ],
    category: "citadine",
    mileage: 22000,
    fuel: "essence",
    transmission: "automatique",
    color: "orange",
    status: "available",
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  },
  {
    id: "9",
    brand: "Volkswagen",
    model: "Golf",
    year: 2020,
    price: 18500000,
    description: "Berline compacte de référence, excellente tenue de route",
    images: [
      "/image/VW.jpg"
    ],
    category: "berline",
    mileage: 41000,
    fuel: "diesel",
    transmission: "automatique",
    color: "gris métallisé",
    status: "available",
    createdAt: new Date("2024-01-22"),
    updatedAt: new Date("2024-01-22")
  },
  {
    id: "10",
    brand: "BMW",
    model: "Série 1",
    year: 2021,
    price: 32000000,
    description: "Berline premium avec moteur performant et finitions luxueuses",
    images: [
      "/image/bmw-serie-1.jpg"
    ],
    category: "berline",
    mileage: 18000,
    fuel: "essence",
    transmission: "automatique",
    color: "noir",
    status: "available",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  },
  {
    id: "11",
    brand: "Mercedes",
    model: "Classe A",
    year: 2022,
    price: 35000000,
    description: "Berline compacte luxueuse avec technologies de pointe",
    images: [
      "/image/classe-a.jpg"
    ],
    category: "berline",
    mileage: 15000,
    fuel: "essence",
    transmission: "automatique",
    color: "blanc nacré",
    status: "available",
    createdAt: new Date("2024-01-28"),
    updatedAt: new Date("2024-01-28")
  },
  {
    id: "12",
    brand: "Audi",
    model: "A3",
    year: 2021,
    price: 28000000,
    description: "Berline compacte avec design sportif et intérieur premium",
    images: [
      "/image/a3audi.jpg"
    ],
    category: "berline",
    mileage: 25000,
    fuel: "diesel",
    transmission: "automatique",
    color: "bleu",
    status: "available",
    createdAt: new Date("2024-01-30"),
    updatedAt: new Date("2024-01-30")
  }
];

export const mockSpareParts: SparePart[] = [
  {
    id: "1",
    name: "Plaquettes de frein avant",
    description: "Plaquettes de frein haute qualité pour Peugeot 308",
    price:  6500,
    image: "/image/Plaquettesdefrein.jpg",
    category: "freinage",
    compatibility: ["Peugeot 308", "Peugeot 3008"],
    brand: "Bosch",
    partNumber: "BP1234",
    condition: "new",
    stock: 15,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12")
  },
  {
    id: "2",
    name: "Amortisseur",
    description: "Filtre à air compatible plusieurs modèles Renault",
    price: 70000,
    image: "/image/Amortisseurs.jpg",
    category: "filtration",
    compatibility: ["Renault Clio", "Renault Megane"],
    brand: "Mann",
    partNumber: "FA5678",
    condition: "new",
    stock: 8,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08")
  },
  {
    id: "3",
    name: "Demarreur",
    description: "Phare avant droit pour BMW X3, état neuf",
    price: 50000,
    image: "/image/Demarreur.jpg",
    category: "eclairage",
    compatibility: ["BMW X3"],
    brand: "BMW",
    partNumber: "PH9012",
    condition: "new",
    stock: 3,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18")
  }
];

export const mockCategories: Category[] = [
  { id: "1", name: "Berline", type: "vehicle" },
  { id: "2", name: "Citadine", type: "vehicle" },
  { id: "3", name: "SUV", type: "vehicle" },
  { id: "4", name: "Break", type: "vehicle" },
  { id: "5", name: "Freinage", type: "spare_part" },
  { id: "6", name: "Filtration", type: "spare_part" },
  { id: "7", name: "Éclairage", type: "spare_part" },
  { id: "8", name: "Moteur", type: "spare_part" }
];
