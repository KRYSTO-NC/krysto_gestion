import mongoose from 'mongoose'

const PlasticColorSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  plasticType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlasticType',
  },

  rarityIndex: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  remarques: {
    type: String,
    required: false,
  },
})

const PlasticColor = mongoose.model('PlasticColor', PlasticColorSchema)

export default PlasticColor
