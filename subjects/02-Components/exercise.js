////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render a tab for each country with its name in the tab
// - When you click on a tab, make it appear to be active while the others
//   appear inactive
// - Render the correct content for the selected tab in the panel
//
// Got extra time?
//
// - Make <Tabs> generic so that it doesn't know anything about
//   country data (Hint: good propTypes help)
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";

const styles = {};

styles.tab = {
  display: "inline-block",
  padding: 10,
  margin: 10,
  borderBottom: "4px solid",
  borderBottomColor: "#ccc",
  cursor: "pointer"
};

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: "#000"
};

styles.panel = {
  padding: 10
};

// class Tabs extends React.Component {
//   render() {
//     return (
//       <div className="Tabs">
//         {
//           this.props.data.map((country => {
//             return(
//               <div 
//                 onClick={this.props.onChangeTab.bind(null,country.id)} 
//                 key = {country.id} 
//                 style={this.props.activeId === country.id ?
//                 styles.activeTab : styles.tab} 
//                 className="Tab"
//               >
//                 {country.name}
//               </div>
//             )
//           }))
//         }
//         <div className="TabPanel" style={styles.panel}>
//           {this.props.data.find((country)=>country.id === this.props.activeId).description}
//         </div>
//       </div>
//     );
//   }
// }

class Tabs extends React.Component {
  render() {
    return (
      <div className="Tabs">
        {this.props.children}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    activeId: 1
  }
  handleChangeTab = (id) => {
    this.setState({
      activeId: id
    })
  }
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs
        >
          {
            this.props.countries.map((country => {
              return (
                  <div
                    onClick={this.handleChangeTab.bind(null, country.id)}
                    key={country.id}
                    style={this.state.activeId === country.id ?
                      styles.activeTab : styles.tab}
                    className="Tab"
                  >
                    {country.name}
                  </div>
            )
            }))
          }
          <div className="TabPanel" style={styles.panel}>
            {this.props.countries.find((country)=>country.id === this.state.activeId).description}
          </div>
        </Tabs>
      </div>
    );
  }
}

const DATA = [
  {
    id: 1,
    name: "USA",
    description: "Land of the Free, Home of the brave"
  },
  {
    id: 2,
    name: "Brazil",
    description: "Sunshine, beaches, and Carnival"
  },
  { id: 3, name: "Russia", description: "World Cup 2018!" }
];

ReactDOM.render(
  <App countries={DATA} />,
  document.getElementById("app")
);

require("./tests").run();
