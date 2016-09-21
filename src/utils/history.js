import xs from 'xstream';
import $ from 'jquery';

export default function makeHistory(first_value){

  return function( sources ){

    // save the data to history
    const add$ = sources.map( ({add$}) => add$
      .map( (new_data) => ({history, index}) => add(history, index, new_data) ) )
    .flatten();

    // trigger undo
    const undo$ = sources.map( ({undo$}) => undo$
      .map( () => ({history, index}) => undo(history, index) ) )
    .flatten();

    // trigger redo
    const redo$ = sources.map( ({redo$}) => redo$
      .map( () => ({history, index}) => redo(history, index) ) )
    .flatten();

    const reducer$ = xs.merge( add$, undo$, redo$ );

    const state$ = xs.of( {
      history: [first_value],
      index: 0
    })
      .map( state => reducer$.fold( (acc, reducer) => reducer(acc), state) )
      .flatten();
    
    return state$;

  };

}

function add( history, index, data ) {
  const new_history = history.slice(0, index+1);
  let new_data;
  if( Array.isArray( data ) ) {
    new_data = data.slice();
  } else if( typeof data === 'object' ) {
    new_data = $.extend({}, data);
  } else {
    new_data = data;
  }
  new_history.push(new_data);
  const new_index = new_history.length-1;
  return {
    history : new_history,
    index : new_index
  };
}

function undo( history, index ) {
  const new_index = index > 0 ? index-1 : 0;
  return {
    history,
    index : new_index
  }
}

function redo( history, index ) {
  const new_index = index < history.length-1 ? index+1 : history.length-1;
  return {
    history,
    index : new_index
  }
}