import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import test from './test';
import { store } from '../../../index';
import { addTodo, toggleTodo } from '../../../reducer/todos';
import request from '../../../utils/http';
import TestEffect from './testEffect';

class FirstPage extends Component {
  constructor(props) {
    super();
    this.state = {
      showFinalStr: '',
    };
  }

  componentDidMount() {
    request.get('/nodetest/getlist').then(res => {
      console.log(res);
    })
  }

  shortenString = (str) => {
    if (!str) return;
    let finalStr = `${str.slice(0, 1)}1`;
    for(let i = 1; i < str.length; i++) {
      let preStr = str.slice(i - 1, i);
      let aftStr = str.slice(i, i + 1);
      if (preStr === aftStr) {
        let finalPreStr = finalStr.slice(0, finalStr.length - 1);
        let finalPreStrNum = finalStr.slice(finalStr.length - 1);
        finalStr = `${finalPreStr}${finalPreStrNum * 1 + 1}`;
      } else {
        finalStr = `${finalStr}${aftStr}1`;
      }
    }
    return finalStr;
  }

  handleStringChange = (e) => {
    const showFinalStr = this.shortenString(e.target.value);
    this.setState({showFinalStr});
  }

  getTodosValue = (e) => {
    this.setState({todosItem: e.target.value});
  };

  addTodoItem = () => {
    this.props.addTodo({id: new Date().getTime(), text: this.state.todosItem});
    this.setState({todosItem: undefined});
  };

  handleTodosClick = (e) => {
    if (e.target.nodeName === 'LI') {
      console.log(e.target.getAttribute('id'), e)
      store.dispatch(toggleTodo(e.target.getAttribute('id') * 1))
    }
  };

  render() {
    return (
      <>
        <div>
          {/** 面试遇到的一些算法实现 */}
          {/* <div>{'字符串的简写，eg: aaaabbcccc => a4b2c3'}</div> */}
          <input onChange={this.handleStringChange} />
          {this.state.showFinalStr}
        </div>
        {/* todos */}
        <div>
          <input value={this.state.todosItem} onChange={this.getTodosValue} /> <button onClick={this.addTodoItem}>添加</button>
          <ul onClick={this.handleTodosClick}>
            {this.props.todos.map(item => (
              <li id={item.id} style={{cursor: 'pointer', textDecoration: item.completed ? 'line-through' : ''}} key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
        <TestEffect />
      </>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: bindActionCreators(addTodo, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);