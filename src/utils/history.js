import xs from 'xstream';
import $ from 'jquery';

/**
 * 
 * Accepts a sources that defines the data reducer and undo / redo streams,
 * then create a history value that will save the state accepted into history,
 * and it will be used as the state for the data.
 *
 * @param <Object>sources : The source must contain these values:
 * - <State>reducer$ : the reducer of the data component, that will output
 *   the data to be recorded in the history,
 * - <State>undo$ : the undo state that will trigger when undo runs. the state
 *   doesn't need to return any value,
 * - <State>redo$ : same as undo, for redo purpose,
 * - <State>reset$ : the reset state that will clear the whole history state
 *   back to initialValue,
 * - <void>initialValue : the initial value of the data component, saved as the first
 *   value and present history
 *
 * @return <State>state$ : The history state, consist of:
 * - <Array>history : the array of history saved based on each action run
 * - <Int>index : the current position of history
 * - <Boolean>canUndo : the flag if the history is undoable
 * - <Boolean>canRedo : the flag if the history is redoable
 */

export default function historyUtils( sources ){

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

  // trigger reset
  const reset$ = sources.reset$
    .map( () => ({history, index}) => reset(history, index) );

  // create reducer for undo/redo
  const reducer$ = xs.merge( add$, undo$, redo$, reset$ );

  const state$ = history$
    .map( state => reducer$.fold( (acc, reducer) => reducer(acc), state) )
    .flatten();

  return state$;

}

function add( history, index, data ) {
  const new_history = history.slice(0, index+1);
  new_history.push(data);
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

function reset( history, index ) {
  const new_history = history.slice(0,1);
  return stateFormat( new_history, 0 );
}

function stateFormat( history, index ) {
  return {
    history,
    index,
    canUndo : index > 0,
    canRedo : index < history.length-1
  }
}