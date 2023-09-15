import React from 'react'
import { useGetPlasticTypesQuery } from '../../slices/plasticTypeApiSlice';
import { Button, Row } from 'react-bootstrap';
import Loader from '../../components/shared/Loader';
import Message from '../../components/shared/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEye } from 'react-icons/fa';

const PlasticTypesScreen = () => {

  const { data : plasticTypes, isLoading, error, refetch } = useGetPlasticTypesQuery();

  console.log(plasticTypes);


  return (
    <Row>
    <h1>Type de plastiques</h1>
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
                        <th>Sigle FR</th>
                        <th>Sigle EN</th>
                        <th>Nom scientifique</th>
                        <th>Densité</th>
                        <th>Température injection</th>
                        <th>Point de fusion</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {plasticTypes.map((type) => (
                        <tr key={type.id}>
                            <td>{type.sigleFr}</td>
                            <td>{type.sigleEn}</td>
                            <td>{type.scientificNameFr}</td>
                            <td>{type.density}</td>
                            <td>{type.injectionTemperature}</td>
                            <td>{type.meltingPoint}°C</td>
                            <td>
                                <LinkContainer to={`/type-de-plastique/${type._id}`}>
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
  )
}

export default PlasticTypesScreen