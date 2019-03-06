import jwt from 'jsonwebtoken';

// const { SECRET } = process.env;
const SECRET = 'secret';

const decodeToken = token => (
  jwt.decode(token, SECRET, { expiresIn: '3h' })
);

export default decodeToken;
