import React, {Component} from 'react';
import axios from 'axios'

const todos = {
    height: "400px",
    width: "400px"
}


class HomeDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
        <div className= "row">
            <div className="col-sm-6">
                <img src = "http://www.printablecalendar.ca/images/beaucal-miniMonths.png" />
            </div>
            <div className="col-sm-6">
                <img src = "https://www.tuvous.com/wp-content/uploads/2016/04/to-do-list.png" style={todos} />
            </div>
        </div>
    )
  }

}

export default HomeDashboard;