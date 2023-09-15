import mongoose from 'mongoose'

const CollectSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },

  collecteSubscriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CollectSubscription',
    default: null,
  },

  quantityKg: {
    type: Number,
    required: true,
  },
  tierId: {
    type: String,
  },
  clean: {
    type: Boolean,
    default: false,
  },
  plasticTypeMixed: {
    type: Boolean,
    default: false,
  },
  colorMixed: {
    type: Boolean,
    default: false,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlasticColor',
    default: null,
  },
  plasticType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlasticType',
    default: null,
  },
  remarques: {
    type: String,
    required: false,
  },

  // si  collecteSubscriptionId == null
  facture: {
    type: Boolean,
    default: false,
  },
  // si free == false et collecteSubscriptionId == null
  factureId: {
    type: String,
    required: false,
  },
  propalId: {
    type: String,
    required: false,
  },
})

const Collect = mongoose.model('Collect', CollectSchema)

export default Collect
