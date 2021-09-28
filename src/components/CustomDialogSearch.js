import React, { useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import Backdrop from "@material-ui/core/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 176, 246, 1)",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  test: {
    border: "1px solid red",
  },

  paper: {
    overflowY: "unset",
  },

  box: {
    padding: "30vh 0",
  },

  button: {
    color: "rgba(29, 99, 249, 1)",
    fontSize: "11pt",
  },

  cancelIcon: {
    position: "absolute",
    right: "-10px",
    top: "-15px",
    width: "30px",
    height: "30px",
    backgroundColor: "red",
    color: "white",
    fontSize: "12px",
  },
}));

let dataList = {};
let keyword = "";

function CustomDialog(props) {
  const classes = useStyles();
  const { open, onClose } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose("exit", "exit");
    dataList = {};
  };

  const handleOnChange = (e) => {
    keyword = e.target.value;
  };

  const handleListItemClick = (codeName, codeCd) => {
    dataList = {};
    onClose(codeName, codeCd);
  };

  const inputRef = useRef();

  const getCode = () => {
    setLoading(true);
    let text = keyword;
    console.log(loading);
    axios
      .get("http://192.168.0.137/m_api/index.php/code/getStanCd", {
        params: {
          search: text,
        },
      })
      .then((response) => {
        if (response.data.RESULT_CODE === "200") {
          dataList = response.data.STAN_CD;
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth
        classes={{ paper: classes.paper }}
      >
        <IconButton
          className={classes.cancelIcon}
          onClick={() => handleClose()}
        >
          <ClearIcon />
        </IconButton>
        <DialogTitle>
          <CssTextField
            variant="outlined"
            size="small"
            ref={inputRef}
            onChange={handleOnChange}
            fullWidth
            placeholder="검색"
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={(e) => getCode(e)} position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogTitle>
        <DialogContent dividers className={"customDialog"}>
          <div>
            {dataList.length > 0 ? (
              dataList.map((listData) => (
                <>
                  {console.log("rendering")}
                  <List>
                    <ListItem button disablePadding>
                      <ListItemText primary={listData.CODE_NM} />
                    </ListItem>
                  </List>
                </>
              ))
            ) : (
              <div
                className={classes.box}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {loading && <CircularProgress size={70} />}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default React.memo(CustomDialog);
