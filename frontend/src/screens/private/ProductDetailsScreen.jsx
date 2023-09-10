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
      <Link className="btn btn-primary my-3" to={'/produits'}>
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

      <h3>Détails</h3>
      <Row>
        <Col>
          <h4>Dimension</h4>
          <p>L {product?.length} * H {product?.width} * {product?.height} CM  </p>
        </Col>
        <Col>
         <h4>poids</h4>
         <p>{product?.weight} Gr</p>
        </Col>
     
        
      </Row>
      <h3>Productions</h3>
      <Row>
        <Col>
          <h4>Nombre d'item par moule</h4>
          <p>{product?.array_options?.options_items_per_injection} </p>
        </Col>
        <Col>
          <h4>Quantité produite a l'heure</h4>
          <p>{product?.array_options?.options_qty_per_hours} pièces </p>
        </Col>
     
     
        
      </Row>
      <h3>Stocks</h3>
      <Row>
        <Col>
          <h4>Minimum</h4>
          <p>{product?.seuil_stock_alerte}</p>
        </Col>
        <Col>
         <h4>Stock réel</h4>
         <p>{product?.stock_reel}</p>
        </Col>
        <Col>
          <h4>Stock optimal</h4>
          <p>{product?.desiredstock}</p>
        </Col>
        
      </Row>
    </>
  )
}

export default ProductDetailsScreen
