import AppModel from './modules/model';
import D3Helper from './modules/d3-helper';
import Util from './modules/util';
import header from './modules/header';
import { parser } from './modules/parser';

import d3pie from 'd3pie';


import './../styles/app.css';

// VARS ######################################
// TODO - move these refs elsewhere?
let billerDict;
let transactionData;
let pie;
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
    parser.parseCSV(AppModel.BILLERS_CSV_FILE_PATH, onBillerDataParseComplete);
    parser.parseCSV(AppModel.TRANSACTIONS_CSV_FILE_PATH, onTransactionDataParseComplete);
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
    parser.parseTransDataByMonth(data, year, month - 1, billerDict,
        onParseSpendingByMonthComplete);   
}

function onParseSpendingByMonthComplete(totalAmountMade, totalAmountPaid, totalAmountUnknown, 
    incomeDict, expenseDict, payeeDict, monthIndex){
    Util.logFunctionCall("onParseSpendingByMonthComplete");

    // logFunctionCall("handle_parse_spending_by_month_complete");

    drawPage(totalAmountMade, totalAmountPaid, 
        incomeDict, expenseDict, payeeDict, monthIndex);

    
    
    // TODO - add this back!!!!!!!!!!!!!!!!!!!!!!!!
    //// updateText(monthIndex, totalAmountMade, totalAmountPaid, totalAmountUnknown);  
}

function drawPage(totalAmountMade, totalAmountPaid, 
    incomeDict, expenseDict, payeeDict, monthIndex)
{
    Util.logFunctionCall("draw_page"); 

    let chartTitle = "";
    let chartData = null;




    // TODO - return this!!!
    let monthNum = 1;              // D3Helper.getMonthFormFieldValue();






    // expenses
    chartTitle = "spent: " + Util.getCurrencyString(totalAmountPaid);


    chartData = getExpenseChartData(expenseDict, totalAmountPaid);
    // ... 
    // TODO - perhaps get below working?
    ///////makePieChart(chartData, chartTitle, "#FF0000", monthIndex);



    // income
    /*
    chartTitle = "made: " + getCurrencyString(totalAmountMade);
    chartData = getIncomeChartData(incomeDict, totalAmountMade);
    // ...
    makePieChart(chartData, chartTitle, "#008800", monthIndex);
    */

    // TODO - return these to working state...
    // var payeeData = getPayeeChartData(payeeDict, totalAmountPaid);
    makeTable(chartData);
    // makeChart(chartData);
}















function getExpenseChartData(expenseDict, totalAmountPaid)
{
    let data = [];
    for(let key in expenseDict)
    {
        // get %
        let amount = expenseDict[key];
        let percentage = amount / totalAmountPaid;
        percentage = Util.roundTo2SigFigs(percentage);

        // package obj
        let obj =
        {
            "label": key, 
            value: percentage, 
            total: Math.round(amount)
        };

        // store
        data.push(obj);
    }
    // ... sort
    data.sort(function(a,b)
    {
        return (a.total > b.total) ? -1 : ((b.total > a.total) ? 1 : 0);
    });

    return data;
}


// PERHAPS D3-STUFF....
function makePieChart(data, title, titleColor, monthIndex)
{
    Util.logFunctionCall("make_pie_chart");
    
    pie = new d3pie("pieChart", 
    {
        "header": 
        {
            "title":
            {
                "text":         title,
                "fontSize":     22,
                "font":         "verdana",
                "color":        titleColor
            },
            "subtitle":
            {
                "text":         "expense % by biller type.",
                "color":        "#999999",
                "fontSize":     10,
                "font":         "verdana"
            },
           
            "titleSubtitlePadding":     12
        },
        "size": 
        {
            "canvasHeight":     400,
            "canvasWidth":      600,
            "pieOuterRadius":   "88%"
        },
        "data":
        {
            "content":          data
        },
        "labels":
        {
            "outer":
            {
                "pieDistance":  32
            },
            "inner":
            {
                "format":       "value"
            },
            "mainLabel":
            {
                "font":         "verdana",
                "color":        "#ffffff",
            },
            "percentage":
            {
                "color":            "#e1e1e1",
                "font":             "verdana",
                "decimalPlaces":    0
            },
            "value":
            {
                "color":            "#e1e1e1",
                "font":             "verdana"
            },
            "lines":
            {
                "enabled":          true,
                "color":            "#cccccc"
            },
            "truncation":
            {
                "enabled":          false
            }
        },
        "effects":
        {
            "pullOutSegmentOnClick": 
            {
                "effect":       "linear",
                "speed":        400,
                "size":         20
            }
        },
        "misc":
        {
            "gradient":
            {
                "enabled":      true,
                "percentage":   100
            },
            "pieCenterOffset":
            {
                "x":    10
            }
        }       
        /*
        "footer": {
            "text": "Source: me, my room, the last couple of months.",
            "color": "#999999",
            "fontSize": 11,
            "font": "open sans",
            "location": "bottom-center"
        },
        */        
    });
}

function makeTable(tableData)
{
    Util.logFunctionCall("make_table");
    
    // get column definitions
    // (e.g. Date, Description, Original Description, Amount, Transaction Type, Category, Account Name, Labels, Notes)
    let columns = 
    [
        {head: 'Date', cl: 'center', html: function(row){return row[0];}},
        {head: 'Description', cl: 'title', html: function(row){return row[1];}},
        /*{ head: 'Original Description', cl: 'center', html: function(row) { return row[2]; }},*/
        {head: 'Amount', cl: function(row) {return (row[4] == 'credit') ? 'numPlus' : 'numMinus'; }, html: function(row){return row[3];}},
        /*{ head: 'Transaction', cl: 'center', html: function(row) { return row[4]; }},*/
        {head: 'Category', cl: 'center', html: function(row){return row[6];}},
        {head: 'Type (dirty)', cl: 'center', html: function(row){return row[5];}},
        /*{ head: 'Account Name', cl: 'center', html: function(row) { return row[7]; }},*/
        /*{ head: 'Labels', cl: 'center', html: function(row) { return row[8]; }},*/
        /*{ head: 'Notes', cl: 'center', html: function(row) { return row[9]; }}*/

        {head: 'Type (clean)', cl: 'center', html: function(row){return row[9]}}
    ];

    // create table
    let selection = d3.select('body');
    selection.selectAll('table').data([0]).enter().append('table');
    let table = d3.select('body').select('table');

    // create table header
    table.selectAll('thead').data(tableData).enter().append('thead');
    let thead = table.select('thead');

    // table.append('thead')
    thead.append('tr')
            .selectAll('th')
            .data(columns)
            .enter()
            .append('th')
            .attr('class', ƒ('cl'))
            .text(ƒ('head'));

    thead.append('tr')
            .selectAll('th')
            .data(columns).exit().remove();

    // create table body
    table.selectAll('tbody').data([0]).enter().append('tbody');
    let tbody = table.select('tbody');

    // table.append('tbody')
    tbody.selectAll('tr')
            .data(tableData)
            .enter()
            .append('tr')
            .selectAll('td')
            .data(function(row, i)
            {
                return columns.map(function(c)
                {
                    // compute cell values for this specific row
                    var cell = {};
                    d3.keys(c).forEach(function(k)
                    {
                        cell[k] = typeof c[k] == 'function' ? c[k](row,i) : c[k];
                    }
                );
                
                return cell;
            });
            })
            .enter()
            .append('td')
            .html(ƒ('html'))
            .attr('class', ƒ('cl'));
}