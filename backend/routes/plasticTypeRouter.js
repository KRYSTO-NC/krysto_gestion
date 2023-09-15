import express from 'express'

const router = express.Router()
import {
  createPlasticType,
  deletePlasticType,
  getPlasticTypeById,
  getPlasticTypes,
  updatePlasticType,
} from '../controllers/plasticTypeController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getPlasticTypes).post(createPlasticType)

router
  .route('/:id')
  .get(getPlasticTypeById)
  .delete(deletePlasticType)
  .put(updatePlasticType)

export default router
