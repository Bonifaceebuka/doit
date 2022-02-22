import React, { Component, Fragment } from "react";

class Button extends Component {
        constructor(props) {
            super(props);
        }

    render() {
        const {notificationButton, clickFunc, classToAdd}  = this.props;
        // return < {...this.props} />
        return(
            <Fragment>
                <button className={"waveButton "+classToAdd} onClick={clickFunc}>
                    {notificationButton}
                </button>
            </Fragment>
        )
    }
}

export default Button;