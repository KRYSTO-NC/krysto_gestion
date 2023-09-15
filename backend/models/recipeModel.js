import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Injection', 'Extrusion', 'Compression'],
  },

  plasticType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlasticType',
  },

  quantityGr: {
    type: Number,
    required: true,
  },

  ingredient: [
    {
      plasticColor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlasticColor',
      },
      quantityGr: {
        type: Number,
        required: true,
      },
    },
  ],

  remarques: {
    type: String,
    required: false,
  },
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

export default Recipe
