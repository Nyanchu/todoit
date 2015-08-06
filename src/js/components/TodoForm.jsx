import React from 'react';

// TODO: 検索フォーム（スクロールしたら出す？）
// TODO: 新規追加ボタン

var todos = [{
  id: 1,
  name: '会社にいく',
  done: true
}, {
  id: 2,
  name: 'とっくんの結婚式にいく',
  done: false
}, {
  id: 3,
  name: 'Cording...every day! Yeah!',
  done: false
}
];

export default class TodoForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    let name = this.refs.todoName.getDOMNode().value.trim();
    if(name) {
      alert(name);
      this.refs.todoName.getDOMNode().value = '';
    }
  };

  render() {
    return (
      <div>
        <TodoList initialTodos={todos} />
        <form onSubmit={this.handleSubmit}>
          <input ref="todoName"></input><input type="submit"></input>
        </form>
      </div>
    );
  };
};

class TodoList extends React.Component {

  static propTypes = {
    initialTodos: React.PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {todos: this.props.initialTodos};
  };

  // TODOリストの状態変更
  onChange = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      })
    });
  };

  render() {
    let rows = this.state.todos.map((todo) => {
      return (<Todo todo={todo} onChange={this.onChange}></Todo>);
    });
    return (
      <div className="active-todos">
        <ul>{rows}</ul>
      </div>
    );
  };
};

class Todo extends React.Component {

  static propTypes = {
    // TODO情報
    todo: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired,
      done: React.PropTypes.bool.isRequired
    }),
    // ボタンが押された時のコールバック
    onChange: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  };

  _onChange = () => {
    this.props.onChange(this.props.todo.id);
  };

  render() {
    let todo = this.props.todo;
    let li_style = {
      'text-decoration': (todo.done)? 'line-through':''
    };
    let button_txt = (todo.done)? 'Active':'Done';
    return (
      <li key={todo.id} style={li_style}>
        <button onClick={this._onChange}>{button_txt}</button>
        {todo.name}
      </li>
    );
  };
};
