import Fluxible from 'fluxible';

import Application from './components/Application';

import ApplicationStore from './stores/ApplicationStore';
import EnvironmentStore from './stores/EnvironmentStore';
import NavigationStore from './stores/NavigationStore';
import RouteStore from './stores/RouteStore';
import FormStore from './stores/forms/FormStore';

const app = new Fluxible({
  component: Application,
});

app.registerStore(ApplicationStore);
app.registerStore(EnvironmentStore);
app.registerStore(NavigationStore);
app.registerStore(RouteStore);
app.registerStore(FormStore);

export default app;
