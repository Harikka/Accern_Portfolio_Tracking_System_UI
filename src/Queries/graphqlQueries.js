import {
  gql
} from 'apollo-boost';

// Get user details 
export const GET_USERS = gql `
    { 
      UserDetails 
      {
      USER_NAME,
     WALLET_AMOUNT,
     USER_ID,
     CURRENT_AMOUNT  
     }
  }
`;

// Get Stock details
export const GET_STOCK_DETAILS = gql `
{ 
  StockDetails{
    STOCK_NAME,
    QUANTITY,
    CURRENT_STATUS_STOCK,
    BASE_PRICE,
    SOLD_PRICE,
    CREATED_USER
  }
}
`;

// Get Stock Portfolio of the company
export const GET_STOCK_PORTFOLIO = gql `query ($STOCK_ID: ID){
  StockPortfolioDetails(STOCK_ID: $STOCK_ID) {
     STOCK_NAME,
STOCK_COST,
STOCK_VOLUME,
DATE
  }
}`;

// Create stock for buy and selling
export const CREATE_BUY_SELL_STOCK = gql `
mutation($STOCK_NAME: String, $QUANTITY: Int, $BASE_PRICE: Float, $SOLD_PRICE: Float, $CURRENT_STATUS_STOCK: String) {
  addStockDetails (STOCK_NAME: $STOCK_NAME, QUANTITY: $QUANTITY, BASE_PRICE: $BASE_PRICE, SOLD_PRICE: $SOLD_PRICE, CURRENT_STATUS_STOCK: $CURRENT_STATUS_STOCK)
  {
  STOCK_NAME
  }  
}`;

// buy stock and sold stock summary details
export const BUY_SELL_SUMMARY = gql `
{
  BuySummaryDetails{
    TOTAL_QUANTITY
    CURRENT_AVG_PRICE
    STOCK_NAME
  }
  SoldSummaryDetails{
    TOTAL_QUANTITY
    AVG_SOLD_PRICE
    STOCK_NAME
  }
}`;

// Stocks purchased 
export const YOUR_STOCKS = gql `{
  BuySummaryDetails{
    TOTAL_QUANTITY
    STOCK_NAME
  }
  StockSumamryDetails{
    SOLD_PRICE
    BASE_PRICE
  }
}`;