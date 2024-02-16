import {GraphModule} from './GraphModule.js';
import {MeasureTitle} from './MeasureTitle.js';
import {MeasureData} from './MeasureData.js';

/*
*   Measure manager controls the process for storing the measure title and data. It uses the information to spawn graphs on the screen
*
*
*/
export class MeasureManager {

    constructor (){
        this.toProcess = [];
        this.startProcess = false;
        this.defaultGraphID = null;
        this.isPublic = false;
        this.dataLocation = "example";
        this.initialCounter = 0;
        this.MeasureTitles = [];
        this.MeasureDataset = [];
    }

    addMeasureData(id, data, minSuppression, maxSuppression){
        let md = new MeasureData(id, data, minSuppression, maxSuppression)
        this.MeasureDataset[id] = md;
    }

    setIsPublic(val){
        this.isPublic = val;
    }

    //Takes in a title object and community and then stores them locally 
    addMeasureTitle(indata, group){
        let measureTitle = new MeasureTitle( 
            indata
        );
        let key = (group  == 'undefined')? measureTitle.measureID : group+'_'+measureTitle.measureID ;
        if(!(key in this.MeasureTitles)){
            var temp = {};
            temp.GraphTitleInfo = measureTitle;
            temp.missingData = true;
            this.MeasureTitles[key] = temp;
        }
    }

    getGraphTitle(id){
        if(typeof this.MeasureTitles[id] == 'undefined'){
            return null;
        }
        return this.MeasureTitles[id].GraphTitleInfo;
    }

    //Creates a graph module based on a few inputs
    /*
    @parameter string county : represents the community that the data represents
    @parameter string measureID : represents the id of the measure.
    @parameter string parentID : represents the parent div that will hold the new module
    @parameter string divType : represents the default type of the module to build.
    @parameter string isModal : represents if the module is contained within a modal.
    @parameter string isCustom : represents if the module is not the standard graph visual
    @parameter string interval : represents the default time interval. For example: year, month, quarter

    */
    spawnNewGraph(county, measureID, parentID = "graphModulesRoot", divType = 'div', isModal = false, isCustom = "", interval = null){
        if(isModal){
            parentID = 'graphModulesRoot_Modal';
            divType = 'modal';
        }
        let gI = this.getGraphTitle(county+"_"+measureID);
        let newGraphModule = null;
        newGraphModule = new GraphModule(this.initialCounter, measureID, gI, this.isPublic, divType, parentID, county, false, 1, interval);
        this.initialCounter++;
        let data = this.grabMeasureData(measureID);
        newGraphModule.addData(data);
        newGraphModule.generateInitialGraph();
    }

    //Example script to generate fake data in the CDM format
    grabMeasureData(measureID){
        if(measureID == "example"){
            return this.generateExampleData(measureID);
        }
        else if(measureID in this.MeasureDataset){
            return this.MeasureDataset[measureID];
        }
        else{
            return null;
        }
    }

    generateExampleData(measureID){
        let data = [];
        let startDate = new Date(2020, 0, 1);
        let endDate = new Date();
        let min = 0;
        let max = 100;
        let denominator = 10000;

        let minSuppression = 1;
        let maxSuppression = 5;

        let quarterValues = [];
        let yearValues = [];

        for (let currentDate = startDate; currentDate <= endDate; ){
            let month = currentDate.getMonth()+1;
            let year = currentDate.getFullYear();

            let calculatedvalue = Math.floor(Math.random() * (max - min + 1)) + min;
            let calculatedvalue_quarter = 0;
            
            data.push(
                {
                    "numerator": calculatedvalue >= minSuppression && calculatedvalue <= maxSuppression? -1 : calculatedvalue,
                    "denominator": denominator,
                    "month": month,
                    "quarter": null,
                    "year": year,
                    "stratification": this.generateExampleStratification(calculatedvalue, minSuppression, maxSuppression),
                    "notes": "Values between 1-5 are suppressed",
                    "issuppressed" : calculatedvalue >= minSuppression && calculatedvalue <= maxSuppression? 1 : 0
                }
            );

            switch(month.toString()){
                case '1':
                    calculatedvalue_quarter = Math.floor(Math.random() * (max - min + 1)) + min;
                    quarterValues.push(
                        {
                            "numerator": calculatedvalue_quarter >= minSuppression && calculatedvalue_quarter <= maxSuppression? -1 : calculatedvalue_quarter,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 1,
                            "year": year,
                            "stratification": this.generateExampleStratification(calculatedvalue_quarter, minSuppression, maxSuppression),
                            "notes": null,
                            "issuppressed" : this.calculateFrontendSuppressionExample(calculatedvalue_quarter, minSuppression, maxSuppression)
                        }
                    );
                    let calculatedvalue_year = Math.floor(Math.random() * (max - min + 1)) + min;
                    yearValues.push(
                        {
                            "numerator": calculatedvalue_year >= minSuppression && calculatedvalue_year <= maxSuppression? -1 : calculatedvalue_year,
                            "denominator": denominator,
                            "month": null,
                            "quarter": null,
                            "year": year,
                            "stratification": this.generateExampleStratification(calculatedvalue_year, minSuppression, maxSuppression),
                            "notes": null,
                            "issuppressed" : this.calculateFrontendSuppressionExample(calculatedvalue_year, minSuppression, maxSuppression)
                        }
                    );
                break;
                case '4':
                    calculatedvalue_quarter = Math.floor(Math.random() * (max - min + 1)) + min;
                    quarterValues.push(
                        {
                            "numerator": calculatedvalue_quarter >= minSuppression && calculatedvalue_quarter <= maxSuppression? -1 : calculatedvalue_quarter,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 2,
                            "year": year,
                            "stratification": this.generateExampleStratification(calculatedvalue_quarter, minSuppression, maxSuppression),
                            "notes": null,
                            "issuppressed" : this.calculateFrontendSuppressionExample(calculatedvalue_quarter, minSuppression, maxSuppression)
                        }
                    );
                break;
                case '7':
                    calculatedvalue_quarter = Math.floor(Math.random() * (max - min + 1)) + min;
                    quarterValues.push(
                        {
                            "numerator": calculatedvalue_quarter >= minSuppression && calculatedvalue_quarter <= maxSuppression? -1 : calculatedvalue_quarter,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 3,
                            "year": year,
                            "stratification": this.generateExampleStratification(calculatedvalue_quarter, minSuppression, maxSuppression),
                            "notes": null,
                            "issuppressed" : this.calculateFrontendSuppressionExample(calculatedvalue_quarter, minSuppression, maxSuppression)
                        }
                    );
                break;
                case '10':
                    calculatedvalue_quarter = Math.floor(Math.random() * (max - min + 1)) + min;
                    quarterValues.push(
                        {
                            "numerator": calculatedvalue_quarter >= minSuppression && calculatedvalue_quarter <= maxSuppression? -1 : calculatedvalue_quarter,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 4,
                            "year": year,
                            "stratification": this.generateExampleStratification(calculatedvalue_quarter, minSuppression, maxSuppression),
                            "notes": null,
                            "issuppressed" : this.calculateFrontendSuppressionExample(calculatedvalue_quarter, minSuppression, maxSuppression)
                        }
                    );
                break;
            }
            currentDate.setMonth(currentDate.getMonth() + 1)
        }
        data.push(...quarterValues);
        data.push(...yearValues);
        return new MeasureData(measureID, data, minSuppression, maxSuppression)
    }

    //calculate suppression of the frontend. Make sure to calculate suppression before sending data to the client.
    calculateFrontendSuppressionExample(inval, minSuppression, maxSuppression){
        return inval >= minSuppression && inval <= maxSuppression? 1 : 0
    }

    generateExampleStratification(inval, minSuppression, maxSuppression){
        let strat_obj = 
            {
                "age": {
                    "18-34": {
                        "n": Math.floor(inval * 0.75),
                        "d": 3836,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.75), minSuppression, maxSuppression)
                    },
                    "35-54": {
                        "n": Math.floor(inval * 0.25),
                        "d": 5171,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.25), minSuppression, maxSuppression)
                    },
                    "55+": {
                        "n": 0,
                        "d": 6512,
                        "s": 0
                    },
                    "missing": {
                        "n": 0,
                        "d": null,
                        "s": 0
                    }
                },
                "race": {
                    "black": {
                        "n": Math.floor(inval * 0.25),
                        "d": 947,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.25), minSuppression, maxSuppression)
                    },
                    "hisp": {
                        "n": Math.floor(inval * 0.25),
                        "d": 814,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.25), minSuppression, maxSuppression)
                    },
                    "missing": {
                        "d": null,
                        "n": 0,
                        "s": 0
                    },
                    "other": {
                        "n": Math.floor(inval * 0.25),
                        "d": 99,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.25), minSuppression, maxSuppression)
                    },
                    "white": {
                        "n": Math.floor(inval * 0.25),
                        "d": 13659,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.25), minSuppression, maxSuppression)
                    }
                },
                "sex": {
                    "female": {
                        "n": Math.floor(inval * 0.75),
                        "d": 8066,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.75), minSuppression, maxSuppression)
                    },
                    "male": {
                        "n": Math.floor(inval * 0.25),
                        "d": 7453,
                        "s": this.calculateFrontendSuppressionExample(Math.floor(inval * 0.25), minSuppression, maxSuppression)
                    },
                    "missing": {
                        "n": 0,
                        "d": null,
                        "s": 0
                    }
                }
            }
        return JSON.stringify(strat_obj);
    }

}