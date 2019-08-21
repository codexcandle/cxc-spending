// TODO - turn this into UTIL-CSV parser class for my utils!!!!

import React, { Component } from 'react';
import AppModel from '../model/model';

class DataParser extends Component {

  constructor(props) {
    // Call super class
    super(props);

    // Bind this to function updateData (This eliminates the error)
    // this.updateData = this.updateData.bind(this);

    // TODO - move external to PARSER class!
    this.billerDict = {};

    this.testUrl = "carrrrr.csv";
  }

  componentWillMount(){
    var localPath = './../_sensitive/billers.csv';

    // Your parse code, but not seperated in a function
    ////var csvFilePath = require('./../_sensitive/' + ${this.testUrl}/*AppModel.BILLERS_CSV_FILE_PATH*/);
    // var csvFilePath = require(path.join('/path/to/modules', module));
    var csvFilePath = require('./../_sensitive/billers.csv');

    var Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
  }

  updateData = (result) => {
    const data = result.data;

    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({data: data}); // or shorter ES syntax: this.setState({ data });

    console.log(data);




    // log
    // Util.logFunctionCall("onBillerDataParseComplete");

    // construct dict
    this.billerDict = {};

    // ... ignore header row
    var startIndex = 1; 
    var count = data.length;      
    for(var i = startIndex; i < count; i++)
    {
        var rowData = data[i];

        this.billerDict[rowData[1]] = rowData[0];

        console.log(i + ": _payee:" + rowData['Payee'] + " _expenseType:" + rowData['ExpenseType']);
    }







  }

  render(){
    // Your render function
    return <div>Data</div>
  }
}

export default DataParser;