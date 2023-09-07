import React from 'react';
import { useGetProductsQuery } from '../../slices/dolibarr/dolliProductApiSlice';
import { Button, Row } from 'react-bootstrap';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEye } from 'react-icons/fa';

function ProductsScreen() {
    const { data, isLoading, error, refetch } = useGetProductsQuery();

    console.log(data);

    return (
        <Row>
            <h1>TIERS</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {typeof error.data.message === 'string' ? error.data.message : 'Une erreur est survenue'}
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
                                <th>En stock</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr key={product.id}>
                                  
                                    <td>{product.id}</td>
                                    <td>{product.ref}</td>
                                    <td>{product.label}</td>
                                    <td>{Math.round(product.price)} XPF</td>
                                    <td>{product.pmp}</td>
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
        </Row>
    );
}

export default ProductsScreen;