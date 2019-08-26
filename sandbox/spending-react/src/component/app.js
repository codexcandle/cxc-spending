import React from 'react';

import DataParserVendor from './data-parser-vendor';
import DataParserTransaction from './data-parser-transaction';
import AppModel from './../model/model';
import D3Helper from './../util/d3-helper';

class App extends React.Component{
    constructor(props){
        super(props);
        this.billerDict = {};
        this.transactionData = {};
    }

    render(){
        return (
            <div>
                <DataParserVendor />
                <DataParserTransaction onDataReady={this.handleTransactionDataLoadComplete} />
            </div>
        )
    }

    handleTransactionDataLoadComplete(data){
        // log
       //  Util.logFunctionCall("showLatestTransactionData");

        // get 1st non-header row
        let row =  data[1];
    
        // read date field 
        let dateLastStr = row[AppModel.TRANSACTION_DATA_FIELD_DATE];

        // // parse year
        let year = D3Helper.getDateStringYear(dateLastStr);
        // //////// setYearFormFieldValue(year);
    
console.log("year: " + year);

        // // parse month
        // let month = D3Helper.getDateStringMonth(dateLastStr);
        //////// setMonthFormFieldValue(month);
    

    //    console.log("DATE LATE: " + dateLastStr);   ///  + " _MONTH: " + month + " YEAR:" + year);


        // // TODO - return below!
        // // set date header
        // ui.setActiveExpenseDate(month, year);
    
        // // parse "latest" transaction data
        // parser.parseTransDataByMonth(data, year, month - 1, billerDict,
        //     onParseSpendingByMonthComplete);   
    }
}

export default App;