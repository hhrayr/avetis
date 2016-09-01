export function handleApiRequest(req, res) {
  res.send({
    apiToken: req.get('api-tocken') || 'foo',
    body: req.body,
    ip: req.ip,
    method: req.method,
    originalUrl: req.originalUrl,
    params: req.params,
    path: req.path,
    query: req.query,
  });
  // const err = { statusCode: 401, message: 'restrictedAccess' };
  // res.status(err.statusCode).send(err);
}
