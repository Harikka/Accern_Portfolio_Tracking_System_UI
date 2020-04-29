import React, { Component } from "react";
import { AreaChart } from "react-chartkick";
import "chart.js";
import ArrowGreen from "../Images/Arrow_Green.png";
import ArrowRed from "../Images/Arrow_Red.png";
import {
  CREATE_BUY_SELL_STOCK,
  GET_STOCK_PORTFOLIO,
  YOUR_STOCKS,
  GET_USERS,
} from "../Queries/graphqlQueries";
import { Query, Mutation } from "@apollo/react-components";
import Success from "../Images/Success.png";
var dateFormat = require("dateformat");

class Dasboard extends Component {
  state = {
    STOCK_NAME: "FACEBOOK",
    STOCK_ID: 1,
    QUANTITY: 0,
    BASE_PRICE: 0,
    SOLD_PRICE: 0,
    CURRENT_STATUS_STOCK: "Active",
    showForm: false,
  };
  handleClick() {
    this.setState({ showForm: true });
  }
  render() {
    const {
      STOCK_NAME,
      QUANTITY,
      BASE_PRICE,
      SOLD_PRICE,
      CURRENT_STATUS_STOCK,
      STOCK_ID,
    } = this.state;
    return (
      <div id="dashboard" style={{ padding: "20px" }}>
        <table style={{ width: "100%" }} cellPadding="20" cellSpacing="20">
          <tr>
            <td>
              <table>
                <tr>
                  <td style={{ paddingRight: "10px" }}>
                    <h5 class="card-title" style={{ color: "#3C6CC7" }}>
                      Portfolio
                    </h5>
                  </td>
                  <td>
                    <select
                      id="stockOptions"
                      onChange={(e) =>
                        this.setState({
                          STOCK_NAME:
                            e.target.options[e.nativeEvent.target.selectedIndex]
                              .text,
                          STOCK_ID: e.target.value,
                        })
                      }
                    >
                      <option value="1">FACEBOOK</option>
                      <option value="2">NETFLIX</option>
                      <option value="3">AMAZON</option>
                    </select>
                  </td>
                </tr>
              </table>
            </td>
            <td>
              <h5 class="card-title" style={{ color: "#3C6CC7" }}>
                Buy/Sell Stocks{" "}
              </h5>
            </td>
          </tr>
          <tr>
            <td style={{ height: "450px" }}>
              <Query
                query={GET_STOCK_PORTFOLIO}
                variables={{
                  STOCK_ID,
                }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error) return <p>Error :(</p>;
                  if (
                    data.StockPortfolioDetails !== undefined &&
                    data.StockPortfolioDetails !== null &&
                    data.StockPortfolioDetails > 0
                  );
                  var displayObj = {};
                  for (var i = 0; i < data.StockPortfolioDetails.length; i++) {
                    displayObj[
                      '"' +
                        dateFormat(
                          data.StockPortfolioDetails[i].DATE,
                          "mmmm dd"
                        ) +
                        '"'
                    ] = parseInt(data.StockPortfolioDetails[i].STOCK_COST);
                  }
                  var areaData = [{ name: "Month", data: displayObj }];
                  return <AreaChart data={areaData} />;
                }}
              </Query>
            </td>
            <td style={{ width: "431px" }}>
              <div class="card" style={{ width: "18rem", height: "293px" }}>
                <div class="card-body">
                  <div class="row">
                    <table
                      style={{ width: "100%" }}
                      cellSpacing="10"
                      cellPadding="10"
                    >
                      <tr>
                        <td>
                          <h5 class="card-title">Buy</h5>
                        </td>
                        <td>
                          <div class="custom-control custom-switch">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customSwitch1"
                              value={CURRENT_STATUS_STOCK}
                              onChange={(e) =>
                                this.setState({
                                  CURRENT_STATUS_STOCK: e.target.checked
                                    ? "InActive"
                                    : "Active",
                                })
                              }
                            />
                            <label
                              class="custom-control-label"
                              for="customSwitch1"
                            ></label>
                          </div>
                        </td>
                        <td>
                          <h5 class="card-title">Sell</h5>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="row">
                    <table
                      style={{ width: "100%" }}
                      cellSpacing="10"
                      cellPadding="10"
                    >
                      <tr>
                        <td>
                          <Mutation
                            mutation={CREATE_BUY_SELL_STOCK}
                            variables={{
                              STOCK_NAME,
                              QUANTITY,
                              BASE_PRICE,
                              SOLD_PRICE,
                              CURRENT_STATUS_STOCK,
                            }}
                            onError={() => {}}
                          >
                            {(addStock, result) => {
                              const { data, loading, error, called } = result;

                              if (!called || this.state.showForm) {
                                return (
                                  <div>
                                    <table>
                                      <tr>
                                        <td>
                                          <div class="form-group">
                                            <div class="input-group">
                                              <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                  #
                                                </div>
                                              </div>
                                              <input
                                                type="text"
                                                class="form-control"
                                                placeholder="QUANTITY"
                                                onChange={(e) =>
                                                  this.setState({
                                                    QUANTITY: parseInt(
                                                      e.target.value
                                                    ),
                                                  })
                                                }
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {this.state.CURRENT_STATUS_STOCK ==
                                          "Active" ? (
                                            <div class="form-group">
                                              <div class="input-group">
                                                <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                    $
                                                  </div>
                                                </div>
                                                <input
                                                  type="text"
                                                  class="form-control"
                                                  placeholder="BASE PRICE"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      BASE_PRICE: parseFloat(
                                                        e.target.value
                                                      ),
                                                    })
                                                  }
                                                />
                                              </div>
                                            </div>
                                          ) : (
                                            <div class="form-group">
                                              <div class="input-group">
                                                <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                    $
                                                  </div>
                                                </div>
                                                <input
                                                  type="text"
                                                  class="form-control"
                                                  placeholder="SOLD_PRICE"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      SOLD_PRICE: parseFloat(
                                                        e.target.value
                                                      ),
                                                    })
                                                  }
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div
                                            class="row"
                                            style={{
                                              paddingTop: "15px",
                                              paddingLeft: "10px",
                                            }}
                                          >
                                            <button
                                              type="button"
                                              class="btn btn-primary"
                                              onClick={addStock}
                                            >
                                              Submit
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                );
                              }
                              if (loading) {
                                return <div>LOADING</div>;
                              }
                              if (error) {
                                return <div>ERROR</div>;
                              }

                              const { addStockDetails } = data;

                              if (addStockDetails) {
                                const { STOCK_NAME } = addStockDetails;

                                return (
                                  <div>
                                    <div>
                                      {this.state.CURRENT_STATUS_STOCK ==
                                      "Active" ? (
                                        <h5 class="card-title">{`${STOCK_NAME} Stock Created Successfully`}</h5>
                                      ) : (
                                        <h5 class="card-title">{`${STOCK_NAME} Stock Sold Out Successfully`}</h5>
                                      )}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      <img
                                        src={Success}
                                        width="35"
                                        height="50"
                                      />
                                    </div>
                                    <div
                                      class="row"
                                      style={{
                                        paddingTop: "15px",
                                        paddingLeft: "13px",
                                      }}
                                    >
                                      <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-testid="add-user-button"
                                        onClick={this.handleClick.bind(this)}
                                      >
                                        Back
                                      </button>
                                    </div>
                                  </div>
                                );
                              } else {
                                return null;
                              }
                            }}
                          </Mutation>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <h5 class="card-title" style={{ color: "#3C6CC7" }}>
                Your Stocks
              </h5>
            </td>
            <td>
              <h5 class="card-title" style={{ color: "#3C6CC7" }}>
                Available Funds
              </h5>
            </td>
          </tr>
          <tr>
            <td>
              <div class="card-deck">
                <Query
                  query={YOUR_STOCKS}
                  variables={{
                    STOCK_ID,
                  }}
                >
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading…</p>;
                    if (error) return <p>Error :(</p>;
                    if (
                      data.BuySummaryDetails !== undefined &&
                      data.BuySummaryDetails !== null &&
                      data.BuySummaryDetails > 0
                    );
                    if (
                      data.StockSumamryDetails !== undefined &&
                      data.StockSumamryDetails !== null &&
                      data.StockSumamryDetails > 0
                    );
                    return data.BuySummaryDetails.map(
                      ({ STOCK_NAME, TOTAL_QUANTITY }, i) => (
                        <div class="card" style={{ width: "18rem" }}>
                          <div class="card-body">
                            <div class="row">
                              <div class="col-6">
                                <h5 class="card-subtitle mb-2 text-muted">
                                  {STOCK_NAME}
                                </h5>
                                <h6
                                  class="card-subtitle mb-2 text-muted"
                                  style={{ paddingTop: "30px" }}
                                >
                                  Total Quantity : {TOTAL_QUANTITY}
                                </h6>
                              </div>

                              <div class="col-6" style={{ textAlign: "right" }}>
                                {data.StockSumamryDetails[i].SOLD_PRICE <
                                data.StockSumamryDetails[i].BASE_PRICE ? (
                                  <img src={ArrowRed} width="60" height="57" />
                                ) : (
                                  <img
                                    src={ArrowGreen}
                                    width="60"
                                    height="57"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    );
                  }}
                </Query>
              </div>
            </td>
            <td>
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                  <div class="row">
                    <Query query={GET_USERS}>
                      {({ loading, error, data }) => {
                        if (loading) return <p>Loading…</p>;
                        if (error) return <p>Error :(</p>;
                        if (
                          data.UserDetails !== undefined &&
                          data.UserDetails !== null &&
                          data.UserDetails > 0
                        );
                        return (
                          <div class="col-6">
                            <h5 class="card-title">
                              {data.UserDetails.WALLET_AMOUNT}
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                              Your Balance
                            </h6>
                          </div>
                        );
                      }}
                    </Query>
                    <div class="col-6">
                      <button type="button" class="btn btn-primary">
                        Add Funds
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
export default Dasboard;
