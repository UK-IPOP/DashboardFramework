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
        this.DataSet = [];
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
        if(!(key in this.DataSet)){
            var temp = {};
            temp.GraphTitleInfo = measureTitle;
            temp.missingData = true;
            this.DataSet[key] = temp;
        }
    }

    getGraphTitle(id){
        if(typeof this.DataSet[id] == 'undefined'){
            return null;
        }
        return this.DataSet[id].GraphTitleInfo;
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
        switch(isCustom){
            case "geospatial":
                newGraphModule = new GeospatialModule(this.initialCounter, measureID, gI, divType, parentID, county);
            break;
            default:
                newGraphModule = new GraphModule(this.initialCounter, measureID, gI, this.isPublic, divType, parentID, county, false, 1, interval);
        }
        this.initialCounter++;
        let data = this.grabMeasureData(measureID);
        newGraphModule.addData(data);
        newGraphModule.generateInitialGraph();
    }

    //Example script to generate fake data in the CDM format
    grabMeasureData(measureID){
        switch(measureID){
            case "example":
                return this.generateExampleData(measureID);
            break;
            case "example_geo":
                return this.generateGeoExampleData(measureID);
            break;
        }
    }

    generateExampleData(measureID){
        let data = [];
        let startDate = new Date(2020, 0, 1);
        let endDate = new Date();
        let min = 0;
        let max = 100;
        let denominator = 10000;

        let minSuppression = null;
        let maxSuppression = null;

        let quarterValues = [];
        let yearValues = [];

        for (let currentDate = startDate; currentDate <= endDate; ){
            let month = currentDate.getMonth()+1;
            let year = currentDate.getFullYear();
            data.push(
                {
                    "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                    "denominator": denominator,
                    "month": month,
                    "quarter": null,
                    "year": year,
                    "stratification": null,
                    "notes": "Values between 1-5 are suppressed",
                }
            );

            switch(month.toString()){
                case '1':
                    quarterValues.push(
                        {
                            "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 1,
                            "year": year,
                            "stratification": null,
                            "notes": null,
                        }
                    );
                    yearValues.push(
                        {
                            "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                            "denominator": denominator,
                            "month": null,
                            "quarter": null,
                            "year": year,
                            "stratification": this.generateExampleStratification(),
                            "notes": null,
                        }
                    );
                break;
                case '4':
                    quarterValues.push(
                        {
                            "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 2,
                            "year": year,
                            "stratification": null,
                            "notes": null,
                        }
                    );
                break;
                case '7':
                    quarterValues.push(
                        {
                            "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 3,
                            "year": year,
                            "stratification": null,
                            "notes": null,
                        }
                    );
                break;
                case '10':
                    quarterValues.push(
                        {
                            "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                            "denominator": denominator,
                            "month": null,
                            "quarter": 4,
                            "year": year,
                            "stratification": null,
                            "notes": null,
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

    generateGeoExampleData(measureID){
        let exampleCounties = [
            'adair','allen','anderson','ballard','barren','bath','bell',
            'boone','bourbon','boyd','boyle','bracken','breathitt','breckinridge',
            'bullitt','butler','caldwell','calloway','campbell','carlisle','carroll',
            'carter','casey','christian','clark','clay','clinton','crittenden','cumberland',
            'daviess','edmonson','elliott','estill','fayette','fleming','floyd','franklin',
            'fulton','gallatin','garrard','grant','graves','grayson','green','greenup',
            'hancock','hardin','harlan','harrison','hart','henderson','henry','hickman',
            'hopkins','jackson','jefferson','jessamine','johnson','kenton','knott','knox',
            'larue','laurel','lawrence','lee','leslie','letcher','lewis','lincoln','livingston',
            'logan','lyon','madison','magoffin','marion','marshall','martin','mason',
            'mccracken','mccreary','mclean','meade','menifee','mercer','metcalfe','monroe',
            'montgomery','morgan','muhlenberg','nelson','nicholas','ohio','oldham','owen',
            'owsley','pendleton','perry','pike','powell','pulaski','robertson','rockcastle',
            'rowan','russell','scott','shelby','simpson','spencer','taylor','todd','trigg',
            'trimble','union','warren','washington','wayne','webster','whitley','wolfe','woodford'
        ];

        let data = [];


        exampleCounties.forEach((county)=>{
            let startDate = new Date(2020, 0, 1);
            let endDate = new Date();
            let min = 0;
            let max = 100;
            let denominator = 10000;

            let quarterValues = [];
            let yearValues = [];

            for (let currentDate = startDate; currentDate <= endDate; ){
                let month = currentDate.getMonth()+1;
                let year = currentDate.getFullYear();
                data.push(
                    {
                        "community":county,
                        "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                        "denominator": denominator,
                        "month": month,
                        "quarter": null,
                        "year": year,
                        "stratification": null,
                        "notes": "Values between 1-5 are suppressed",
                        "submode": "geolocation",
                    }
                );

                switch(month){
                    case 1:
                    case '1':
                        quarterValues.push(
                            {
                                "community":county,
                                "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                                "denominator": denominator,
                                "month": null,
                                "quarter": 1,
                                "year": year,
                                "stratification": null,
                                "notes": null,
                                "submode": "geolocation",
                            }
                        );
                        yearValues.push(
                            {
                                "community":county,
                                "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                                "denominator": denominator,
                                "month": null,
                                "quarter": null,
                                "year": year,
                                "stratification": this.generateExampleStratification(),
                                "notes": null,
                                "submode": "geolocation",
                            }
                        );
                    break;
                    case 4:
                    case '4':
                        quarterValues.push(
                            {
                                "community":county,
                                "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                                "denominator": denominator,
                                "month": null,
                                "quarter": 2,
                                "year": year,
                                "stratification": null,
                                "notes": null,
                                "submode": "geolocation",
                            }
                        );
                    break;
                    case 7:
                    case '7':
                        quarterValues.push(
                            {
                                "community":county,
                                "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                                "denominator": denominator,
                                "month": null,
                                "quarter": 3,
                                "year": year,
                                "stratification": null,
                                "notes": null,
                                "submode": "geolocation",
                            }
                        );
                    break;
                    case 10:
                    case '10':
                        quarterValues.push(
                            {
                                "community":county,
                                "numerator": Math.floor(Math.random() * (max - min + 1)) + min,
                                "denominator": denominator,
                                "month": null,
                                "quarter": 4,
                                "year": year,
                                "stratification": null,
                                "notes": null,
                                "submode": "geolocation",
                            }
                        );
                    break;
                }
                currentDate.setMonth(currentDate.getMonth() + 1)
            }
        });
        
        return data;
    }

    generateExampleStratification(){
        return "{\"sex\":{\"female\":{\"n\":\"5\",\"d\":8066,\"s\":1},\"male\":{\"n\":\"5\",\"d\":7453,\"s\":1},\"missing\":{\"n\":0,\"d\":null,\"s\":0}},\"age\":{\"18-34\":{\"n\":\"5\",\"d\":3836,\"s\":1},\"35-54\":{\"n\":\"5\",\"d\":5171,\"s\":1},\"55+\":{\"n\":0,\"d\":6512,\"s\":0},\"missing\":{\"n\":0,\"d\":null,\"s\":0}},\"race\":{\"black\":{\"n\":\"5\",\"d\":947,\"s\":1},\"hisp\":{\"n\":0,\"d\":814,\"s\":0},\"missing\":{\"d\":null,\"n\":0,\"s\":0},\"other\":{\"n\":0,\"d\":99,\"s\":0},\"white\":{\"n\":\"5\",\"d\":13659,\"s\":1}}}";
        
    }

}