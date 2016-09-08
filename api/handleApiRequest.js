import ApiMethodConnector from './apiMethodConnector';

export default (req, res) => {
  const apiMethodConnector = new ApiMethodConnector(req);
  const apiMethodResult = apiMethodConnector.invokeApiMethod();

  res.status(apiMethodResult.statusCode);
  res.send(apiMethodResult.result);
};
