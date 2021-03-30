import React from "react";
import LoginForm from "./components/loginForm";
import Footer from "../../component/Footer";
import "./index.less";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      errorMsg: "",
    };
  }

  componentDidMount() {
    //每次进入登录页清除之前的登录信息
  }

  loginReq = (params) => {
    if (params.username === "admin" && params.password === "admin") {
      window.location.href = `/#/?${params}`;
    } else {
      const _this = this;
      this.setState(
        {
          errorMsg: "用户名或密码错误",
        },
        () => {
          setTimeout(() => {
            _this.setState({
              errorMsg: "",
            });
          }, 3000);
        }
      );
    }
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-header">
          <div className="logo">
            <img src="/assets/logo-ant.svg" alt="共享单车后台管理系统" />
            React全家桶+AntD 共享经济热门项目后台管理系统
          </div>
        </div>
        <div className="login-content-wrap">
          <div className="login-content">
            <div className="word">
              共享出行 <br />
              引领城市新经济
            </div>
            <div className="login-box">
              <div className="error-msg-wrap">
                {this.state.errorMsg.length > 0 ? (
                  <div className="show">{this.state.errorMsg}</div>
                ) : (
                  <div>{this.state.errorMsg}</div>
                )}
              </div>
              <div className="title">欢迎你</div>
              <LoginForm formRef={this.formRef} loginSubmit={this.loginReq} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
