import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#DADCE0",
    color: "#000000",
    height: "55px",
  },

  menuButton: {
    color: "#000000",
    marginTop: "5px",
  },

  title: {
    fontFamily: "NanumGothic",
    marginTop: "5px",
    color: "#000000",
  },

  menuInform: {
    position: "fixed",
    zIndex: 2,
    backgroundColor: "#538CBD",
    width: "65vw",
  },

  line: {
    marginBottom: "125px",
  },

  primaryText: {
    color: "#FFFFFF",
    marginTop: "15px",
  },

  secondaryText: {
    color: "#FFFFFF",
  },

  closeIcon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    color: "#FFFFFF",
  },

  logOutIcon: { float: "right", color: "#FFFFFF", marginRight: "1px" },

  logOut: {
    float: "right",
    color: "#FFFFFF",
  },

  menuItem: {
    zIndex: 1,
    fontFamily: "NanumGothic",
    width: "65vw",
  },

  span: { lineHeight: "40px" },

  button: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginLeft: "2vw",
  },
}));

function AppBars({ history, programName }) {
  window.addEventListener("checkBackFlag", funCheckFlag);
  function funCheckFlag() {
    let count = 0;

    console.log(toggle);

    if (count === 0) {
      if (toggle) {
        setToggle(false);
        console.log("Appbar : toggle");
        count = count + 1;
      }
    }

    window.sessionStorage.setItem("closeFlag", count);
  }

  const classes = useStyles();
  const [toggle, setToggle] = useState(false);
  const list = JSON.parse(window.sessionStorage.getItem("program_list"));

  const logOut = () => {
    if (window.sessionStorage.getItem("userAgent") === "android") {
      let token = window.BRIDGE.connectAndroid();
      let form = new FormData();
      form.append("login_id", window.sessionStorage.getItem("user_id"));
      form.append("token", token);
      axios
        .post("http://192.168.0.137/m_api/index.php/login/logout", form)
        .then(() => {
          history.replace({
            pathname: "/",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <AppBar className={classes.AppBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={() => setToggle(!toggle)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            {programName}
          </Typography>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={toggle}
        onClose={() => setToggle(!toggle)}
        onOpen={() => setToggle(!toggle)}
      >
        <ListItem className={classes.menuInform}>
          <ListItemText
            primary={
              <Typography type="body2" className={classes.primaryText}>
                (주)영진철강
              </Typography>
            }
            secondary={
              <>
                <Typography
                  type="body2"
                  gutterBottom
                  className={classes.secondaryText}
                >
                  {window.sessionStorage.getItem("user_name")}
                </Typography>
                <span
                  onClick={() => {
                    setToggle(!toggle);
                    logOut();
                  }}
                >
                  <Typography type="body2" className={classes.logOut}>
                    로그아웃
                  </Typography>
                  <ExitToAppIcon className={classes.logOutIcon} />
                </span>
              </>
            }
          />
          <CloseIcon
            onClick={() => setToggle(!toggle)}
            className={classes.closeIcon}
          />
        </ListItem>
        <Divider className={classes.line} />
        {list.map((listData) => {
          return (
            <div key={listData.PROGRAM_ID}>
              <MenuItem
                className={classes.menuItem}
                onClick={() => {
                  if (programName !== listData.PROGRAM_NM) {
                    history.push({
                      pathname: "/" + listData.PROGRAM_ID,
                    });
                  }
                }}
              >
                {listData.PROGRAM_NM}
              </MenuItem>
              <Divider />
            </div>
          );
        })}
      </SwipeableDrawer>
    </div>
  );
}

export default withRouter(AppBars);
