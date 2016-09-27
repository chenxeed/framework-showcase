import xs from 'xstream';
import $ from 'jquery';
import historyUtils from 'utils/history';
import {find, findIndex} from 'lodash';

function todosData( source$ ) {

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
    initialValue : []
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