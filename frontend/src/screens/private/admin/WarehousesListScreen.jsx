import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEye } from 'react-icons/fa';

import { useGetWarehousesQuery } from '../../../slices/dolibarr/dolliWarehousesApiSlice';
import Loader from '../../../components/shared/Loader';
import Message from '../../../components/shared/Message';

function WarehousesListScreen() {
  const { data: warehouses, isLoading, error } = useGetWarehousesQuery();

  console.log('====================================');
  console.log(warehouses);
  console.log('====================================');

  return (
    <Row>
      <h1>Entrepôts</h1>
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
                <th>Adresse</th>
                <th>Valeur HT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>{warehouse.id}</td>
                  <td>{warehouse.label}</td>
                  <td>{warehouse.lieu}</td>
                  <td>{warehouse.address}</td>
                  <td>{warehouse.total_ht ? (warehouse.total_ht) : ("0")}</td>
                  <td>
                    <LinkContainer to={`/warehouse/${warehouse.id}`}>
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

export default WarehousesListScreen;
