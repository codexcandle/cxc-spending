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
    this.state = {data: {}};
  }

  changeHandler = (data) => {
    if (typeof this.props.onDataReady === 'function') {
        this.props.onDataReady(this.state.data/*e.target.value*/);
    }
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
    // const data = result.data;

    // set data
    this.setState({data: result.data});
    // or shorter ES syntax: this.setState({ data });

    // log
    // Util.logFunctionCall("onBillerDataParseComplete");
    for(var i = 0; i < result.data.length; i++)
    {
     /// console.log("TRANSACTION " + "_" + (i + 1) + ": data _date:" + result.data[i]['Date']);
    }




    // notify?
    this.changeHandler(null);
  }

  render(){
    // Your render function
    return <div>Data: {this.state.data.length}</div>
  }
}

export default DataParserTransaction;