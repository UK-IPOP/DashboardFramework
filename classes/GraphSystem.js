export class GraphSystem {

    constructor(){
        this.color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);
    }

    // A function that create / update the plot for a given variable:
    generateGraph(indata, parentDiv, shouldFilter = true, isMulti = false) {
        
        let moduleID = this.moduleID;
        let GRAPHTYPEVISUAL = this.graphType//1 => bargraph, 2=> linegraph, 
        let GRAPHTYPEDATA = this.defaultGraphType //handles extra data processing based on graph type
        let marginTop =  this.margin.top;
        let marginLeft = this.margin.left;
        let marginRight = this.margin.right;
        let marginBottom = this.margin.bottom;

        //override the graph width if we have too much content
        this.width = (indata.length > 16) ? this.LARGEWIDTH : this.BASEWIDTH;
        
        // append the svg object to the body of the page
        let svgParent = this.generateGraphSVG(parentDiv, "svgParent", this.ratioX, this.ratioY )

        let innerGraphWidth = this.width  - this.margin.left - this.margin.right;
        let innerGraphHeight = this.height - this.margin.top - this.margin.bottom;

        this.labelWidth = this.margin.left * this.margin.left + (20);
        let labelParentWidth = this.margin.left * this.margin.left + (20);


        let graphBackground = this.createGraphBackground(svgParent);

        let svg = this.generateGraphContainerSVG(moduleID, svgParent, (this.margin.left + labelParentWidth), innerGraphWidth, innerGraphHeight);

        this.addZoomToSVG(svgParent, svg, marginLeft, marginRight, marginTop);   

        let data = null;
        let data2 = null;

        let viewingMode = this.graphMode;
        let graphInformation = this.graphInformation;
        let defaultMin = null;
        
        let capitaMode = this.capitaCurrent;
        let capitaVal = null;

        let isPercentage = false;

        switch(capitaMode){
            case 'title':
                capitaVal = this.defaultRate;//this.capita;
            break;
            case 'data':
                capitaVal = indata[0].denominator;
            break;
            case 'customrate':
                isPercentage = true;
                defaultMin = 0;
            break;
        }

        switch(GRAPHTYPEDATA){ 
            case 1: // bargraph
                defaultMin = 0;
            case 2: // linegraph

                if(isMulti){
                    let displaydata = (shouldFilter)? this.filterYearFunctionMulti(indata) : indata;
                    data = [];
                    //convert the data
                    for (let a = 0; a < displaydata.length; a++){
                        data[a] = [];
                        let community = graphInformation[a].community;
                        for (let b = 0; b < displaydata[a].length; b++) {
                            let obj = {
                                group:generateDateAxis(displaydata[a][b],viewingMode), 
                                value:procValue(displaydata[a][b], GRAPHTYPEDATA, capitaMode, capitaVal), 
                                textValue:procValue(displaydata[a][b], GRAPHTYPEDATA, capitaMode, capitaVal) + ((isPercentage)? "%" : ""), 
                                tooltipValue:procValue(displaydata[a][b], GRAPHTYPEDATA, capitaMode, capitaVal) + ((isPercentage)? "%" : ""),
                                tooltipText:this.procRateText(capitaMode),
                                num:parseFloat(displaydata[a][b].numerator), 
                                den:parseFloat(displaydata[a][b].denominator), 
                                sup:displaydata[a][b].issuppressed, 
                                minSup:graphInformation[a].minSuppression,
                                maxSup:graphInformation[a].maxSuppression,
                                measure:displaydata[a][b].measureid, 
                                unit:(capitaMode == "customrate")? "of "+(this.graphInformation.hasCustomRate.replace("percentage of","")).trim() : graphInformation[a].y_axis_label,
                                num_units:(graphInformation[a].num_units != null && graphInformation[a].num_units.length > 1) ? graphInformation[a].num_units : graphInformation[a].y_axis_label,
                                denom_units:graphInformation[a].denom_units,
                                capitaVal: capitaVal,
                                stratification:displaydata[a][b].stratification,
                                previousYear: (displaydata[a][b].previousYear != null && !isNaN(displaydata[a][b].previousYear))? procValue(displaydata[a][b], GRAPHTYPEDATA, capitaMode, capitaVal,displaydata[a][b].previousYear) : displaydata[a][b].previousYear,
                                previousYearStamp : displaydata[a][b].previousYearStamp,
                                measureTitle : graphInformation[a].measureTitle,
                                desiredTrend : graphInformation[a].desiredTrendState,
                                community: community,
                                labelX : community+" "+displaydata[a][b].measureid
                            }; 
                            data[a].push(obj);
                        }
                    }
                }
                else{
                    //convert the data
                    let displaydata = (shouldFilter)?this.filterYearFunction(indata) : indata;
                    data = displaydata.map(function (d) { 
                        let obj = {
                            group:generateDateAxis(d,viewingMode), 
                            value:procValue(d, GRAPHTYPEDATA, capitaMode, capitaVal), 
                            textValue:procValue(d, GRAPHTYPEDATA, capitaMode, capitaVal) + ((isPercentage)? "%" : ""), 
                            tooltipValue:procValue(d, GRAPHTYPEDATA, capitaMode, capitaVal) + ((isPercentage)? "%" : ""),
                            tooltipText:this.procRateText(capitaMode),
                            num:parseFloat(d.numerator), 
                            den:parseFloat(d.denominator), 
                            sup:d.issuppressed, 
                            minSup:graphInformation.minSuppression,
                            maxSup:graphInformation.maxSuppression,
                            measure:d.measureid, 
                            unit:(capitaMode == "customrate")? "of "+(this.graphInformation.hasCustomRate.replace("percentage of","")).trim() : graphInformation.y_axis_label,
                            num_units:(graphInformation.num_units != null && graphInformation.num_units.length > 1) ? graphInformation.num_units : graphInformation.y_axis_label,
                            denom_units:graphInformation.denom_units,
                            capitaVal: capitaVal,
                            stratification:d.stratification,
                            previousYear: (d.previousYear != null && !isNaN(d.previousYear))? procValue(d, GRAPHTYPEDATA, capitaMode, capitaVal,d.previousYear) : d.previousYear,
                            previousYearStamp : d.previousYearStamp,
                            
                        }; 
                        return obj;
                        }.bind(this));
                }
            break
            case 3:
                let displaydata1 = indata.line1;
                data = displaydata1.map(
                    function (d) { 
                        let obj = {
                            group:generateDateAxis(d, mode), value:d.numerator * 100, num:d.numerator, den:d.denominator, sup:d.issuppressed, measure:d.measureid,  num_units:outdata.num_units, denom_units:outdata.denom_units
                        }; 

                        return obj;
                        }
                );
                if(indata.line1 != null){
                    data2 = displaydata2.map(
                        function (d) { 
                            let obj = {
                                group:generateDateAxis(d, mode), value:d.numerator * 100, num:d.numerator, den:d.denominator, sup:d.issuppressed, measure:d.measureid,  num_units:outdata.num_units, denom_units:outdata.denom_units
                            };        
                            return obj;
                        }
                    ); 
                }
            break;
        }

        //X axis label
        let x = null;
        let x0 = null;
        let rateNames = [];
        if(isMulti){
            let labelX = this.generateXLabel(svgParent, marginTop, marginBottom,  graphInformation[0].x_axis_label, this.ratioX, this.ratioY);
            // Initialize the X axis
            for (let i = 0; i < data.length; i++) {
                if(data[i] != null){
                    for (let j = 0; j < data[i].length; j++){
                        if(!rateNames.includes(data[i][j].community+"-"+data[i][j].measureTitle)){
                            rateNames.push(data[i][j].community+"-"+data[i][j].measureTitle);
                        }
                    }
                }
            }

            x0 = this.generateX0Axis(svg, innerGraphWidth,innerGraphHeight, data, viewingMode);
            x  = d3.scaleBand();
            
            x.domain(rateNames).rangeRound([0, x0.bandwidth()]);
            
        }
        else{
            let labelX = this.generateXLabel(svgParent, marginTop, marginBottom,  graphInformation.x_axis_label, this.ratioX, this.ratioY);
            // Initialize the X axis
            x = this.generateXAxis(svg, 40, innerGraphWidth,innerGraphHeight, data);
        }
    
         
        //Y axis label
        let yLabelText = "";
        if(isMulti){
            let dropdown = document.getElementById("measureCapitaDropDown_"+this.moduleID);
            yLabelText = dropdown.options[dropdown.selectedIndex].text;
        }
        else{
            yLabelText = graphInformation.y_axis_label;
        }

        let labelY = svgParent.append('g')
        .attr("name", "labelY")
        .attr('transform', 'translate(' + [0, this.margin.top] + ')');
        
        let labelYBackground = this.generateYAxisBackground(labelY);

        this.processesYLabel(labelY,yLabelText, marginBottom, marginTop, marginLeft, capitaMode, graphInformation);

        this.labelWidth = labelY.node().getBoundingClientRect().width;
                
        
        // Initialize the Y axis
        let y = this.generateYAxis(data, data2, innerGraphHeight, defaultMin, this.labelWidth, labelY, yLabelText, isMulti, isPercentage);
        
        
        //calculate the new width for use with the background rec and padding for the graph            
        this.labelWidth = labelY.node().getBBox().width+(this.margin.left);

        //generate background rect
        labelYBackground
        .attr("width", labelY.node().getBBox().width+(this.margin.left/2)+5)
        .attr("height", graphBackground.node().getBBox().height-20);
        
        //readjust the graph
        svg.attr("transform","translate(" + (this.labelWidth-(this.margin.left * 2.5)) + "," + this.margin.top + ")");

        let graphWidth = x.bandwidth();//(isMulti)? innerGraphWidth : x.bandwidth();
        let graphHeight = function (d) { return innerGraphHeight - y(d.value); };
        let shouldShrink = (graphWidth > 50)? true : false;//(yMax.toString().length > 4)? true : false;
        
        svg.exit().remove() // wipe clean

        //calculate mean
        for (let i = 0; i < data.length; i++){
            this.mean += data[i].value;
        }
        this.mean /= data.length;

        switch(GRAPHTYPEVISUAL){
            case 1: //bars
                if(isMulti){
                    this.generateSlices(svg, graphWidth, graphHeight, x, x0, y, data, shouldShrink, innerGraphHeight, graphInformation[0].x_axis_label, graphInformation[0].desiredTrendState, this.labelWidth, rateNames);
                }
                else{
                    this.generateBars(svg, graphWidth, graphHeight, x, y, data, shouldShrink, innerGraphHeight, graphInformation.x_axis_label, this.labelWidth);
                }
            break;
            case 2: //lines
                if(isMulti){
                    this.generateMultiLines(svg, x0, y, data, GRAPHTYPEDATA, rateNames);
                }
                else{
                    this.generateLines(svg, x, y, data, GRAPHTYPEDATA);
                }
            break;
            case 3: //double lines
                this.generateDuelAxis(svg, data, data2);
            break;
        }

        this.graphX = x;
        this.graphY = y;
        this.processedData = data;
        this.hasGenerated = true;
    }


    procRateText(capitaMode){
        switch(capitaMode){
            case "1k":
                return "per 1,000 " + this.generateRateUnit(this.graphInformation);
            break;
            case "100k":
                return "per 100,000 "+ this.generateRateUnit(this.graphInformation);
            break;
        }
        return null;
    }

    generateYAxisBackground(labelY, yOffset = -20){
        return labelY.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .style("fill", "white")
        .attr("transform","translate(0,"+yOffset+")"); 
    }

    generateXLabel(svgParent, marginTop,marginBottom,  label, ratioX, height, specialFontSize = '1.5rem'){
        let labelX = svgParent.append('g')
        .attr("name", "labelX")
        .attr('transform', 'translate( 0,' + marginTop + ')');
     
        //X axis label
        if(label != null) {
            let xLabelWidth = ratioX /2;
            labelX.append('text')
            .text(label)
            .attr('transform', 'translate('+xLabelWidth+", "+ (height - marginTop - (marginBottom/3)) + ')')
            .attr('font-size',specialFontSize)
            .style("text-anchor", "middle")
        }
        return labelX;
    }
    
    processesYLabel(labelY, yAxisLabel, marginBottom, marginTop, marginLeft, capitaMode = "", graphInformation = null, specialFontSize = "1.5rem", specialSubFontSize = "0.75em"){
        if(yAxisLabel != null) {
            let labelAddition = "";
            if(!this.isMulti){
                switch(capitaMode){
                    case "totals":
                        labelAddition = "(Count)";
                    break;
                    case "1k":
                        labelAddition = "(Rate per 1,000)";
                    break;
                    case "100k":
                        labelAddition = "(Rate per 100,000)";
                    break;
                    case "percentage":
                    case "customrate":
                        labelAddition = " (Percentage)";
                    default:
                        // labelAddition = " unknown: "+capitaMode;
                }
            }
            let units = "";

            let originalLabelText = yAxisLabel;
            let triggerLongAxisLabel = false;
            let textStartingPoint = (marginBottom ) + (25) - (marginTop );
            if (yAxisLabel.length > 17){
                triggerLongAxisLabel = true;
                if(yAxisLabel.length > 25){
                    yAxisLabel = yAxisLabel.substring(0, 22)+'...';
                }
                textStartingPoint = marginBottom - marginTop;
            }

            let YText = labelY.append('g');
            
            YText.append('text')
                .text(yAxisLabel)
                .attr('font-size',specialFontSize)
                .attr('transform', 'translate(0,0) rotate(-90)')
                .attr("y", marginLeft+5)
                .attr("x",0 - textStartingPoint)
                .style("text-anchor", "middle")
    
            YText.append('text')
                .text(labelAddition)
                .attr('font-size',specialSubFontSize)
                .attr('transform', 'translate(0,0) rotate(-90)')
                .attr("y", (marginLeft * 2) + 8)
                .attr("x",0 - textStartingPoint)
                .style("text-anchor", "middle")

            if(units.length > 1){
                YText.append('text')
                    .text(units)
                    .attr('font-size',specialSubFontSize)
                    .attr('transform', 'translate(0,0) rotate(-90)')
                    .attr("y", (marginLeft * 3) + 10)
                    .attr("x",0 - textStartingPoint - ((units.length > 30)? 30 : 0))
                    .style("text-anchor", "middle")
            }


                if(triggerLongAxisLabel){
                    // Define the div for the tooltip
                    this.tooltipYAxisDiv = d3.select("body").append("div")	
                    .attr("class", "tooltip")				
                    .style("opacity", 100);

                    var div2 = this.tooltipYAxisDiv;

                    YText.on("mouseover", function(d) {		
                        div2.transition()		
                            .duration(200)		
                            // .style("opacity", .9);		
                            .style("display", "block");
                        div2.html(originalLabelText)	
                            .style("left", (d3.event.pageX) + "px")		
                            .style("top", (d3.event.pageY - 75) + "px")
                            .style("padding", "5px")
                            .style("background", "white")
                            .style("border", "solid #373a3c 5px");
                        })					
                    .on("mouseout", function(d) {		
                        div2.transition()		
                            .duration(500)		
                            .style("display", "none");	
                    });
                }
        }
        labelY.style('text-overflow','ellipsis');
        return labelY;
    }

    generateXAxis(svg, leftOffset, innerGraphWidth,innerGraphHeight, data, preventRotate = false, rotationAngle = -65, specificFontSize = "0.75em", forceGraphWidth = false){
        if(data.length < 5 || forceGraphWidth){
            let factor = 100;
            innerGraphWidth = factor * data.length;
        }
        else{
            let factor = 50;
            innerGraphWidth = factor * data.length;
            innerGraphWidth = Math.max(this.width, innerGraphWidth);
            innerGraphWidth = (innerGraphWidth > 1000 && data.length < 10)? 1000 : innerGraphWidth;
        }

        let x = d3.scaleBand()
        .range([0, innerGraphWidth])
        .padding(0.1);//0.15
                
        let xData = data.map(function (d) {return d.group});
        x.domain(xData);

        let xAxis = svg.append("g")
            .attr("transform", "translate("+leftOffset+"," + innerGraphHeight + ")")
            .style("font-size", specificFontSize);
            
        if(!preventRotate){
            xAxis.call(d3.axisBottom(x))
            .selectAll("text")	
            .attr("dx", "-.8em")
            .style("text-anchor", "end")
            .attr("dy", ".15em")
            .attr("transform", "rotate("+rotationAngle+")");
        }
        else{
            xAxis.call(d3.axisBottom(x))
            .selectAll("text")	
            .style("font-size", "1em");
        }
        return x;
    }

    generateX0Axis(svg, innerGraphWidth,innerGraphHeight, data, viewingMode, preventRotate = false){
        var x0  = d3.scaleBand().rangeRound([0, innerGraphWidth], .5).paddingInner(0.25);
        
        //generate a default list of possible intervals to keep ordering
        let testIntervals = this.generateTestIntervals(viewingMode, this.minYear, this.maxYear);  

        //collect intervals that we have
        let temHashTable = [];
        let categoriesNames = [];
        for (let a = 0; a < data.length; a++){
            for (let b = 0; b < data[a].length; b++){
                temHashTable[data[a][b].group] = 1;
            }
        }

        //loop through the possible intervals, if we find have found them in the data, add them to the x axis
        let keys = Object.keys(temHashTable);
        for (let a = 0; a < testIntervals.length; a++){
            if(keys.indexOf(testIntervals[a]) != -1 && categoriesNames.indexOf(testIntervals[a]) == -1){
                categoriesNames.push(testIntervals[a]);
            }
        }

        x0.domain(categoriesNames);
        let xAxis = svg.append("g")
            .attr("transform", "translate(40," + innerGraphHeight + ")");
        xAxis.call(
            d3.axisBottom(x0).tickValues(categoriesNames.map(d=>d))
        );

        xAxis.selectAll("text")	
        .style("font-size", "1em")
        .attr("dx", "-.8em")
        .style("text-anchor", "end")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
        return x0;
    }


    generateYAxis(data, data2, innerGraphHeight, defaultMin, labelWidth, labelY, labelYText, isMulti, overridePercentage = false, specialFontSize = '0.75em'){
        let yMax = 0;
        let yUnit = '';
        let y = d3.scaleLinear()
            .range([innerGraphHeight, 0]);
        let yMin = 0;
        let triggerKVal = false;

        //force the range if it's a percentage
        if(overridePercentage){
            yUnit = '%';
            y.domain([0, 100]);
            yMax = 100;
        }
        else if(isMulti){
            for (let a = 0; a < data.length; a++){
                data[a].forEach((d)=>{
                    if(yMax < parseFloat(d.value)){
                        yMax = parseFloat(d.value);
                    }
                    if(yMin > parseFloat(d.value)){
                        yMin = parseFloat(d.value);
                    }
                });
            }


            if(yMax > 0 && yMax < 1 && yMin > 0 && yMin < 1){
                for (let i = 0; i < data.length; i++){
                    for (let j = 0; j < data[i].length; j++){
                        data[i][j].textValue = ((data[i][j].value.toFixed(5) == 0 && data[i][j].value > 0)? data[i][j].value.toExponential(2): data[i][j].value.toFixed(5));          
                    }
                }
            }
            else{
                if(yMax > 10000 && yMin > 10000){
                    triggerKVal = true;
                    yMax = yMax / 1000;
                    yMin = yMin / 1000;
                }
                for (let i = 0; i < data.length; i++){
                    for (let j = 0; j < data[i].length; j++){
                        if(data[i][j].value > 10000){
                            data[i][j].subUnit = 'k';
                            data[i][j].textValue = (data[i][j].value / 1000).toFixed(1) + data[i][j].subUnit;
                            if(triggerKVal){
                                data[i][j].value = data[i][j].value / 1000;
                            }
                        } 
                    }
                }
            }
            if(yMin == yMax){
                y.domain([0, yMax+1]);
            }
            else{
                y.domain([((defaultMin != null)? defaultMin : yMin), yMax]);
            }
        }
        else{
            data.forEach((d)=>{
                if(yMax < d.value){
                    yMax = d.value;
                }
            })

            if(data2 != null){
                yMax = d3.max(data2, function (d) { return (yMax < d.value)?d.value:yMax});
            }
        
            yMin = d3.min(data, function (d) { return d.value});
            if(data2 != null){
                yMin = d3.min(data2, function (d) { return (yMin > d.value)?d.value:yMin});
            }
            
            
            
            if(yMax > 0 && yMax < 1 && yMin > 0 && yMin < 1){
                for (let i = 0; i < data.length; i++){
                    data[i].textValue = ((data[i].value.toFixed(5) == 0 && data[i].value > 0)? data[i].value.toExponential(2): data[i].value.toFixed(5));          
                }
            }
            else{
                if(yMax > 10000 && yMin > 10000){
                    triggerKVal = true;
                    yMax = yMax / 1000;
                    yMin = yMin / 1000;
                }
                for (let i = 0; i < data.length; i++){
                    if(data[i].value > 10000){
                        data[i].subUnit = 'k';
                        data[i].textValue = (data[i].value / 1000).toFixed(1) + data[i].subUnit;
                        if(triggerKVal){
                            data[i].value = data[i].value / 1000;
                        }
                    } 
                }
            }
        }

        if(yMin == yMax){
            y.domain([0, yMax+1]);
        }
        else{
            y.domain([((defaultMin != null)? defaultMin : yMin), yMax]);
        }
        //change the axis size to handle longer values

        if(labelYText.toLowerCase() === "percentage"){
            yUnit = '%';
        }
        else if (triggerKVal){
            yUnit = 'k';
        }
        if(labelYText.toLowerCase() === "percentage"){
            yUnit = '%';
        }
        else if (triggerKVal){
            yUnit = 'k';
        }

        //generate the y axis
        this.yAxis = labelY.append("g")
        .attr("id", "yAxis")
        .attr("class", "yAxis")
        .style("font-size", specialFontSize);

        if(yMin == yMax){
            this.yAxis.call(d3.axisLeft(y).ticks(1).tickFormat(function(d) {return d+yUnit; }));
        }
        else{
            this.yAxis.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) {return d+yUnit; }));
        }

    
        let extraPadding = (this.isMulti)? this.margin.left : this.margin.left; //give a little padding to the multi due to no y-axis label
        //calculate the margin to the left of the axis and reposition the axis       
        let yCalc = labelWidth +labelY.node().getBBox().width + ((this.isMulti)? 30 : 0 );
        this.yAxis.attr("transform", 'translate('+(yCalc-25)+',0)');

        return y;
    }

    generateYAxisSpecial(yMax, innerGraphHeight, defaultMin, labelWidth, labelY, labelYText, overridePercentage = false){
        let yUnit = '';
        let y = d3.scaleLinear()
            .range([innerGraphHeight, 0]);
        let yMin = 0;

        
        y.domain([((defaultMin != null)? defaultMin : yMin), yMax]);
        
        //generate the y axis
        let yAxis = labelY.append("g")
        .style("font-size", "0.75em");

        if(yMin == yMax){
            this.yAxis.call(d3.axisLeft(y).ticks(1).tickFormat(function(d) {return d+yUnit; }));
        }
        else{
            this.yAxis.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) {return d+yUnit; }));
        }

        //calculate the margin to the left of the axis and reposition the axis       
        let yCalc = labelWidth +labelY.node().getBBox().width;
        this.yAxis.attr("transform", 'translate('+yCalc+',0)');
        return y;
    }

    generateStratificationGraph(d, possibleOptions = 0){
        let didDisplayGraphs = false;
        if(d.stratification != null && d.stratification.length > 0){
            this.toggleBreakDownGraphSubmodule(true);
            this.resetGraphBreakdown();
            let breakdownLabel = this.graphInformation.measureTitle+" <br/>";
            let textVal = d.textValue;
            //we already formated it: > 1000
            if(d.textValue.toString().includes('k')){
                textVal = Number(d.tooltipValue).toLocaleString();
            }
            else if(d.value < 1 && d.value > 0){
                let temp = (Math.floor(d.value * 10000 )) / 10000;
                if(temp == 0 && d.value > 0){
                    textVal = d.value.toExponential(2)
                }
                else {
                    textVal = temp;
                }
            }
            else if(d.value != null){
                textVal = Number((Math.floor(d.value * 10000 )) / 10000).toLocaleString();
            }
            
            breakdownLabel += "Breakdown of "+d.group+"<br/> Total: "+textVal+" "+d.num_units+"<br/>";
            document.getElementById("mGSSBDTitle_"+this.moduleID).innerHTML = breakdownLabel;

            let exp = document.createElement("div");
            exp.id = "breakdown_exp";
            exp.className = "col-12";
            exp.appendChild(this.generateGraphUIExpl(true));

            document.getElementById('measureBreakDownGraphDivContent_'+this.moduleID).appendChild(exp);

            try{        
                let indata =JSON.parse(d.stratification);
                if(indata.age != null){
                    didDisplayGraphs = true;
                    this.generateBreakDownGraphDiv(indata.age, "Age");
                }
                if(indata.race != null){
                    didDisplayGraphs = true;
                    this.generateBreakDownGraphDiv(indata.race, "Race");
                }
                if(indata.sex != null){
                    didDisplayGraphs = true;
                    this.generateBreakDownGraphDiv(indata.sex, "Sex");
                } 
                if(indata.degree != null){
                    didDisplayGraphs = true;
                    this.generateBreakDownGraphDiv(indata.degree, "Degree");
                }        
                let tool = document.createElement("div");
                tool.id = "missing_cat_exp";
                tool.className = "col-12";
                tool.style.marginTop = "1%";
                tool.innerHTML = "<b>Missing category includes no response, not applicable, not available, and undetermined values.</b>";
                document.getElementById('measureBreakDownGraphDivContent_'+this.moduleID).appendChild(tool);
            } catch(exc){
                console.log(exc);
                // document.getElementById('measureBreakDownGraphDivContent_'+this.moduleID).innerHTML="No Data to Display";
            }
        }
        
        if(!didDisplayGraphs){
            if(possibleOptions > 0){
                document.getElementById('mGSSParentDD_'+this.moduleID).options[1].selected = true;
                this.processBreakdownChange();
            }
            else{
                let stratGraphError = document.createElement("DIV");
                stratGraphError.className = 'col-12';
                stratGraphError.style.textAlign = "center";
                stratGraphError.style.margin = "1%";
                stratGraphError.innerHTML = "<h2>No Data to Display Due to Suppression Rules</h2>";
                document.getElementById('measureBreakDownGraphDivContent_'+this.moduleID).appendChild(stratGraphError);
            }            
        }
    }

    generateBreakDownGraphDiv(indata, name){
        let moduleID = this.moduleID;
        let ratioXSpecial = 475;
        let ratioYSpecial = 275;

        let marginTop =  20;//this.margin.top;
        let marginLeft = 15;//this.margin.left;
        let marginRight = 100;//this.margin.right;
        let marginBottom = 105;//this.margin.bottom;

        let innerGraphWidth = ratioXSpecial /*this.width*/  - marginLeft - marginRight;
        let innerGraphHeight = ratioYSpecial /*this.height*/ - marginTop - marginBottom;
        let labelWidth = marginLeft * marginLeft + (20);
        let labelParentWidth = marginLeft * marginLeft + (20);

        let graphInformation = this.graphInformation;

        let stratGraphDivParent2 = document.createElement("DIV");
        stratGraphDivParent2.id = "measureBreakdownStratGraph2";
        stratGraphDivParent2.className = (this.divState == 0)? 'col-4' : 'col-12';
        stratGraphDivParent2.style.margin = '0px';

        let stratGraph = document.createElement("DIV");
        stratGraph.className = '';
        stratGraph.style.border = "solid black 1px";
        stratGraph.style.margin = "1%";
        stratGraphDivParent2.appendChild(stratGraph);

        document.getElementById('measureBreakDownGraphDivContent_'+this.moduleID).appendChild(stratGraphDivParent2);
        let tempProcDataRace = this.convertBreakDownData(indata, graphInformation);
        let svgStrat = this.generateGraphSVG(stratGraph, "svgStrat2", ratioXSpecial, ratioYSpecial );
        
        let graphBackground = this.createGraphBackground(svgStrat);

        let svg = this.generateGraphContainerSVG(moduleID, svgStrat, (marginLeft + labelParentWidth), innerGraphWidth, innerGraphHeight);

        this.addZoomToSVG(svgStrat, svg, marginLeft, marginRight, marginTop);
        
        //X axis label
            let labelX = this.generateXLabel(svgStrat, marginTop, marginBottom,  "Category: "+name, ratioXSpecial, ratioYSpecial);

        // Initialize the X axis
        
        let x = this.generateXAxis(svg, 40, innerGraphWidth,innerGraphHeight, tempProcDataRace, true, -65, "0.75em", true);

        //Y axis label               
            let labelY = svgStrat.append('g')
            .attr("name", "labelY")
            .attr('transform', 'translate(' + [0, marginTop] + ')');
            
            let labelYBackground = this.generateYAxisBackground(labelY);
            
            
    

            this.processesYLabel(labelY, this.graphInformation.y_axis_label, marginBottom, marginTop, marginLeft, "",this.graphInformation);
    
            labelWidth = labelY.node().getBoundingClientRect().width+marginLeft;
            
                
        // Initialize the Y axis
            let defaultMin = 0;

            let y = this.generateYAxis(tempProcDataRace, null, innerGraphHeight, defaultMin, labelWidth, labelY, this.graphInformation.y_axis_label, false);
            
        //calculate the new width for use with the background rec and padding for the graph            
            labelWidth = labelY.node().getBBox().width-(this.margin.left*2);
    
        //generate background rect
            labelYBackground
            .attr("width", labelY.node().getBBox().width+this.margin.left)
            .attr("height", graphBackground.node().getBBox().height);
            
        //readjust the graph
            svg.attr("transform","translate(" + (labelWidth+this.margin.left) + "," + this.margin.top + ")");
    
            let graphWidth = x.bandwidth()/2;
            let graphHeight = function (d) { return innerGraphHeight - y(d.value); };

            let shouldShrink = false;//true;//(yMax.toString().length > 2)? true : false;
            svg.exit().remove() // wipe clean

        this.generateBars(svg, graphWidth, graphHeight, x, y, tempProcDataRace, shouldShrink, innerGraphHeight, name);
    }

    convertBreakDownData(indata, graphInformation){
        let tempProcDataRace = [];
        for (const [key, value] of Object.entries(indata)) {
            let tempObj = {
                group : key,
                value : (value.s == 1 || value.s == "1")? 
                    (value.overrideMaxSuppression != null) ? value.overrideMaxSuppression : graphInformation.maxSuppression 
                    :  value.n,
                textValue : value.n,
                tooltipValue:value.n,
                den : value.d,
                num : value.n,
                sup : value.s,
                minSup:(value.overrideMinSuppression != null) ? value.overrideMinSuppression : graphInformation.minSuppression,
                maxSup:(value.overrideMaxSuppression != null) ? value.overrideMaxSuppression : graphInformation.maxSuppression,
                measure:'2.4', 
                unit:graphInformation.y_axis_label,
                num_units:(graphInformation.num_units != null && graphInformation.num_units.length > 1) ? graphInformation.num_units : graphInformation.y_axis_label, 
                denom_units:graphInformation.denom_units,
                capitaVal: null,// capitaVal,
                stratification: null,
                isStratification:true
            };
            tempProcDataRace.push(tempObj);
        }
        return tempProcDataRace;
    }

    generateGraphSVG(parentContainerDiv, name, ratioX, ratioY ){
        return d3.select(parentContainerDiv)
                    .append("svg")
                    .attr("id", "measureSVGParent_"+this.moduleID)
                    .attr("width", "100%")// + margin.left + margin.right)
                    .attr("height", "100%")// + margin.top + margin.bottom)
                    .attr("name", name)
                    .attr("preserveAspectRatio", "xMidYMid")
                    .attr("viewBox", "0 0 "+ ratioX+" "+ratioY);
    }

    addZoomToSVG(parentSVG, childSVG, marginLeft, marginRight, marginTop){
        parentSVG.call(d3.zoom().on("zoom", function () {

            //apply zoom/pan
            let minPan = 0 - childSVG.node().getBBox().width + marginLeft + marginRight;
            let maxPan = marginRight - marginLeft;
            
            //limit pan
            let translateX = d3.event.transform.x;
            if(d3.event.transform.x < minPan){
                translateX = minPan
            } 
            else if (d3.event.transform.x > maxPan){
                translateX = maxPan
            }
            d3.event.transform.x = translateX;

            //allow pan in x but not y axis
            childSVG.attr("transform","translate(" + translateX + ", "+marginTop+")");
            })
            
        ).on("wheel.zoom", null)
        .on("dblclick.zoom", null);
    }

    generateGraphContainerSVG(id, svgParent, translateValue, width, height){
        let svg = svgParent
            .append("g")
            .attr("transform","translate(" + translateValue + ",0)")// + this.margin.top + ")")
            .attr("width", width)
            .attr("height", height)
            .attr("name", "svgGraph")    
            .attr("id", "svgGraph_"+id);        
        
        svg.append('defs')
            .append('pattern')
            .attr('id', 'diagonalHatch')
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', 4)
            .attr('height', 4)
            .append('path')
            .attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
            .attr('stroke', '#000000')
                        .attr('stroke-width', 1);
        return svg;
    }



    createGraphBackground(parentDiv){
        return parentDiv.append("rect")
        .attr('id', 'background')
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", '100%')
        .attr("height", '100%')
        .style("fill", "white");
    }

    generateDuelAxis(svg, x, y, data, data2){

        this.createALine(svg, x, y, data, 'line', 'line');
        this.createALine(svg, x, y, data2, 'line2', 'line2');
    }

    createALine(svg, x, y, indata, label, htmlclass, forceColor = null, specificColor = null, forceTooltip = false){        
        let debugArray = [];
        for (let a = 0; a < indata.length; a++){
            if(indata[a].value >= 0){
                debugArray.push(indata[a])
            }
        }
        var tempDiv = this.tooltipDiv;
        let line = d3.line()
        .x(function (d) {return x(d.group) + x.bandwidth() / 2;})
        .y(function(d) {return y(d.value);})
        // Create Line
        let path = svg.append("path")
        .data([debugArray])
        .attr("class", htmlclass)
        .attr("id", label)
        .attr("d", line)
        .attr("fill","none")
        .attr("stroke", function(d) {
            if(forceColor != null && d != null && d.length > 0){
                return this.color(d[0].community+"-"+d[0].measureTitle)
            }
            else if(specificColor != null){
                return specificColor;
            }
            return "#982568" 
        }.bind(this))
        .attr("stroke-width","3px")
        .attr("transform", "translate(40,0)");

        if(forceTooltip){
            path.attr("stroke-width","6px")
            path.on("mouseover", function(d, index) {	
                tempDiv.transition()		
                    .duration(0)		
                    // .style("opacity", .9);		
                    .style("display", "block");
                
                tempDiv.innerHTML = "";
                tempDiv
                    .style("left", (d3.event.pageX+25) + "px")		
                    .style("top", (d3.event.pageY - 100) + "px")
                    .style("padding", "5px")
                    .style("background", "white")
                    .style("border", "solid #373a3c 5px")
                    .style("text-align", "left");
                tempDiv.html(d[0].tooltipValue);
                                
            }.bind(this))					
            .on("mouseout", function(d, index) {	
                    tempDiv.transition()		
                    .duration(2000)		
                    .style("display", "none");	
            });
        }


        return line;
    }

    createCirclesWithToolTips(svg, x, y, data, type, graphInformation, htmlclass = "", customRadius = 6){

        let debugArray = [];
        for (let a = 0; a < data.length; a++){
            if(data[a].value >= 0){
                debugArray.push(data[a])
            }
        }
        
        var tempDiv = this.tooltipDiv;
        
        //Prepare placeholder for circles
        var g = svg.selectAll(null)
            .data(debugArray)
            .enter()
            .append("g")
            .attr("transform", "translate(40,0)");
            
        //Insert Circles
        g.append("circle")
        .attr("class", "circle "+htmlclass)
        .attr("r", customRadius)
        .attr("cx", function(d){return x(d.group)  + x.bandwidth() / 2;})
        .attr("cy", function(d){return y(d.value);})
        .attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
            else { return "#373a3c";}}.bind(this))

        .style("stroke", "#373a3c")
        .on("click", function(d){
            if(type != 4){
                this.originalStratification = d;
                let currentPossible = this.initGraphBreakDown(d.group);
                this.generateStratificationGraph(d, currentPossible);
            }
        }.bind(this))
        .on("mouseover", function(d, index, circles) {	
            d3.select(circles[index]).style("fill", "white");
            tempDiv.transition()		
                .duration(0)		
                .style("display", "block");
            tempDiv.innerHTML = "";
            type = parseInt(type);
            switch(type){
                case 0:
                    return;
                break;
                case 1:
                    tempDiv
                        .style("left", (d3.event.pageX+25) + "px")		
                        .style("top", (d3.event.pageY - 100) + "px")
                        .style("padding", "5px")
                        .style("background", "white")
                        .style("border", "solid #373a3c 5px")
                        .style("text-align", "left");
                        tempDiv.html(this.generateTooltipText(graphInformation.x_axis_label, graphInformation.desiredTrendState, d, this.moduleID));
                break;
                case 2:
                    tempDiv
                        .style("left", (d3.event.pageX+25) + "px")		
                        .style("top", (d3.event.pageY - 100) + "px")
                        .style("padding", "5px")
                        .style("background", "white")
                        .style("border", "solid #373a3c 5px")
                        .style("text-align", "left");
                    tempDiv.html(this.generateTooltipText(graphInformation.x_axis_label, graphInformation.desiredTrendState, d, this.moduleID));
                break;
                case 3:
                    tempDiv
                        .style("left", (d3.event.pageX+25) + "px")		
                        .style("top", (d3.event.pageY - 100) + "px")
                        .style("padding", "5px")
                        .style("background", "white")
                        .style("border", "solid #373a3c 5px")
                        .style("text-align", "left");
                    tempDiv.html(d.tooltipValue);
                break;
                case 4:
                    console.log(d);
                    if(d.group == "Other" || d.labelX == "Other"){
                        let dataStrat = JSON.parse(d.stratification);
                        let content = "";
                        tempDiv
                            .style("left", (d3.event.pageX+15) + "px")		
                            .style("top", (d3.event.pageY - 50) + "px")
                            .style("padding", "5px")
                            .style("background", "white")
                            .style("border", "solid #373a3c 5px")
                            .style("text-align", "left");
                        content = (d.labelX+": "+d.value.toString()+" "+d.labelY+"<br/>"+d.group+"<br/>");
                        let keys = Object.keys(dataStrat);
                        console.log(keys);
                        if(keys.length > 0){
                            content += "<hr/><b>Break Down:</b> <br/>";
                        }
                        for(let i = 0; i < keys.length; i++){ 
                            content += keys[i]+": "+dataStrat[keys[i]]+"<br/>";
                        }
                        tempDiv.html(content);
                    }
                    else {
                        tempDiv
                        .style("left", (d3.event.pageX+15) + "px")		
                        .style("top", (d3.event.pageY - 50) + "px")
                        .style("padding", "5px")
                        .style("background", "white")
                        .style("border", "solid #373a3c 5px")
                        .style("text-align", "left");
                        tempDiv.html(d.labelX+": "+d.value.toString()+" "+d.labelY+"<br/>"+d.group);
                    }

                    
                break;
            }
            
        }.bind(this))					
        .on("mouseout", function(d, index, circles) {	
            d3.select(circles[index])
            .style('fill', function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
                else {return "#373a3c";}}.bind(this) )
                tempDiv.transition()		
                .duration(2000)		
                .style("display", "none");	
        });

        return svg.selectAll('.circle');
    }


    generateLines(svg, x, y, data, type){
        let graphInformation = this.graphInformation;
        // Define the div for the tooltip
        this.tooltipDiv = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 100);

        this.lineGraph = {
            line : null,
            circles : null
        };
        // Create Line
        this.lineGraph.line = this.createALine(svg, x, y, data, 'line', 'measureLine');
        this.lineGraph.circles = this.createCirclesWithToolTips(svg, x, y, data, type, graphInformation, "measureCircle");
        
    }

    generateMultiLines(svg, x, y, data, type, rateNames, mode = 0){
        let graphInformation = this.graphInformation;
        // Define the div for the tooltip
        this.tooltipDiv = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 100);

        
        for (let a in data){ //(let a = 0; a < data.length; a++){
            this.createALine(svg, x, y, data[a], this.moduleID+"-"+data[a][0].labelX.split(" ").join("-"), 'line', true);
            this.createCirclesWithToolTips(svg, x, y, data[a], type, graphInformation);
        }

        //generate legend
        let svgUncle = document.getElementById("measuredataGraphLegend_"+this.moduleID);
        svgUncle.innerHTML = "";

        this.generateLegendText(rateNames,svgUncle,mode);
    }


    generateBars(svg, graphWidth, graphHeight, x, y, data, shouldShrink, height, label, labelWidth, textFontOverride = '0.7em'){
        svg.selectAll("text.textlabel").remove();
        
        let colorMain = "#982568";
        // Define the div for the tooltip
        this.tooltipDiv = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 100);

        var tempDiv = this.tooltipDiv;

        // Create the u variable
        var u = svg.selectAll(".bar")
        .data(data)


        let xFactor = x.bandwidth() /2 - 20;
        let xWidth = 40;
        if(xFactor < 0){
            xWidth = graphWidth-10;
        }

        xFactor = Math.max(5, xFactor);
        u.enter().append("g")
        .attr("class", "bars")
        .append("rect")
        .attr("class", "bar") // Add a new rect for each new elements
        .merge(u) 
        .transition() // and apply changes to all of them
        .duration(0)
        .attr("x", function (d) { return x(d.group) + xFactor; })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", xWidth)//50-10)//graphWidth-10)
        .attr("height", graphHeight)
        .attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
            else { return colorMain;}} )

        .attr("stroke", "#982568")
        .attr("transform", "translate(40, 0)")
            
        let graphInformation = this.graphInformation;

        let desiredTrend = (graphInformation != null) ? graphInformation.desiredTrendState : null;

        var u2 = svg.selectAll(".bar")
            .data(data)// get the already existing elements as well
        .on("click", function(d){
            if(d.stratification != null && d.stratification.length > 0)
            {
                this.originalStratification = d;
                let currentPossible = this.initGraphBreakDown(d.group);
                this.generateStratificationGraph(d, currentPossible);
            }
        }.bind(this))
        .on("mouseover", function(d, index, bars) {	
            d3.select(bars[index]).attr("fill", "#521337");
            tempDiv.transition()		
                .duration(200)			
                .style("display", "block")
                .style("text-align", "left");
            tempDiv
                .style("left", (d3.event.pageX+25) + "px")		
                .style("top", (d3.event.pageY - 100) + "px")
                .style("padding", "5px")
                .style("background", "white")
                .style("border", "solid #373a3c 5px");

            tempDiv.html(this.generateTooltipText(label, desiredTrend, d, this.moduleID));

            }.bind(this))					
        .on("mouseout", function(d, index, bars) {
            d3.select(bars[index]).attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
            else { return "#982568";}} )
            tempDiv.transition()		
                .duration(500)		
                .style("display", "none");	
        });

        this.bars = svg.selectAll(".bars").data(data);
        this.bars.selectAll(".textlabel").remove();
        
        let text = this.bars.append('text')
        .attr("class", "textlabel")
        .attr("transform", "translate(40,0)")
        .style("font-size", textFontOverride)
        .text(function(d) { 
            return (d.sup != 1)? this.generateLabel(d.value, d.textValue) : this.generateSuppressionText(d);//d.minSup+'-'+d.maxSup;
        }.bind(this))

        .attr("x", function (d) {if (d.sup == 1) { return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2);   } else {return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2)}})// - (d.value.toString().length * 4); }})
        .attr("y", function (d) { return y(d.value) - 5; })
        
        let text2 = this.bars.append('text')
        .attr("class", "")
        .attr("transform", "translate(40,0)")
        .style("font-size", textFontOverride) //note: we are increasing not shrinking
        .style("text-anchor", "left")
        .style("fill", "white")
        .style("stroke", "white")
        .text(
            function(d) { return (d.stratification != null && d.stratification.length > 0)? 
                '...' : '' }
            )
        .attr("x", function (d) {if (d.sup == 1) { return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2);   } else {return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2)}})// - (d.value.toString().length * 4); }})
        .attr("y", function (d) { return (height - 10)})
        .on("click", function(d){
            if(d.stratification != null && d.stratification.length < 1)
            {
                this.originalStratification = d;
                let currentPossible = this.initGraphBreakDown(d.group);
                this.generateStratificationGraph(d, currentPossible);
            }
        }.bind(this))
        .on("mouseover", function(d, index, bars) {
            d3.select(bars[index]).attr("fill", "#521337");
            tempDiv.transition()		
                .duration(200)			
                .style("display", "block")
                .style("text-align", "left");
            tempDiv
                .style("left", (d3.event.pageX+25) + "px")		
                .style("top", (d3.event.pageY - 100) + "px")
                .style("padding", "5px")
                .style("background", "white")
                .style("border", "solid #373a3c 5px");
            tempDiv.html(this.generateTooltipText(label, graphInformation.desiredTrendState, d, this.moduleID));
            }.bind(this))					
        .on("mouseout", function(d, index, bars) {
            d3.select(bars[index]).attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
            else { return "#982568";}} )
            tempDiv.transition()		
                .duration(500)		
                .style("display", "none");	
        });
    }

    generateSuppressionText(d){
        if (d.value >= d.minSup && d.value <= d.maxSup){
            return d.minSup+'-'+d.maxSup;
        }
        else{
            return "";
        }
    }
    
    generateSlices(svg, graphWidth, graphHeight, x1, x0, y, data, shouldShrink, innerGraphHeight, x_axis_label, desiredTrendState, labelWidth, rateNames){
        this.tooltipDiv = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 100);
        
        let combined = [];
        for (let a = 0; a < data.length; a++){
            for (let b = 0; b < data[a].length; b++){
                combined.push(data[a][b]);
            }
        }

        this.tooltipYAxisDiv = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 100);

        var tempDiv = this.tooltipDiv;


        var tempIter = 0;

        let generatedSlice = svg.selectAll(".slice")
        .data(combined);
        
        generatedSlice.enter().append("g")
            .attr("class", "g")
            .attr("transform",function(d) {return "translate(" + (x0(d.group)+40) + ",0)"; })
            .append("rect")
            .attr("class", "bar")
            .merge(generatedSlice) 
            .transition() // and apply changes to all of them
            .duration(0)
            .attr("width", x1.bandwidth())
            .attr("name", function(d) {return  d.community+"-"+d.measureTitle; })
            .attr("x", function(d) { tempIter++; return x1(d.community+"-"+d.measureTitle); })
            .attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
                else { return this.color(d.community+"-"+d.measureTitle);}}.bind(this))
            .attr("stroke", function(d) {return this.color(d.community+"-"+d.measureTitle);}.bind(this) )
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return innerGraphHeight - y(d.value); });

        var u2 = svg.selectAll(".bar")
            .data(combined)// get the already existing elements as well
            .on("mouseover", function(d) {
                tempDiv.transition()		
                .duration(200)			
                .style("display", "block")
                .style("text-align", "left");
                tempDiv
                    .style("left", (d3.event.pageX+25) + "px")		
                    .style("top", (d3.event.pageY - 100) + "px")
                    .style("padding", "5px")
                    .style("background", "white")
                    .style("border", "solid #373a3c 5px");

                tempDiv.html(this.generateTooltipText(x_axis_label, d.desiredTrend, d, this.moduleID))	

        }.bind(this))
        .on("mouseout", function(d) {
            // d3.select(this).style("fill", color(d.group));
            tempDiv.transition()		
                .duration(500)		
                .style("display", "none");	
        });

        //generate legend
        let svgUncle = document.getElementById("measuredataGraphLegend_"+this.moduleID);
        svgUncle.innerHTML = "";
        this.generateLegendText(rateNames,svgUncle);
    }

    generateLegendText(data, svgUncle, mode = 0){
        for(let a = 0; a < data.length; a++){
            let legendEntry = document.createElement("P");
            legendEntry.style.fontSize = "0.75em";
            legendEntry.style.lineHeight = "1.25em";
            let legendEntryText = '<svg width="0.9em" height="0.9em" viewBox="0 0 16 16" class="bi bi-square-fill" fill="'+this.color(data[a])+'" xmlns="http://www.w3.org/2000/svg"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg>';
            legendEntryText += "&nbsp;&nbsp;&nbsp;";
            legendEntryText += data[a];

            legendEntry.innerHTML = legendEntryText;
            svgUncle.appendChild(legendEntry);
            if(mode == 0){
                let id = this.moduleID+"-"+data[a].split(" ").join("-"); 
                document.getElementById(id).setAttribute("fill", this.color(data[a]));
            }
            else{
                let id = this.moduleID+"-"+data[a].split(" ").join("-"); 
                document.getElementById(id).setAttribute("stroke", this.color(data[a]));
            }
        }
    }

    generateLegend(data, svgUncle){
        //Legend
        svgUncle.selectAll(".legend").remove();

        var legend = svgUncle.selectAll(".legend")
        .data(data)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })

        legend.append("rect")
        .attr("x", 18)
        .attr("width", 28)
        .attr("height", 18)
        .style("fill", function(d) {
            let id = this.moduleID+"-"+d.split(" ").join("-"); 
            document.getElementById(id).setAttribute("fill", this.color(d)); 
            return this.color(d); 
        }.bind(this));

        legend.append("text")
        .attr("x", 66)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) {return d; });
    }

    generateLabel(originalValue, textValue){
        let result = '';
        //we already formated it: > 1000 || percentage
        if(textValue.toString().includes('k') || textValue.toString().includes('K') || textValue.toString().includes('%')){
            result = textValue;
        }
        else if(originalValue < 1 && originalValue > 0){
            result = (Math.floor(originalValue * 1000 )) / 1000;
        }
        else{
            result = (Math.floor(originalValue * 10 )) / 10;
            result = Number(result).toLocaleString();
        }

        if(result == 0 & originalValue > 0) {
            return '';
        }
        
        return result;
    }

    generateTooltipText(label,desiredTrendState, d, moduleID){
        let result = "";
        if(d.measureTitle != null){
            result += "<b>"+d.measureTitle+"</b><br/>";
        }
        result += "Current value ("+d.group+"): ";
        if (d.sup == 1){
            if(d.minSup == 0 || d.minSup == 1){
                result += "<b>SUPPRESSED ("+d.maxSup+" or fewer cases) "+(d.unit)+"</b>" ;
            }
            else{
                result += "<b>SUPPRESSED ("+d.minSup+" - "+d.maxSup+") "+(d.unit)+"</b>" ;
            }
        }
        else if(d.specialTooltip){
            result = " "+d.specialTooltip;
        }
        else{

            result += formatValue(d.textValue, d.tooltipValue, d.value);
            result +=  " "+(d.unit);
        }
       
        if(d.tooltipText != null){
            result += " <br/>"+d.tooltipText;
        }
        else{
            result += ((d.capitaVal != null) ? 'per  '+d.capitaVal.toLocaleString()+" People" : '');
        }
        
        result += "&nbsp;&nbsp;&nbsp;";

            if(d.isStratification == null || (d.isStratification != null &&  !d.isStratification)) {
            let timeStamp = "";
            let timeValue = "";
            let switchOption = "unknown";
            let flipSign = false;

            let trendDetail = "<b>Note: </b>A trend is determined to be increasing if the value \
                    is greater than 5% of the average across all years. <br/> If the value is within 5% of the average across all years, the trend is determined to be stable.";
            let nextYearsValue = "";
            if(desiredTrendState != null) {
                if (d.previousYear != null &&  typeof d.previousYear != 'undefined'){
                    timeStamp = "Last year's value ("+d.previousYearStamp+"): ";
                    timeValue = parseFloat(d.previousYear).toLocaleString()+" "+(d.unit);
                    switchOption = d.previousYear;
                }

                let styleColorString = "black";
                let trendState = null;
                let rateString = '';
                let rateExp = '';
                let stable = false;
                switch(switchOption){
                    case 'supp':
                        if(d.minSup == 0 || d.minSup == 1){
                            timeStamp = timeStamp+" <b>SUPPRESSED ("+d.maxSup+" or fewer cases) "+(d.unit)+"</b>" ;
                        }
                        else{
                            timeStamp = timeStamp+" <b>SUPPRESSED ("+d.minSup+" - "+d.maxSup+") "+(d.unit)+"</b>" ;
                        }
                    break;
                    case 'unknown':
                        timeStamp = "Last year's value is not available on this dashboard.<br/>";
                    break;
                    default: //actual value
                        timeStamp = timeStamp+timeValue;
                        trendState = (flipSign)? switchOption - d.textValue : d.textValue - switchOption;
                        desiredTrendState = parseInt(desiredTrendState);
                        switch(desiredTrendState){
                            case -1:
                                if( trendState < 0){
                                    styleColorString = "green";
                                }
                                else if(trendState > 0) {
                                    styleColorString = "red";
                                }        
                                rateExp = "Desired trend is negative.";
                                document.getElementById("measuredataGraphTrend_"+moduleID).innerHTML =  "";
                            break;
                            case 0:
                                styleColorString = "black";                            
                                if(d.textValue > this.mean - (this.stdDev * this.mean) && d.textValue < (this.mean + (this.stdDev * this.mean)) ){
                                    styleColorString = "green";
                                    stable = true;
                                }
                                else {
                                    styleColorString = "red";
                                }
                                rateExp += "Desired trend is stable.<br/> Calculated via +-5% of the mean for all years";
                                document.getElementById("measuredataGraphTrend_"+moduleID).innerHTML = trendDetail;
                            break;
                            case 1:
                                if( trendState < 0){    
                                    styleColorString = "red";
                                }
                                else if(trendState > 0) {
                                    styleColorString = "green";
                                }
                                rateExp = "Desired trend is positive."
                                document.getElementById("measuredataGraphTrend_"+moduleID).innerHTML = "";
                            break;
                            default:
                                styleColorString = "black";
                        }
                }
                

                let upTrend = '<svg width="1.75em" height="1.75em" viewBox="0 0 16 16" class="bi bi-graph-up" fill="'+styleColorString+'" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z"/><path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4h-3.5a.5.5 0 0 1-.5-.5z"/></svg>';
                let downTrend = '<svg width="1.75em" height="1.75em" viewBox="0 0 16 16" class="bi bi-graph-down" fill="'+styleColorString+'" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 9.041l-4.349-5.436L7 6.646 3.354 3l-.708.707L7 8.061l2.959-2.959 3.65 4.564.781-.625z"/><path fill-rule="evenodd" d="M10 9.854a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v3.5h-3.5a.5.5 0 0 0-.5.5z"/></svg>';
                let stableTrend = '<svg width="1.75em" height="1.75em" viewBox="0 0 16 16" class="bi bi-graph-down" fill="'+styleColorString+'" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 9.041l-4.349-5.436L7 "/><path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>'
                if(stable){
                    result += stableTrend+'<p style = "text-align:left;">'+timeStamp+"<br/>"+rateExp+'</p>';
                }
                else if(trendState > 0){
                    result += upTrend+'<p style = "text-align:left;">'+timeStamp+"<br/>"+rateExp+'</p>';
                }else if(trendState < 0){
                    result += downTrend+'<p style = "text-align:left;">'+timeStamp+"<br/>"+rateExp+'</p>';
                }else{
                    //stable
                    result += '<p style = "text-align:left;">'+timeStamp+'</p><br/>';
                }
            }
        
            result += (d.stratification != null && d.stratification.length > 0)? "click to view a data breakdown":'';
        }

        return result;
    }

    generateTooltipTextMultiBar(label, d){
        let result = "";
        result += d.labelX+": "+d.group+"<br/>";

        if(label.toLowerCase() != "time") {
            result += "Time: "+d.time+"<br/>";
        }
        
        result += Number(d.value).toLocaleString()+" "+d.labelY+"<br/>";

        if(d.processedData != null && d.processedData.length > 0){
            result += "<hr/>";
            result += "Click to view graph breakdown below.";
        }
        return result;
    }

    filterYearFunction(indata){
        var results = [];
        for(let i = 0; i < indata.length; i++){
            if(this.filteredYears.indexOf(indata[i].year) >= 0){
                results.push(indata[i]);
            }
        }
        return results;
    }

    filterYearFunctionMulti(indata){
        var results = [];        
        if(indata != null){
            for(let i = 0; i < indata.length; i++){
                results[i] = [];
                if(indata[i] != null){
                    for(let j = 0; j < indata[i].length; j++){
                        if(this.filteredYears.indexOf(indata[i][j].year) >= 0){
                            results[i].push(indata[i][j]);
                        }
                    }
                }
            }
        }
        return results;
    }

    generateTable(data, parentDiv, graphInformation){
        let GRAPHTYPEDATA = this.defaultGraphType
        let capitaMode = this.capitaCurrent;
        let capitaVal = null;
        switch(capitaMode){
            case 'title':
                capitaVal = this.defaultRate;
            break;
            case 'data':
                capitaVal = indata[0].denominator;
            break;
        }

        let viewingMode = this.graphMode;
        let unit = (graphInformation.num_units != null && graphInformation.num_units.length > 1) ? graphInformation.num_units : graphInformation.y_axis_label
        let title = generateDateAxis(data[0],viewingMode);

        let value = (data[0].issuppressed == "0" || data[0].issuppressed == 0)? 
            procValue(data[0], GRAPHTYPEDATA, capitaMode, capitaVal)+" "+unit :
            "between "+graphInformation.minSuppression+" and "+graphInformation.maxSuppression+" "+unit;

        var tableElement = document.createElement("table");
            tableElement.align="center";
            tableElement.id="measureTable_"+this.moduleID;
            tableElement.style.border = "solid black 2px";
            tableElement.style.width="50%";
            tableElement.style.marginTop="3%";
            tableElement.className = "table";
            
            var tableHeader = document.createElement("thead");
            tableHeader.className = "thead-dark";
        
                var theadrow = document.createElement("tr");
                theadrow.style.border = "2px solid rgb(152, 37, 104) !important";
            
                    var header1 = document.createElement("th");
                    header1.innerHTML = title;

                theadrow.appendChild(header1);

            tableHeader.appendChild(theadrow);


            var tableRef = document.createElement("tbody");
            
                var newRow   = tableRef.insertRow();

                    // Insert a cell in the row at index 0
                    var newCell  = newRow.insertCell(-1);
                        // Append a text node to the cell
                        newCell.innerHTML = value;

        tableElement.appendChild(tableHeader);
        tableElement.appendChild(tableRef);

        parentDiv.appendChild(tableElement);
        this.hasGenerated = true;
    }

    generateTestIntervals(mode, minYear, maxYear){
        let result = [];
        for (let a = minYear; a <= maxYear; a++ ){
            switch (mode){
                case 'month'://month
                    result.push("JAN-"+a);
                    result.push("FEB-"+a);
                    result.push("MAR-"+a);
                    result.push("APR-"+a);
                    result.push("MAY-"+a);
                    result.push("JUN-"+a);
                    result.push("JUL-"+a);
                    result.push("AUG-"+a);
                    result.push("SEP-"+a);
                    result.push("OCT-"+a);
                    result.push("NOV-"+a);
                    result.push("DEC-"+a);
                break;
                case 'quarter'://quarter
                    result.push("Q1-"+a);
                    result.push("Q2-"+a);
                    result.push("Q3-"+a);
                    result.push("Q4-"+a);
                break;
                case 'year'://year
                    result.push(""+a);
                break;
            }
        }
        return result;
    }

    updateAxis(data, data2 = null){
        
        let maxY2 = 0;
        maxY2 = (this.hcs_trendline_yaxisMax > maxY2)? this.hcs_trendline_yaxisMax : maxY2;
        maxY2 = (this.sw_trendline_yaxisMax > maxY2)? this.sw_trendline_yaxisMax : maxY2;
        maxY2 = (this.lr_trendline_yaxisMax > maxY2)? this.lr_trendline_yaxisMax : maxY2;

        if(data.length > 0 ){
            data.forEach( (val)=>{
                maxY2 = (val.value > maxY2) ? val.value : maxY2;
            });
        }

        if(data2 != null && data2.length > 0 ){
            data2.forEach( (val)=>{
                maxY2 = (val.value > maxY2) ? val.value : maxY2;
            });
        }
        
        let minY = this.graphY.domain()[0];

        this.graphY.domain([minY, maxY2])
        this.yAxis.call(d3.axisLeft(this.graphY).ticks(5));
    }

    destroyStateTrendLine(id, data, ignoreDraw = false){
        if(ignoreDraw){
            let graphInformation = this.graphInformation;
            let strVal = id.toString();
            let searchString = "#svgGraph_"+strVal.replace(".", "\\.");
            let svg  = d3.select(searchString);
            

            this.updateAxis(this.processedData);

            let y = this.graphY;
            let innerGraphHeight = this.height - this.margin.top - this.margin.bottom;

            let graphWidth = this.graphX.bandwidth();
            let graphHeight = function (d) { return innerGraphHeight - y(d.value); };
            
            if(this.graphType == 1){ //bars
                this.updateBars(svg, graphWidth, graphHeight, this.graphX, y, data, false, innerGraphHeight, graphInformation.x_axis_label, graphInformation.desiredTrendState, this.labelWidth);
            }
            else{
                this.updateLines(svg, this.graphX, y);
            }
        }
    }

    updateLines(svg, x, y){
        svg.selectAll(".measureLine").remove();
        svg.selectAll(".measureCircle").remove();

        let graphInformation = this.graphInformation;
        // Define the div for the tooltip
        this.tooltipDiv = d3.select("body").append("div")	
        .attr("class", "tooltip")		
        .style("opacity", 100);

        this.lineGraphTrend = {
            line : null,
            circles : null
        };

        // Create Line
        this.lineGraphTrend.line = this.createALine(svg, x, y, this.processedData, 'line', 'line measureLine');
        this.lineGraphTrend.circles = this.createCirclesWithToolTips(svg, x, y, this.processedData, this.defaultGraphType, graphInformation, "measureCircle");
    }

    updateBars(svg, graphWidth, graphHeight, x, y, data, shouldShrink, height, label, labelWidth,overrideDimensionData = false){
        let colorMain = "#982568";

        let graphInformation = this.graphInformation;

        let desiredTrend = (graphInformation != null) ? graphInformation.desiredTrendState : null;

        this.bars.selectAll(".textlabel").remove();

        var tempDiv = this.tooltipDiv;

         d3.selectAll(".bar")
        .data(this.processedData)
        .transition().duration(1000)
        .attr("x", function (d) { return x(d.group); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
            else { return colorMain;}} )

        .attr("stroke", "#982568")
        .attr("transform", "translate(40, 0)");

        svg.selectAll(".bar").data(data).on("click", function(d){
            if(d.stratification != null && d.stratification.length > 0)
            {
                this.originalStratification = d;
                let currentPossible = this.initGraphBreakDown(d.group);
                this.generateStratificationGraph(d, currentPossible);
            }
        }.bind(this))
        .on("mouseover", function(d, index, bars) {	
            d3.select(bars[index]).attr("fill", "#521337");
            tempDiv.transition()		
                .duration(200)			
                .style("display", "block")
                .style("text-align", "left");
            tempDiv
                .style("left", (d3.event.pageX+25) + "px")		
                .style("top", (d3.event.pageY - 100) + "px")
                .style("padding", "5px")
                .style("background", "white")
                .style("border", "solid #373a3c 5px");

            tempDiv.html(this.generateTooltipText(label, desiredTrend, d, this.moduleID));

            }.bind(this))					
        .on("mouseout", function(d, index, bars) {
            d3.select(bars[index]).attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
            else { return "#982568";}} )
            tempDiv.transition()		
                .duration(500)		
                .style("display", "none");	
        });

        
        
        let text = this.bars.append('text')
        .attr("class", "textlabel")
        .attr("transform", "translate(40,0)")
        .style("font-size", "0.7em")
        .text(function(d) { 
            return (d.sup != 1)? this.generateLabel(d.value, d.textValue) : this.generateSuppressionText(d);//d.minSup+'-'+d.maxSup;
        }.bind(this))

        .attr("x", function (d) {if (d.sup == 1) { return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2);   } else {return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2)}})// - (d.value.toString().length * 4); }})
        .attr("y", function (d) { return y(d.value) - 5; })
        
        let text2 = this.bars.append('text')
        .attr("class", "textlabel")
        .attr("transform", "translate(40,0)")
        .style("font-size", (!shouldShrink)? "0.65em" : "3em") //note: we are increasing not shrinking
        .style("text-anchor", "left")
        .style("fill", "white")
        .style("stroke", "white")
        .text(
            function(d) { return (d.stratification != null && d.stratification.length > 0)? 
                '...' : '' }
            )
        .attr("x", function (d) {if (d.sup == 1) { return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2);   } else {return x(d.group) + (x.bandwidth()/2.0) - (this.getBBox().width / 2)}})// - (d.value.toString().length * 4); }})
        .attr("y", function (d) { return (height - 10)})
        .on("click", function(d){
            if(d.stratification != null && d.stratification.length < 1)
            {
                this.originalStratification = d;
                let currentPossible = this.initGraphBreakDown(d.group);
                this.generateStratificationGraph(d, currentPossible);
            }
        }.bind(this))
        .on("mouseover", function(d, index, bars) {
            d3.select(bars[index]).attr("fill", "#521337");
            tempDiv.transition()		
                .duration(200)			
                .style("display", "block")
                .style("text-align", "left");
            tempDiv
                .style("left", (d3.event.pageX+25) + "px")		
                .style("top", (d3.event.pageY - 100) + "px")
                .style("padding", "5px")
                .style("background", "white")
                .style("border", "solid #373a3c 5px");
            tempDiv.html(this.generateTooltipText(label, graphInformation.desiredTrendState, d, this.moduleID));
            }.bind(this))					
        .on("mouseout", function(d, index, bars) {
            d3.select(bars[index]).attr("fill", function(d) { if (d.sup == 1) { return "url(#diagonalHatch)"; } 
            else { return "#982568";}} )
            tempDiv.transition()		
                .duration(500)		
                .style("display", "none");	
        });
    }

    generateGraphUIExpl(isStratification = false){
        let exp = document.createElement("P");
        exp.id = "measuredataGraphExp_"+this.moduleID+(isStratification? "_strat" : "");
        exp.className = "graph-explain";
        exp.innerHTML = this.graphNoteIcon+" click and drag to pan the graph <br/>"+this.graphNoteIcon+" hover-over graph entries to see a detailed tooltip";        
        return exp;
    }

    generateStratificationExpl(){
        let exp = document.createElement("P");
        exp.className = "graph-explain";
        exp.innerHTML = this.graphNoteIcon+" Click on graph entries to view data breakdown";        
        return exp;
    }
}

function generateDateAxis(val, mode){
    if(val.specialXAxis != null){
        return val.specialXAxis;
    }
    else{
        switch (mode){
            case 'month'://month
                return getMonth(val.month)+"-"+val.year;
            break;
            case 'quarter'://quarter
                return "Q"+val.quarter+"-"+val.year;
            break;
            case 'year'://year
                return val.year;
            break;
        }
    }
 }


function getMonth(id){
     switch (id.toString()){
        case "1":
            return "JAN";
        break;
        case "2":
            return "FEB";
        break;
        case "3":
            return "MAR";
        break;
        case "4":
            return "APR";
        break;
        case "5":
            return "MAY";
        break;
        case "6":
            return "JUN";
        break;
        case "7":
            return "JUL";
        break;
        case "8":
            return "AUG";
        break;
        case "9":
            return "SEP";
        break;
        case "10":
            return "OCT";
        break;
        case "11":
            return "NOV";
        break;
        case "12":
            return "DEC";
        break;
     }
     return "";
 }

function procValue(val, graphtype, capitaMode, capitaVal, overrideValue = null){
    let value = (overrideValue != null)? overrideValue : parseFloat(val.numerator);
    let den = (val.denominator)? parseFloat(val.denominator) : null;
    switch(capitaMode){
        case 'totals'://bargraph
            return parseFloat(value);
        break;
        case 'title':
            return (den != null && den != 0)? value / (den  / capitaVal): value;
            //return value / capitaVal;
        break;
        case 'data':
            return (den != null && den != 0)? value / den : value;

        case '1k':
            return (den != null && den != 0)? value / (den  / 1000.0): value;
        
        case '100k':
            return (den != null && den != 0)? value / (den  / 100000.0): value;
        case 'percentage':
        case 'customrate':
            den = (den != null && den != 0)? den : 1;
            value =  (value / den) * 100;
            let temp = (Math.floor(value * 100 )) / 100;
            if(temp == 0 && value > 0){
                result = value.toExponential(2);
            }
            else {
                result = temp;
            }
            return result;
    }   
    
    return 0;
 }

 function formatValue(textValue, tooltipValue, value){
    let result = "";
      //we already formated it: > 1000
    if(textValue.toString().includes('k')){
        result = Number(tooltipValue).toLocaleString();
    }
    else if(textValue.toString().includes('%')){
        result = tooltipValue;
    }
    else if(value < 1 && value > 0){
        let temp = (Math.floor(value * 10000 )) / 10000;
        if(temp == 0 && value > 0){
            result = value.toExponential(2);
        }
        else {
            result = temp;
        }
    }
    else{
        result = Number((Math.floor(value * 10000 )) / 10000).toLocaleString();
    }
    return result;
}

