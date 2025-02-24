import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// React 애플리케이션의 진입점(entry point)
// root 요소를 찾아 React 앱을 렌더링
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode를 사용하여 잠재적인 문제를 탐지하고 경고 표시
  <React.StrictMode>
    <App /> {/* 최상위 App 컴포넌트 렌더링 */}
  </React.StrictMode>,
);