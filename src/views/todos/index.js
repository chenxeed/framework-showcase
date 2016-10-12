import xs from 'xstream';
import vdom from './template.jsx';
import './style.css';

function Todos( {dom$, data$} ) {

  // event sources
  const clickAdd$ = dom$.select('#todo-add').events('click');
  const addInput$ = dom$.select('#todo-input').events('change');
  const checkAll$ = dom$.select('#todo-togglecheck').events('click');
  const clickUndo$ = dom$.select('#todo-undo').events('click');
  const clickRedo$ = dom$.select('#todo-redo').events('click');
  const clickReset$ = dom$.select('#todo-reset').events('click');
  const clickRow$ = dom$.select('#todo-list li').events('click');
  const clickDelete$ = clickRow$.filter( e => e.target.classList.contains('delete') );
  const clickChecked$ = clickRow$.filter( e => e.target.classList.contains('is-checked') );

  // intent
  const add$ = addInput$.map( e => e.target.value )
    .map( inputValue => clickAdd$.map( () => inputValue ) )
    .flatten();
  const remove$ = clickDelete$.map( e => parseInt( e.currentTarget.dataset.id ) );
  const toggleCheck$ = clickChecked$.map( e => parseInt( e.currentTarget.dataset.id ) );
  const toggleCheckAll$ = checkAll$.map( e => e.currentTarget.checked );
  const undo$ = clickUndo$;
  const redo$ = clickRedo$;
  const reset$ = clickReset$;

  // model
  const model$ = data$
    .map( ({history, index, canUndo, canRedo}) => {
      return {
        data: history[index].toJS(),
        canUndo,
        canRedo
      }
    });

  // view
  const vdom$ = model$.map( (state) => vdom(state) );

  return {
    vdom$,
    add$,
    remove$,
    toggleCheck$,
    toggleCheckAll$,
    undo$,
    redo$,
    reset$
  }
}

export default Todos;