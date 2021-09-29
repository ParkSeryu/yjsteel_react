/* {this.state.itemList.length !== 0 &&
              this.state.itemList.DATA.map((item, index) => {
                if (item.SORT_VAL === "1") {
                  return (
                    <div>
                      <ListItem onClick={() => this.handleExpandList(index)}>
                        <ListItemText
                          primary={
                            item.NAME_NM +
                            " " +
                            item.SIZE_VAL +
                            " " +
                            item.STOCK_QUANTITY +
                            " " +
                            item.STOCK_WEIGHT
                          }
                        />
                      </ListItem>
                      {console.log(this.state.expandList.includes(index))}
                      <Collapse in={this.state.expandList.includes(index)}>
                        <List component="div" disablePadding>
                          <StyledListItem>
                            <table border="1">
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
                            </table>
                          </StyledListItem>
                          {renderList(
                            index + 1,
                            this.state.itemList,
                            this.state.itemList.DATA.length
                          )}
                        </List>
                      </Collapse>
                    </div>
                  );
                }
              })} */
