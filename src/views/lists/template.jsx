import {html} from 'snabbdom-jsx';
export default (search_title, data) => {
return <div className="lists-component">
	<h2>Lists</h2>
	List Search of <b>{search_title}</b> :
	<ul id="list-data">
   { data.map( row => <li>{row.title}</li> ) } 
  </ul>
</div>
}