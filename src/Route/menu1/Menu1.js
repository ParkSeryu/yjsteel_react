import React, { PureComponent } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "./Menu1_Search";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ListItem from "@mui/material/ListItem";

const StyledListItem = withStyles({
  root: {
    width: "100vw",
    marginLeft: "-3px",
    padding: 0,
    margin: 0,
    background: "gray",
  },
})(ListItemText);

const CustomTreeItem = withStyles({
  root: {
    backgroundColor: "white",
  },
  "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
    backgroundColor: "blue",
    color: "var(--tree-view-color)",
  },
})(TreeItem);

const useStyles = (theme) => ({
  root: {
    width: "98vw",
    marginLeft: "1vw",
    marginTop: "97px",
    marginBottom: "310px",
  },

  container: {
    marginTop: "5px",
    marginBottom: "5px",
  },

  tree: {},

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
  if (text === null) return " ";
  else return text;
};

const renderList = (index, data, length) => {
  // console.log(index);
  // console.log(data.DATA);
  let i = index;
  let result = [];
  for (i; i < length && data.DATA[i].SORT_VAL !== "1"; i++) {
    //console.log("tete");
    //console.log(data.DATA[i].SORT_VAL);
    result.push(<ListItem>{data.DATA[i].WORK_CUST_NM}</ListItem>);
  }
  return result;
};

let collapseItemList = [];
let Length = 0;

class Menu1 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      itemList: [],
      expandList: [],
      test: false,
      // openSearchToggle:
      //   window.sessionStorage.getItem("pr0301r_itemList") === null
      //     ? true
      //     : false,
      // mainAccordionExpand: [],
      // subAccordionExpand: [],
    };
    window.sessionStorage.setItem("scrollSaveFlag", 2);
  }

  handleExpandList = (index) => {
    console.log(this.state.expandList);
    if (this.state.expandList.includes(index)) {
      this.state.expandList = this.state.expandList.filter(
        (element) => element !== index
      );
    } else {
      this.state.expandList = this.state.expandList.concat(index);
    }
    this.setState({ test: !this.state.test });
  };

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
    // if (window.sessionStorage.getItem("pr0301r_itemList") !== null) {
    //   if (
    //     window.sessionStorage.getItem("pr0301r_mainAccordionExpand") !== null
    //   ) {
    //     this.setState({
    //       mainAccordionExpand: JSON.parse(
    //         window.sessionStorage.getItem("pr0301r_mainAccordionExpand")
    //       ),
    //       subAccordionExpand: JSON.parse(
    //         window.sessionStorage.getItem("pr0301r_subAccordionExpand")
    //       ),
    //     });
    //   }
    // setTimeout(() => {
    //   this.setState({
    //     criteria: JSON.parse(window.sessionStorage.getItem("pr0301r_search"))
    //       .criteria,
    //     itemList: JSON.parse(
    //       window.sessionStorage.getItem("pr0301r_itemList")
    //     ),
    //   });
    // }, 1000);
  }

  componentDidUpdate() {
    if (window.sessionStorage.getItem("scrollSaveFlag") !== null) {
      window.scrollTo(0, window.sessionStorage.getItem("Menu1_scroll"));
      window.sessionStorage.removeItem("scrollSaveFlag");
    }
  }

  componentWillUnmount() {
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
    console.log(data);
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
        console.log("response data receiving");
        console.log(response);
        if (response.data.RESULT_CODE === "200") {
          // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
          this.setState({
            loading: false, // load되었으니 false,
            itemList: response.data, // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. (Item : json파일에 있는 항목)
            openSearchToggle: false,
          });
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
                      <TreeView
                        sx={{
                          flexGrow: 1,
                          maxWidth: "100%",
                          backgroundColor: "white",
                          overflowY: "auto",
                        }}
                      >
                        <TreeItem
                          nodeId="1"
                          label={
                            item.NAME_NM +
                            " " +
                            item.SIZE_VAL +
                            " " +
                            item.STOCK_QUANTITY +
                            " " +
                            item.STOCK_WEIGHT
                          }
                        >
                          <TreeItem nodeId="2" label={<table border="1">
                              <tr>
                                <td
                                  style={{ minWidth: "25%", maxWidth: "25%" }}
                                >
                                  <span style={{ fontSize: "10px" }}>
                                    <b>재질</b>
                                    <br />
                                    <b>사업장</b>
                                  </span>
                                </td>
                                <td
                                  style={{ minWidth: "25%", maxWidth: "25%" }}
                                >
                                  <span style={{ fontSize: "10px" }}>
                                    <b>도유</b>
                                    <br />　
                                  </span>
                                </td>
                                <td style={{ marginLeft: "30%" }}>
                                  <span style={{ fontSize: "10px" }}>
                                    <b>후처리</b>
                                    <br />　
                                  </span>
                                </td>
                                <td style={{ marginLeft: "30%" }}>
                                  <span style={{ fontSize: "10px" }}>
                                    <b>YP</b>
                                    <br />
                                    <b>C</b>
                                  </span>
                                </td>
                                <td style={{ marginLeft: "30%" }}>
                                  <span style={{ fontSize: "10px" }}>
                                    <b>TS</b>
                                    <br />
                                    <b>Si</b>
                                  </span>
                                </td>
                                <td style={{ marginLeft: "30%" }}>
                                  <span style={{ fontSize: "10px" }}>
                                    <b>EL</b>
                                    <br />
                                    <b>Mn</b>
                                  </span>
                                </td>
                                <td style={{ marginLeft: "30%" }}>
                                  <span style={{ fontSize: "10px" }}>
                                    <b>수량</b>
                                    <br />　
                                  </span>
                                </td>
                                <td align="right" style={{ marginLeft: "3%" }}>
                                  <span style={{ fontSize: "10px" }}>
                                    <b>중량</b>
                                    <br />
                                    <b>매입단가</b>
                                  </span>
                                </td>
                              </tr>
                            </table>} />
                        </TreeItem>
                        {renderList(
                            index + 1,
                            this.state.itemList,
                            this.state.itemList.DATA.length
                          )}
                      </TreeView>
                      </div>
       )}

        {
          <div className={classes.footer}>
            <Grid className={classes.container} container>
              <Grid item xs={6} sm={6}>
                <Paper elevation={0} className={classes.typo_footer}>
                  {"합계"}
                </Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper elevation={0} className={classes.typoLeft_footer}>
                  {numberWithCommas(String(this.state.itemList.TOTAL_QUANTITY))}
                </Paper>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Paper elevation={0} className={classes.typoRight_footer}>
                  {numberWithCommas(String(this.state.itemList.SUM_AMOUNT))}
                </Paper>
              </Grid>
            </Grid>
          </div>
        }
      </div>
    );
  }
}

export default withStyles(useStyles)(Menu1);
