import React, { Component } from "react";
import { PieChart } from "react-chartkick";
import "chart.js";
import ReactToPrint from "react-to-print";
import { Query } from "react-apollo";
import { GET_STOCK_DETAILS, BUY_SELL_SUMMARY } from "../Queries/graphqlQueries";
var dateFormat = require("dateformat");

class Report extends Component {
  state = {
    STOCK_SUMMARY: 1,
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <table style={{ width: "100%" }} cellPadding="10" cellSpacing="10">
          <tr>
            <td>
              <table>
                <tr>
                  <td>
                    <h2 style={{ color: "#3C6CC7", paddingRight: "10px" }}>
                      Composition
                    </h2>
                  </td>
                  <td>
                    <select
                      id="stocksummaryOptions"
                      onChange={(e) =>
                        this.setState({
                          STOCK_SUMMARY: e.target.value,
                        })
                      }
                    >
                      <option value="1">BUY</option>
                      <option value="2">SELL</option>
                    </select>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: "800px" }}>
              <Query query={BUY_SELL_SUMMARY}>
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading…</p>;
                  if (error) return <p>Error :(</p>;
                  if (this.state.STOCK_SUMMARY === 1) {
                    if (
                      data.BuySummaryDetails !== undefined &&
                      data.BuySummaryDetails !== null &&
                      data.BuySummaryDetails > 0
                    );
                    var buyobj = {};
                    for (var i = 0; i < data.BuySummaryDetails.length; i++) {
                      buyobj[data.BuySummaryDetails[i].STOCK_NAME] = parseInt(
                        data.BuySummaryDetails[i].TOTAL_QUANTITY
                      );
                    }
                  } else {
                    if (
                      data.SoldSummaryDetails !== undefined &&
                      data.SoldSummaryDetails !== null &&
                      data.SoldSummaryDetails > 0
                    );
                    var sellobj = {};
                    for (var k = 0; k < data.SoldSummaryDetails.length; k++) {
                      sellobj[data.SoldSummaryDetails[k].STOCK_NAME] = parseInt(
                        data.SoldSummaryDetails[k].TOTAL_QUANTITY
                      );
                    }
                  }
                  return (
                    <tr>
                      <td>
                        <PieChart
                          data={
                            this.state.STOCK_SUMMARY === 1 ? buyobj : sellobj
                          }
                        />
                      </td>
                    </tr>
                  );
                }}
              </Query>
            </td>
          </tr>
        </table>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <td>
                <h2 style={{ color: "#3C6CC7" }}>Latest 10 Transactions</h2>
              </td>
            </tr>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company</th>
              <th scope="col">Operation</th>
              <th scope="col">Quantity</th>
              <th scope="col">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            <Query query={GET_STOCK_DETAILS}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading…</p>;
                if (error) return <p>Error :(</p>;
                return data.StockDetails.map(
                  (
                    {
                      STOCK_NAME,
                      QUANTITY,
                      CURRENT_STATUS_STOCK,
                      CREATED_USER,
                    },
                    i
                  ) => (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{STOCK_NAME}</td>
                      <td>
                        {CURRENT_STATUS_STOCK === "Active" ? "BUY" : "SELL"}
                      </td>
                      <td>{QUANTITY}</td>
                      <td> {dateFormat(CREATED_USER, "yyyy-mm-dd")}</td>
                    </tr>
                  )
                );
              }}
            </Query>
          </tbody>
        </table>
      </div>
    );
  }
}

class PrintReport extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <div
              style={{
                paddingRight: "20px",
                textAlign: "right",
                paddingTop: "10px",
              }}
            >
              {" "}
              <button type="button" class="btn btn-primary">
                Download
              </button>
            </div>
          )}
          content={() => this.componentRef}
        />
        <Report ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default PrintReport;
