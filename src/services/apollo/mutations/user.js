import { gql } from "@apollo/client";

export const NEW_USER_ID = gql`
  mutation setNewUserId($user_UID: String!) {
    addWishlistUsers(input: { user_UID: $user_UID }) {
      wishlistUsers {
        id
      }
    }
  }
`;
