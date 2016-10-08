import {html} from 'snabbdom-jsx';
export default (inputValue) => {
return <div className="form-component">
	<h2>Search Form</h2>
	Search : <input id="search-input" type="text" /><br />
	<i>Note: The posts title are in latin, some keywords are: "sint, dolor, provident, etc."</i>
	<div>
		You are searching <b>{inputValue}</b>, click Search to start
		<button id="btn-search">Search</button>
	</div>
</div>
}