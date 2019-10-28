import React from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal';
import Header from '../header';
import Form from '../form';
import List from '../list';
import Details from '../details';

import './todo.scss';

function ToDo(props) {
   return state = {
      todoList: [],
      item: {},
      showDetails: false,
      details: {},
    };
  }

  handleInputChange = e => {
    let { name, value } = e.target;
    setState(state => ({
      item: {...state.item, [name]: value},
    }));
  };

  handleSubmit = (e) => {
    props.handleSubmit(state.item);
  };

  addItem = (e) => {

    e.preventDefault();
    e.target.reset();

    const defaults = { _id: uuid(), complete:false };
    const item = Object.assign({}, state.item, defaults);

    setState(state => ({
      todoList: [...state.todoList, item],
      item: {},
    }));

  };

  deleteItem = id => {

    setState(state => ({
      todoList: state.todoList.filter(item => item._id !== id),
    }));

  };

  saveItem = updatedItem => {

    setState(state => ({
      todoList: state.todoList.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      ),
    }));

  };

  toggleComplete = id => {
    setState(state => ({
      todoList: state.todoList.map(item =>
        item._id === id ? {
          ...item,
          complete: !item.complete,
        } : item
      ),
    }));
  };

  <When condition={this.state.showDetails}>
          <Modal title="To Do Item" close={toggleDetails}>
            <div className="todo-details">
              <header>
                <span>Assigned To: {state.details.assignee}</span>
                <span>Due: {state.details.due}</span>
              </header>
              <div className="item">
                {state.details.text}
              </div>
            </div>
          </Modal>
        </When>

export default ToDo;
