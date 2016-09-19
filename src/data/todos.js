import xs from 'xstream';
import $ from 'jquery';
import {find, findIndex} from 'lodash';

// observable state
function Todos( state$ ) {
  return state$;
}

function todosData( sources ) {

  const add$ = sources
    .map( ({add$}) => add$
      .map( (title) => (state) => add( state, title ) ) )
    .flatten();

  const remove$ = sources
    .map( ({remove$}) => remove$
      .map( (id) => (state) => remove( state, id ) ) )
    .flatten();

  const toggleCheck$ = sources
    .map( ({toggleCheck$}) => toggleCheck$
      .map( (id) => (state) => toggleCheck( state, id ) ) )
    .flatten();

  const reducer$ = xs.merge( add$, remove$, toggleCheck$ );

  const state$ = xs.of( [] )
    .map( state => reducer$.fold( (acc, reducer) => reducer(acc), state) )
    .flatten();
  
  return state$;
}

// side-effect functions
function add( todos, title ) {
  todos.push({
    id: Math.round( Math.random()*100000000 ), // random way to get random id
    title: title,
    is_checked: false
  });
  return todos;
}

// side-effect functions
function remove( todos, id ) {
  todos.splice( findIndex( todos, {'id' : id} ), 1 );
  return todos;
}

// side-effect functions
function toggleCheck( todos, id ) {
  const todo = find( todos, {'id': id} );
  if(todo)
    todo.is_checked = todo.is_checked ? false : true;
  return todos;
}

export {
  Todos,
  todosData
};