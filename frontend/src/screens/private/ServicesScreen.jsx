import React from 'react'
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice'
import { Button, Row } from 'react-bootstrap'
import Loader from '../../components/shared/Loader'
import Message from '../../components/shared/Message'
import { LinkContainer } from 'react-router-bootstrap'
import { FaEye } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import FilterBox from '../../components/shared/FilterBox'
import Paginate from '../../components/shared/Paginate'

function ProductsScreen() {
  const { mode, page, category } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({
    category,
    mode,
    page,
  })

  return (
    <Row>
      <h1>Services</h1>
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
                <th>Refference</th>
                <th>Nom</th>
                <th>Prix</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((product) => {
                // Ajoutez une condition pour filtrer les produits
                if (product.finished !== '0' && product.type === '1') {
                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.ref}</td>
                      <td>{product.label}</td>
                      <td>{Math.round(product.price)} XPF</td>
                  
                      <td>
                        <LinkContainer to={`/produit/${product.id}`}>
                          <Button variant="success" className="btn-sm mx-2">
                            <FaEye />
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  )
                } else {
                  // Retournez null si le produit ne correspond pas au critère
                  return null
                }
              })}
            </tbody>
          </table>
          {data && data.pagination && <Paginate pagination={data.pagination} link={"/produits/page"}/>}
        </>
      )}
    </Row>
  )
}

export default ProductsScreen
