import cors from 'cors';

export default function setupCors() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Simple CORS: restricted in production, open for local development
  return cors({
    origin: isProduction 
      ? process.env.CORS_ORIGIN?.split(',').map(url => url.trim()) || false
      : true,
    credentials: isProduction ? false : true,
  });
}