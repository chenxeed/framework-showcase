import xs from 'xstream';
import $ from 'jquery';

export default function makeHistory(dataComponent){

  return function( source$ ){

    const history$ = xs.of({ history: [], index: -1 });

    // trigger add
    const add$ = dataComponent( source$ )
      .map( ( state ) => ({history, index}) => add(history, index, state) )

    // trigger undo
    const undo$ = source$
      .map( ({undo$}) => undo$
        .map( () => ({history, index}) => undo(history, index) )
      )
      .flatten();

    // trigger redo
    const redo$ = source$
      .map( ({redo$}) => redo$
        .map( () => ({history, index}) => redo(history, index) )
      )
      .flatten();

    // create reducer for undo/redo
    const reducer$ = xs.merge( add$, undo$, redo$ );

    const state$ = history$
      .map( state => reducer$.fold( (acc, reducer) => reducer(acc), state)
        .map( ({history, index}) => history[index] )
      )
      .flatten();

    return state$.drop(1).filter( state => !!state );

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