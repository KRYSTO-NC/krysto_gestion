import React from 'react'
import { useGetProposalsQuery } from '../../slices/dolibarr/dollluProposalApiSlice'
import { Button, Row } from 'react-bootstrap'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEdit, FaEye } from 'react-icons/fa'

const ProposalsScreen = () => {
  const { data: proposals, isLoading, error, refetch } = useGetProposalsQuery()

  console.log(proposals)
  return (
    <>
      <Row>
        <h1>Propositions commercial</h1>
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
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>durée validité</th>
                  <th>Fin validité</th>
                  <th>Total HT</th>
                  <th>Total TTC</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.statut_libelle}</td>
                    <td>{contact.duree_validite} Jours</td>
                    <td>
                      {contact.fin_validite
                        ? new Date(
                            contact.fin_validite * 1000,
                          ).toLocaleDateString()
                        : 'Date invalide'}
                    </td>
                    <td>{Number(contact.total_ht).toFixed(0)} XPF</td>
                    <td>{Number(contact.total_ttc).toFixed(0)} XPF</td>

                    <td>
                      <LinkContainer to={`/proposition-commercial-details/${contact.id}`}>
                        <Button variant="success" className="btn-sm mx-2">
                          <FaEye />
                        </Button>
                      </LinkContainer>
                      <LinkContainer to={`/contact/${contact.id}`}>
                        <Button variant="warning" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </Row>
    </>
  )
}

export default ProposalsScreen
