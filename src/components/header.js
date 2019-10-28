
import React from 'react';

function Header(){

  return (
    <>
      <header>
        <h2>
          There are
          {this.state.todoList.filter( item => !item.complete ).length}
          Items To Complete
        </h2>
      </header>
      </>
  )}

  export default Header;