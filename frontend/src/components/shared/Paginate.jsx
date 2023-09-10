import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pagination , link}) => {
  const { total, page, page_count } = pagination;

  const pagesArray = [...Array(page_count).keys()];

  if (page_count <= 1) {
    return null; // Pas de pagination s'il y a moins d'une page.
  }

  return (
    <Pagination>
      {pagesArray.map((x) => (
        <LinkContainer key={x} to={`${link}/${x}`}>
          <Pagination.Item active={x === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
};

export default Paginate;
