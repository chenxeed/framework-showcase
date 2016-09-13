import vdom from './template.jsx';
import './style.css';

function Form( {dom$} ) {
  
  const searchInput$ = dom$.select('#search-input').events('change').map(ev => ev.target.value);
  const searchBtn$ = dom$.select('#btn-search').events('click');

  const submit$ = searchInput$.map( inputValue => searchBtn$.map( () => inputValue ) )
    .flatten();

  const vdom$ = submit$.startWith('nothing').map( vdom );

  return {
    vdom$,
    submit$
  }
}

// export
export default Form;