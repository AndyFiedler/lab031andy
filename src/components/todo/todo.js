import React, { useState } from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal/';
import Header from '../header';
import Form from '../form';
import List from '../list';
import './todo.scss';

function ToDo () {
  const [state, setState]= useState(  {
    todoList: [],
    showDetails: false,
    details: {},
  });

  const addItem = (item) => {

    const defaults = { _id: uuid(), complete:false };
    item = Object.assign({}, item, defaults);

  setState({
      ...state,
      todoList: [...state.todoList, item],
    });

  };

  const deleteItem = id => {

    setState({
      ...state,
      todoList: state.todoList.filter(item => item._id !== id),
    });

  };

  const saveItem = updatedItem => {

    setState({
      ...state,
      todoList: state.todoList.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      ),
    });

  };

  const toggleComplete = id => {
    setState({
      ...state,
      todoList: state.todoList.map(item =>
        item._id === id ? {
          ...item,
          complete: !item.complete,
        } : item
      ),
    });
  };

  const toggleDetails = id => {
    let item = state.todoList.find(item => item._id === id);
    setState({
      ...state,
      details: item || {},
      showDetails: !!item,
    });
  }

  return (
    <>
  
      <Header todoList={state.todoList} />

      
      <section className="todo">

        <Form addItem={addItem} />

        <List todoList={state.todoList} toggleComplete={toggleComplete} toggleDetails={toggleDetails} deleteItem={deleteItem} />
      </section>

      <When condition={state.showDetails}>
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
    </>
  );
}

export default ToDo;
