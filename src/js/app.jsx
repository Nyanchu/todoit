import React from 'react';
import TodoForm from './build/js/components/TodoForm';

class App extends React.Component {
  render() {
    return (
      <div>
        <TodoForm />
      </div>
    );
  }
};

React.render(
  <App />,
  document.getElementById('app-container')
);
