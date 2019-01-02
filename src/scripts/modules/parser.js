import Papa from 'papaparse';
import Util from 'util';
import AppModel from 'model';

class Parser {
    constructor() {

    }

    parseCSV(csvFilePath, callback) {
        // logFunctionCall("parse_csv"); 

        Papa.parse(csvFilePath, {
            download: true,
            complete: function (results) {
                // return results.data;

                if (typeof callback == "function") {
                    callback(results.data);
                }
            }
        });
    }


    parseTransDataByMonth(data, year, monthIndex, billerDict, callback) {
        // logFunctionCall("parse_spending_by_month");

        // init local lets
        let expenseDict = {};
        let payeeDict = {};
        let incomeDict = {};

        // ... transaction data
        let totalAmountMade = 0;
        let totalAmountPaid = 0;
        let totalAmountUnknown = 0;
        // ... loop lets (ignore header row)
        let count = data.length;
        let startIndex = 1;

        for (let i = startIndex; i < count; i++) {
            let rowData = data[i];

            // ensure only "current" records are parsed
            let transDate = rowData[0];
            let transDateFields = transDate.split("/");
            let transYear = transDateFields[2];

            // if same year...
            if (transYear == year) {
                let transMonthIndex = transDateFields[0] - 1;

                // if same month...
                if (transMonthIndex == monthIndex) {
                    // update table data
                    let val = rowData[1];
                    let payeeType = billerDict.hasOwnProperty(val) ? billerDict[val] : AppModel.TO_BE_NAMED_BILLER_TYPE;
                    rowData.push(payeeType);

                    // parse data!
                    // TODO - remove literal val below, and confirm "transType" logic holds for all transaction types
                    let desc = rowData[1];
                    let transAmount = parseFloat(rowData[3]);
                    let transType = rowData[4];
                    if (transType != AppModel.TRANSACTION_TYPE_CREDIT
                        && transType != AppModel.TRANSACTION_TYPE_INCOME) {
                        expenseDict[desc] = expenseDict[desc] ? (expenseDict[desc] += transAmount) : transAmount;

                        // add to total
                        totalAmountPaid += transAmount;
                    }
                    else {
                        totalAmountMade += transAmount;
                    }

                    // update pie chart data
                    if (payeeType != AppModel.TRANSACTION_TYPE_INCOME) {
                        payeeDict[payeeType] = payeeDict[payeeType] ? (payeeDict[payeeType] += transAmount) : transAmount;

                        if (payeeType == AppModel.TO_BE_NAMED_BILLER_TYPE) {
                            totalAmountUnknown += transAmount;
                        }
                    }
                    else {
                        incomeDict[payeeType] = incomeDict[payeeType] ? (incomeDict[payeeType] += transAmount) : transAmount;
                    }
                }
            }
        }

        // round! (2 sig-figs) 
        totalAmountMade = Math.round(Util.roundTo2SigFigs(totalAmountMade));
        totalAmountPaid = Math.round(roundTo2SigFigs(totalAmountPaid));
        totalAmountUnknown = Math.round(roundTo2SigFigs(totalAmountUnknown));

        // trigger callback
        if (typeof callback == "function") {
            callback(totalAmountMade, totalAmountPaid, totalAmountUnknown,
                incomeDict, expenseDict, payeeDict, monthIndex);
        }
    }
}

export default Parser;