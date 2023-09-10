import React from 'react';
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';


const RowMaterialsScreen = () => {
  const { data: rawMaterials, isLoading, error } = useGetProductsQuery({
    // variant_filter: '3',
  });

    // Vérifier que rawMaterials.data est défini avant de filtrer les produits
  const filteredMaterials = rawMaterials?.data?.filter((product) => (
    product.finished === '0'
  ));

  return (
    <>
      <h1>Matières premières</h1>

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
                <th>Référence</th>
                <th>Nom</th>
                <th>Prix</th>
                <th>En stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.ref}</td>
                  <td>{product.label}</td>
                  <td>{Math.round(product.price)} XPF</td>
                  <td>
                    {product.stock_reel != null
                      ? typeof product.stock_reel === 'number'
                        ? product.stock_reel.toFixed(2)
                        : typeof product.stock_reel === 'string'
                        ? parseFloat(product.stock_reel).toFixed(2)
                        : product.stock_reel
                      : '0'}{' '}
                    KG
                  </td>
                  <td>
                    <LinkContainer to={`/produit/${product.id}`}>
                      <Button variant="success" className="btn-sm mx-2">
                        <FaEye />
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default RowMaterialsScreen;
