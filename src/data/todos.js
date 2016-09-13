import xs from 'xstream';
import $ from 'jquery';
import {findIndex} from 'lodash';

// observable state
function Todos( todosData ) {
  return {
    add$ : todosData.add$,
    remove$ : todosData.remove$
  }
}

function todosData( sources ) {

  const saved_todos = [];

  const add$ = xs.createWithMemory();
  const remove$ = xs.createWithMemory();

  add$.imitate(
    sources.filter( ({type}) => type==='ADD')
      .map( ({title}) => add(saved_todos, title) )
  );
  
  remove$.imitate(
    sources.filter( ({type}) => type==='REMOVE')
      .map( ({id}) => remove(saved_todos, id) )
  );
  
  return {
    add$,
    remove$
  }
}

// side-effect functions
function add( todos, title ) {
  todos.push({
    id: Math.round( Math.random()*100000000 ), // random way to get random id
    title: title,
  });
  return todos;
}

// side-effect functions
function remove( todos, id ) {
  todos.splice( findIndex( todos, {'id' : id} ), 1 );
  return todos;
}

export {
  Todos,
  todosData
};