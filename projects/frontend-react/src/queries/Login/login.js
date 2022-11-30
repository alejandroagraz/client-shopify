export const AUTENTICAR_USUARIO = `
  mutation authenticateUser($input: AuthInput!) {
    authenticateUser(input: $input) {
      access_token
    }
  }
`;