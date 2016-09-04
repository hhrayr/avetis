import ApiMethodConnector from './apiMethodConnector';

export function handleApiRequest(req, res) {
  const apiMethodConnector = new ApiMethodConnector(req);
  const apiMethodResult = apiMethodConnector.invokeApiMethod();

  res.status(apiMethodResult.statusCode);
  res.send(apiMethodResult.result);
}
