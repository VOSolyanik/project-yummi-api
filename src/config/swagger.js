import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const docsDir = path.resolve('src', 'docs');

const swaggerDocument = YAML.load(path.join(docsDir, 'swagger.yaml'));

// Make server URLs dynamic based on environment
const getSwaggerConfig = (req) => {
  // Handle HTTPS properly for production (Render uses reverse proxy)
  let protocol = req.get('x-forwarded-proto') || req.protocol;

  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    protocol = 'https';
  }

  const host = req.get('host');
  const baseUrl = `${protocol}://${host}/api`;

  return {
    ...swaggerDocument,
    servers: [
      {
        url: baseUrl,
        description: `${process.env.NODE_ENV || 'development'} server`
      }
    ]
  };
};

export { swaggerUi, getSwaggerConfig };
