import mongoose from 'mongoose'

const CollectSubscriptionSchema = new mongoose.Schema({
  collectFrequency: {
    type: String,
    required: true,
    enum: ['Hedomadaire', 'Mensuel', 'Bi-mensuel'],
  },

  collectDay: {
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7'],
  },

  collectHour: {
    type: String,
  },

  dateSubcription: {
    type: Date,
    required: true,
    default: Date.now,
  },

  tierId: {
    type: String,
  },

  remarques: {
    type: String,
    required: false,
  },

  free: {
    type: Boolean,
    default: true,
  },

  // si free == false
  paymentReccurence: {
    type: String,
    required: true,
    enum: ['Mensuel', 'Trimestriel', 'Annuel'],
  },

  serviceId: {
    type: String,
    required: false,
  },

  factureId: {
    type: String,
    required: false,
  },
  propalId: {
    type: String,
    required: false,
  },
})

const CollectSubscription = mongoose.model(
  'CollectSubscription',
  CollectSubscriptionSchema,
)

export default Collecte
