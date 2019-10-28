import React from 'react';

function Form() {

<section className="form">

          <div>
            <h3>Add Item</h3>
            <form onSubmit={this.addItem}>
              <label>
                <span>To Do Item</span>
                <input
                  name="text"
                  placeholder="Add To Do List Item"
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                <span>Difficulty Rating</span>
                <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={this.handleInputChange} />
              </label>
              <label>
                <span>Assigned To</span>
                <input type="text" name="assignee" placeholder="Assigned To" onChange={this.handleInputChange} />
              </label>
              <label>
                <span>Due</span>
                <input type="date" name="due" onChange={this.handleInputChange} />
              </label>
              <button>Add Item</button>
            </form>
          </div>
        </section>
        }

        export default Form;