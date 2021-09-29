import React, { useState } from "react";
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
  text: {
    fontSize: "0.85rem",
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
  const { codeKind, open, onClose } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose("exit", "exit");
    dataList = {};
    keyword = "";
  };

  const handleOnChange = (e) => {
    keyword = e.target.value;
  };

  const handleListItemClick = (codeName, codeCd) => {
    dataList = {};
    keyword = "";
    onClose(codeName, codeCd);
  };

  const getCode = () => {
    dataList = {};
    setLoading(true);
    let text = keyword;

    if (codeKind === "stan_cd") {
      axios
        .get("http://192.168.0.137/m_api/index.php/code/getStanCd", {
          params: {
            search: text,
          },
        })
        .then((response) => {
          if (response.data.RESULT_CODE === "200") {
            dataList = response.data.STAN_CD;
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          } else {
            setLoading(false);
            dataList = {};
          }
        });
    } else {
      axios
        .get("http://192.168.0.137/m_api/index.php/code/getCustCd", {
          params: {
            search: text,
          },
        })
        .then((response) => {
          if (response.data.RESULT_CODE === "200") {
            dataList = response.data.CUST_CD;
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          } else {
            setLoading(false);
            dataList = {};
          }
        });
    }
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
            onChange={handleOnChange}
            fullWidth
            placeholder="검색"
            InputProps={{
              endAdornment: (
                <InputAdornment onClick={() => getCode()} position="end">
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
                <div key={listData.CODE_CD}>
                  {/* {console.log("rendering")} */}
                  <List>
                    <ListItem button disablePadding>
                      <ListItemText
                        classes={{ primary: classes.text }}
                        primary={listData.CODE_CD + "　" + listData.CODE_NM}
                        onClick={() =>
                          handleListItemClick(
                            listData.CODE_NM,
                            listData.CODE_CD
                          )
                        }
                      />
                    </ListItem>
                  </List>
                  <Divider />
                </div>
              ))
            ) : (
              <div
                className={classes.box}
                style={{ display: "flex", justifyContent: "center" }}
              >
                {loading ? (
                  <CircularProgress size={70} />
                ) : (
                  <span> No Search Data </span>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default React.memo(CustomDialog);
