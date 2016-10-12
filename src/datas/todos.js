import xs from 'xstream';
import historyUtils from 'utils/history';
import {List, Map} from 'immutable';

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

  const initialValue = List.of();

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
  const new_todo = Map({
    id: Math.round( Math.random()*100000000 ), // random way to get random id
    title: title,
    is_checked: false
  });
  return todos.push( new_todo );
}

function remove( todos, id ) {
  return todos.delete(
    todos.findIndex( (todo) => todo.get('id') === id )
  );
}

function toggleCheck( todos, id ) {
  return todos.update(
    todos.findIndex( (todo) => todo.get('id') === id ),
    (todo) => todo.set('is_checked', !todo.get('is_checked') )
  );
}

function toggleCheckAll( todos, is_checked ) {
  return todos.map( (todo) => todo.set('is_checked', is_checked ) );
}

export default todosData;