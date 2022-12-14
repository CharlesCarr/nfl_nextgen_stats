import { gql } from "@apollo/client";

const GET_RUSHERS = gql`
  query getRushers {
    rushers {
      id
      rush_touchdowns
      rush_yards
      avg_rush_yards
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

export { GET_RUSHERS };