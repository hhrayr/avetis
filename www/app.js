import Fluxible from 'fluxible';
import Application from './components/Application';

import ApplicationStore from './stores/ApplicationStore';
import EnvironmentStore from './stores/EnvironmentStore';
import NavigationStore from './stores/NavigationStore';
import RouteStore from './stores/RouteStore';


const app = new Fluxible({
  component: Application,
});

// register stores
app.registerStore(ApplicationStore);
app.registerStore(EnvironmentStore);
app.registerStore(NavigationStore);
app.registerStore(RouteStore);

export default app;
