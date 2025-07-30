# Configuration Kkiapay pour SAM AUTO

## Installation

Le package `kkiapay-react` a été installé avec succès. Voici comment configurer le système de paiement :

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# Configuration Kkiapay
NEXT_PUBLIC_KKIAPAY_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
KKIAPAY_WEBHOOK_URL=https://ton-domaine.com/api/webhooks/kkiapay
NODE_ENV=development
```

### 2. Obtenir vos clés Kkiapay

1. Créez un compte sur [Kkiapay](https://kkiapay.com)
2. Accédez à votre dashboard
3. Copiez votre clé publique
4. Remplacez `pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` par votre vraie clé

### 3. Configuration en production

Pour la production, changez :
- `NODE_ENV=production`
- Utilisez votre clé de production (pas la clé de test)

## Utilisation

### Bouton de paiement simple

```tsx
import KkiapayButton from '@/components/Payment/KkiapayButton';

<KkiapayButton
  amount={50000}
  description="Achat véhicule"
  customerName="John Doe"
  customerEmail="john@example.com"
  customerPhone="+22500000000"
  onSuccess={(data) => console.log('Paiement réussi:', data)}
  onError={(error) => console.error('Erreur:', error)}
/>
```

### Modal de paiement

```tsx
import { PaymentModal } from '@/components/Payment/KkiapayButton';

<PaymentModal
  isOpen={showPayment}
  onClose={() => setShowPayment(false)}
  amount={50000}
  description="Achat véhicule"
  customerName="John Doe"
  customerEmail="john@example.com"
  customerPhone="+22500000000"
/>
```

## Fonctionnalités intégrées

### Pages avec paiement

- **Page Véhicules** (`/vehicules`) : Bouton "Acheter" sur chaque véhicule
- **Page Pièces** (`/pieces`) : Bouton "Acheter" sur chaque pièce détachée

### Gestion des erreurs

Le système gère automatiquement :
- Configuration invalide
- Service non initialisé
- Erreurs de paiement
- Annulation de paiement

### États de paiement

- **En cours** : Animation de chargement
- **Succès** : Message de confirmation
- **Erreur** : Message d'erreur avec bouton "Réessayer"

## Sécurité

- Les clés privées ne sont jamais exposées côté client
- Validation de la configuration avant paiement
- Gestion sécurisée des callbacks

## Support

Pour toute question sur Kkiapay :
- [Documentation officielle](https://docs.kkiapay.com)
- [Support Kkiapay](https://kkiapay.com/support)

## Développement

### Mode test
- Utilisez les clés de test Kkiapay
- `NODE_ENV=development`

### Mode production
- Utilisez les clés de production Kkiapay
- `NODE_ENV=production`
- Configurez les webhooks pour la sécurité 