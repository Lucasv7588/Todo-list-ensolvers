import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const TodoListCompleted = ({ todo, ChangePage, page, toggleChecked, deleteTodo }) => {
    return (
        <div className='todo-list-container'>
            <ul className='list'>
                {
                    todo.map(todo => {
                        if(todo.complete){
                            return(
                                <li key={todo._id} className="list-item">
                                    <div 
                                        className="checkbox-container"
                                        onClick={() => toggleChecked(todo._id)}
                                    >
                                        <div className='checkbox-checked'></div>
                                    </div>
                                    <div className='task-title--checked'>{todo.text}</div>
                                    <div 
                                        className='button-container'
                                        onClick={() => deleteTodo(todo._id)}
                                    >
                                        <button className='delete'><FontAwesomeIcon icon={faTrash} /></button>
                                    </div>
                                </li>
                            );
                        }
                    })
                }
            </ul>
            <div className='page-selector'>
            {
                page === 1 ? (
                    <div
                        className='page-selector-item--active'
                        onClick={() => ChangePage(1)}
                    >All</div>)
                : (
                    <div
                        className='page-selector-item'
                        onClick={() => ChangePage(1)}
                    >All</div>
                )
            }
            {
                page === 2 ? (
                    <div
                        className='page-selector-item--active'
                        onClick={() => ChangePage(2)}
                    >Active</div>)
                : (
                    <div
                        className='page-selector-item'
                        onClick={() => ChangePage(2)}
                    >Active</div>
                )
            }
            {
                page === 3 ? (
                    <div
                        className='page-selector-item--active'
                        onClick={() => ChangePage(3)}
                    >Completed</div>)
                : (
                    <div
                        className='page-selector-item'
                        onClick={() => ChangePage(3)}
                    >Completed</div>
                )
            }
        </div>
        </div>
      )
}
