import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CustomDialogSearch from "../../components/CustomDialogSearch";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import CustomDialogOnlySelect from "../../components/CustomDialogOnlySelect";
import Drawer from "@material-ui/core/Drawer";
import SearchIcon from "@material-ui/icons/Search";
import format from "date-fns/format";
import koLocale from "date-fns/locale/ko";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import CustomToolbar from "../../components/CustomToolbar";

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

  td: {
    padding: "1vw",
  },

  grow: {
    flexGrow: 1,
  },

  title: {
    fontFamily: "NanumGothic",
    marginTop: "5px",
  },

  line: {
    marginBottom: "125px",
  },

  span: {
    lineHeight: "40px",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflowX: "clip",
  },

  table: {
    width: "100%",
    padding: "1vw",
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

  searchIcon: {
    position: "fixed",
    top: "15px",
    right: "15px",
    zIndex: 1252,
  },

  datePicker: {
    visibility: "hidden",
  },
}));

class koLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date) {
    return format(date, "yyyy년　　 MM월", { locale: this.locale });
  }
}

function Menu7_Search({ parentState }) {
  const classes = useStyles();
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (1 + today.getMonth())).slice(-2);
  let date = ("0" + today.getDate()).slice(-2);

  window.addEventListener("checkBackFlag", funCheckDialogFlag, {
    once: true,
  });

  function funCheckDialogFlag() {
    let count = 0;
    if (count === 0) {
      if (openDialogSearch) {
        setOpenDialogSearch(false);
        console.log("dialog");
        count = count + 1;
      }
      if (openDialogOnlySelect) {
        setOpenDialogOnlySelect(false);
        console.log("onlySelectDialog");
        count = count + 1;
      }
      if (openCalendar) {
        setOpenCalendar(false);
        console.log("calendar");
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
    date_f: year + "/" + month + "/" + date,
    date_t: year + "/" + month + "/" + date,
    work_cust_cd: "",
    work_cust_nm: "",
    cust_cd: "",
    cust_nm: "",
    ship_type_cd: "",
    ship_type_nm: "",
    dlv_cust_cd: "",
    dlv_cust_nm: "",
    maker_cd: window.sessionStorage.getItem("user_id"),
    maker_nm: window.sessionStorage.getItem("user_name"),
  });

  const {
    date_f,
    date_t,
    work_cust_nm,
    ship_type_nm,
    cust_nm,
    dlv_cust_nm,
    maker_nm,
  } = inputs;
  const [codeKind, setCodeKind] = React.useState("");
  const [codeListSearch, setCodeListSearch] = React.useState([]);
  const [codeListDataOnlySelect, setCodeListDataOnlySelect] = React.useState(
    []
  );
  const [openSearch, setOpenSearch] = React.useState(false);
  const [openDialogSearch, setOpenDialogSearch] = useState(false);
  const [openDialogOnlySelect, setOpenDialogOnlySelect] = useState(false);
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    setLoadItem(inputs);
  }, []);

  const handleClearIcon = (code_kind) => {
    if (code_kind === "date") {
      setInputs({
        ...inputs,
        date_f: year + "/" + month + "/" + "01",
        date_t: year + "/" + month + "/" + date,
      });
    } else if (code_kind === "work_cust_cd") {
      setInputs({
        ...inputs,
        work_cust_cd: "",
        work_cust_nm: "",
      });
    } else if (code_kind === "ship_type_nm") {
      setInputs({
        ...inputs,
        ship_type_cd: "",
        ship_type_nm: "",
      });
    } else if (code_kind === "cust_nm") {
      setInputs({
        ...inputs,
        cust_cd: "",
        cust_nm: "",
      });
    } else if (code_kind === "dlv_cust_nm") {
      setInputs({
        ...inputs,
        dlv_cust_cd: "",
        dlv_cust_nm: "",
      });
    } else if (code_kind === "maker_nm") {
      setInputs({
        ...inputs,
        maker_cd: "",
        maker_nm: "",
      });
    }
  };

  const handleClickOpenSearch = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "maker_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("emp_cd_list"))
      );
    } else if (code_kind === "cust_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("cust_cd_list"))
      );
    } else if (code_kind === "dlv_cust_cd") {
      setCodeListSearch(
        JSON.parse(window.sessionStorage.getItem("dlv_cust_cd_list"))
      );
    }
    setOpenDialogSearch(true);
  };

  const handleClickOpenOnlySelect = (code_kind) => {
    setCodeKind(code_kind);
    if (code_kind === "work_cust_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "ES014", CODE_NAME: "(주)에스에이" },
        { CODE_CD: "YJ004", CODE_NAME: "영진철강(주)" },
      ]);
    } else if (code_kind === "ship_type_cd") {
      setCodeListDataOnlySelect([
        { CODE_CD: "0", CODE_NAME: "전체" },
        { CODE_CD: "S", CODE_NAME: "매출" },
        { CODE_CD: "Q", CODE_NAME: "송품" },
        { CODE_CD: "M", CODE_NAME: "이동" },
      ]);
    }
    setOpenDialogOnlySelect(true);
  };

  const handleClickOpenCalendar = () => {
    window.sessionStorage.setItem("date_f", date_f);
    window.sessionStorage.setItem("date_t", date_t);
    setOpenCalendar(!openCalendar);
  };

  const handleCloseSearch = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "maker_cd") {
        setInputs({ ...inputs, maker_cd: codeCd, maker_nm: codeName });
      } else if (codeKind === "cust_cd") {
        setInputs({ ...inputs, cust_cd: codeCd, cust_nm: codeName });
      } else if (codeKind === "dlv_cust_cd") {
        setInputs({ ...inputs, dlv_cust_cd: codeCd, dlv_cust_nm: codeName });
      }

    setOpenDialogSearch(false);
  };

  const handleCloseOnlySelect = (codeName, codeCd) => {
    if (codeCd === undefined) {
      codeName = "";
      codeCd = "";
    }

    if (codeName !== "exit")
      if (codeKind === "ship_type_cd") {
        setInputs({ ...inputs, ship_type_cd: codeCd, ship_type_nm: codeName });
      } else if (codeKind === "work_cust_cd") {
        setInputs({ ...inputs, work_cust_cd: codeCd, work_cust_nm: codeName });
      }

    setOpenDialogOnlySelect(false);
  };

  const setLoadItem = (item, isSort) => {
    parentState(item, isSort); // 조회시 state 넘기는 역할
  };

  return (
    <div>
      <SearchIcon
        id="searchIcon"
        className={classes.searchIcon}
        onClick={() => setOpenSearch(!openSearch)}
      />
      <Drawer open={openSearch} anchor={"right"} variant="persistent">
        <div className={classes.grow}>
          <Container className={classes.root}>
            <table className={classes.table}>
              <colgroup>
                <col width="20%" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <td align="right">
                    <span className={classes.span}>출고일</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      fullWidth
                      name="date"
                      size="small"
                      placeholder="선택"
                      onClick={() => handleClickOpenCalendar("date")}
                      value={date_f + " - " + date_t}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {date_f.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("date")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>사업장</span>
                  </td>
                  <td className={classes.td} align="center">
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
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>출고유형</span>
                  </td>
                  <td className={classes.td} align="center">
                    <CssTextField
                      name="ship_type_cd"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenOnlySelect("ship_type_cd")}
                      className={classes.textField}
                      value={ship_type_nm}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {ship_type_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("ship_type_nm")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>수요가명</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="cust_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      className={classes.textField}
                      value={cust_nm}
                      variant="outlined"
                      onClick={() => handleClickOpenSearch("cust_cd")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {cust_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("cust_nm")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>착지</span>
                  </td>
                  <td className={classes.td}>
                    <CssTextField
                      name="dlv_cust_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      className={classes.textField}
                      value={dlv_cust_nm}
                      variant="outlined"
                      onClick={() => handleClickOpenSearch("dlv_cust_cd")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {dlv_cust_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("dlv_cust_nm")}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={classes.td} align="right">
                    <span className={classes.span}>담당자</span>
                  </td>
                  <td className={classes.td} align="center">
                    <CssTextField
                      name="maker_nm"
                      placeholder="선택"
                      fullWidth
                      size="small"
                      onChange={handleOnChange}
                      onClick={() => handleClickOpenSearch("maker_cd")}
                      className={classes.textField}
                      value={maker_nm}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    {maker_nm.length > 0 && (
                      <IconButton
                        className={classes.clearIcon}
                        onClick={() => handleClearIcon("maker_nm")}
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
                    date_f: year + "/" + month + "/" + "01",
                    date_t: year + "/" + month + "/" + date,
                    cust_cd: "",
                    cust_nm: "",
                    bad_cls: "",
                    bad_cls_nm: "",
                    maker_cd: "",
                    maker_nm: "",
                    work_cust_cd: "",
                    work_cust_nm: "",
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

          <MuiPickersUtilsProvider utils={koLocalizedUtils} locale={koLocale}>
            <DatePicker
              className={classes.datePicker}
              open={openCalendar}
              onClose={() => {
                setOpenCalendar(!openCalendar);
              }}
              views={["year", "month", "date"]}
              ToolbarComponent={(props) => CustomToolbar(props, date_f, date_t)}
              value={date_f}
              inputVariant="outlined"
              cancelLabel="닫기"
              showTodayButton
              onAccept={() => {
                setInputs({
                  ...inputs,
                  date_f: window.sessionStorage.getItem("date_f"),
                  date_t: window.sessionStorage.getItem("date_t"),
                });
              }}
              orientation="portrait"
              fullWidth
              todayLabel="오늘"
              okLabel="확인"
              size="small"
              onChange={() => console.log("test")}
            />
          </MuiPickersUtilsProvider>

          <CustomDialogSearch
            codeListData={codeListSearch}
            open={openDialogSearch}
            onClose={handleCloseSearch}
          />

          <CustomDialogOnlySelect
            data={codeListDataOnlySelect}
            open={openDialogOnlySelect}
            onClose={handleCloseOnlySelect}
          />
        </div>
      </Drawer>
    </div>
  );
}

Menu7_Search.propTypes = {
  history: PropTypes.object,
  programName: PropTypes.string,
  parentState: PropTypes.func,
  openSearchToggle: PropTypes.bool,
};

export default React.memo(Menu7_Search);
