import { gql } from '@apollo/client';

export const GET_ROCKETS = gql`
  query GetRockets {
    rockets {
      id
      name
      type
      active
      stages
      cost_per_launch
      success_rate_pct
      first_flight
      country
      company
      height {
        meters
      }
      diameter {
        meters
      }
      mass {
        kg
      }
      description
      wikipedia
    }
  }
`;

export const GET_ROCKET_DETAIL = gql`
  query GetRocket($id: ID!) {
    rocket(id: $id) {
      id
      name
      type
      active
      stages
      boosters
      cost_per_launch
      success_rate_pct
      first_flight
      country
      company
      height {
        meters
        feet
      }
      diameter {
        meters
        feet
      }
      mass {
        kg
        lb
      }
      description
      wikipedia
      flickr_images
    }
  }
`;