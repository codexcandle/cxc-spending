import React from 'react';
import AppModel from '../model/model';
import Util from '../util/util';
import { parser } from '../util/parser';

import DataParser from './data-parser';

class App extends React.Component{
    // state = {billerDict: {}, transactionData: {}};
    // this.setState({ testVarible: "new value" });

    constructor(props){
        super(props);
        this.billerDict = {};
        this.transactionData = {};
    }

    componentDidMount(){
        // parser.parseCSV(AppModel.BILLERS_CSV_FILE_PATH, this.onBillerDataParseComplete);
        // parser.parseCSV(AppModel.TRANSACTIONS_CSV_FILE_PATH, onTransactionDataParseComplete);
    }

    render(){
        return (
            <div>
            {AppModel.TRANSACTIONS_CSV_FILE_PATH}
            <DataParser csvFilePath="./../_sensitive/billers.csv"/>
            </div>
        )
    }

    onBillerDataParseComplete = (data) => {
        console.log("CSV PARSED! ------- _data: " + data);

        // Util.logFunctionCall("onBillerDataParseComplete");
    
        // // construct dict
        // this.billerDict = {};
    
        // // ... ignore header row
        // var startIndex = 1; 
        // var count = data.length;      
        // for(var i = startIndex; i < count; i++)
        // {
        //     var rowData = data[i];
    
        //     this.billerDict[rowData[1]] = rowData[0];
        // }
    }
}

export default App;