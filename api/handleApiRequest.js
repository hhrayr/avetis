import ApiMethodConnector from './apiMethodConnector';

export default (req, res) => {
  const apiMethodConnector = new ApiMethodConnector(req);
  apiMethodConnector.invokeApiMethod((apiMethodResult) => {
    res
      .status(apiMethodResult.statusCode)
      .send(apiMethodResult.result);
  });
};
