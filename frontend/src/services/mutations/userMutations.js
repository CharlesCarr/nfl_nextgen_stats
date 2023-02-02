
import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $fav_players: String!) {
    addUser(name: $name, email: $email, password: $password, fav_players: $fav_players) {
      id
      name
      email
      password
      fav_players
    }
  }
`;

// const DELETE_ACCOUNT = gql`
//   mutation deleteAccount($id: ID!) {
//     deleteAccount(id: $id) {
//       id
//       name
//       size
//       industry
//       description
//       notes
//     }
//   }
// `;

export { ADD_USER };