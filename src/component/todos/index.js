import xs from 'xstream';
import vdom from './template.jsx';

function Todos( {dom$, data$} ) {

  // intent
  const clickAdd$ = dom$.select('#todo-add').events('click');
  const addInput$ = dom$.select('#todo-input').events('change');
  const clickRow$ = dom$.select('#todo-list li').events('click');
  const clickDelete$ = clickRow$.filter( e => e.target.classList.contains('delete') )

  // model
  const add$ = addInput$.map( e => e.target.value )
    .map( inputValue => clickAdd$.map( () => { return {type: 'ADD', title: inputValue} } ) )
    .flatten();

  const remove$ = clickDelete$.map( e => parseInt( e.currentTarget.id.replace('todo-', '') ) )
    .map( id => { return {type: 'REMOVE', id: id} } );

  const vdom$ = xs.merge(data$.add$, data$.remove$)
    .map( data => { return {data} }).startWith({
      data : []
    })
    .map( ({data}) => vdom(data) );

  return {
    vdom$,
    add$,
    remove$
  }
}

export default Todos;