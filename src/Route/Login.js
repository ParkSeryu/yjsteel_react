import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomAlertDialog from "../components/CusomAlertDialog";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#65B7D9",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#65B7D9",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#65B7D9",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  AppBar: {
    alignItems: "center",
  },

  mainContainer: {
    marginTop: "20vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%",
    color: "#FFFFFF",
  },

  textField_ID: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },

  textField_PW: {
    marginBottom: theme.spacing(1),
  },

  button: {
    marginTop: theme.spacing(1),
    height: "55px",
    backgroundColor: "#5EB3D7",
    color: "#FFFFFF",
    "&:focus": {
      backgroundColor: "#5EB3D7",
    },
  },

  tel: {
    marginTop: theme.spacing(1.5),
    color: "gray",
  },

  backdrop: {
    zIndex: 1252,
    color: "#fff",
  },
}));

function Login(props) {
  window.addEventListener("checkBackFlag", funcheckFlag);
  function funcheckFlag() {
    window.sessionStorage.setItem("closeFlag", 0);
  }
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    ID: "",
    PW: "",
  });

  const { ID, PW } = inputs;
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState("initial");

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleClickAgree = () => {
    setOpen(false);
    successLogin();
  };

  const handleClickDisagree = () => {
    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    window.sessionStorage.clear();
    let mobile = /iphone|ipad|ipod|android/i.test(
      navigator.userAgent.toLowerCase()
    );
    if (mobile) {
      checkAutoLogin();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token !== "initial") {
      let result;
      let form = new FormData();
      form.append("token", token);
      axios
        .post(
          "http://121.165.242.72:5050/m_api/index.php/login/findToken",
          form
        )
        .then((response) => {
          console.log(JSON.stringify(response));
          if (response.data.RESULT_CODE === "200") {
            result = response.data.DATA.LOGIN_ID;
            console.log(result); //
            axios
              .get(
                "http://121.165.242.72:5050/m_api/index.php/login/getPassword",
                {
                  params: {
                    id: result,
                  },
                }
              )
              .then((response) => {
                result = response.data.DATA;
                signIn(result.LOGIN_ID, result.PASSWORD);
              });
          } else {
            setLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [token]);

  const checkAutoLogin = () => {
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("android") > -1) {
      if (window.BRIDGE !== undefined) {
        setToken(window.BRIDGE.connectAndroid());
      } else {
        setLoading(false);
      }
      window.sessionStorage.setItem("userAgent", "android");
    } else if (
      userAgent.indexOf("iphone") > -1 ||
      userAgent.indexOf("ipad") > -1 ||
      userAgent.indexOf("ipod") > -1
    ) {
      // webkit.message;
      window.sessionStorage.setItem("userAgent", "ios");
      setLoading(false);
    }
  };

  const signIn = (user_id, pass) => {
    setLoading(true);
    let form = new FormData();
    form.append("id", user_id);
    form.append("pass", pass);

    axios
      .post("http://121.165.242.72:5050/m_api/index.php/login/signIn", form)
      .then((response) => {
        console.log(response);

        if (response.data.RESULT_CODE === "200") {
          if (response.data.DATA.USE_CLS === "1") {
            window.sessionStorage.setItem(
              "user_id",
              response.data.DATA.LOGIN_ID
            );
            window.sessionStorage.setItem(
              "user_name",
              response.data.DATA.HNAME
            );
            window.sessionStorage.setItem(
              "player_id",
              response.data.DATA.PLAYER_ID
            );

            axios
              .get(
                "http://121.165.242.72:5050/m_api/index.php/login/searchOverlapToken",
                {
                  params: {
                    id: response.data.DATA.LOGIN_ID,
                  },
                }
              )
              .then((response) => {
                if (response.data.RESULT_CODE === "200") {
                  response.data.DATA.TOKEN === token
                    ? successLogin()
                    : setOpen(true);
                } else {
                  successLogin();
                }
              });
          } else {
            setLoading(false);
            alert("???????????? ?????? ??????????????????.\n??????????????? ??????????????????.");
          }
        } else {
          setLoading(false);
          alert(response.data.RESULT_MESSAGE);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const successLogin = () => {
    axios
      .get("http://121.165.242.72:5050/m_api/index.php/login/programList", {
        params: {
          id: window.sessionStorage.getItem("user_id"),
        },
      })
      .then((ListData) => {
        if (ListData.data.RESULT_CODE === "200") {
          let form = new FormData();
          form.append("id", window.sessionStorage.getItem("user_id"));
          form.append("token", token);

          axios
            .post(
              "http://121.165.242.72:5050/m_api/index.php/login/updateToken",
              form
            )
            .then((response) => {
              if (response.data.RESULT_CODE === "200") {
                window.sessionStorage.setItem(
                  "program_list",
                  JSON.stringify(ListData.data.PROGRAM_LIST)
                );

                window.sessionStorage.setItem(
                  "name_cd_list",
                  JSON.stringify(ListData.data.NAME_CD)
                );

                window.sessionStorage.setItem(
                  "stan_cd_list",
                  JSON.stringify(ListData.data.STAN_CD)
                );

                window.sessionStorage.setItem(
                  "cust_cd_list",
                  JSON.stringify(ListData.data.CUST_CD)
                );

                window.sessionStorage.setItem(
                  "emp_cd_list",
                  JSON.stringify(ListData.data.EMP_CD)
                );

                window.sessionStorage.setItem(
                  "part_cd_list",
                  JSON.stringify(ListData.data.PART_CD)
                );

                window.sessionStorage.setItem(
                  "job_cust_list",
                  JSON.stringify(ListData.data.JOB_CUST_LIST)
                );

                // window.sessionStorage.setItem(
                //   "dlv_cust_cd_list",
                //   JSON.stringify(ListData.data.DLV_CUST_CD)
                // );

                props.history.replace({
                  pathname: "/home",
                });
              }
            });
        } else {
          setLoading(false);
          alert(ListData.data.RESULT_MESSAGE);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <AppBar
        style={{ background: "#DADCE0" }}
        className={classes.AppBar}
        position="static"
      >
        <Toolbar>
          <Typography
            style={{ color: "black" }}
            align="center"
            variant="h6"
            component="div"
          >
            ????????????(???)
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <div className={classes.mainContainer}>
          <form className={classes.form} noValidate>
            <CssTextField
              className={classes.textField_ID}
              variant="outlined"
              required
              fullWidth
              id="ID"
              label="?????????(??????)"
              name="ID"
              onChange={(e) => handleChange(e)}
              value={ID}
              autoFocus
            />
            <CssTextField
              className={classes.textField_PW}
              variant="outlined"
              required
              fullWidth
              name="PW"
              label="????????????"
              type="password"
              id="PW"
              onChange={(e) => handleChange(e)}
              value={PW}
            />
            <Button
              className={classes.button}
              onClick={() => signIn(ID, PW)}
              fullWidth
              variant="contained"
            >
              <Typography>??? ??? ???</Typography>
            </Button>
          </form>
          <Typography className={classes.tel} variant="body1">
            ??????????????? : 02-566-1300
          </Typography>
        </div>
      </Container>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomAlertDialog
        open={open}
        handleClickAgree={() => handleClickAgree()}
        handleClickDisagree={() => handleClickDisagree()}
        title={"????????????????????????????"}
        content={
          "?????? ????????? ????????? ???????????? ID ?????????. ?????? ????????? ?????????????????????????"
        }
      />
    </div>
  );
}

export default withStyles(useStyles)(Login);
