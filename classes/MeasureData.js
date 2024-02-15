export class MeasureData {
    constructor (measureId, indata, minSuppression = null, maxSuppression = null){
        this.Measure_ID = measureId;
        this.dataMonth = []
        this.dataQuarter = []
        this.dataYear = []
        this.years = []
        this.dataUnknown = [];
        this.submodes = [];
        this.capita = 0;
        this.minSuppression = minSuppression;
        this.maxSuppression = maxSuppression;
        this.monthTotalStratification = null;
        this.quarterTotalStratification = null;
        this.yearTotalStratification = null;
        this.submodes = [];
        this.addData(indata);
    }

    //Checks to see if a given interval is possible with the data set. 
    getPossibleInterval(id, interval, county = null, submode = null){
        id = (county != null)? county+'_'+id : id;
        switch(interval){
            case 'month':
                if(submode != null && this.submodes[submode] != null && this.submodes[submode].dataMonth != null && this.submodes[submode].dataMonth.length > 0){
                    return true;
                }
                else if(this.dataMonth != null && this.dataMonth.length > 0){
                    return true;
                }
            break;
            case 'quarter':
                if(submode != null && this.submodes[submode] != null && this.data.submodes[submode].dataQuarter != null && this.data.submodes[submode].dataQuarter.length > 0){
                    return true;
                }
                else if(this.dataQuarter != null && this.dataQuarter.length > 0){
                    return true;
                }
            break;
            case 'year':
                if(submode != null && this.submodes[submode] != null && this.data.submodes[submode].dataYear != null && this.data.submodes[submode].dataYear.length > 0){
                    return true;
                }
                else if(this.dataYear != null && this.dataYear.length > 0){
                    return true;
                }
            break;
        }
        return false;
    }

    //returns the denominator based capita assigned on creation.
    getPossibleCapita(){
        return this.capita;
    }

    //returns the finest detailed time interval possible for the measure. Month > Quarter > Year
    bestMeasureInterval(submode = null, visibleMonth = false, visibleQuarter = false, visibleYear = false){
        if(submode != null && this.submodes != undefined && this.submodes[submode] != undefined){
            if(visibleMonth != 0 && this.submodes[submode].dataMonth != null && this.submodes[submode].dataMonth.length > 0){
                return 'month';
            }
            else if(visibleQuarter != 0 && this.submodes[submode].dataQuarter != null && this.submodes[submode].dataQuarter.length > 0){
                return 'quarter';
            }
            else if(visibleYear != 0 && this.submodes[submode].dataYear != null && this.submodes[submode].dataYear.length > 0){
                return 'year';
            }
        }
        else{
            if(visibleMonth != 0 && this.dataMonth != null && this.dataMonth.length > 0){
                return 'month';
            }
            else if(visibleQuarter != 0 && this.dataQuarter != null && this.dataQuarter.length > 0){
                return 'quarter';
            }
            else if(visibleYear != 0 && this.dataYear != null && this.dataYear.length > 0){
                return 'year';
            }
        }
        return 'year';
    }

    //takes in a measuredata object, processes and stores the data in time interval buckets
    addData(fulldata){
        this.monthTotalValue = fulldata.monthTotalValue;
        this.quarterTotalValue = fulldata.quarterTotalValue;
        this.yearTotalValue = fulldata.yearTotalValue;
        if(fulldata != null && fulldata.length > 0 && fulldata[0].submode != undefined){
            let data = fulldata.dataArray;
            this.monthTotalStratification = (fulldata.monthTotalStratification != null)? fulldata.monthTotalStratification : null;
            this.quarterTotalStratification = (fulldata.quarterTotalStratification != null)? fulldata.quarterTotalStratification : null;
            this.yearTotalStratification = (fulldata.yearTotalStratification != null)? fulldata.yearTotalStratification : null;


            for (let i = 0; i < data.length; i++){
                let temp = data[i];
                if(this.submodes[temp.submode] == null){
                    // this.push();
                    this.submodes[temp.submode] = {};
                    this.submodes[temp.submode].dataMonth = [];
                    this.submodes[temp.submode].dataQuarter = [];
                    this.submodes[temp.submode].dataYear = [];
                    this.submodes[temp.submode].years = [];
                }

                temp = this.cleanAndCheck(temp, this.maxSuppression);
    
                if(temp.year != null && this.years.indexOf(temp.year) < 0){
                    this.years.push(temp.year);
                }
                
                //is monthly:
                if(temp.month != null && temp.month != 0) {
                    this.submodes[temp.submode].dataMonth.push(temp)
                }
                //is quarter:
                else if (temp.quarter != null && temp.quarter != 0) {
                    this.submodes[temp.submode].dataQuarter.push(temp)
                }
                //is annual: 
                else if(temp.year != null && temp.year != 0){
                    this.submodes[temp.submode].dataYear.push(temp);
                }
                else{
                    this.submodes[temp.submode].dataUnknown.push(temp);
                }
                this.capita = (temp.denominator != null) ? temp.denominator: this.capita;
            }
        }
        else{
            let data = fulldata;
            this.monthTotalStratification = (fulldata.monthTotalStratification != null)? fulldata.monthTotalStratification : null;
            this.quarterTotalStratification = (fulldata.quarterTotalStratification != null)? fulldata.quarterTotalStratification : null;
            this.yearTotalStratification = (fulldata.yearTotalStratification != null)? fulldata.yearTotalStratification : null;
            if(data != null){
                for (let i = 0; i < data.length; i++){
                    let temp = data[i];
                    temp = this.cleanAndCheck(temp, this.maxSuppression);
        
                    if(temp.year != null && this.years.indexOf(temp.year) < 0){
                        this.years.push(temp.year);
                    }
                    
                    //is monthly:
                    if(temp.month != null && temp.month != 0) {
                        this.dataMonth.push(temp)
                    }
                    //is quarter:
                    else if (temp.quarter != null && temp.quarter != 0) {
                        this.dataQuarter.push(temp)
                    }
                    //is annual: 
                    else if(temp.year != null && temp.year != 0){
                        this.dataYear.push(temp);
                    }
                    else{
                        this.dataUnknown.push(temp);
                    }
                    this.capita = (temp.denominator != null) ? temp.denominator: this.capita;
                }
            }
        }
        
        this.years = this.years.sort();
        this.missingData = false;
    }

    //returns the list of years located in the dataset
    getMeasurePossibleYears(measure, submode = null){
        if(submode != null){
            this.years;
        }
        return this.years;
    }

    
    //returns a list of possible time intervals based on the data's stratification
    getPossibleTotalStratifications(){
        let result = [];
        let temp = this.data; 
        if(temp != null){
            if(temp.monthTotalStratification != null){
                result.push('Month (All Time)');
            }
            if(temp.quarterTotalStratification != null){
                result.push('Quarter (All Time)');
            }
            if(temp.yearTotalStratification != null){
                result.push('Year (All Time)');
            }
        }
        return result;
    }
    //returns the stratification data for a given time interval
    getStratification(measure, viewingMode){
        let temp = null;
        if(this.hasMeasure(measure)){
            temp = this.DataSet[measure]; 
        }
        if(temp != null){
            switch(viewingMode.toLowerCase()){
                case 'month':
                    return temp.monthTotalStratification;
                break;
                case 'quarter':
                    return temp.quarterTotalStratification;
                break;
                case 'year':
                    return temp.yearTotalStratification;
                break;
                default:
                    console.log('error default case: '+viewingMode.toLowerCase());
            }
        }
        return null;
    }

    //returns a summation of stratification count for a given time interval
    getStratificationTotal(measure, viewingMode){
        let temp = null;
        if(this.hasMeasure(measure)){
            temp = this.DataSet[measure]; 
        }
        if(temp != null){
            switch(viewingMode.toLowerCase()){
                case 'month':
                    return temp.monthTotalValue;
                break;
                case 'quarter':
                    return temp.quarterTotalValue;
                break;
                case 'year':
                    return temp.yearTotalValue;
                break;
                default:
                    console.log('error default case: '+viewingMode.toLowerCase());
            }
        }
        return null;
    }

    //returns if the data is missing
    hasMeasure(measure){
        if(this.missingData){
            return false;
        }
        return true;
    }
    
    //secondary step to suppressing data, if need be.
    cleanAndCheck(indata, maxSuppression){   
        if(indata.issuppressed == 1 || indata.issuppressed == "1"){
            indata.numerator = maxSuppression;
        }
        return indata;
    }

    hasSubmodes(){
        if(this.submodes != null && Object.keys(this.submodes).length > 0){
            return true
        }
        return false;
    }
}

