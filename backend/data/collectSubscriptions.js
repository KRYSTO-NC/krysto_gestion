// CollecteSubscription Data
const collectSubscriptions = [
  {
    _id: 'sub1a2b3c4d5e6f7g8h9i0j',
    collectFrequency: 'Hedomadaire',
    collectDay: '1',
    collectHour: '09:00',
    dateSubcription: new Date('2023-01-01T00:00:00'),
    tierId: 't123',
    remarques: 'Premier client de la semaine.',
    free: true,
    paymentReccurence: 'Mensuel',
    serviceId: 's123',
    factureId: 'f123',
    propalId: 'p123',
  },
  {
    _id: 'sub2a3b4c5d6e7f8g9h0i1j',
    collectFrequency: 'Mensuel',
    collectDay: '3',
    collectHour: '14:00',
    dateSubcription: new Date('2023-02-15T00:00:00'),
    tierId: 't456',
    remarques: 'Collecte tous les premmier mercredi du mois',
    free: false,
    paymentReccurence: 'Trimestriel',
    serviceId: 's456',
    factureId: 'f456',
    propalId: 'p456',
  },
  {
    _id: 'sub3a4b5c6d7e8f9g0h1i2j',
    collectFrequency: 'Bi-mensuel',
    collectDay: '5',
    collectHour: '18:00',
    dateSubcription: new Date('2023-03-10T00:00:00'),
    tierId: 't789',
    remarques: 'Collecte les 10 et 25 de chaque mois',
    free: false,
    paymentReccurence: 'Annuel',
    serviceId: 's789',
    factureId: 'f789',
    propalId: 'p789',
  },
  // Vous pouvez continuer à ajouter d'autres souscriptions de collecte ici...
]

export default collectSubscriptions
