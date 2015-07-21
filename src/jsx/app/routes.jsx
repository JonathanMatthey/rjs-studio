import { Route, Router } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import Blank from 'routes/blank';

export default (withHistory, onUpdate) => {
  const history = withHistory? new BrowserHistory : null;
  return (
    <Router history={history} onUpdate={onUpdate}>
      <Route path='/' component={Blank} />
    </Router>
  );
};
