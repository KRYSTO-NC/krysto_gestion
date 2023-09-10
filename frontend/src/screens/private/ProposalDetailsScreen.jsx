import React from 'react'
import { useParams } from 'react-router-dom'
import {
  useCreateLineMutation,
  useDeleteProposalLineMutation,
  useGetProposalDetailsQuery,
} from '../../slices/dolibarr/dollluProposalApiSlice'
import { Badge, Button, Col, Row, Modal, Form, Dropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEdit, FaExclamationTriangle, FaEye, FaTrash } from 'react-icons/fa'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'
import { useGetThirdPartyDetailsQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice'
import { toast } from 'react-toastify'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'

const ProposalDetailsScreen = () => {
  const { id: productId } = useParams()
  const [queryMode, setQueryMode] = React.useState('0')
  const [showModal, setShowModal] = React.useState(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)
  const [createLine, { isLoading: loadingCreate }] = useCreateLineMutation()

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useGetProductsQuery({
    mode: queryMode,
  })
  const {
    data: proposal,
    isLoading,
    refetch,
    error,
  } = useGetProposalDetailsQuery(productId)

  const { data: tier, isLoading: isLoadingTier } = useGetThirdPartyDetailsQuery(
    proposal?.socid,
  )

  const totalWeight = proposal?.lines.reduce(
    (acc, line) =>
      acc + (parseFloat(line.weight) || 0) * (parseInt(line.qty) || 0),
    0,
  )
  const [formData, setFormData] = React.useState({
    product_type: '',
    fk_product: '',
    qty: '',
    remise_percent: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (name === 'product_type') {
      setQueryMode(value === '1' ? '2' : '1')
    }
  }

  React.useEffect(() => {
    if (formData.fk_product && products) {
      const product = products.data.find(
        (p) => p.id.toString() === formData.fk_product.toString(),
      )

      if (product) {
        setFormData({
          ...formData,
          price: product.price, // Mettez à jour le prix ici
        })
      }
    }
  }, [formData.fk_product, products])

  const handleAddLine = async () => {
    try {
      const response = await createLine({
        proposalId: proposal.id,
        lineData: {
          ...formData,
          subprice: formData.price,
          // subprice sera le prix unitaire si un produit est sélectionné, sinon 0
        },
      }).unwrap()
      console.log("Réponse de l'API:", response) // Debug Log
      toast.success('Ligne ajoutée avec succès')
      refetch()
      closeModal()
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error)
      toast.error(error?.data?.message || error?.message)
    }
  }
  const [
    deleteLine,
    { isLoading: loadingDelete },
  ] = useDeleteProposalLineMutation()

  const deleteHandler = async (id) => {
    if (
      window.confirm('Voulez-vous supprimer cette ligne de la proposition ?')
    ) {
      if (proposal && proposal.id && !isNaN(id)) {
        try {
          await deleteLine({ proposalId: proposal.id, lineId: id }).unwrap()
          toast.success('Ligne supprimée avec succès')
          refetch()
        } catch (error) {
          console.error('Erreur lors de la suppression:', error) // Debug Log
          toast.error(error?.data?.message || error?.message)
        }
      } else {
        toast.error('Paramètres invalides pour la suppression de ligne.')
      }
    }
  }

  const handleDropdownSelect = (value) => {
    handleInputChange({ target: { name: 'fk_product', value } });
  };

  return (
    <>
      {loadingDelete && <Loader />}
      {loadingCreate && <Loader />}
      {isLoading || isLoadingProducts || isLoadingTier ? (
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
            <Col>
              <h4>Proposition : {proposal?.ref}</h4>
            </Col>

            <Col>
              <h4>Destinataire : {tier?.name}</h4>
            </Col>
            <Col>
              <Badge>{proposal.statut_libelle}</Badge>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>Date proposition</p>
              <p>
                {proposal.date_creation
                  ? new Date(proposal.date_creation * 1000).toLocaleDateString()
                  : 'Date invalide'}
              </p>
            </Col>
            <Col>
              <p>Date fin de validité</p>
              <p>
                {proposal.fin_validite
                  ? new Date(proposal.fin_validite * 1000).toLocaleDateString()
                  : 'Date invalide'}
              </p>
            </Col>
            <Col>
              <p>Condition de règlement</p>
              <p>{proposal.cond_reglement_code}</p>
            </Col>
          </Row>

          <p>
            En validant ce devis vous allez recyclé{' '}
            <strong style={{ color: 'red' }}> {totalWeight / 1000} KG</strong>{' '}
            de plastique !{' '}
          </p>

          <h2>Détails :</h2>
          <Button variant="primary" onClick={openModal}>
            Ajouter une nouvelle ligne
          </Button>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produit ou service</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Total HT</th>
                <th>Total TTC</th>
                <th>Remise</th>
                <th>Poids recyclé</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {proposal.lines.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.libelle}</td>
                  <td>{contact.qty}</td>

                  <td>{Number(contact.subprice).toFixed(0)} XPF</td>
                  <td>{Number(contact.total_ht).toFixed(0)} XPF</td>
                  <td>{Number(contact.total_ttc).toFixed(0)} XPF</td>
                  <td>{contact.remise_percent} %</td>
                  <td>{(contact.weight * contact.qty) / 1000} KG </td>
                  <td>
                    <LinkContainer
                      to={`/proposition-commercial-details/${contact.id}`}
                    >
                      <Button variant="success" className="btn-sm mx-2">
                        <FaEye />
                      </Button>
                    </LinkContainer>
                    <LinkContainer to={`/contact/${contact.id}`}>
                      <Button variant="warning" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => deleteHandler(contact.id)}
                      variant="danger"
                      className="btn-sm mx-2"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <Col></Col>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une nouvelle ligne</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Les champs du formulaire ici */}
            <Form.Group className="mb-3">
              <Form.Label>Type de produit</Form.Label>
              <Form.Select
                name="product_type"
                value={formData.product_type}
                onChange={handleInputChange}
              >
                <option value="">Selectionner le type</option>
                <option value="0">Produit</option>
                <option value="1">Service</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Produit ou service</Form.Label>
              <Dropdown onSelect={handleDropdownSelect}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sélectionnez le produit
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {isLoadingProducts ? (
                    <Dropdown.Item disabled>Chargement...</Dropdown.Item>
                  ) : errorProducts ? (
                    <Dropdown.Item disabled>Erreur</Dropdown.Item>
                  ) : (
                    products.data
                      .filter((product) => product.finished !== '0')
                      .map((product) => (
                        <Dropdown.Item eventKey={product.id} key={product.id}>
                          <span style={{ color: product.stock_reel === null || product.stock_reel === '0' ? 'red' : 'inherit' }}>
                            {product.label}
                            {product.stock_reel === null && <FaExclamationTriangle />}
                          </span>
                        </Dropdown.Item>
                      ))
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix du produit</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={Number(formData.price).toFixed(0)} // Assurez-vous que la valeur est formData.price
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="text"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Appliquer un % de remise</Form.Label>
              <Form.Control
                type="text"
                name="remise_percent"
                value={formData.remise_percent}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleAddLine}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProposalDetailsScreen
