import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

const Application: React.FunctionComponent<{}> = () => (
  <App></App>
);

render(<Application />, document.getElementById('root'));