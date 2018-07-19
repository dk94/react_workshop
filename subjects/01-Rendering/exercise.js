////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render `DATA.title` in an <h1>
// - Render a <ul> with each of `DATA.items` as an <li>
// - Now only render an <li> for mexican food (hint: use DATA.items.filter(...))
// - Sort the items in alphabetical order by name (hint: use sort-by https://github.com/staygrimm/sort-by#example)
//
// Got extra time?
//
// - Add a <select> dropdown to make filtering on `type` dynamic
// - Add a <button> to toggle the sort order (hint: You'll need an `updateThePage`
//   function that calls `ReactDOM.render`, and then you'll need to call it in
//   the event handlers of the form controls)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import sortBy from "sort-by";

const DATA = {
  title: "Menu",
  items: [
    { id: 1, name: "tacos", type: "mexican" },
    { id: 2, name: "burrito", type: "mexican" },
    { id: 3, name: "tostada", type: "mexican" },
    { id: 4, name: "mushy peas", type: "english" },
    { id: 5, name: "fish and chips", type: "english" },
    { id: 6, name: "black pudding", type: "english" }
  ]
};

let selectedType='mexican';
let order=1;
function changeType(e) {
  selectedType=e.target.value;

  ReactDOM.render(<Menu selectedType={selectedType}/>, document.getElementById("app"));
}
function toggleOrder() {
  order = order ? 0 : 1;

  ReactDOM.render(<Menu selectedType={selectedType}/>, document.getElementById("app"));
}
function Menu(props) {
  return (
    <div>
    <h1>{DATA.title}</h1>
    <select value={props.selectedType} onChange= {changeType} name='types'>
      <option value='' />
      <option value='mexican'>mexican</option>
      <option value='english'>english</option>
    </select>
    <ul>
      {
        DATA.items
          .filter((food) => food.type === props.selectedType)
          .sort((a,b) => order ? a.name > b.name : a.name < b.name)
          .map((food) => <li>{food.name}</li>)
      }
    </ul>
    <button onClick={toggleOrder}>ToggleOrder</button>
  </div>
  )


}

ReactDOM.render(<Menu selectedType={selectedType}/>, document.getElementById("app"));

require("./tests").run();
