import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CustomDialogSearch from "../../components/CustomDialogSearch";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Drawer from "@material-ui/core/Drawer";
import CloseIcon from "@material-ui/icons/Close";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CustomAlertDialog from "../../components/CusomAlertDialog";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SortIcon from "@material-ui/icons/Sort";
import CustomDialogOnlySelect from "../../components/CustomDialogOnlySelect";
import CustomDialogMultiSelect from "../../components/CustomDialogMultiSelect";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#ABADB3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { color: "#ABADB3" },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 176, 246, 1)",
      },
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw", // Fix IE 11 issue.
    marginTop: theme.spacing(8),
  },

  numberTextField: {
    width: "25vw",
  },

  spanVerticalAlign: {
    margin: "0 3px",
    lineHeight: "35px",
  },

  grow: {
    flexGrow: 1,
  },

  AppBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#2F313E",
    color: "#FFFFFF",
    height: "55px",
  },

  menuButton: {
    marginTop: "5px",
  },

  title: {
    fontFamily: "NanumGothic",
    marginTop: "5px",
  },

  exitButton: {
    color: "#FFFFFF",
    marginLeft: theme.spacing(3),
  },

  sortIcon: {
    marginRight: theme.spacing(0.5),
    color: "#FFFFFF",
  },

  menuInform: {
    position: "fixed",
    zIndex: 2,
    backgroundColor: "#2F313E",
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

  span: { lineHeight: "40px", fontSize: "16px" },

  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 5px",
    marginLeft: "-6px",
  },

  clearIcon: {
    position: "relative",
    float: "right",
    top: "-43px",
    left: "-1px",
    marginBottom: "-50px",
    zIndex: 2,
  },

  button: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginLeft: "2vw",
  },

  clearButton: {
    borderRadius: "5em",
    marginRight: "2vw",
    width: "30%",
    fontFamily: "NanumGothic",
    fontSize: "16px",
    backgroundColor: "#6E7277",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#6E7277",
    },
  },

  retrieveButton: {
    borderRadius: "5em",
    fontFamily: "NanumGothic",
    width: "30%",
    fontSize: "16px",
    backgroundColor: "#67B7D9",
    color: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#67B7D9",
    },
  },

  formControl: {
    width: "100%",
  },
}));

function Menu1_Search({ history, programName, parentState, openSearchToggle }) {
  const classes = useStyles();

  console.log(history);

  window.addEventListener("checkBackFlag", funCheckDialogFlag, {
    once: true,
  });

  function funCheckDialogFlag() {
    let count = 0;
    if (count === 0) {
      if (toggle) {
        setToggle(false);
        console.log("toggle");
        count = count + 1;
      }
      if (Boolean(anchorEl)) {
        setAnchorEl(null);
        console.log("menu");
        count = count + 1;
      }
      if (openDialog) {
        setOpenDialog(false);
        console.log("dialog");
        count = count + 1;
      }
      if (openAlertDialog) {
        setOpenAlertDialog(false);
        console.log("alertDialog");
        count = count + 1;
      }
      if (openDialogOnlySelect) {
        setOpenDialogOnlySelect(false);
        console.log("onlySelectDialog");
        count = count + 1;
      }
      if (openDialogMultiSelect) {
        setOpenDialogMultiSelect(false);
        console.log("multiSelectDialog");
        count = count + 1;
      }
    }
    window.sessionStorage.setItem("closeFlag", count);
  }

  window.addEventListener("closeOpenSearch", funCheckSearchFlag, {
    once: true,
  });

  function funCheckSearchFlag() {
    let count = 0;
    if (openSearch) {
      setOpenSearch(!openSearch);
      count = 2;
    }
    window.sessionStorage.setItem("closeFlag", count);
  }

  const [inputs, setInputs] = useState({
    sort: "default_asc",
    im_cls: "",
    im_cls_nm: "",
    name_cd: [],
    name_nm: [],
    stan_cd: "",
    stan_nm: "",
    cust_cd: "",
    cust_nm: "",
    thick_f: "",
    thick_t: "",
    width_f: "",
    width_t: "",
    work_cust_cd: "",
    work_cust_nm: "",
    stock_cust_cls: "",
    stock_cust_cls_nm: "",
    search_type_cls: "",
    search_type_cls_nm: "",
  });

  const {
    im_cls_nm,
    sort,
    name_nm,
    stan_nm,
    cust_nm,
    thick_f,
    thick_t,
    width_f,
    width_t,
    work_cust_nm,
    stock_cust_cls_nm,
    search_type_cls_nm,
  } = inputs;
  const list = JSON.parse(window.sessionStorage.getItem("program_list"));

  const [codeKind, setCodeKind] = React.useState("");
  const [codeListDataOnlySelect, setCodeListDataOnlySelect] = React.useState(
    []
  );
  const [codeListDataMultiSelect, setCodeListMultiSelect] = React.useState([]);
  const [toggle, setToggle] = useState(false);
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogOnlySelect, setOpenDialogOnlySelect] = useState(false);
  const [openDialogMultiSelect, setOpenDialogMultiSelect] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const criteria_sort = [
    "매입일 (오래된순)",
    "매입일 (최신순)",
    "매입처명 (오름차순)",
    "매입처명 (내림차순)",
  ];

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleClickSortIcon = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSortIcon = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (e) => {
    inputs.sort = e.target.value;
    if (window.sessionStorage.getItem("pr0301r_itemList") != null)
      setLoadItem(inputs, true);
  };

  const handleClearIcon = (code_kind) => {
    if (code_kind === "im_cls") {
      setInputs({
        ...inputs,
        im_cls: "",
        im_cls_nm: "",
      });
    } else if (code_kind === "name_nm") {
      setInputs({
        ...inputs,
        name_cd: "",
        name_nm: "",
      });
    } else if (code_kind === "stan_nm") {
      setInputs({
        ...inputs,
        stan_cd: "",
        stan_nm: "",
      });
    } else if (code_kind === "work_cust_cd") {
      setInputs({
        ...inputs,
        work_cust_cd: "",
        work_cust_nm: "",
      });
    } else if (code_kind === "stock_cust_cls") {
      setInputs({
        ...inputs,
        stock_cust_cls: "",
        stock_cust_cls_nm: "",
      });
    } else if (code_kind === "search_type_cls") {
      setInputs({
        ...inputs,
        search_type_cls: "",
        search_type_cls_nm: "",
      });
    }
  };

  const handleClickOpen = (code_kind) => {
    if (code_kind === "stan_cd") {
     setCodeKind(code_kind)
    } else if (code_kind === "cust_cd") {
     setCodeKind(code_kind)
    }
    setOpenDialog(true);
  };

  const handleClickOpenOnlySelect = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "im_cls") {
      setCodeListDataOnlySelect([
        { CODE_CD: 0, CODE_NAME: "전체" },
        { CODE_CD: 1, CODE_NAME: "자사" },
        { CODE_CD: 2, CODE_NAME: "임가공" },
        { CODE_CD: 3, CODE_NAME: "보관(자사)" },
        { CODE_CD: 4, CODE_NAME: "보관(임가공)" },
        { CODE_CD: 6, CODE_NAME: "보관(가공)" },
      ]);
    } else if (code_kind === "work_cust_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: 0, CODE_NAME: "전체" },
        { CODE_CD: 1, CODE_NAME: "(주)에스에이" },
        { CODE_CD: 2, CODE_NAME: "영진철강(주)" },
      ]);
    } else if (code_kind === "stock_cust_cls") {
      setCodeListDataOnlySelect([
        { CODE_CD: 0, CODE_NAME: "가용재고" },
        { CODE_CD: 1, CODE_NAME: "전체재고" },
      ]);
    } else if (code_kind === "search_type_cls") {
      setCodeListDataOnlySelect([
        { CODE_CD: 0, CODE_NAME: "전체" },
        { CODE_CD: 1, CODE_NAME: "Blanking" },
      ]);
    }
    setOpenDialogOnlySelect(true);
  };

  const handleClickOpenMultiSelect = (code_kind) => {
    if (code_kind === "name_cd") {
      setCodeListMultiSelect(
        JSON.parse(window.sessionStorage.getItem("name_cd_list"))
      );
    }
    setOpenDialogMultiSelect(true);
  };

  const handleClose = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "stan_cd") {
        setInputs({ ...inputs, stan_cd: codeCd, stan_nm: codeName });
      }
      else if (codeKind === "cust_cd") {
        setInputs({ ...inputs, cust_cd: codeCd, cust_nm: codeName });
      }

    setOpenDialog(false);
  };

  const handleCloseOnlySelect = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "im_cls") {
        setInputs({ ...inputs, im_cls: codeCd, im_cls_nm: codeName });
      } else if (codeKind === "work_cust_cd") {
        setInputs({ ...inputs, work_cust_cd: codeCd, work_cust_nm: codeName });
      } else if (codeKind === "stock_cust_cls") {
        setInputs({
          ...inputs,
          stock_cust_cls: codeCd,
          stock_cust_cls_nm: codeName,
        });
      } else if (codeKind === "search_type_cls") {
        setInputs({
          ...inputs,
          search_type_cls: codeCd,
          search_type_cls_nm: codeName,
        });
      }

    setOpenDialogOnlySelect(false);
  };

  const handleCloseMultiSelect = (item) => {
    let codeCd = [];
    let codeNm = [];

    if (item.length > 0) {
      for (let i = 0; i < item.length; i++) {
        codeCd.push(item[i].split("/")[0]);
        codeNm.push(item[i].split("/")[1]);
      }

      setInputs({ ...inputs, name_cd: codeCd, name_nm: codeNm });
    }
    setOpenDialogMultiSelect(false);
  };

  const handleClickAgree = () => {
    setOpenAlertDialog(false);
    closeProgram();
  };

  const handleClickDisagree = () => {
    setOpenAlertDialog(false);
  };

  const closeProgram = () => {
    window.sessionStorage.removeItem("pr0301r_mainAccordionExpand");
    window.sessionStorage.removeItem("pr0301r_subAccordionExpand");
    window.sessionStorage.removeItem("pr0301r_search");
    window.sessionStorage.removeItem("pr0301r_itemList");
    window.sessionStorage.setItem("closeFlag", 0);
    history.goBack();
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("pr0301r_search") === null) {
      setInputs({
        ...inputs,
      });
    } else {
      setInputs(JSON.parse(window.sessionStorage.getItem("pr0301r_search")));
    }
    if (openSearchToggle) {
      setOpenSearch(true);
    }
  }, [openSearchToggle]);

  const setLoadItem = (item, isSort) => {
    window.sessionStorage.setItem("pr0301r_search", JSON.stringify(inputs));
    parentState(item, isSort); // 조회시 state 넘기는 역할
  };

  const logOut = () => {
    if (window.sessionStorage.getItem("userAgent") === "android") {
      let token = window.BRIDGE.connectAndroid();
      let form = new FormData();
      form.append("login_id", window.sessionStorage.getItem("user_id"));
      form.append("token", token);
      axios
        .post("http://192.168.35.147/m_api/index.php/login/logout", form)
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
    <div className={classes.grow}>
      <AppBar className={classes.AppBar}>
        <Toolbar variant="dense">
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

          <div className={classes.grow} />

          <IconButton
            className={classes.sortIcon}
            onClick={handleClickSortIcon}
          >
            <SortIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseSortIcon}
          >
            <FormControl component="fieldset">
              <RadioGroup name="sort" value={sort} onChange={handleSortChange}>
                <>
                  <MenuItem onClick={handleCloseSortIcon}>
                    <FormControlLabel
                      value="default_asc"
                      name="sort"
                      control={<Radio />}
                      label={criteria_sort[0]}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleCloseSortIcon}>
                    <FormControlLabel
                      value="default_desc"
                      name="sort"
                      control={<Radio />}
                      label={criteria_sort[1]}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleCloseSortIcon}>
                    <FormControlLabel
                      value="amount_asc"
                      name="sort"
                      control={<Radio />}
                      label={"매입금액 (낮은순)"}
                    />
                  </MenuItem>
                  <MenuItem onClick={handleCloseSortIcon}>
                    <FormControlLabel
                      value="amount_desc"
                      name="sort"
                      control={<Radio />}
                      label={"매입금액 (높은순)"}
                    />
                  </MenuItem>
                </>
              </RadioGroup>
            </FormControl>
          </Menu>
          <SearchIcon onClick={() => setOpenSearch(!openSearch)} />
          <ClearIcon
            className={classes.exitButton}
            onClick={() => setOpenAlertDialog(true)}
          />
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={toggle}
        onClose={() => setToggle(false)}
        onOpen={() => setToggle(true)}
      >
        <ListItem className={classes.menuInform}>
          <ListItemText
            primary={
              <Typography type="body2" className={classes.primaryText}>
                logo
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
                button
                className={classes.menuItem}
                onClick={() => {
                  setToggle(!toggle);
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

      <Drawer open={openSearch} anchor={"right"} variant="persistent">
        <Container className={classes.root}>
          <table className={classes.table}>
            <colgroup>
              <col width="20%" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>소유</span>
                </td>
                <td>
                  <CssTextField
                    fullWidth
                    name="im_cls"
                    size="small"
                    placeholder="선택"
                    variant="outlined"
                    onChange={handleOnChange}
                    onClick={() => handleClickOpenOnlySelect("im_cls")}
                    value={im_cls_nm}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {im_cls_nm.length > 0 && (
                    <IconButton
                      className={classes.clearIcon}
                      onClick={() => handleClearIcon("im_cls")}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>품명</span>
                </td>
                <td>
                  <CssTextField
                    fullWidth
                    name="name_cd"
                    size="small"
                    placeholder="선택"
                    onChange={handleOnChange}
                    onClick={() => handleClickOpenMultiSelect("name_cd")}
                    value={name_nm}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {name_nm.length > 0 && (
                    <IconButton
                      className={classes.clearIcon}
                      onClick={() => handleClearIcon("name_nm")}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>재질</span>
                </td>
                <td>
                  <CssTextField
                    placeholder="입력 or 찾기"
                    name="stan_nm"
                    fullWidth
                    size="small"
                    onChange={handleOnChange}
                    value={stan_nm}
                    variant="outlined"
                   
                  />
                  {
                    <IconButton
                      className={classes.clearIcon}
                      onClick={() => handleClickOpen("stan_cd")}
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  }
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>수요가명</span>
                </td>
                <td>
                  <CssTextField
                    name="cust_nm"
                    placeholder="입력 or 찾기"
                    fullWidth
                    size="small"
                    onChange={handleOnChange}
                   className={classes.textField}
                    value={cust_nm}
                    variant="outlined"
                    
                  />
                  {
                    <IconButton
                      className={classes.clearIcon}
                      onClick={() => handleClickOpen("cust_cd")}
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                  }
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>두께</span>
                </td>
                <td>
                  <CssTextField
                    placeholder="0.0"
                    name="thick_f"
                    onChange={handleOnChange}
                    size="small"
                    className={classes.numberTextField}
                    variant="outlined"
                    value={thick_f}
                    inputProps={{
                      inputMode: "numeric",
                      style: { textAlign: "center" },
                    }}
                  />
                  <object className={classes.spanVerticalAlign}>~</object>
                  <CssTextField
                    placeholder="0.0"
                    name="thick_t"
                    onChange={handleOnChange}
                    size="small"
                    className={classes.numberTextField}
                    variant="outlined"
                    value={thick_t}
                    inputProps={{
                      inputMode: "numeric",
                      style: { textAlign: "center" },
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>폭</span>
                </td>
                <td>
                  <CssTextField
                    placeholder="0.0"
                    name="width_f"
                    onChange={handleOnChange}
                    size="small"
                    className={classes.numberTextField}
                    variant="outlined"
                    value={width_f}
                    inputProps={{
                      inputMode: "numeric",
                      style: { textAlign: "center" },
                    }}
                  />
                  <object className={classes.spanVerticalAlign}>~</object>
                  <CssTextField
                    placeholder="0.0"
                    name="width_t"
                    onChange={handleOnChange}
                    size="small"
                    className={classes.numberTextField}
                    variant="outlined"
                    value={width_t}
                    inputProps={{
                      inputMode: "numeric",
                      style: { textAlign: "center" },
                    }}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>사업장</span>
                </td>
                <td align="center">
                  <CssTextField
                    name="work_cust_nm"
                    placeholder="선택"
                    fullWidth
                    size="small"
                    onChange={handleOnChange}
                    onClick={() => handleClickOpenOnlySelect("work_cust_cd")}
                    className={classes.textField}
                    value={work_cust_nm}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {work_cust_nm.length > 0 && (
                    <IconButton
                      className={classes.clearIcon}
                      onClick={() => handleClearIcon("work_cust_cd")}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>재고구분</span>
                </td>
                <td align="center">
                  <CssTextField
                    name="stock_cust_cls_nm"
                    placeholder="선택"
                    fullWidth
                    size="small"
                    onChange={handleOnChange}
                    onClick={() => handleClickOpenOnlySelect("stock_cust_cls")}
                    className={classes.textField}
                    value={stock_cust_cls_nm}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {stock_cust_cls_nm.length > 0 && (
                    <IconButton
                      className={classes.clearIcon}
                      onClick={() => handleClearIcon("stock_cust_cls")}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td align="right">
                  <span className={classes.span}>유형</span>
                </td>
                <td align="center">
                  <CssTextField
                    name="search_type_cls_nm"
                    placeholder="선택"
                    fullWidth
                    size="small"
                    onChange={handleOnChange}
                    onClick={() => handleClickOpenOnlySelect("search_type_cls")}
                    className={classes.textField}
                    value={search_type_cls_nm}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {search_type_cls_nm.length > 0 && (
                    <IconButton
                      className={classes.clearIcon}
                      onClick={() => handleClearIcon("search_type_cls")}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className={classes.button}>
            <Button
              className={classes.clearButton}
              variant="contained"
              onClick={() => {
                setInputs({
                  im_cls: "",
                  im_cls_nm: "",
                  name_cd: [],
                  name_nm: [],
                  stan_cd: "",
                  stan_nm: "",
                  cust_cd: "",
                  cust_nm: "",
                  thick_f: "",
                  thick_t: "",
                  width_f: "",
                  width_t: "",
                  work_cust_cd: "",
                  work_cust_nm: "",
                  stock_cust_cls: "",
                  stock_cust_cls_nm: "",
                  search_type_cls: "",
                  search_type_cls_nm: "",
                });
              }}
            >
              초기화
            </Button>

            <Button
              className={classes.retrieveButton}
              variant="contained"
              onClick={() => {
                setOpenSearch(!openSearch);
                setLoadItem(inputs);
              }}
            >
              조회
            </Button>
          </div>
        </Container>
        <CustomDialogSearch codeKind={codeKind} open={openDialog} onClose={handleClose} />

        <CustomDialogOnlySelect
          data={codeListDataOnlySelect}
          open={openDialogOnlySelect}
          onClose={handleCloseOnlySelect}
        />

        <CustomDialogMultiSelect
          codeListData={codeListDataMultiSelect}
          open={openDialogMultiSelect}
          onClose={handleCloseMultiSelect}
        />

        <CustomAlertDialog
          open={openAlertDialog}
          handleClickAgree={() => handleClickAgree()}
          handleClickDisagree={() => handleClickDisagree()}
          title={"프로그램 종료"}
          content={"소재재고현황 종료하시겠습니까?"}
        />
      </Drawer>
    </div>
  );
}

Menu1_Search.propTypes = {
  history: PropTypes.object,
  programName: PropTypes.string,
  parentState: PropTypes.func,
  openSearchToggle: PropTypes.bool,
};

export default React.memo(withRouter(Menu1_Search));
