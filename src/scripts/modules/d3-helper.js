class D3Helper{
    static getDateStringYear(dateStr){
        let dateFormat = d3.timeFormat("%Y");
            
        return dateFormat(new Date(dateStr));
    }
    
    static getDateStringMonth(dateStr){
        let dateFormat = d3.timeFormat("%m");
            
        return dateFormat(new Date(dateStr));
    }
}

export default D3Helper;