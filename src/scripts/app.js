import AppModel from "./modules/model"
import Util from './modules/util'
import D3Helper from './modules/d3-helper'
import parser from "./modules/parser"
import header from "./modules/header"
import './../styles/app.css';

// VARS ######################################
const p = new parser();
const model = new AppModel();

// TODO - move these refs elsewhere?
let billerDict;
let transactionData;
// ###########################################

// APP FLOW ##################################
document.addEventListener("DOMContentLoaded", onReady);
// ###########################################


function onReady(){
    init();
}

function init(){
    Util.logFunctionCall("INIT");

    // set header
    document.body.innerHTML = header;

    // parse
    p.parseCSV(AppModel.BILLERS_CSV_FILE_PATH, onBillerDataParseComplete);
    p.parseCSV(AppModel.TRANSACTIONS_CSV_FILE_PATH, onTransactionDataParseComplete);
}

function onBillerDataParseComplete(data){
    Util.logFunctionCall("onBillerDataParseComplete");

    // construct dict
    billerDict = {};

    // ... ignore header row
    var startIndex = 1; 
    var count = data.length;      
    for(var i = startIndex; i < count; i++)
    {
        var rowData = data[i];

        billerDict[rowData[1]] = rowData[0];
    }

    // console.log("*** RESULT (@ app.js) IS: " + data);
}

function onTransactionDataParseComplete(data){
    Util.logFunctionCall("onTransactionDataParseComplete");

    // save data
    transactionData = data;

    // show "latest"
    showLatestTransactionData(data);
}

function showLatestTransactionData(data){
    Util.logFunctionCall("showLatestTransactionData");

    // get 1st non-header row
    let row =  data[1];

    // read date field 
    let dateLastStr = row[AppModel.TRANSACTION_DATA_FIELD_INDEX_DATE];




    // parse year
    let year = D3Helper.getDateStringYear(dateLastStr);

// TODO - return this!    
//////// setYearFormFieldValue(year);

    // parse month
    let month = D3Helper.getDateStringMonth(dateLastStr);

    // TODO - return this!        
//////// setMonthFormFieldValue(month);

    // parse "latest" transaction data
    p.parseTransDataByMonth(data, year, month - 1, billerDict,
        onParseSpendingByMonthComplete);   
}

function onParseSpendingByMonthComplete(totalAmountMade, totalAmountPaid, totalAmountUnknown, 
    incomeDict, expenseDict, payeeDict, monthIndex){
    Util.logFunctionCall("onParseSpendingByMonthComplete");

    // logFunctionCall("handle_parse_spending_by_month_complete");

    drawPage(totalAmountMade, totalAmountPaid, 
        incomeDict, expenseDict, payeeDict, monthIndex);

    updateText(monthIndex, totalAmountMade, totalAmountPaid, totalAmountUnknown);  
}