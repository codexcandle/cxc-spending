class D3Helper{
    static getDateStringYear(dateStr){
        let dateFormat = d3.timeFormat("%Y");
            
        return dateFormat(new Date(dateStr));
    }
    
    static getDateStringMonth(dateStr){
        let dateFormat = d3.timeFormat("%m");
            
        return dateFormat(new Date(dateStr));
    }






    static getYearFormFieldValue()
    {
        return d3.select("#year").node().value;
    }
    
    static setYearFormFieldValue(num)
    {
        return d3.select("#year").property('value', num);
    }
    
    static getMonthFormFieldValue()
    {
        return d3.select("#month").node().value;
    }
    
    static setMonthFormFieldValue(num)
    {
        return d3.select("#month").property('value', num);
    }








}

export default D3Helper;