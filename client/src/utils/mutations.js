/** @format */

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
          token
    user{ 
          _id
          username
         }
      }
    }
  `;

export const ADD_RESTAURANT = gql`
  mutation addRest(
    $restName: String!
    $restState: String!
    $restCity: String!
    $restAddress: String!
    $restDescript: String!
  ) {
    addRest( restName: $restName restState: $restState restCity: $restCity restAddress: $restAddress restDescript: $restDescript) {
      _id
      restName
      restState
      restCity
      restAddress
      restDescript
      
    }
  }

`;

export const ADD_REST_PHOTO =gql`
  mutation Mutation($photoUrl: String!, $restId: ID!) {
    addPhotoRest(photoUrl: $photoUrl, restId: $restId) {
      _id
      photoUrl
    }
  }

`
export const COMMENT_REST = gql`
  mutation commentRest($restId: ID!, $commentText: String!) {
    commentRest(restId: $restId, commentText: $commentText) {
      _id
      commentText
    }
  }
`

