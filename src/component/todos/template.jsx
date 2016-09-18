import {html} from 'snabbdom-jsx';
export default (data) => {
return <div className="todos-component">
  <h2>To-Do</h2>
  <div>
    <input type="text" id="todo-input" />
    <button id="todo-add">Add</button>
  </div>
  <div>You have {data.length} todos:</div>
  <ul id="todo-list">
    { data.map( row =>
      <li id={'todo-'+row.id} >
        <input type="checkbox" className="is-checked" checked={row.is_checked} />
        {row.title} 
        <button className="btn delete">X</button>
      </li>
    )}
  </ul>
</div>
}