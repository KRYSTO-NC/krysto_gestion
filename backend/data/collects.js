// Collect Data
const collects = [
  {
    _id: 'col1a2b3c4d5e6f7g8h9i0j',
    date: new Date('2023-01-10T09:00:00'),
    collecteSubscriptionId: 'sub1a2b3c4d5e6f7g8h9i0j', // Correspond à une souscription dans collecteSubscriptions
    quantityKg: 50,
    tierId: 't123',
    clean: true,
    plasticTypeMixed: false,
    colorMixed: false,
    color: '1a2b3c4d5e6f7g8h9i0j1k2l', // Correspond à une couleur dans plasticColors
    plasticType: '737a3694e5fc335f796a4942', // Correspond à un type de plastique dans plasticTypes
    remarques: 'Collecte régulière, tout est propre.',
    facture: false,
    factureId: null,
    propalId: null,
  },
  {
    _id: 'col2a3b4c5d6e7f8g9h0i1j',
    date: new Date('2023-02-20T14:00:00'),
    collecteSubscriptionId: null,
    quantityKg: 30,
    tierId: 't456',
    clean: false,
    plasticTypeMixed: true,
    colorMixed: true,
    color: null,
    plasticType: null,
    remarques: 'Collecte occasionnelle, mélange de types et de couleurs.',
    facture: true,
    factureId: 'f456',
    propalId: 'p456',
  },
  // Vous pouvez continuer à ajouter d'autres données de collecte ici...
]

export default collects
