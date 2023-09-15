import React, { useState } from 'react'
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
} from '../../../slices/dolibarr/dolliCategoryApiSlice'
import Loader from '../../../components/shared/Loader'
import Tag from '../../../components/shared/Tag'
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap'

const CategoriesScreen = () => {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoriesQuery()

  const [createCategory] = useCreateCategoryMutation()

  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    color: '',
    type: 'member', // Valeur par défaut
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const categoryData = { ...formData, color: formData.color.replace('#', '') }
    try {
      await createCategory({ categoryData })
      setShowModal(false)
      refetch()
      setErrorMessage(null)
    } catch (error) {
      setErrorMessage(
        "Une erreur s'est produite lors de la création de la catégorie",
      )
    }
  }

  return (
    <>
    <Row style={{marginTop: "30px"}}>
      <Col md={9}>
      <h1>Gestion des catégories de produits</h1>
      </Col>

      <Col md={3}>
      <Button variant="primary btn btn-sm" onClick={() => setShowModal(true)}>
        Ajouter une nouvelle catégorie
      </Button>
      </Col>

    </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une nouvelle catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form.Group controlId="type">
            <Form.Label>Type de catégorie</Form.Label>
            <Form.Control as="select" name="type" onChange={handleChange}>
              <option value="">Sélectionner un type</option>
              <option value={2} >Client</option>
              <option value={1}>Fournisseur</option>
              <option value={0}>Produit</option>
              <option value={4}>Contact</option>
            </Form.Control>
          </Form.Group>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="label">
              <Form.Label>Label</Form.Label>
              <Form.Control
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="color">
              <Form.Label>Couleur</Form.Label>
              <Form.Control
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Envoyer
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Row style={{marginTop: "50px"}}>
            <Col md={6}>
              <h3>Produits et services</h3>
              {categories.filter((category) => category.type === 0)
                .length > 0 ? (
                categories
                  .filter((category) => category.type === 0)
                  .map((category) => <Tag tag={category} key={category.id} />)
              ) : (
                <p>Aucune catégorie</p>
              )}
            </Col>
            <Col md={6}>
              <h3>Fournisseurs</h3>
              {categories.filter((category) => category.type === 1)
                .length > 0 ? (
                categories
                  .filter((category) => category.type === 1)
                  .map((category) => <Tag tag={category} key={category.id} />)
              ) : (
                <p>Aucune catégorie</p>
              )}
            </Col>
            <Col md={6}>
              <h3>Clients</h3>
              {categories.filter((category) => category.type === 2)
                .length > 0 ? (
                categories
                  .filter((category) => category.type === 2)
                  .map((category) => <Tag tag={category} key={category.id} />)
              ) : (
                <p>Aucune catégorie</p>
              )}
            </Col>

            <Col md={6}>
              <h3>Contacts</h3>
              {categories.filter((category) => category.type === 4)
                .length > 0 ? (
                categories
                  .filter((category) => category.type === 4)
                  .map((category) => <Tag tag={category} key={category.id} />)
              ) : (
                <p>Aucune catégorie</p>
              )}
            </Col>
           
          </Row>
        </>
      )}
    </>
  )
}

export default CategoriesScreen
