import xs from 'xstream';
import $ from 'jquery';

export default function( sources ){

  const initialValue = sources.initialValue;

  const history$ = xs.of({ history: [initialValue], index: 0 });

  // trigger add
  const add$ = sources.reducer$
    .map( ( method ) => ({history, index}) => {
      const new_data = method(history[index]);
      return add(history, index, new_data);
    });

  // trigger undo
  const undo$ = sources.undo$
    .map( () => ({history, index}) => undo(history, index) );

  // trigger redo
  const redo$ = sources.redo$
    .map( () => ({history, index}) => redo(history, index) );

  // create reducer for undo/redo
  const reducer$ = xs.merge( add$, undo$, redo$ );

  const state$ = history$
    .map( state => reducer$.fold( (acc, reducer) => reducer(acc), state) )
    .flatten();

  return state$;

}

function add( history, index, data ) {
  const new_history = history.slice(0, index+1);
  const new_data = (function(){
    if( Array.isArray( data ) ) return data.slice();
    else if( typeof data === 'object' ) return $.extend({}, data);
    else return data;
  })( data );
  new_history.push(new_data);
  const new_index = new_history.length-1;
  return stateFormat( new_history, new_index );
}

function undo( history, index ) {
  const new_index = index > 0 ? index-1 : 0;
  return stateFormat( history, new_index );
}

function redo( history, index ) {
  const new_index = index < history.length-1 ? index+1 : history.length-1;
  return stateFormat( history, new_index );
}

function stateFormat( history, index ) {
  return {
    history,
    index,
    canUndo : index > 0,
    canRedo : index < history.length-1
  }
}