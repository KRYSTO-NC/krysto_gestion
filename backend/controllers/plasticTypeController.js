import asyncHandler from '../middleware/asyncHandler.js'
import PlasticType from '../models/plasticTypeModel.js'

// @desc Get all plastic types
// @route GET /api/plasticTypes
// @access Public
const getPlasticTypes = asyncHandler(async (req, res) => {
  const plasticTypes = await PlasticType.find({})
  res.status(200).json(plasticTypes)
})

// @desc Get Plastic Type by ID
// @route GET /api/plasticTypes/:id
// @access Public
const getPlasticTypeById = asyncHandler(async (req, res) => {
  const plasticType = await PlasticType.findById(req.params.id)
  if (plasticType) {
    res.status(200).json(plasticType)
  } else {
    res.status(404)
    throw new Error('Plastic Type not found')
  }
})

// @desc Create a new Plastic Type
// @route POST /api/plasticTypes
// @access Public
const createPlasticType = asyncHandler(async (req, res) => {
  const plasticType = await PlasticType.create(req.body)
  if (plasticType) {
    res.status(201).json(plasticType)
  } else {
    res.status(400)
    throw new Error('Données invalides')
  }
})

// @desc Update plastic type
// @route Put /api/plasticTypes/:id
// @access Public
const updatePlasticType = asyncHandler(async (req, res) => {
  const plasticType = await PlasticType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: plasticType,
  })
})

//@description:     Delete a plastic type
//@route:            DELETE /krysto/api/v1/plastic-types/:id
//@access:           Private
const deletePlasticType = asyncHandler(async (req, res, next) => {
  const plasticType = await PlasticType.findByIdAndDelete(req.params.id)

  if (!plasticType) {
    return next(
      new ErrorResponse(
        `Plastic type not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: {},
  })
})

export {
  getPlasticTypes,
  getPlasticTypeById,
  createPlasticType,
  updatePlasticType,
  deletePlasticType,
}
