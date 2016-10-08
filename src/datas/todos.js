import xs from 'xstream';
import historyUtils from 'utils/history';
import {find, findIndex} from 'lodash';

/**
 * Stores the state of the todos data. The data is extended by utils/history to
 * make it undoable, therefore besides the specific todos action, we need to define
 * the undo/redo action as well.
 * @param <State>source$ : The action state that defines the todos data.
 * The state consist of:
 * - add$ : add new todo by passing the title of todo. By default, it will be unchecked
 * - remove$ : remove todo based on its id
 * - toggleCheck$ : toggle the todo checked status based on its id
 * - toggleCheckAll$ : toggle all the todos checked status
 * - undo$ : the action state of undoing
 * - redo$ : the action state of redoing
 * - reset$ : the action state of resetting the data back to initial value
 * 
 * @return <State>historyState$ : The data state of todos together with its history.
 * The data state is based on historyUtils data format, with history[index] beings the
 * current data state
 */
function todosData( source$ ) {

  const initialValue = [];

  const add$ = source$
    .map( ({add$}) => add$
      .map( (title) => (state) => add( state, title ) ) )
    .flatten();

  const remove$ = source$
    .map( ({remove$}) => remove$
      .map( (id) => (state) => remove( state, id ) ) )
    .flatten();

  const toggleCheck$ = source$
    .map( ({toggleCheck$}) => toggleCheck$
      .map( (id) => (state) => toggleCheck( state, id ) ) )
    .flatten();

  const toggleCheckAll$ = source$
    .map( ({toggleCheckAll$}) => toggleCheckAll$
      .map( (is_checked) => (state) => toggleCheckAll( state, is_checked ) ) )
    .flatten();

  const reducer$ = xs.merge( add$, remove$, toggleCheck$, toggleCheckAll$ );

  const historyState$ = historyUtils({
    reducer$,
    undo$ : source$.map( ({undo$}) => undo$ ).flatten(),
    redo$ : source$.map( ({redo$}) => redo$ ).flatten(),
    reset$ : source$.map( ({reset$}) => reset$ ).flatten(),
    initialValue
  });
  
  return historyState$;
}

// side-effect functions
function add( todos, title ) {
  const new_todos = todos.slice();
  new_todos.push({
    id: Math.round( Math.random()*100000000 ), // random way to get random id
    title: title,
    is_checked: false
  });
  return new_todos;
}

function remove( todos, id ) {
  const new_todos = todos.slice();
  new_todos.splice( findIndex( todos, {'id' : id} ), 1 );
  return new_todos;
}

function toggleCheck( todos, id ) {
  const todo = find( todos, {'id': id} );
  if(todo)
    todo.is_checked = todo.is_checked ? false : true;
  return todos;
}

function toggleCheckAll( todos, is_checked ) {
  return todos.map( (todo) => {
    todo.is_checked = is_checked;
    return todo;
  });
}

export default todosData;