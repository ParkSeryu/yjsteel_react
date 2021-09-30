import React, { PureComponent } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Menu2_Search from "./Menu2_Search";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Divider from "@material-ui/core/Divider";

const Accordion = withStyles({
  root: {
    borderLeft: "1px solid rgba(0, 0, 0, .4)",
    borderRight: "1px solid rgba(0, 0, 0, .4)",
    margin: 0,
    padding: 0,
    boxShadow: "none",

    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "white",
    borderTop: "1px solid rgba(0, 0, 0, .2)",
    marginBottom: -1,
    height: 56,
    "&$expanded": {
      minHeight: "100%",
    },
  },
  //  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles({
  root: {
    padding: "1vh 2vw",
  },
})(MuiAccordionDetails);

const useStyles = (theme) => ({
  root: {
    width: "98vw",
    marginLeft: "1vw",
    marginTop: "97px",
    marginBottom: "38px",
  },

  container: {
    marginTop: "5px",
    marginBottom: "5px",
  },

  containers: {
    backgroundColor: "#E4E4E4",
    borderTop: "3px solid #E4E4E4",
    borderBottom: "3px solid #E4E4E4",
  },

  innerAccordion: {
    width: "100%",
    margin: 0,
    padding: 0,
  },

  header: {
    position: "fixed",
    marginLeft: "-5px",
    width: "100%",
    height: "40px",
    backgroundColor: "rgba(099, 100, 102, 1)",
    fontFamily: "NanumGothic",
    color: "white",
    zIndex: 5,
    top: 55,
  },

  footer: {
    position: "fixed",
    width: "100%",
    height: "35px",
    backgroundColor: "#DADADA",
    color: "white",
    bottom: 0,
  },

  paperLeft: {
    padding: "5px 0",
    paddingLeft: "5px",
    margin: 0,
    textAlign: "left",
    fontSize: "15px",
    color: "rgba(059, 056, 056, 1)",
  },

  paperRight: {
    padding: "5px 0",
    paddingRight: "5px",
    textAlign: "right",
    margin: 0,
    fontSize: "15px",
    color: "rgba(059, 056, 056, 1)",
  },

  summaryHeader: {
    fontFamily: "NanumGothic-ExtraBold",
    fontSize: "15px",
    padding: "5px 0",
    margin: 0,
    whiteSpace: "nowrap",
    overflowX: "clip",
    fontWeight: "bold",
    textAlign: "left",
    backgroundColor: "transparent",
  },

  summarySubHeader_SIZE: {
    fontFamily: "NanumGothic-ExtraBold",
    fontSize: "15px",
    padding: "5px 0",
    margin: 0,
    textAlign: "left",
    backgroundColor: "transparent",
  },

  summarySubHeader_QUANTITY: {
    fontFamily: "NanumGothic-ExtraBold",
    fontSize: "15px",
    padding: "5px 0",
    margin: 0,
    textAlign: "center",
    backgroundColor: "transparent",
  },

  summarySubHeader_WEIGHT: {
    fontFamily: "NanumGothic-ExtraBold",
    fontSize: "15px",
    padding: "5px 0",
    margin: 0,
    textAlign: "right",
    backgroundColor: "transparent",
  },

  innerSummaryHeader: {
    fontSize: "12px",
    fontFamily: "NanumGothic-Bold",
    color: "rgba(059, 056, 056, 1)",
    whiteSpace: "nowrap",
    overflowX: "clip",
    flexGrow: 1,
    textAlign: "center",
    padding: "6px 0 ",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },

  innerSummaryHeader_WEIGHT: {
    fontSize: "12px",
    fontFamily: "NanumGothic-Bold",
    color: "rgba(059, 056, 056, 1)",
    whiteSpace: "nowrap",
    overflowX: "clip",
    flexGrow: 1,
    textAlign: "right",
    padding: "6px 0 ",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },

  innerSummaryContents: {
    fontSize: "13px",
    fontFamily: "NanumGothic-Bold",
    color: "rgba(059, 056, 056, 1)",
    flexGrow: 1,
    textAlign: "center",
    whiteSpace: "nowrap",
    overflowX: "clip",
    padding: "10px 0 ",
    backgroundColor: "transparent",
  },

  circular_progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  typo_header: {
    padding: "5px 0",
    margin: 0,
    paddingRight: "40px",
    color: "#FFFFFF",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoLeft_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
    paddingRight: "20px",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoRight_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typo_footer: {
    padding: "5px 0",
    paddingRight: "20px",
    margin: 0,
    color: "#000000",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoLeft_footer: {
    color: "#000000",
    padding: "5px 0",
    margin: 0,
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoRight_footer: {
    color: "#000000",
    padding: "5px 0",
    margin: 0,
    paddingRight: "30px",
    textAlign: "center",
    backgroundColor: "transparent",
  },
});

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const nullCheck = (text) => {
  if (text === null) return "-";
  else return text;
};

const nullCheckZero = (text) => {
  if (text === null) return "0";
  else return text;
};

const renderList = (index, data, length, classes) => {
  let i = index;
  let result = [];
  for (i; i < length && data.DATA[i].SORT_VAL !== "1"; i++) {
    result.push(
      <>
        <Grid item xs={2}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {data.DATA[i].CODE_NM}
            <br />
            {data.DATA[i].WORK_CUST_NM}
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {nullCheck(data.DATA[i].OIL_NM)}
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {nullCheck(data.DATA[i].AFTER_PROC_NM)}
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {nullCheck(data.DATA[i].YP)}
            <br />
            {nullCheckZero(data.DATA[i].C)}
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {nullCheck(data.DATA[i].TS)}
            <br />
            {nullCheckZero(data.DATA[i].SI)}
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {nullCheck(data.DATA[i].EL)}
            <br />
            {nullCheckZero(data.DATA[i].MN)}
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {data.DATA[i].SUMMARY_QUANTITY_VAL}
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.innerSummaryContents} elevation={0}>
            {data.DATA[i].STOCK_WEIGHT}
            <br />
            {data.DATA[i].BUY_UNIT_PRICE}
          </Paper>
        </Grid>
        <Divider className={classes.divider} />
      </>
    );
  }
  return result;
};

class Menu2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      itemList: [],
      expandList: [],
      openSearchToggle: false,
      mainAccordionExpand: [],
    };
    window.sessionStorage.setItem("scrollSaveFlag", 2);
  }

  handleExpandMainAccordion = (panel) => (event, newExpanded) => {
    if (newExpanded) {
      this.state.mainAccordionExpand =
        this.state.mainAccordionExpand.concat(panel);
    } else {
      this.state.mainAccordionExpand = this.state.mainAccordionExpand.filter(
        (element) => element !== panel
      );
    }
  };

  componentDidMount() {
    const { history, location } = this.props;
    console.log(history);
    console.log(location);
    console.log(location.state);
    if (location.state) {
      this.setState({
        itemList: location.state,
      });
    } else {
      this.setState({
        openSearchToggle: true,
      });
    }
  }

  componentDidUpdate() {
    // if (window.sessionStorage.getItem("scrollSaveFlag") !== null) {
    //   window.scrollTo(0, window.sessionStorage.getItem("Menu1_scroll"));
    //   window.sessionStorage.removeItem("scrollSaveFlag");
    // }
  }

  componentWillUnmount() {
    const { history } = this.props;
    //history.replace("test", this.state.mainAccordionExpand);
    // if (window.sessionStorage.getItem("pr0301r_itemList") !== null) {
    //   window.sessionStorage.setItem("pr0301r_scroll", window.pageYOffset);
    //   window.sessionStorage.setItem(
    //     "pr0301r_mainAccordionExpand",
    //     JSON.stringify(this.state.mainAccordionExpand)
    //   );
    //   window.sessionStorage.setItem(
    //     "pr0301r_subAccordionExpand",
    //     JSON.stringify(this.state.subAccordionExpand)
    //   );
    // } else {
    //   window.sessionStorage.removeItem("pr0301r_scroll");
    //   window.sessionStorage.removeItem("pr0301r_mainAccordionExpand");
    //   window.sessionStorage.removeItem("pr0301r_subAccordionExpand");
    // }
  }

  loadItem = async (data) => {
    const { history } = this.props;
    this.setState({
      loading: true,
    });

    axios
      .get("http://192.168.0.137/m_api/index.php/Menu1/retrieve", {
        params: {
          im_cls: data.im_cls,
          name_cd: data.name_cd,
          name_nm: data.name_nm,
          stan_cd: data.stan_cd,
          stan_nm: data.stan_nm,
          work_cust_cd: data.work_cust_cd,
          work_cust_nm: data.work_cust_nm,
          thick_f: data.thick_f,
          thick_t: data.thick_t,
          width_f: data.width_f,
          width_t: data.width_t,
          sell_cust_cd: data.sell_cust_cd,
          sell_cust_nm: data.sell_cust_nm,
          stock_cls: data.stock_cls,
        },
      })
      .then((response) => {
        //console.log("response data receiving");
        if (response.data.RESULT_CODE === "200") {
          // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
          this.setState(
            {
              loading: false, // load되었으니 false,
              itemList: response.data, // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. (Item : json파일에 있는 항목)
              openSearchToggle: false,
            },
            () => history.replace(undefined, this.state.itemList)
          );
        } else {
          alert(
            "조회된 내역이 없습니다.",
            this.setState({
              loading: false,
              itemList: "",
              openSearchToggle: true,
            })
          );
        }
      })
      .catch((e) => {
        console.error(e); // 에러표시
        this.setState({
          loading: false, // 이때는 load 가 false 유지
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.loading === true ? (
          <div>
            <Menu2_Search programName={"출고요청현황"} />
            <div className={classes.circular_progress}>
              <CircularProgress disableShrink color="secondary" size={60} />
            </div>
          </div>
        ) : (
          <div className={classes.root}>
            <Menu2_Search
              programName={"출고요청현황"}
              parentState={this.loadItem}
              openSearchToggle={this.state.openSearchToggle}
            />
            <div>
              <div className={classes.header}>
                <Grid className={classes.container} container>
                  <Grid item xs={4} sm={4}>
                    <Paper elevation={0} className={classes.typo_header}>
                      {"품명"}
                    </Paper>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Paper elevation={0} className={classes.typo_header}>
                      {"사이즈"}
                    </Paper>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Paper elevation={0} className={classes.typoLeft_header}>
                      {"수량"}
                    </Paper>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Paper elevation={0} className={classes.typoRight_header}>
                      {"중량"}
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            </div>

            {this.state.itemList.length !== 0 &&
              this.state.itemList.DATA.map((item, index) => {
                if (item.SORT_VAL === "1") {
                  return (
                    <div>
                      <Accordion
                        defaultExpanded={this.state.mainAccordionExpand.includes(
                          index
                        )}
                        onChange={this.handleExpandMainAccordion(index)}
                        TransitionProps={{ unmountOnExit: true }}
                        square
                        key={index}
                      >
                        <AccordionSummary>
                          <Grid className={classes.container} container>
                            <Grid item xs={3} sm={3}>
                              <Paper
                                elevation={0}
                                className={classes.summaryHeader}
                              >
                                {item.NAME_NM}
                              </Paper>
                            </Grid>
                            <Grid item xs={5} sm={5}>
                              <Paper
                                elevation={0}
                                className={classes.summarySubHeader_SIZE}
                              >
                                {item.SIZE_VAL}
                              </Paper>
                            </Grid>
                            <Grid item xs={2} sm={2}>
                              <Paper
                                elevation={0}
                                className={classes.summarySubHeader_QUANTITY}
                              >
                                {item.STOCK_QUANTITY}
                              </Paper>
                            </Grid>
                            <Grid item xs={2} sm={2}>
                              <Paper
                                elevation={0}
                                className={classes.summarySubHeader_WEIGHT}
                              >
                                {item.STOCK_WEIGHT}
                              </Paper>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails className={classes.innerAccordion}>
                          <Grid className={classes.containers} container>
                            <Grid item xs={2}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                재질
                                <br />
                                <span styled={{ marginTop: "10px" }}>
                                  사업장
                                </span>
                              </Paper>
                            </Grid>
                            <Grid item xs={1}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                도유
                              </Paper>
                            </Grid>
                            <Grid item xs={2}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                후처리
                              </Paper>
                            </Grid>
                            <Grid item xs={1}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                YP
                                <br />C
                              </Paper>
                            </Grid>
                            <Grid item xs={1}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                TS
                                <br />
                                Si
                              </Paper>
                            </Grid>
                            <Grid item xs={1}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                EL
                                <br />
                                Mn
                              </Paper>
                            </Grid>
                            <Grid item xs={2}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                수량
                              </Paper>
                            </Grid>
                            <Grid item xs={2}>
                              <Paper
                                className={classes.innerSummaryHeader}
                                elevation={0}
                              >
                                중량
                                <br />
                                매입단가
                              </Paper>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                        <AccordionDetails className={classes.innerAccordion}>
                          <Grid className={classes.container} container>
                            {renderList(
                              index + 1,
                              this.state.itemList,
                              this.state.itemList.DATA.length,
                              classes
                            )}
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  );
                }
              })}
            {this.state.itemList.TOTAL_WEIGHT !== undefined && (
              <div className={classes.footer}>
                <Grid className={classes.container} container>
                  <Grid item xs={6} sm={6}>
                    <Paper elevation={0} className={classes.typo_footer}>
                      {"합계"}
                    </Paper>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Paper elevation={0} className={classes.typoLeft_footer}>
                      {numberWithCommas(
                        String(this.state.itemList.TOTAL_QUANTITY)
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Paper elevation={0} className={classes.typoRight_footer}>
                      {numberWithCommas(
                        String(this.state.itemList.TOTAL_WEIGHT)
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Menu2);
