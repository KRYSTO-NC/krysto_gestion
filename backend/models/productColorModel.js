import mongoose from 'mongoose'

const ProductColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  subName: {
    type: String,
    required: true,
  },

  remarques: {
    type: String,
    required: false,
  },
})

const ProductColor = mongoose.model('ProductColor', ProductColorSchema)

export default ProductColor
