import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import Message from '../../components/shared/Message'
import Loader from '../../components/shared/Loader'
import Barcode from 'react-barcode'
import { Col, Row } from 'react-bootstrap'
const ProductDetailsScreen = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId)

  const barcodeData = product?.barcode


  return (
    <>
      <Link className="btn btn-light my-3" to={'/produits'}>
        Retour{' '}
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={9}>
              <h1>{product.ref}</h1>
              <h2>{product.label}</h2>
            </Col>
            <Col>
              <Barcode value={barcodeData} format="EAN13" />
            </Col>
          </Row>

          <h2>Description:</h2>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />

          <div></div>
        </>
      )}
    </>
  )
}

export default ProductDetailsScreen
