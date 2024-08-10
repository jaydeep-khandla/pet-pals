import { jwtDecode } from 'jwt-decode';

export default function decodeJWT(token) {
  return jwtDecode(token);
}