import React, { Component } from "react";
import AppBars from "../components/AppBars";
import { withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <AppBars programName="영진철강(주)" position="static" />
        </div>
        <div
          style={{
            width: "100vw",
            marginTop: "15vh",
            textAlign: "center",
          }}
        >
          <b>영진철강(주) ERP 접속을 환영합니다.</b>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
