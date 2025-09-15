import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      role
      firstName
      lastName
      isVerified
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($id: ID!, $input: ChangePasswordInput!) {
    changePassword(id: $id, input: $input) {
      success
      message
    }
  }
`;
