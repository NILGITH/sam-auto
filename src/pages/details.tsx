import Layout from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Heart, Share2, Eye, Calendar, Fuel, Settings, MapPin, Shield, CheckCircle, Clock, Package } from 'lucide-react';
import Image from 'next/image';
import { usePay } from '@/hooks/usePay';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { mockVehicles, mockSpareParts } from '@/lib/mockData';
import { Vehicle, SparePart } from '@/types';

// Logos de marque
const brandLogos: Record<string, string> = {
  Renault: '/image/logoRenault.jpg',
  Suzuki: '/image/logo-suziki.png',
  Volkswagen: '/image/logo-Volkswagen.png',
  Peugeot: '/image/logo-peugeot.png',
  MG: '/image/logo-MG.png',
  Nissan: '/image/logo-nissan.png',
};

function formatFCFA(price: number) {
  return price.toLocaleString('fr-FR') + ' FCFA' ;
}

export default function Details() {
  const router = useRouter();
  const { id, type } = router.query;
  const [item, setItem] = useState<Vehicle | SparePart | null>(null);
  const [loading, setLoading] = useState(true);
  const { open, paymentStatus } = usePay();
  const [modalOpen, setModalOpen] = useState(false);
  const [avance, setAvance] = useState('');
  const [avanceError, setAvanceError] = useState('');

  useEffect(() => {
    if (id && type) {
      let foundItem = null;
      
      if (type === 'vehicle') {
        foundItem = mockVehicles.find(v => v.id === id) || null;
      } else if (type === 'spare_part') {
        foundItem = mockSpareParts.find(p => p.id === id) || null;
      }
      
      setItem(foundItem);
      setLoading(false);
    }
  }, [id, type]);

  if (loading) {
    return (
      <>
        <Layout />
        <main className="container mx-auto py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Chargement...</div>
          </div>
        </main>
      </>
    );
  }

  if (!item) {
    return (
      <>
        <Layout />
        <main className="container mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {type === 'vehicle' ? 'Véhicule' : 'Pièce détachée'} non trouvé
            </h1>
            <p className="text-gray-600 mb-4">
              {type === 'vehicle' ? 'Le véhicule' : 'La pièce détachée'} que vous recherchez n'existe pas.
            </p>
            <Button onClick={() => router.push(type === 'vehicle' ? '/vehicules' : '/pieces')}>
              Retour aux {type === 'vehicle' ? 'véhicules' : 'pièces détachées'}
            </Button>
          </div>
        </main>
      </>
    );
  }

  // Affichage confirmation paiement réussi
  if (paymentStatus === 'success') {
    const itemName = type === 'vehicle' 
      ? `${(item as Vehicle).brand} ${(item as Vehicle).model}`
      : (item as SparePart).name;
      
    return (
      <>
        <Layout />
        <main className="container mx-auto py-8">
          <div className="flex flex-col items-center justify-center h-96">
            <div className="text-green-600 text-3xl mb-4">✅</div>
            <h1 className="text-2xl font-bold mb-2">Paiement réussi !</h1>
            <p className="text-gray-700 mb-4">
              Merci pour votre achat {type === 'vehicle' ? 'du véhicule' : 'de la pièce détachée'} {itemName}.
            </p>
            <Button onClick={() => router.push(type === 'vehicle' ? '/vehicules' : '/pieces')}>
              Retour aux {type === 'vehicle' ? 'véhicules' : 'pièces détachées'}
            </Button>
          </div>
        </main>
      </>
    );
  }

  // Fonction pour déterminer si c'est un véhicule
  const isVehicle = (item: Vehicle | SparePart): item is Vehicle => {
    return 'brand' in item && 'model' in item;
  };

  const vehicle = isVehicle(item) ? item : null;
  const sparePart = !isVehicle(item) ? item : null;

  return (
    <>
      <Layout />
      <main className="container mx-auto py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><button onClick={() => router.push('/')} className="hover:text-blue-600">Accueil</button></li>
            <li>/</li>
            <li>
              <button 
                onClick={() => router.push(type === 'vehicle' ? '/vehicules' : '/pieces')} 
                className="hover:text-blue-600"
              >
                {type === 'vehicle' ? 'Véhicules' : 'Pièces détachées'}
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900">
              {vehicle ? `${vehicle.brand} ${vehicle.model}` : sparePart?.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image principale */}
          <div className="space-y-4">
            <div className="relative">
              <Image 
                src={vehicle ? vehicle.images[0] : sparePart!.image} 
                alt={vehicle ? `${vehicle.brand} ${vehicle.model}` : sparePart!.name} 
                width={600} 
                height={400} 
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {vehicle ? (
                  <>
                    <Badge className="bg-green-600">Certifiée</Badge>
                    <Badge className="bg-blue-600">Inspectée</Badge>
                    <Badge className="bg-gray-800 text-white">6 Mois</Badge>
                  </>
                ) : (
                  <>
                    <Badge className="bg-green-600">
                      {sparePart!.condition === 'new' ? 'Neuf' : 'Occasion'}
                    </Badge>
                    <Badge className="bg-blue-600">En stock</Badge>
                    <Badge className="bg-gray-800 text-white">{sparePart!.stock} unités</Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Informations principales */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {vehicle ? (
                  <>
                    <img
                      src={brandLogos[vehicle.brand] || 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'}
                      alt={vehicle.brand}
                      className="h-8 w-8 object-contain"
                      style={{ background: 'white', borderRadius: '50%', border: '1px solid #eee' }}
                    />
                    <h1 className="text-3xl font-bold text-gray-900">{vehicle.brand} {vehicle.model}</h1>
                  </>
                ) : (
                  <>
                    <Package className="h-8 w-8 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">{sparePart!.name}</h1>
                  </>
                )}
              </div>
              <p className="text-2xl font-bold text-blue-700">{formatFCFA(vehicle ? vehicle.price : sparePart!.price)}</p>
            </div>

            {/* Caractéristiques principales */}
            <div className="grid grid-cols-2 gap-4">
              {vehicle ? (
                <>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Année: {vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Carburant: {vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Transmission: {vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Kilométrage: {vehicle.mileage.toLocaleString()} KM</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Marque: {sparePart!.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Catégorie: {sparePart!.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">État: {sparePart!.condition === 'new' ? 'Neuf' : 'Occasion'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Stock: {sparePart!.stock} unités</span>
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{vehicle ? vehicle.description : sparePart!.description}</p>
            </div>

            {/* Équipements ou Compatibilité */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {vehicle ? 'Équipements' : 'Compatibilité'}
              </h3>
              {vehicle ? (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Climatisation',
                    'Direction assistée',
                    'Vitres électriques',
                    'Radio CD',
                    'ABS',
                    'Airbags'
                  ].map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sparePart!.compatibility.map((compat: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{compat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informations vendeur */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3">
                  {vehicle ? 'Informations vendeur' : 'Informations produit'}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      {vehicle ? 'SAM AUTO' : sparePart!.brand}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {vehicle ? 'Abidjan, Côte d\'Ivoire' : `Référence: ${sparePart!.partNumber}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Ajouté le {vehicle ? vehicle.createdAt.toLocaleDateString('fr-FR') : sparePart!.createdAt.toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setModalOpen(true)}>
                    {vehicle ? 'Acheter' : 'Commander'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {vehicle ? 'Régler une avance pour ce véhicule' : 'Commander cette pièce détachée'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mb-2">
                    <div className="font-semibold mb-1">
                      {vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.year})` : sparePart!.name}
                    </div>
                    <div className="text-blue-700 font-bold mb-1">
                      Prix total : {formatFCFA(vehicle ? vehicle.price : sparePart!.price)}
                    </div>
                    <div className="text-gray-600 text-sm mb-2">
                      {vehicle ? 'Saisissez le montant de l\'avance à régler :' : 'Saisissez le montant à régler :'}
                    </div>
                    <input
                      type="number"
                      min={1000}
                      max={vehicle ? 5000000 : sparePart!.price}
                      value={avance}
                      onChange={e => {
                        setAvance(e.target.value);
                        setAvanceError('');
                      }}
                      className="border rounded px-2 py-1 w-full mb-1"
                      placeholder={`Montant (FCFA)${vehicle ? ' - Avance' : ''}`}
                    />
                    {avanceError && <div className="text-red-600 text-xs mb-1">{avanceError}</div>}
                  </div>
                  <DialogFooter>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={
                        !avance || Number(avance) < 1000 || Number(avance) > (vehicle ? 5000000 : sparePart!.price)
                      }
                      onClick={() => {
                        const montant = Number(avance);
                        setAvanceError('');
                        setModalOpen(false);
                        open({
                          amount: montant,
                          name: vehicle ? `${vehicle.brand} ${vehicle.model}` : sparePart!.name,
                          email: 'client@samauto.fr',
                          phone: '+22500000000',
                          reason: vehicle ? `Acompte pour ${vehicle.brand} ${vehicle.model}` : `Commande de ${sparePart!.name}`,
                          sandbox: true,
                        });
                      }}
                    >
                      {vehicle ? 'Régler l\'avance' : 'Commander'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Caractéristiques détaillées */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Caractéristiques détaillées</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 mb-12 gap-6">
            {vehicle ? (
              <>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Informations générales</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marque:</span>
                        <span>{vehicle.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Modèle:</span>
                        <span>{vehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Année:</span>
                        <span>{vehicle.year}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Caractéristiques techniques</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carburant:</span>
                        <span>{vehicle.fuel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transmission:</span>
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Couleur:</span>
                        <span>{vehicle.color}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">État et garantie</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kilométrage:</span>
                        <span>{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Statut:</span>
                        <span className="text-green-600">{vehicle.status === 'available' ? 'Disponible' : 'Vendu'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Catégorie:</span>
                        <span>{vehicle.category}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Informations produit</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nom:</span>
                        <span>{sparePart!.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marque:</span>
                        <span>{sparePart!.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Référence:</span>
                        <span>{sparePart!.partNumber}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Caractéristiques</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Catégorie:</span>
                        <span>{sparePart!.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">État:</span>
                        <span>{sparePart!.condition === 'new' ? 'Neuf' : 'Occasion'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stock:</span>
                        <span>{sparePart!.stock} unités</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Compatibilité</h3>
                    <div className="space-y-2 text-sm">
                      {sparePart!.compatibility.map((compat, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">Modèle {index + 1}:</span>
                          <span>{compat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 