import vdom from './template.jsx';
import './style.css';

/**
 * Lists (component)
 * 
 * accepts data$ as a stream that holds an array. The array consist of:
 * - search_title (string) as the 1st index, to define the title on the list
 * - data (array) as the 2nd index,
 *   each row of the data contains an object that have key 'title'.
 *
 */
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