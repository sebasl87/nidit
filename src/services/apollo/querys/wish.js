import { gql } from "@apollo/client";

export const GET_WISHLIST_WITH_ID = gql`
  query getWishesWithId($id: ID!) {
    getWishlistUsers(id: $id) {
      wishlist(filter: { not: { has: removed }, or: { removed: false } }) {
        description
        id
        link
        title
        done
        removed
      }
    }
  }
`;

export const SUBSCRIPTION_WISHLIST_WITH_ID = gql`
  subscription getWishesWithId($id: ID!) {
    getWishlistUsers(id: $id) {
      wishlist(filter: { not: { has: removed }, or: { removed: false } }) {
        description
        id
        link
        title
        done
        removed
      }
    }
  }
`;
