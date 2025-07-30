import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Star, ShoppingCart, Eye, Check, X, Truck, Clock } from 'lucide-react';
import { usePay } from "@/hooks/usePay";

// Données mock avancées
const categories = [
  'Moteur', 'Transmission', 'Suspension', 'Freinage', 'Électricité', 'Carrosserie', 'Échappement', 'Accessoires'
];
const brands = ['Renault', 'Peugeot', 'Toyota', 'Citroën', 'Volkswagen'];

const spareParts = [
  {
    id: 1,
    name: 'Alternateur',
    image: '/image/Alternateur.webp',
    price: 280000,
    oldPrice: 265000,
    description: "Permet de recharger la batterie et d'alimenter les équipements électriques du véhicule.",
    stock: 12,
    isNew: true,
    promo: true,
    promoPercent: 17,
    rating: 4.5,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Jean', note: 5, comment: 'Très bon produit, livraison rapide.' },
      { user: 'Fatou', note: 4, comment: 'Fonctionne parfaitement sur ma Clio.' },
    ],
    brand: 'Renault',
    category: 'Électricité',
    compatibility: ['Renault Clio', 'Renault Megane'],
    delivery: '24-48h',
    seller: 'AutoParts Pro',
    pack: false,
  },
  {
    id: 2,
    name: 'Embrayage',
    image: '/image/embrayage.jpg',
    price: 150000,
    oldPrice: null,
    description: "Assure la liaison entre le moteur et la boîte de vitesses.",
    stock: 3,
    isNew: false,
    promo: false,
    promoPercent: 0,
    rating: 4.2,
    state: 'occasion',
    bestSeller: false,
    reviews: [
      { user: 'Ali', note: 4, comment: 'Bon rapport qualité/prix.' },
    ],
    brand: 'Peugeot',
    category: 'Transmission',
    compatibility: ['Peugeot 208', 'Peugeot 308'],
    delivery: '3-5j',
    seller: 'Garage Express',
    pack: true,
  },
  {
    id: 3,
    name: 'Amortisseurs',
    image: '/image/amortisseurs.jpg',
    price: 70000,
    oldPrice: 65000,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },

  {
    id: 4,
    name: 'Bougies d\'allumage',
    image: '/image/bougiesallumage.jpeg',
    price: 20000,
    oldPrice: 15000,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },

  {
    id: 5,
    name: 'Courroie de distribution',
    image: '/image/Courroiededistribution.jpg',
    price: 100000,
    oldPrice: 90000,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },
  {
    id: 6,
    name: 'Démarreur',
    image: '/image/Demarreur.jpg',
    price: 289000,
    oldPrice: 270000,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },
  {
    id: 7,
    name: 'Filtre a huile',
    image: '/image/Filtreahuile.jpg',
    price: 28000,
    oldPrice: 32000,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },
  {
    id: 8,
    name: 'Plaquettes de frein',
    image: '/image/Plaquettesdefrein.jpg',
    price: 25000,
    oldPrice: 15000,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },
  {
    id: 9,
    name: 'pompe à eau',
    image: '/image/pompe à eau.png',
    price: 4000,
    oldPrice: 3500,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },
  {
    id: 10,
    name: 'Rétroviseur',
    image: '/image/Retroviseur.jpg',
    price: 25000,
    oldPrice: 23000,
    description: "Garantissent le confort et la tenue de route en absorbant les chocs.",
    stock: 0,
    isNew: false,
    promo: true,
    promoPercent: 12,
    rating: 4.7,
    state: 'neuf',
    bestSeller: true,
    reviews: [
      { user: 'Sophie', note: 5, comment: 'Montage facile, très satisfait.' },
      { user: 'Marc', note: 4, comment: 'Livraison un peu longue mais bon produit.' },
    ],
    brand: 'Toyota',
    category: 'Suspension',
    compatibility: ['Toyota Yaris', 'Toyota Corolla'],
    delivery: 'Sur commande',
    seller: 'Pièces Discount',
    pack: false,
  },
  // ... Ajoute d'autres pièces !
];

const states = ['neuf', 'occasion'];
const sortOptions = [
  { value: 'default', label: 'Pertinence' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name', label: 'Nom' },
  { value: 'new', label: 'Nouveautés' },
];

export default function Pieces() {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockOnly, setStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('default');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [cart, setCart] = useState<any[]>([]);
  const [quickView, setQuickView] = useState<null | typeof spareParts[0]>(null);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [compare, setCompare] = useState<number[]>([]);
  const { open: openPay } = usePay();

  let filteredParts = spareParts.filter(part => {
    const matchSearch = part.name.toLowerCase().includes(search.toLowerCase()) || part.description.toLowerCase().includes(search.toLowerCase());
    const matchState = stateFilter ? part.state === stateFilter : true;
    const matchMin = minPrice ? part.price >= parseInt(minPrice) : true;
    const matchMax = maxPrice ? part.price <= parseInt(maxPrice) : true;
    const matchStock = stockOnly ? part.stock > 0 : true;
    const matchRating = part.rating >= minRating;
    const matchCategory = categoryFilter ? part.category === categoryFilter : true;
    const matchBrand = brandFilter ? part.brand === brandFilter : true;
    return matchSearch && matchState && matchMin && matchMax && matchStock && matchRating && matchCategory && matchBrand;
  });

  // Tri
  filteredParts = [...filteredParts].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0;
  });

  // Pagination fictive (8 par page)
  const [page, setPage] = useState(1);
  const perPage = 8;
  const pagedParts = filteredParts.slice(0, page * perPage);
  const hasMore = filteredParts.length > pagedParts.length;

  // Best sellers & recommandations
  const bestSellers = spareParts.filter(p => p.bestSeller);
  const recommended = spareParts.filter(p => p.isNew || p.promo);

  // Mini-panier déroulant
  const [showCart, setShowCart] = useState(false);

  // FAQ mock
  const faqs = [
    { q: "Quels sont les délais de livraison ?", a: "Entre 24h et 5j selon la pièce et la disponibilité." },
    { q: "Puis-je retourner une pièce ?", a: "Oui, sous 30 jours si la pièce n'a pas été montée." },
    { q: "Comment savoir si la pièce est compatible ?", a: "Consultez la section compatibilité ou contactez un expert." },
  ];

  // Engagements
  const engagements = [
    { icon: <Check className="h-6 w-6 text-green-600" />, label: "Paiement sécurisé" },
    { icon: <Truck className="h-6 w-6 text-blue-600" />, label: "Livraison rapide" },
    { icon: <Clock className="h-6 w-6 text-yellow-500" />, label: "Retour sous 30j" },
    { icon: <Star className="h-6 w-6 text-orange-400" />, label: "Avis clients vérifiés" },
  ];

  // Comparateur
  const toggleCompare = (id: number) => {
    setCompare(c => c.includes(id) ? c.filter(i => i !== id) : [...c, id]);
  };

  return (
    <>
      <Header />
      {/* Mini panier flottant + déroulant */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 border border-blue-200 cursor-pointer" onClick={() => setShowCart(s => !s)}>
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-blue-700">{cart.length}</span>
        </div>
        {showCart && (
          <div className="mt-2 bg-white rounded-lg shadow-xl p-4 w-80 border">
            <h3 className="font-bold mb-2">Mon panier</h3>
            {cart.length === 0 ? <div className="text-gray-500">Panier vide</div> : (
              <ul className="divide-y">
                {cart.map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between py-2">
                    <span>{item.name}</span>
                    <span className="font-bold text-blue-700">{item.price.toLocaleString('fr-FR')} FCFA</span>
                    <button className="ml-2 text-red-500" onClick={() => setCart(c => c.filter((_, i) => i !== idx))}><X className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && <div className="mt-2 font-bold text-right">Total : {cart.reduce((t, i) => t + i.price, 0).toLocaleString('fr-FR')} FCFA</div>}
          </div>
        )}
      </div>
      {/* Slider promo */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-400 text-white py-6 px-2 text-center text-lg font-bold mb-4">
        <span className="mr-4">-10% sur les amortisseurs cette semaine !</span>
        <span className="mr-4">Livraison offerte dès 50 000 FCFA</span>
        <span>Satisfait ou remboursé 30j</span>
      </div>
      <main className="max-w-7xl mx-auto py-6 px-2 md:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar ultra-complète */}
          <aside className="w-full md:w-72 h-[1000px] bg-white border rounded-lg p-6 mb-8 md:mb-0 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">Filtres</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Recherche</label>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="border rounded px-3 py-2 w-full" placeholder="Nom ou description..." />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Catégorie</label>
              <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="border rounded px-3 py-2 w-full">
                <option value="">Toutes</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Marque</label>
              <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)} className="border rounded px-3 py-2 w-full">
                <option value="">Toutes</option>
                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">État</label>
              <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="border rounded px-3 py-2 w-full">
                <option value="">Tous</option>
                {states.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div className="mb-4 flex gap-2">
              <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Prix min" className="border rounded px-2 py-1 w-1/2" />
              <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Prix max" className="border rounded px-2 py-1 w-1/2" />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <input type="checkbox" checked={stockOnly} onChange={e => setStockOnly(e.target.checked)} id="stockOnly" />
              <label htmlFor="stockOnly" className="text-sm">En stock uniquement</label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Note minimale</label>
              <select value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="border rounded px-3 py-2 w-full">
                {[0, 3, 4, 4.5, 5].map(r => <option key={r} value={r}>{r === 0 ? 'Toutes' : `≥ ${r}★`}</option>)}
              </select>
            </div>

            {/* Section statistiques */}
            <div className="border-t pt-4 mb-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Statistiques</h3>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Total pièces :</span>
                  <span className="font-semibold">{spareParts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>En stock :</span>
                  <span className="font-semibold text-green-600">{spareParts.filter(p => p.stock > 0).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>En promo :</span>
                  <span className="font-semibold text-red-600">{spareParts.filter(p => p.promo).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nouveautés :</span>
                  <span className="font-semibold text-blue-600">{spareParts.filter(p => p.isNew).length}</span>
                </div>
              </div>
            </div>

            {/* Section contact */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Besoin d'aide ?</h3>
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Livraison gratuite dès 50 000 FCFA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Retour sous 30 jours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Service client 24/7</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-2">
                  Contacter un expert
                </Button>
              </div>
            </div>
          </aside>
          {/* Main content */}
          <section className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div className="text-gray-600 text-sm">{filteredParts.length} résultat{filteredParts.length > 1 ? 's' : ''}</div>
              <div className="flex gap-2 items-center">
                <label className="text-sm mr-2">Tri :</label>
                <select value={sort} onChange={e => setSort(e.target.value)} className="border rounded px-3 py-2">
                  {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <Button size="icon" variant={view === 'list' ? 'default' : 'outline'} onClick={() => setView('list')}><svg width="20" height="20" fill="none"><rect x="2" y="4" width="16" height="3" rx="1" fill={view==='list'?'#2563eb':'#e5e7eb'} /><rect x="2" y="13" width="16" height="3" rx="1" fill={view==='list'?'#2563eb':'#e5e7eb'} /></svg></Button>
              </div>
            </div>
            {/* Grille ou liste */}
            <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' : 'flex flex-col gap-6'}>
              {pagedParts.map((part) => (
                <Card key={part.id} className={view === 'grid' ? 'relative overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col' : 'flex flex-row items-center gap-6 p-4 group hover:shadow-2xl transition-all duration-300'}>
                  <div className={view === 'grid' ? 'relative w-full h-48' : 'relative w-40 h-40 flex-shrink-0'}>
                    <Image
                      src={part.image}
                      alt={part.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover bg-gray-100 rounded-t group-hover:scale-105 transition-transform duration-300"
                    />
                    {part.isNew && <Badge className="absolute top-2 left-2 bg-green-600">Nouveau</Badge>}
                    {part.promo && <Badge className="absolute top-2 right-2 bg-red-600">Promo</Badge>}
                    {part.stock === 0 && <Badge className="absolute bottom-2 left-2 bg-gray-500">Rupture</Badge>}
                    {part.pack && <Badge className="absolute bottom-2 right-2 bg-blue-600">Pack</Badge>}
                    <Button size="icon" variant="secondary" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setQuickView(part)}><Eye className="h-5 w-5" /></Button>
                  </div>
                  <CardContent className={view === 'grid' ? 'p-4 flex flex-col flex-1' : 'flex-1 p-0'}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800 text-lg truncate">{part.name}</span>
                      <span className="text-xs text-gray-500 capitalize">({part.state})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-blue-700 font-bold text-xl">{part.price.toLocaleString('fr-FR')} FCFA</span>
                      {part.oldPrice && <span className="text-gray-400 line-through text-base">{part.oldPrice.toLocaleString('fr-FR')} FCFA</span>}
                      {part.promo && <span className="text-red-600 text-xs font-bold">-{part.promoPercent}%</span>}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`h-4 w-4 ${i <= Math.round(part.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({part.rating})</span>
                      <span className="text-xs text-gray-400 ml-1">{part.reviews.length} avis</span>
                    </div>
                    <div className="text-gray-500 text-sm mb-2 line-clamp-2">{part.description}</div>
                    <div className={view === 'grid' ? 'flex items-center gap-2 mt-auto' : 'flex items-center gap-2 mt-2'}>
                      <Button size="sm" variant="outline" className="w-1/2" onClick={() => openPay({
                        amount: part.price,
                        description: part.name,
                        customerName: "Client SAM AUTO",
                        customerEmail: "",
                        customerPhone: ""
                      })}>
                        Acheter
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2">
                      {part.stock > 0 ? <span className="text-green-600">En stock ({part.stock})</span> : <span className="text-red-600">Indisponible</span>}
                      <span className="flex items-center gap-1"><Truck className="h-4 w-4" /> {part.delivery}</span>
                      <span className="flex items-center gap-1"><Check className="h-4 w-4" /> {part.seller}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Compatibilité : {part.compatibility.join(', ')}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Pagination */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <Button variant="outline" onClick={() => setPage(p => p+1)}>Charger plus</Button>
              </div>
            )}
            {/* Aperçu rapide (quick view modal) */}
            {quickView && (
              <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setQuickView(null)}>&times;</button>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full h-48 md:w-48 md:h-48 flex-shrink-0">
                      <Image src={quickView.image} alt={quickView.name} fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover rounded" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{quickView.name}</h2>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-700 font-bold text-xl">{quickView.price.toLocaleString('fr-FR')} FCFA</span>
                        {quickView.oldPrice && <span className="text-gray-400 line-through text-base">{quickView.oldPrice.toLocaleString('fr-FR')} FCFA</span>}
                        {quickView.promo && <span className="text-red-600 text-xs font-bold">-{quickView.promoPercent}%</span>}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`h-4 w-4 ${i <= Math.round(quickView.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({quickView.rating})</span>
                        <span className="text-xs text-gray-400 ml-1">{quickView.reviews.length} avis</span>
                      </div>
                      <div className="text-gray-500 text-sm mb-2">{quickView.description}</div>
                      <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2">
                        {quickView.stock > 0 ? <span className="text-green-600">En stock ({quickView.stock})</span> : <span className="text-red-600">Indisponible</span>}
                        <span className="flex items-center gap-1"><Truck className="h-4 w-4" /> {quickView.delivery}</span>
                        <span className="flex items-center gap-1"><Check className="h-4 w-4" /> {quickView.seller}</span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">Compatibilité : {quickView.compatibility.join(', ')}</div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => { setCart(c => [...c, quickView]); setQuickView(null); }}>Ajouter au panier</Button>
                        <Link href={`/detailspieces?id=${quickView.id}`}>
                          <Button size="sm" variant="secondary">Voir la fiche</Button>
                        </Link>
                      </div>
                      {/* Avis clients */}
                      <div className="mt-4">
                        <h3 className="font-semibold mb-2">Avis clients</h3>
                        {quickView.reviews.length === 0 ? <div className="text-gray-400">Aucun avis</div> : (
                          <ul className="divide-y">
                            {quickView.reviews.map((r, idx) => (
                              <li key={idx} className="py-2 text-sm"><span className="font-bold">{r.user}</span> : {r.comment} <span className="ml-2 text-yellow-500">{'★'.repeat(r.note)}</span></li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Comparateur */}
            {compare.length >= 2 && (
              <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg p-4 flex gap-4 overflow-x-auto">
                <span className="font-bold text-blue-700 mr-4">Comparateur</span>
                {spareParts.filter(p => compare.includes(p.id)).map(p => (
                  <div key={p.id} className="flex flex-col items-center border rounded p-2 min-w-[180px]">
                    <Image src={p.image} alt={p.name} width={80} height={80} className="object-cover rounded mb-2" />
                    <span className="font-semibold text-sm mb-1">{p.name}</span>
                    <span className="text-blue-700 font-bold text-base mb-1">{p.price.toLocaleString('fr-FR')} FCFA</span>
                    <span className="text-xs text-gray-500 mb-1">{p.state}</span>
                    <span className="text-xs text-gray-500 mb-1">{p.brand}</span>
                    <span className="text-xs text-gray-500 mb-1">{p.category}</span>
                    <span className="text-xs text-gray-500 mb-1">Compatibilité : {p.compatibility.join(', ')}</span>
                    <Button size="sm" variant="destructive" onClick={() => toggleCompare(p.id)}>Retirer</Button>
                  </div>
                ))}
              </div>
            )}
            {/* Section engagements */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-8 text-center text-white flex flex-wrap gap-8 justify-center items-center">
              {engagements.map((e, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {e.icon}
                  <span className="mt-2 font-semibold">{e.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}