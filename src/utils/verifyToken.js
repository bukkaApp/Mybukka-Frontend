import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET;

const verifyToken = cb => {
  console.log('inside verify token. ', cb);
  const clientPass = localStorage.getItem('x-access-token');
  try {
    const verify = jwt.verify(clientPass, SECRET).data;
    if (verify) return true;
  } catch (error) {
    if (cb) return cb;
  }
};

export default verifyToken;
