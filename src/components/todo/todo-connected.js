import React, {useState, useEffect} from 'react';
import { When } from '../if';
import Header from '../header';
import Form from '../form';
import List from '../list';
import Modal from '../modal';

import './todo.scss';

const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';

function ToDo () {
  const [state, setState]= useState(  {
    todoList: [],
    showDetails: false,
    details: {},
  });

  const callAPI = (url, method='get', body, handler, errorHandler) => {

    return fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => typeof handler === 'function' ? handler(data) : null )
      .catch( (e) => typeof errorHandler === 'function' ? errorHandler(e) : console.error(e)  );
  };

  const addItem = (item) => {

    const _updateState = newItem =>
      setState({
        ...state,
        todoList: [...state.todoList, newItem],
      });

    callAPI( todoAPI, 'POST', item, _updateState );

  };

  const deleteItem = id => {

    const _updateState = () =>
      setState({
        ...state,
        todoList: state.todoList.filter(item => item._id !== id),
      });

    callAPI( `${todoAPI}/${id}`, 'DELETE', undefined, _updateState );

  };

  const saveItem = updatedItem => {

    const _updateState = (newItem) =>
      setState({
        ...state,
        todoList: state.todoList.map(item =>
          item._id === newItem._id ? newItem : item
        ),
      });

    callAPI( `${todoAPI}/${updatedItem._id}`, 'PUT', updatedItem, _updateState );

  };

  const toggleComplete = id => {
    let item = state.todoList.find(i => i._id === id);
    if (item._id) {
      saveItem({
        ...item,
        complete: !item.complete,
      });
    }
  };

  const toggleDetails = id => {
    let item = state.todoList.find(item => item._id === id);
    setState({
      ...state,
      details: item || {},
      showDetails: !!item,
    });
  }

  const getTodoItems = () => {
    const _updateState = data => setState({...state, todoList: data.results });
    callAPI( todoAPI, 'GET', undefined, _updateState );
  };

  useEffect(() => {
    getTodoItems();
  }, []);

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
