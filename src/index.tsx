import React from 'react';
import ReactDOM from 'react-dom/client';

import InquiryView from './InquiryView';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <InquiryView />
  </React.StrictMode>
);
