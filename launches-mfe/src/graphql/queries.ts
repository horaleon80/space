import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int) {
    launchesPast(limit: $limit) {
      id
      mission_name
      launch_date_local
      launch_success
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch_small
        article_link
      }
      details
    }
  }
`;

export const GET_LAUNCH_DETAIL = gql`
  query GetLaunch($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      details
      launch_date_local
      launch_success
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        mission_patch
        video_link
        article_link
      }
    }
  }
`;