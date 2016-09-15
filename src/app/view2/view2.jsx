var React = require('react');
import {observer} from "mobx-react";
import {observable} from "mobx";

class Test {
    @observable name;
    constructor() {
        this.name = 'aniket'
    }
}

var test = new Test();
window.aniket = test;

@observer
class View2 extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="root">
                {test.name}
            </div>
        );
    }

}

module.exports = View2;
