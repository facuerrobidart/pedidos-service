import jwt from 'jsonwebtoken';

export const serviceAuthMiddleware = (req, res, next) => {
  const token = req.headers['service-token'];

  if (!token) {
    return res.status(401).json({ message: 'Service token no proporcionado'});
  }

  try {
    const decoded = jwt.verify(token, (process.env.SERVICE_SECRET_KEY || "service_secret_key")); // Verificar y decodificar el token
    req.service = decoded; // Guardar datos del servicio autenticado
    next(); // Pasar al siguiente middleware o controlador
  } catch (err) {
    res.status(401).json({ message: 'Service token inválido o expirado' });
  }
};

export default serviceAuthMiddleware; 