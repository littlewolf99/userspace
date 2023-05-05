import * as React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { CategoriesQuery } from "__generated__/CategoriesQuery.graphql";

const categoriesQuery = graphql`
  query CategoriesQuery {
    categories {
      id
      name
    }
  }
`;

const Categories: React.FC = (props) => {
  const data = useLazyLoadQuery<CategoriesQuery>(categoriesQuery, {});

  return (
    <>
      {(data.categories || []).map((category) => (
        <div key={category?.id}>{category?.name}</div>
      ))}
    </>
  );
};

export default Categories;
