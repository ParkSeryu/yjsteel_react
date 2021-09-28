import React, { PureComponent } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import SearchBar from "./Menu1_Search";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .4)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
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
    backgroundColor: "rgba(214, 223, 236, 1)",
    borderBottom: "1px solid rgba(0, 0, 0, .4)",
    marginBottom: -1,
    height: 56,
    "&$expanded": {
      minHeight: "100%",
    },
  },
  expandIcon: {
    padding: "0vh 1vw",
  },
  expanded: {},
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

  header: {
    position: "fixed",
    marginLeft: "-4px",
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
    color: "black",
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
    fontSize: "17px",
    padding: "5px 0",
    margin: 0,
    textAlign: "left",
    backgroundColor: "transparent",
  },

  summarySubHeader_QUANTITY: {
    fontFamily: "NanumGothic-ExtraBold",
    fontSize: "17px",
    padding: "5px 0",
    margin: 0,
    textAlign: "right",
    backgroundColor: "transparent",
  },

  summarySubHeader_AMOUNT: {
    fontFamily: "NanumGothic-ExtraBold",
    fontSize: "17px",
    padding: "5px 0",
    margin: 0,
    textAlign: "right",
    backgroundColor: "transparent",
  },

  innerAccordion: {
    width: "100vw",
  },

  innerAccordionSummary: {
    backgroundColor: "rgba(242, 242, 242, 1)",
    minHeight: 48,
    height: 48,
  },

  innerSummaryHeader: {
    fontSize: "16px",
    color: "rgba(059, 056, 056, 1)",
    padding: "5px 0",
    margin: 0,
    textAlign: "left",
    backgroundColor: "transparent",
  },

  innerSlash: {
    color: "rgba(039, 032, 049, 1)",
    fontSize: "16px",
    padding: "0px 5px",
  },

  innerSummarySubHeader_QUANTITY: {
    fontSize: "16px",
    color: "rgba(059, 056, 056, 1)",
    padding: "5px 0",
    margin: 0,
    textAlign: "right",
    backgroundColor: "transparent",
  },

  innerSummarySubHeader_AMOUNT: {
    fontSize: "16px",
    color: "rgba(059, 056, 056, 1)",
    padding: "5px 0",
    margin: 0,
    textAlign: "right",
    backgroundColor: "transparent",
  },

  itemView: {
    width: "100%",
    flexGrow: 1,
  },

  divider: {
    margin: "0 10px",
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

  typo_footer: {
    padding: "5px 0",
    paddingRight: "20px",
    margin: 0,
    color: "#000000",
    textAlign: "center",
    backgroundColor: "transparent",
  },

  typoLeft_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
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

  typoRight_header: {
    color: "#FFFFFF",
    padding: "5px 0",
    margin: 0,
    paddingRight: "0px",
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
  if (text === null) return " ";
  else return text;
};

class Menu1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      criteria: "",
      loading: false,
      itemList: [],
      openSearchToggle:
        window.sessionStorage.getItem("pr0301r_itemList") === null
          ? true
          : false,
      mainAccordionExpand: [],
      subAccordionExpand: [],
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

  handleExpandSubAccordion = (panel) => (event, newExpanded) => {
    if (newExpanded) {
      this.state.subAccordionExpand =
        this.state.subAccordionExpand.concat(panel);
    } else {
      this.state.subAccordionExpand = this.state.subAccordionExpand.filter(
        (element) => element !== panel
      );
    }
  };

  componentDidMount() {
    if (window.sessionStorage.getItem("pr0301r_itemList") !== null) {
      if (
        window.sessionStorage.getItem("pr0301r_mainAccordionExpand") !== null
      ) {
        this.setState({
          mainAccordionExpand: JSON.parse(
            window.sessionStorage.getItem("pr0301r_mainAccordionExpand")
          ),
          subAccordionExpand: JSON.parse(
            window.sessionStorage.getItem("pr0301r_subAccordionExpand")
          ),
        });
      }
      setTimeout(() => {
        this.setState({
          criteria: JSON.parse(window.sessionStorage.getItem("pr0301r_search"))
            .criteria,
          itemList: JSON.parse(
            window.sessionStorage.getItem("pr0301r_itemList")
          ),
        });
      }, 1000);
    }
  }

  componentDidUpdate() {
    if (window.sessionStorage.getItem("scrollSaveFlag") !== null) {
      window.scrollTo(0, window.sessionStorage.getItem("pr0301r_scroll"));
      window.sessionStorage.removeItem("scrollSaveFlag");
    }
  }

  componentWillUnmount() {
    if (window.sessionStorage.getItem("pr0301r_itemList") !== null) {
      window.sessionStorage.setItem("pr0301r_scroll", window.pageYOffset);
      window.sessionStorage.setItem(
        "pr0301r_mainAccordionExpand",
        JSON.stringify(this.state.mainAccordionExpand)
      );
      window.sessionStorage.setItem(
        "pr0301r_subAccordionExpand",
        JSON.stringify(this.state.subAccordionExpand)
      );
    } else {
      window.sessionStorage.removeItem("pr0301r_scroll");
      window.sessionStorage.removeItem("pr0301r_mainAccordionExpand");
      window.sessionStorage.removeItem("pr0301r_subAccordionExpand");
    }
  }

  loadItem = async (data, isSort) => {
    if (isSort) {
      let itemList = JSON.parse(
        window.sessionStorage.getItem("pr0301r_itemList")
      );
      if (data.criteria === "date") {
        if (data.sort === "default_asc") {
          itemList.DATA.sort(function (a, b) {
            return a.BUY_DATE < b.BUY_DATE
              ? -1
              : a.BUY_DATE > b.BUY_DATE
              ? 1
              : 0;
          });
        } else if (data.sort === "default_desc") {
          itemList.DATA.sort(function (a, b) {
            return a.BUY_DATE > b.BUY_DATE
              ? -1
              : a.BUY_DATE < b.BUY_DATE
              ? 1
              : 0;
          });
        }
      } else if (data.criteria === "cust") {
        if (data.sort === "default_asc") {
          itemList.DATA.sort(function (a, b) {
            return a.BUY_CUST_NAME < b.BUY_CUST_NAME
              ? -1
              : a.BUY_CUST_NAME > b.BUY_CUST_NAME
              ? 1
              : 0;
          });
        } else if (data.sort === "default_desc") {
          itemList.DATA.sort(function (a, b) {
            return a.BUY_CUST_NAME > b.BUY_CUST_NAME
              ? -1
              : a.BUY_CUST_NAME < b.BUY_CUST_NAME
              ? 1
              : 0;
          });
        }
      }
      if (data.sort === "amount_asc") {
        itemList.DATA.sort(function (a, b) {
          return parseInt(a.TOT_AMOUNT) < parseInt(b.TOT_AMOUNT)
            ? -1
            : parseInt(a.TOT_AMOUNT) > parseInt(b.TOT_AMOUNT)
            ? 1
            : 0;
        });
      } else if (data.sort === "amount_desc") {
        itemList.DATA.sort(function (a, b) {
          return parseInt(a.TOT_AMOUNT) > parseInt(b.TOT_AMOUNT)
            ? -1
            : parseInt(a.TOT_AMOUNT) < parseInt(b.TOT_AMOUNT)
            ? 1
            : 0;
        });
      }
      this.setState({
        itemList: itemList,
        mainAccordionExpand: [],
        subAccordionExpand: [],
      });
    } else {
      this.setState({
        criteria: data.criteria,
        loading: true,
        mainAccordionExpand: [],
        subAccordionExpand: [],
      });

      axios
        .get(
          "http://121.165.242.72:5050/retail/developer/index.php/retailPurchase_pr0301r/retrieve",
          {
            params: {
              criteria: data.criteria,
              date_f:
                data.date_f !== null ? data.date_f.replaceAll("/", "") : "",
              date_t:
                data.date_t !== null ? data.date_t.replaceAll("/", "") : "",
              branch_cd: window.sessionStorage.getItem("branch_cd"),
              buy_cust_cd: data.buy_cust_cd,
              group_cd: data.group_cd,
              class_cd: data.class_cd,
              product_cd: data.product_cd,
              sort: data.sort,
            },
          }
        )
        .then((response) => {
          console.log("response data receving");
          if (response.data.RESULT_CODE === "200") {
            // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
            window.sessionStorage.setItem(
              "pr0301r_itemList",
              JSON.stringify(response.data)
            );
            this.setState({
              loading: false, // load되었으니 false,
              itemList: response.data, // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. (Item : json파일에 있는 항목)
              openSearchToggle: false,
            });
          } else {
            alert(
              "조회된 내역이 없습니다.",
              window.sessionStorage.removeItem("pr0301r_itemList"),
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
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.loading === true ? (
          <div>
            <SearchBar programName={"소재재고현황"} />
            <div className={classes.circular_progress}>
              <CircularProgress disableShrink color="secondary" size={60} />
            </div>
          </div>
        ) : window.sessionStorage.getItem("pr0301r_itemList") !== null &&
          this.state.criteria === "" ? (
          <div>
            <SearchBar programName={"소재재고현황"} />
            <div className={classes.circular_progress}>
              <CircularProgress disableShrink color="secondary" size={60} />
            </div>
          </div>
        ) : (
          <div className={classes.root}>
            <SearchBar
              programName={"소재재고현황"}
              parentState={this.loadItem}
              openSearchToggle={this.state.openSearchToggle}
            />
            {this.state.itemList.SUM_AMOUNT !== undefined && (
              <div className={classes.header}>
                <Grid className={classes.container} container>
                  <Grid item xs={6} sm={6}>
                    <Paper elevation={0} className={classes.typo_header}>
                      {this.state.criteria === "date" ? "매입일" : "매입처"}
                    </Paper>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <Paper elevation={0} className={classes.typoLeft_header}>
                      {"수량"}
                    </Paper>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Paper elevation={0} className={classes.typoRight_header}>
                      {"매입액"}
                    </Paper>
                  </Grid>
                </Grid>
              </div>
            )}
            {this.state.itemList.length !== 0 &&
              this.state.itemList.DATA.map((itemMainAccordion, index) => {
                return (
                  <Accordion
                    defaultExpanded={this.state.mainAccordionExpand.includes(
                      index
                    )}
                    onChange={this.handleExpandMainAccordion(index)}
                    TransitionProps={{ unmountOnExit: true }}
                    square
                    key={index}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Grid className={classes.container} container>
                        <Grid item xs={6} sm={6}>
                          <Paper
                            elevation={0}
                            className={classes.summaryHeader}
                          >
                            {this.state.criteria === "date"
                              ? itemMainAccordion.BUY_DATE.substring(0, 4) +
                                "/" +
                                itemMainAccordion.BUY_DATE.substring(4, 6) +
                                "/" +
                                itemMainAccordion.BUY_DATE.substring(6, 8)
                              : itemMainAccordion.BUY_CUST_NAME}
                          </Paper>
                        </Grid>
                        <Grid item xs={2} sm={2}>
                          <Paper
                            elevation={0}
                            className={classes.summarySubHeader_QUANTITY}
                          >
                            {numberWithCommas(itemMainAccordion.QUANTITY)}
                          </Paper>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                          <Paper
                            elevation={0}
                            className={classes.summarySubHeader_AMOUNT}
                          >
                            {numberWithCommas(itemMainAccordion.TOT_AMOUNT)}
                          </Paper>
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className={classes.innerAccordion}>
                        {this.state.itemList.DATA_2.map(
                          (itemSubAccordion, index) => {
                            if (this.state.criteria === "date") {
                              if (
                                itemMainAccordion.BUY_DATE ===
                                itemSubAccordion.BUY_DATE
                              ) {
                                return (
                                  <Accordion
                                    defaultExpanded={this.state.subAccordionExpand.includes(
                                      index
                                    )}
                                    onChange={this.handleExpandSubAccordion(
                                      index
                                    )}
                                    TransitionProps={{ unmountOnExit: true }}
                                    square
                                    key={index}
                                  >
                                    <AccordionSummary
                                      classes={{
                                        expandIcon: classes.expandIcon,
                                      }}
                                      className={classes.innerAccordionSummary}
                                      expandIcon={<ExpandMoreIcon />}
                                    >
                                      <Grid
                                        className={classes.container}
                                        container
                                      >
                                        <Grid item xs={6} sm={6}>
                                          <Paper
                                            elevation={0}
                                            className={
                                              classes.innerSummaryHeader
                                            }
                                          >
                                            {itemSubAccordion.BUY_CUST_NAME}
                                          </Paper>
                                        </Grid>
                                        <Grid item xs={2} sm={2}>
                                          <Paper
                                            elevation={0}
                                            className={
                                              classes.innerSummarySubHeader_QUANTITY
                                            }
                                          >
                                            {numberWithCommas(
                                              itemSubAccordion.QUANTITY
                                            )}
                                          </Paper>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                          <Paper
                                            elevation={0}
                                            className={
                                              classes.innerSummarySubHeader_AMOUNT
                                            }
                                          >
                                            {numberWithCommas(
                                              itemSubAccordion.TOT_AMOUNT
                                            )}
                                          </Paper>
                                        </Grid>
                                      </Grid>
                                    </AccordionSummary>
                                    {this.state.itemList.DATA_3.map(
                                      (itemDetailData, index) => {
                                        if (
                                          itemSubAccordion.BUY_CUST_CD ===
                                            itemDetailData.BUY_CUST_CD &&
                                          itemSubAccordion.BUY_DATE ===
                                            itemDetailData.BUY_DATE
                                        ) {
                                          return (
                                            <div
                                              className={classes.itemView}
                                              key={index}
                                            >
                                              <Divider
                                                className={classes.divider}
                                              />
                                              <AccordionDetails>
                                                <Grid
                                                  className={classes.container}
                                                  container
                                                >
                                                  <Grid item xs={7} sm={7}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperLeft
                                                      }
                                                    >
                                                      {"분류 :   " +
                                                        nullCheck(
                                                          itemDetailData.GROUP_NAME
                                                        ) +
                                                        " "}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={5} sm={5}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperRight
                                                      }
                                                    >
                                                      {"수량 :   " +
                                                        numberWithCommas(
                                                          nullCheck(
                                                            itemDetailData.QUANTITY
                                                          ) +
                                                            nullCheck(
                                                              itemDetailData.UNIT_NAME
                                                            )
                                                        )}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={7} sm={7}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperLeft
                                                      }
                                                    >
                                                      {"품목 :   " +
                                                        nullCheck(
                                                          itemDetailData.CLASS_NAME
                                                        ) +
                                                        " "}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={5} sm={5}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperRight
                                                      }
                                                    >
                                                      {"단가 :   " +
                                                        numberWithCommas(
                                                          nullCheck(
                                                            itemDetailData.GROSS_UNIT_PRICE
                                                          )
                                                        )}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={7} sm={7}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperLeft
                                                      }
                                                    >
                                                      {"규격 :   " +
                                                        nullCheck(
                                                          itemDetailData.PRODUCT_NAME
                                                        ) +
                                                        " "}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={5} sm={5}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperRight
                                                      }
                                                    >
                                                      {"금액 :   "}
                                                      {numberWithCommas(
                                                        itemDetailData.TOT_AMOUNT
                                                      )}
                                                    </Paper>
                                                  </Grid>
                                                </Grid>
                                              </AccordionDetails>
                                            </div>
                                          );
                                        } else return null;
                                      }
                                    )}
                                  </Accordion>
                                );
                              } else return null;
                            } else {
                              if (
                                itemMainAccordion.BUY_CUST_CD ===
                                itemSubAccordion.BUY_CUST_CD
                              ) {
                                return (
                                  <Accordion
                                    defaultExpanded={this.state.subAccordionExpand.includes(
                                      index
                                    )}
                                    onChange={this.handleExpandSubAccordion(
                                      index
                                    )}
                                    TransitionProps={{ unmountOnExit: true }}
                                    square
                                    key={index}
                                  >
                                    <AccordionSummary
                                      classes={{
                                        expandIcon: classes.expandIcon,
                                      }}
                                      className={classes.innerAccordionSummary}
                                      expandIcon={<ExpandMoreIcon />}
                                    >
                                      <Grid
                                        className={classes.container}
                                        container
                                      >
                                        <Grid item xs={6} sm={6}>
                                          <Paper
                                            elevation={0}
                                            className={
                                              classes.innerSummaryHeader
                                            }
                                          >
                                            {itemSubAccordion.BUY_DATE.substring(
                                              0,
                                              4
                                            ) +
                                              "/" +
                                              itemSubAccordion.BUY_DATE.substring(
                                                4,
                                                6
                                              ) +
                                              "/" +
                                              itemSubAccordion.BUY_DATE.substring(
                                                6,
                                                8
                                              )}
                                          </Paper>
                                        </Grid>
                                        <Grid item xs={2} sm={2}>
                                          <Paper
                                            elevation={0}
                                            className={
                                              classes.innerSummarySubHeader_QUANTITY
                                            }
                                          >
                                            {numberWithCommas(
                                              itemSubAccordion.QUANTITY
                                            )}
                                          </Paper>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                          <Paper
                                            elevation={0}
                                            className={
                                              classes.innerSummarySubHeader_AMOUNT
                                            }
                                          >
                                            {numberWithCommas(
                                              itemSubAccordion.TOT_AMOUNT
                                            )}
                                          </Paper>
                                        </Grid>
                                      </Grid>
                                    </AccordionSummary>
                                    {this.state.itemList.DATA_3.map(
                                      (itemDetailData, index) => {
                                        if (
                                          itemSubAccordion.BUY_DATE ===
                                            itemDetailData.BUY_DATE &&
                                          itemSubAccordion.BUY_CUST_CD ===
                                            itemDetailData.BUY_CUST_CD
                                        ) {
                                          return (
                                            <div
                                              className={classes.itemView}
                                              key={index}
                                            >
                                              <Divider
                                                className={classes.divider}
                                              />
                                              <AccordionDetails>
                                                <Grid
                                                  className={classes.container}
                                                  container
                                                >
                                                  <Grid item xs={7} sm={7}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperLeft
                                                      }
                                                    >
                                                      {"분류 :   " +
                                                        nullCheck(
                                                          itemDetailData.GROUP_NAME
                                                        ) +
                                                        " "}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={5} sm={5}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperRight
                                                      }
                                                    >
                                                      {"수량 :   " +
                                                        numberWithCommas(
                                                          nullCheck(
                                                            itemDetailData.QUANTITY
                                                          ) +
                                                            nullCheck(
                                                              itemDetailData.UNIT_NAME
                                                            )
                                                        )}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={7} sm={7}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperLeft
                                                      }
                                                    >
                                                      {"품목 :   " +
                                                        nullCheck(
                                                          itemDetailData.CLASS_NAME
                                                        ) +
                                                        " "}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={5} sm={5}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperRight
                                                      }
                                                    >
                                                      {"단가 :   " +
                                                        numberWithCommas(
                                                          nullCheck(
                                                            itemDetailData.GROSS_UNIT_PRICE
                                                          )
                                                        )}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={7} sm={7}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperLeft
                                                      }
                                                    >
                                                      {"규격 :   " +
                                                        nullCheck(
                                                          itemDetailData.PRODUCT_NAME
                                                        ) +
                                                        " "}
                                                    </Paper>
                                                  </Grid>
                                                  <Grid item xs={5} sm={5}>
                                                    <Paper
                                                      elevation={0}
                                                      className={
                                                        classes.paperRight
                                                      }
                                                    >
                                                      {"금액 :   "}
                                                      {numberWithCommas(
                                                        itemDetailData.TOT_AMOUNT
                                                      )}
                                                    </Paper>
                                                  </Grid>
                                                </Grid>
                                              </AccordionDetails>
                                            </div>
                                          );
                                        } else return null;
                                      }
                                    )}
                                  </Accordion>
                                );
                              } else return null;
                            }
                          }
                        )}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </div>
        )}
        {this.state.itemList.SUM_AMOUNT !== undefined && (
          <div className={classes.footer}>
            <Grid className={classes.container} container>
              <Grid item xs={5} sm={5}>
                <Paper elevation={0} className={classes.typo_footer}>
                  {"합계"}
                </Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper elevation={0} className={classes.typoLeft_footer}>
                  {numberWithCommas(String(this.state.itemList.TOTAL_QUANTITY))}
                </Paper>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Paper elevation={0} className={classes.typoRight_footer}>
                  {numberWithCommas(String(this.state.itemList.SUM_AMOUNT))}
                </Paper>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(Menu1);
