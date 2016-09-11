import vdom from './template.jsx';
import './style.css';


function Lists( {data$} ) {
  
  const model$ = data$.map( ([search_title, data]) => {
    return {search_title, data}
  });
  const vdom$ = model$.startWith({
    search_title : 'nothing',
    data : []
  }).map( ({search_title, data}) => vdom(search_title, data) );

  return {
    vdom$
  }
}

export default Lists;