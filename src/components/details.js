import React from 'react';

toggleDetails = id => {
  setState(state => {
    let item = state.todoList.find(item => item._id === id);
    return {
      details: item || {},
      showDetails: !!item,
    };
  });
}

export default toggleDetails;