import { gql } from "@apollo/client";

export const GET_USER_ID = gql`
  query getUserId($user_UID: String!) {
    queryWishlistUsers(filter: { user_UID: { eq: $user_UID } }) {
      id
    }
  }
`;
