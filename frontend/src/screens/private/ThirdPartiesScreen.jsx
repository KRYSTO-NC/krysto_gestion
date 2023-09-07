import React from 'react';
import { useGetThirdPartiesQuery } from '../../slices/dolibarr/dolliThirdPartyApiSlice';
import { Button, Row } from 'react-bootstrap';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEye } from 'react-icons/fa';

function ThirdPartiesScreen() {
    const { data, isLoading, error, refetch } = useGetThirdPartiesQuery();

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
                                <th>Nom</th>
                                <th>Pays</th>
                                <th>Site Web</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((tier) => (
                                <tr key={tier.id}>
                                  
                                    <td>{tier.id}</td>
                                    <td>{tier.name}</td>
                                    <td>{tier.country_code}</td>
                                    <td>{tier.url}</td>
                                    <td>{tier.email}</td>
                                    <td>
                                        <LinkContainer to={`/tier/${tier.id}`}>
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

export default ThirdPartiesScreen;