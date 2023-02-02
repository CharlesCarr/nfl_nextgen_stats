import { gql } from "@apollo/client";

const GET_PASSERS = gql`
  query getPassers {
    passers {
      id
      pass_touchdowns
      pass_yards
      passer_rating
      player_display_name
      player_jersey_number
      season
      team_abbr
      week
    }
  }
`;

// const GET_ACCOUNT = gql`
//   query getAccount($id: ID!) {
//     account(id: $id) {
//       id
//       name
//       size
//       industry
//       description
//       notes
//     }
//   }
// `;

export { GET_PASSERS };