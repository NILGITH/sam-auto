import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, AlertCircle, Shield, Truck, Users } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Téléphone",
      value: "+225 27 22 49 73 84",
      description: "Lun-Ven: 8h-18h, Sam: 9h-16h"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "contact@sam-auto.ci",
      description: "Réponse sous 24h"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Adresse",
      value: "Abidjan, Côte d'Ivoire",
      description: "Zone 4, Marcory"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horaires",
      value: "Lundi - Samedi",
      description: "8h00 - 18h00"
    }
  ];

  const faqs = [
    {
      question: "Comment commander des pièces détachées ?",
      answer: "Vous pouvez commander directement sur notre site en ajoutant les pièces à votre panier et en procédant au paiement sécurisé."
    },
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les délais varient selon votre localisation : 24-48h pour Abidjan, 3-5 jours pour les autres villes de Côte d'Ivoire."
    },
    {
      question: "Puis-je retourner une pièce défectueuse ?",
      answer: "Oui, nous acceptons les retours sous 30 jours si la pièce n'a pas été montée et est dans son état d'origine."
    },
    {
      question: "Proposez-vous un service de montage ?",
      answer: "Oui, nous avons un réseau de garages partenaires qui peuvent monter les pièces que vous achetez chez nous."
    },
    {
      question: "Comment savoir si une pièce est compatible avec mon véhicule ?",
      answer: "Consultez la section compatibilité sur chaque fiche produit ou contactez nos experts techniques."
    },
    {
      question: "Acceptez-vous les paiements en plusieurs fois ?",
      answer: "Oui, nous proposons des facilités de paiement selon vos besoins. Contactez-nous pour plus d'informations."
    }
  ];

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12 mt-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Notre équipe est là pour vous accompagner dans tous vos projets automobiles. 
            N'hésitez pas à nous contacter pour toute question ou demande de devis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Formulaire de contact */}
          <Card className="p-6 h-[550px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                Envoyez-nous un message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800">Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-800">Une erreur s'est produite. Veuillez réessayer.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <Input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+225 27 22 49 73 84"
                    />
                  </div>
                  <div>
                    <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet *
                    </label>
                    <Input
                      id="sujet"
                      name="sujet"
                      type="text"
                      required
                      value={formData.sujet}
                      onChange={handleChange}
                      placeholder="Demande de devis, Support technique..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre demande en détail..."
                    rows={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Envoyer le message
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Coordonnées et localisation regroupées */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-xl">Nos coordonnées et localisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Coordonnées */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-3">Nos coordonnées</h3>
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-blue-600 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-blue-600 font-medium">{info.value}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Séparateur */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Localisation */}
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">Notre localisation</h3>
                <div className="h-48 rounded-lg overflow-hidden mb-4">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.1234567890123!2d-4.0083!3d5.3600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMjEnMzYuMCJOIDTCsDAwJzMwLjAiVw!5e0!3m2!1sfr!2sci!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SAM AUTO - Zone 4, Marcory, Abidjan"
                  ></iframe>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">SAM AUTO</p>
                      <p className="text-sm text-gray-600">Zone 4, Marcory, Abidjan, Côte d'Ivoire</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
            <p className="text-gray-600">Trouvez rapidement des réponses à vos questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section engagement */}
        <section className="section flex items-center  py-16 ">
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
      </main>
      <Footer />
    </>
  );
} 