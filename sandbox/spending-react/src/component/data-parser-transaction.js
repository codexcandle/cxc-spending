// TODO - turn this into UTIL-CSV parser class for my utils!!!!

import React, { Component } from 'react';
import AppModel from '../model/model';

class DataParserTransaction extends Component {
  constructor(props){
    // Call super class
    super(props);

    // Bind this to function updateData (This eliminates the error)
    // this.updateData = this.updateData.bind(this);

    // TODO - move external to PARSER class!
    this.transactionData = {};
  }

  componentWillMount(){
    // Your parse code, but not seperated in a function
    ////var csvFilePath = require('./../_sensitive/' + ${this.testUrl}/*AppModel.BILLERS_CSV_FILE_PATH*/);
    // var csvFilePath = require(path.join('/path/to/modules', module));
    var csvFilePath = require('./../_sensitive/transactions.csv');

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

    for(var i = 0; i < data.length; i++)
    {
      console.log("TRANSACTION " + "_" + i + ": data _date:" + data[i]['Date']);
    }

    // log
    // Util.logFunctionCall("onBillerDataParseComplete");

    // save data
    this.transactionData = data;
  }

  render(){
    // Your render function
    return <div>Data</div>
  }
}

export default DataParserTransaction;