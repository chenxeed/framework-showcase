import xs from 'xstream';
import vdom from './template.jsx';
import './style.css';

function Form( formDOM ) {
  
  const searchInput$ = formDOM.select('#search-input').events('change').map(ev => ev.target.value);
  const searchBtn$ = formDOM.select('#btn-search').events('click');

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