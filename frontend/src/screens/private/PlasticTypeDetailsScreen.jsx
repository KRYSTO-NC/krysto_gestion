import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPlasticTypeDetailsQuery } from '../../slices/plasticTypeApiSlice'
import { Col, Row } from 'react-bootstrap'
import { FaCheck, FaTimes } from 'react-icons/fa'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'

const PlasticTypeDetailsScreen = () => {
  const { id: plasticTypeId } = useParams()

  const { data: plasticType, isLoading, error } = useGetPlasticTypeDetailsQuery(
    plasticTypeId,
  )


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {typeof error.data.message === 'string'
            ? error.data.message
            : 'Une erreur est survenue'}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={10}>
              <h1>{plasticType.scientificNameFr}</h1>
            </Col>
            <Col md={2}>
              <h1>{plasticType.sigleFr}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={10}>
              <h4>{plasticType.scientificNameEn}</h4>
            </Col>
            <Col md={2}>
              <h4>{plasticType.sigleEn}</h4>
            </Col>
          </Row>
          <p>{plasticType.description}</p>

          <h2 className="">Caractéristiques</h2>

          <Row>
            <h3>Flotablilité</h3>
            <Col md={4}>
              <h4>
                {' '}
                <span style={{ marginRight: '20px' }}>Alcool</span>{' '}
                {plasticType.flotability.alcohol ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </h4>
            </Col>
            <Col md={4}>
              <h4>
                {' '}
                <span style={{ marginRight: '20px' }}>Huile végétal</span>
                {plasticType.flotability.vegetableOil ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </h4>
            </Col>
            <Col md={4}>
              <h4>
                {' '}
                <span style={{ marginRight: '20px' }}>Eau</span>
                {plasticType.flotability.water ? (
                  <FaCheck style={{ color: 'green' }} />
                ) : (
                  <FaTimes style={{ color: 'red' }} />
                )}
              </h4>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default PlasticTypeDetailsScreen
