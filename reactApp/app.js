import React from 'react'
import ReactDOM from 'react-dom'

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <button onClick={() => this.props.RemoveTodo(this.props.idx)}>X</button>
                {
                    (this.props.completed) ?
                        <strike onClick={() => this.props.ChangeStatus(this.props.idx)}>{this.props.desc}</strike> :
                        <t onClick={() => this.props.ChangeStatus(this.props.idx)}>{this.props.desc}</t>
                }
            </li>
        )
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ul>
                {this.props.todos.map((task, idx) =>
                    <Todo
                        key={idx}
                        desc={task.desc}
                        completed={task.completed}
                        idx={idx}
                        ChangeStatus={this.props.ChangeStatus}
                        RemoveTodo={this.props.RemoveTodo}
                    />)}
            </ul>
        )
    }
}

class InputLine extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newTodoValue: ''
        }
    }

    handleChange(e) {
        this.setState({ newTodoValue: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.NewTodo(this.state.newTodoValue);
        this.setState({ newTodoValue: '' }) 
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input onChange={(e) => this.handleChange(e)} type="text" value={this.state.newTodoValue} />
                    <button type="submit">+</button>
                </form>
            </div>
        )
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [
                { desc: 'Do homework', completed: false },
                { desc: 'Clean room', completed: true },
                { desc: 'Go to sleep', completed: false },
            ]
        }
        this.RemoveTodo = this.RemoveTodo.bind(this);
        this.ChangeStatus = this.ChangeStatus.bind(this);
        this.NewTodo = this.NewTodo.bind(this);
    }

    RemoveTodo(idx) {
        const temp = this.state.todos.slice(0, idx).concat(this.state.todos.slice(idx + 1));
        this.setState({ todos: temp })
    }

    ChangeStatus(idx) {
        let temp = this.state.todos[idx];
        temp.completed = !temp.completed;
        const tempArr = this.state.todos.slice(0, idx).concat(temp, this.state.todos.slice(idx + 1));
        this.setState({ todos: tempArr })
    }

    NewTodo(desc) {
        this.setState({ todos: this.state.todos.concat({ desc: desc, completed: false }) })
    }

    render() {
        return (
            <div>
                <InputLine NewTodo={this.NewTodo} />
                <TodoList
                    todos={this.state.todos}
                    RemoveTodo={this.RemoveTodo}
                    ChangeStatus={this.ChangeStatus}
                />
            </div>
        )
    }
}

ReactDOM.render(<TodoApp />,
    document.getElementById('root'));