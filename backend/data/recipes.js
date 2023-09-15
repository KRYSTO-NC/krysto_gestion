// Recipe Data
const recipes = [
  {
    _id: 'a1b2c3d4e5f6g7h8i9j0k1l2',
    name: 'Recette de bouteille PET rouge',
    category: 'Injection',
    plasticType: '737a3694e5fc335f796a4942', // Correspond à PET dans plasticTypes
    quantityGr: 500,
    ingredient: [
      {
        plasticColor: '1a2b3c4d5e6f7g8h9i0j1k2l', // Correspond à la couleur Rouge dans plasticColors
        quantityGr: 250,
      },
      {
        plasticColor: '5a6b7c8d9e0f1g2h3i4j5k6l', // Correspond à la couleur Noir dans plasticColors
        quantityGr: 250,
      },
    ],
    remarques: 'Utilisé pour créer des bouteilles de boisson.',
  },
  {
    _id: 'b2c3d4e5f6g7h8i9j0k1l2m3',
    name: 'Recette de tuyau en PVC',
    category: 'Extrusion',
    plasticType: '737a3694e5fc335f796a4944', // Correspond à PVC dans plasticTypes
    quantityGr: 1000,
    ingredient: [
      {
        plasticColor: '3a4b5c6d7e8f9g0h1i2j3k4l', // Correspond à la couleur Bleu dans plasticColors
        quantityGr: 1000,
      },
    ],
    remarques: 'Utilisé pour les tuyaux en PVC.',
  },
]

export default recipes
