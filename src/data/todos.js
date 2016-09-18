import xs from 'xstream';
import $ from 'jquery';
import {find, findIndex} from 'lodash';

// observable state
function Todos( todosData ) {
  return {
    add$ : todosData.add$,
    remove$ : todosData.remove$,
    toggleCheck$ : todosData.toggleCheck$
  }
}

function todosData( sources ) {

  const saved_todos = [];

  const add$ = xs.createWithMemory();
  const remove$ = xs.createWithMemory();
  const toggleCheck$ = xs.createWithMemory();

  add$.imitate(
    sources.filter( ({type}) => type==='ADD')
      .map( ({title}) => add(saved_todos, title) )
  );
  
  remove$.imitate(
    sources.filter( ({type}) => type==='REMOVE')
      .map( ({id}) => remove(saved_todos, id) )
  );
  
  toggleCheck$.imitate(
    sources.filter( ({type}) => type==='TOGGLE_CHECK')
      .map( ({id}) => toggleCheck(saved_todos, id) )
  );
  
  return {
    add$,
    remove$,
    toggleCheck$
  }
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
  todo.is_checked = todo.is_checked ? false : true;
  return todos;
}

export {
  Todos,
  todosData
};