import { gql } from "@apollo/client";

const GET_RECEIVERS = gql`
  query getReceivers {
    receivers {
      id
      rec_touchdowns
      yards
      receptions
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

export { GET_RECEIVERS };