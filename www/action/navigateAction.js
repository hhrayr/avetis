import { isValidRoute } from '../configs/environment';

export default function navigateAction(context, payload, done) {
  const routeStore = context.getStore('RouteStore');

  const navigate = Object.assign({
    transactionId: context.rootId,
  }, payload);
  if (!payload.url && payload.routeName) {
    navigate.url = routeStore.makePath(payload.routeName, payload.params);
    navigate.routeName = null;
  }

  context.dispatch('NAVIGATE_START', navigate);

  if (!routeStore.getCurrentRoute) {
    done(new Error('RouteStore has not implemented `getCurrentRoute` method.'));
    return;
  }

  const route = routeStore.getCurrentRoute();

  if (!route || !isValidRoute(route.params.language)) {
    const error404 = {
      transactionId: navigate.transactionId,
      statusCode: 404,
      message: 'Invalid route',
    };

    context.dispatch('NAVIGATE_FAILURE', error404);

    context.executeAction(navigateAction, {
      routeName: '_404',
      params: {
        language: 'en',
      },
    },
    (err) => {
      done(err || error404);
    });

    return;
  }

  let action = route.action;
  if (typeof action === 'string' && context.getAction) {
    action = context.getAction(action);
  }

  if (!action || typeof action !== 'function') {
    context.dispatch('NAVIGATE_SUCCESS', route);
    done();
    return;
  }

  context.executeAction(action, route, (err) => {
    if (!isValidRoute(route.params.language)) {
      const error404 = {
        transactionId: navigate.transactionId,
        statusCode: 404,
        message: 'Invalid route',
      };

      context.dispatch('NAVIGATE_FAILURE', error404);
      done(error404);
    }
    if (err) {
      const error500 = {
        transactionId: navigate.transactionId,
        statusCode: err.statusCode || 500,
        message: err.message,
      };

      context.dispatch('NAVIGATE_FAILURE', error500);
      done(Object.assign(err, error500));
    } else {
      context.dispatch('NAVIGATE_SUCCESS', route);
      done();
    }
  });
}
