import { gql } from "@apollo/client";

export const NEW_WISH = gql`
  mutation setNewWishWithId(
    $id: [ID!]
    $title: String!
    $description: String
    $link: String
  ) {
    updateWishlistUsers(
      input: {
        filter: { id: $id }
        set: {
          wishlist: { description: $description, title: $title, link: $link }
        }
      }
    ) {
      wishlistUsers {
        id
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
  }
`;

export const REMOVE_WISH = gql`
  mutation removeWishWithId($id: [ID!]) {
    updateWish(input: { filter: { id: $id }, set: { removed: true } }) {
      numUids
    }
  }
`;

export const DONE_WISH = gql`
  mutation doneWishWithId($id: [ID!], $done: Boolean) {
    updateWish(input: { filter: { id: $id }, set: { done: $done } }) {
      numUids
    }
  }
`;

export const EDIT_WISH = gql`
  mutation editWishWithId(
    $id: [ID!]
    $title: String!
    $description: String
    $link: String
  ) {
    updateWish(
      input: {
        filter: { id: $id }
        set: { description: $description, title: $title, link: $link }
      }
    ) {
      numUids
    }
  }
`;
