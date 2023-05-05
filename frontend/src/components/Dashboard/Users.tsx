import * as React from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { UsersQuery } from "__generated__/UsersQuery.graphql";

const usersQuery = graphql`
  query UsersQuery {
    users {
      id
      username
      email
      firstName
      lastName
    }
  }
`;

const Users: React.FC = (props) => {
  const data = useLazyLoadQuery<UsersQuery>(usersQuery, {});

  return (
    <>
      <h3>Users: </h3>

      {(data.users || []).map((user) => (
        <div key={user?.id}>{user?.username}</div>
      ))}
    </>
  );
};

export default Users;
