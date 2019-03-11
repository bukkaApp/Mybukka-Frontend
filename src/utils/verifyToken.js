import jwt from 'jsonwebtoken';

// const { SECRET } = process.env;
const SECRET = process.env.SECRET || 'secret';

const decodeToken = token => (
  jwt.verify(token, SECRET).data
);

export default decodeToken;
