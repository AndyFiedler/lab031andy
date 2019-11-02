import React, { useState } from 'react';
import Item from './item';
import useItemCount from '../hooks/useItemCount';
import useDisplayCompleted from '../hooks/useDisplayCompleted';

function List(props){
  const [page, setPage] = useState(0);

  const displayCompleted = useDisplayCompleted();
  const list = !displayCompleted.displayCompleted ? props.todoList.filter(item => !item.complete) : props.todoList; 

  const itemCount = useItemCount();
  const pageCount = Math.ceil(list.length / itemCount.count);
  const pageStart = page * itemCount.count;
  const pageEnd = Math.min(pageStart + itemCount.count, list.length);

  if(page >= pageCount && pageCount != 0) {
    setPage(pageCount -1);
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault() }>
        <input type="range" min={ 5 || list.length } value={itemCount.count} max={ list.length } onChange={ e => itemCount.setCount(Number.parseInt(e.target.value)) } />
        <label>
          <span>{displayCompleted.displayCompleted ? 'Hide' : 'Show'} Completed</span>
          <input type="checkbox" onChange={displayCompleted.toggleDisplayCompleted} checked={!displayCompleted.displayCompleted} />
        </label>
      </form>
      <ul>
        { list.slice(pageStart, pageEnd).map(item => (
          <Item key={item._id} item={item} toggleComplete={props.toggleComplete} toggleDetails={props.toggleDetails} deleteItem={props.deleteItem} />
        ))}
      </ul>
      <p>Page {page + 1} of {pageCount || 1}</p>
      <button onClick={() => setPage(page - 1)} disabled={page <= 0}>Prev</button>
      <button onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1}>Next</button>
    </div>
  );
}

export default List;