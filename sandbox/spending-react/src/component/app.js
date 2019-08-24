import React from 'react';

import DataParserVendor from './data-parser-vendor';
import DataParserTransaction from './data-parser-transaction';

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
                <DataParserTransaction />
            </div>
        )
    }
}

export default App;