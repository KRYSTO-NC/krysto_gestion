import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetProductCategoriesQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import Loader from './Loader'
import Message from './Message'


const FilterBox = () => {
  const navigate = useNavigate()
  const { mode: productType, category: productCategory } = useParams()
  const {
    data: categories,
    isLoading: loadingCategories,
    error,
  } = useGetProductCategoriesQuery()

  const [filter, setFilter] = useState(productType || '0')
  const [filterCategory, setFilterCategory] = useState(productCategory)

  const submitHandler = (e) => {
    e.preventDefault()
    navigate(`/produits/filter/${filter}`)
  }

  const submitFilterCategoryHandler = (e) => {
    e.preventDefault()
    navigate(`/produits/categories/${filterCategory}`)
  }

  return (
    <>
      {loadingCategories ? (
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
            {/* <Col>
              <Form onSubmit={submitHandler} className="d-flex my-5">
                <Row>
                  <h5 className="m-xl-2">Filtrer par types:</h5>
                  <Col>
                    <Form.Control
                      as="select"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="0">Tous</option>
                      <option value="1">Produits</option>
                      <option value="2">Services</option>
                    </Form.Control>
                  </Col>

                  <Col>
                    <button className="btn btn-primary" type="submit">
                      Filtrer
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col> */}
            <Col>
              <Form
                onSubmit={submitFilterCategoryHandler}
                className="d-flex my-5"
              >
                <Row>
                  <h5 className="m-xl-2">Filtrer par catégorie:</h5>

                  <Col>
                    <Form.Control
                      as="select"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <button className="btn btn-primary" type="submit">
                      Filtrer
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default FilterBox
