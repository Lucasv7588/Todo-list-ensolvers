import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export const InsertTodo = ({ setNewTodo, newTodo, addTodo}) => {
  return (
    <div className='insert-todo'>
        <input 
          type="text" 
          className='insert' 
          placeholder='Create new Todo'
          onChange={ e => setNewTodo(e.target.value)}
          value={newTodo}
        />
        <div className='insert-button-container'>
          <button 
            className='insert-button'
            onClick={addTodo}
          ><FontAwesomeIcon icon={faPlus} /></button>
        </div>
    </div>
  )
}
