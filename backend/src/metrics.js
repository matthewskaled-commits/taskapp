// Este archivo configura las METRICAS que Prometheus va a "leer" (scrape)
// cada cierto tiempo para luego graficarlas en Grafana.
// prom-client genera metricas estandar (uso de CPU, memoria, etc.)
// y aqui agregamos una metrica propia: cuantas peticiones HTTP llegan.
const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Contador personalizado: cuenta peticiones por metodo, ruta y status code.
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Cantidad total de peticiones HTTP recibidas',
  labelNames: ['method', 'route', 'status'],
});
register.registerMetric(httpRequestCounter);

// Middleware de Express: se ejecuta en cada request y suma 1 al contador.
function metricsMiddleware(req, res, next) {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
}

module.exports = { register, metricsMiddleware };
