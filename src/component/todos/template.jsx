import {html} from 'snabbdom-jsx';
export default (data) => {
return <div className="todos-component">
  <h2>To-Do</h2>
  <div>
    <input type="text" id="todo-input" />
    <button id="todo-add">Add</button>
  </div>
  <div>
    Toggle Check All <input type="checkbox" id="todo-togglecheck" /><br/>
    <button id="todo-undo">Undo</button><br/>
    <button id="todo-redo">Redo</button>
  </div>
  <div>
    You have {data.length} todo{data.length>1 ? 's' : ''}:
  </div>
  <ul id="todo-list">
    { data.map( row =>
      <li attrs={ {'data-id':row.id} }>
        <input type="checkbox" className="is-checked" checked={row.is_checked} />
        <span className={row.is_checked ? 'checked' : '' }>{row.title}</span>
        <button className="btn delete">X</button>
      </li>
    )}
  </ul>
</div>
}