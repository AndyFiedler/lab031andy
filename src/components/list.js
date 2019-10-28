import React from 'react';


<div>
<ul>
  { this.state.todoList.map(item => (
    <li
      className={`complete-${item.complete.toString()}`}
      key={item._id}
    >
      <span onClick={() => this.toggleComplete(item._id)}>
        {item.text}
      </span>
      <button onClick={() => this.toggleDetails(item._id)}>
        Details
      </button>
      <button onClick={() => this.deleteItem(item._id)}>
        Delete
      </button>
    </li>
  ))}
</ul>
</div>