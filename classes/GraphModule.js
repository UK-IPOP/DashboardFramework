import {GraphSystem} from './GraphSystem.js';

export class GraphModule extends GraphSystem {
    constructor (id, mID, graphInfo, isPublic = false, divType = false, parentID, county, multi = false, defaultGraphType = 1, interval = null, forcedTitle = ""){
        super();
        this.margin = {top: 30, right: 100, bottom: 140, left: 15};
        this.height = 400;// - margin.top - margin.bottom;
        this.LARGEWIDTH= 1350;
        this.SMALLWIDTH= 650;
        this.width = this.LARGEWIDTH;//(1200/ 2);// - margin.left - margin.right,
        this.BASEWIDTH = this.LARGEWIDTH;
        this.parentID = parentID;
        this.pinGraph = false;
        this.moduleID = id;
        this.filteredYears = [];
        this.measureID = mID;
        this.graphMode = '';
        this.county = county;
        this.graphInformation = graphInfo;
        this.capitaCurrent = 'totals';
        this.currentSubMode = null;
        this.divName = 'graphModule_'+this.moduleID;
        this.dataHasInit = false;
        this.pinIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/><path d="M7.5 4h1v9a.5.5 0 0 1-1 0V4z"/><path fill-rule="evenodd" d="M6.489 12.095a.5.5 0 0 1-.383.594c-.565.123-1.003.292-1.286.472-.302.192-.32.321-.32.339 0 .013.005.085.146.21.14.124.372.26.701.382.655.246 1.593.408 2.653.408s1.998-.162 2.653-.408c.329-.123.56-.258.701-.382.14-.125.146-.197.146-.21 0-.018-.018-.147-.32-.339-.283-.18-.721-.35-1.286-.472a.5.5 0 1 1 .212-.977c.63.137 1.193.34 1.61.606.4.253.784.645.784 1.182 0 .402-.219.724-.483.958-.264.235-.618.423-1.013.57-.793.298-1.855.472-3.004.472s-2.21-.174-3.004-.471c-.395-.148-.749-.336-1.013-.571-.264-.234-.483-.556-.483-.958 0-.537.384-.929.783-1.182.418-.266.98-.47 1.611-.606a.5.5 0 0 1 .595.383z"/></svg>';
        this.expandIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-up-right-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>    <path fill-rule="evenodd" d="M10.5 5h-4a.5.5 0 0 0 0 1h2.793l-4.147 4.146a.5.5 0 0 0 .708.708L10 6.707V9.5a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5z"/>    </svg>';
        this.minIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-arrow-down-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13 1.5A1.5 1.5 0 0 1 14.5 3v8a1.5 1.5 0 0 1-1.5 1.5H9a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0V3A1.5 1.5 0 0 1 5 1.5h8zm-11 7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H2.5V9a.5.5 0 0 0-.5-.5z"/><path fill-rule="evenodd" d="M1.646 14.354a.5.5 0 0 0 .708 0l8-8a.5.5 0 0 0-.708-.708l-8 8a.5.5 0 0 0 0 .708z"/></svg>';
        this.inspectIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-zoom-in" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/><path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"/></svg>';
        this.deleteIcon = 'X';
        this.graphNoteIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-exclamation-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/></svg>';
        this.barGraphIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bar-chart-line-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect width="4" height="5" x="1" y="10" rx="1"/><rect width="4" height="9" x="6" y="6" rx="1"/><rect width="4" height="14" x="11" y="1" rx="1"/><path fill-rule="evenodd" d="M0 14.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/></svg>';
        this.lineGraphIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-graph-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z"/></svg>';
        this.infoGraphIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-info-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>';
        this.parentStratificationIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clipboard-data" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/><path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z"/></svg>';
        this.downloadIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark-arrow-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm7 2l.5-2.5 3 3L10 5a1 1 0 0 1-1-1zm-.5 3.5a.5.5 0 0 0-1 0v3.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 11.293V7.5z"/></svg>';
        this.trendLineIcon = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-graph-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"/></svg>';
        
        this.divType = divType;
        this.divState = 0; //0 = fullpage, 1 = min
        

        this.subModuleMode = 0;
        this.graphBreakDownMode = 0;
        this.graphExportMode = 0;
        this.graphTrendLineMode = 0;
        this.subModule1 = null;
        this.subModule2 = null;
        this.subModule3 = null;
        this.subModule4 = null;
        this.subModule5 = null;

        this.tooltipDiv = null;
        this.tooltipYAxisDiv = null;

        this.stdDev = 0.05;//5%
        this.mean = 0;
        this.isMulti = multi;
        this.multiDataChange = null; 

        this.minYear = 2900;
        this.maxYear = 1900;

        this.resultType = "";
        this.hasGenerated = false;

        this.defaultInterval = interval;

        this.graph_title = forcedTitle;

        this.isPublic = isPublic;

        this.data = null;
        this.submodes = null;

        this.bestInterval = '';

 
        if(multi){
            this.multiCountyStr = "";
            let usedCounties = [];
            county.forEach(
                (county) => {
                    if(usedCounties.indexOf(county) == -1){
                        usedCounties.push(county);
                        this.multiCountyStr += county+",";
                    }
                }
            )
            this.multiCountyStr = (this.multiCountyStr.endsWith(","))? this.multiCountyStr.substring(0, this.multiCountyStr.length - 1) : this.multiCountyStr;
            this.multiCountyStr = (usedCounties == 1)? "Custom Graph: "+this.multiCountyStr+"" : "Custom Graph: ("+this.multiCountyStr+")";
            this.graphType = parseInt(defaultGraphType);
            this.defaultGraphType =  parseInt(defaultGraphType);

            

            this.capita = graphInfo[0].capita;
            this.submodes = []
            this.graphHelpPanel = "";
            for (let a = 0; a < graphInfo.length; a++){
                this.capita = (graphInfo[a].capita < this.capita)? graphInfo[a].capita : this.capita;
                for (let b = 0; b < graphInfo[a].submodes.length; b++){
                    if(this.submodes.indexOf(graphInfo[a].submodes[b]) == -1){
                        this.submodes.push(graphInfo[a].submodes[b]);
                    }
                }
                this.graphHelpPanel += (graphInfo[a].graphHelpDescription != null) ? graphInfo.graphHelpDescription+"<br/>" : '';
            }
            this.defaultRate = 1000;
        }
        else{
            this.graphType = parseInt(graphInfo.graphType);
            this.defaultGraphType = parseInt(graphInfo.graphType);
            this.capita = graphInfo.capita;
            this.defaultRate = (graphInfo.capita != null) ? graphInfo.defaultRate : 1000;
            this.submodes = graphInfo.submodes;
            this.graphHelpPanel = (graphInfo.graphHelpDescription != null) ? graphInfo.graphHelpDescription : '';
        }
        this.init();
    }

    

    init(){
        this.moduleDiv = document.createElement("DIV");
        this.moduleDiv.id = "measuredata_"+this.moduleID;
        
        //set a default mode if possible
        if(this.submodes != null && this.submodes.length > 0){
            this.currentSubMode = this.submodes[0];
        }

        let toolBarHolder = null;
        let toolBarCounty = null;
        let toolBar = null;
        let toolbarContent = null;

        switch(this.divType){
            case 'div':
                this.moduleDiv.className = this.divStateClass()+' graphModule';
                toolBarHolder = document.createElement("DIV");
                toolBarHolder.className = 'row toolBarHolder';

                toolBarCounty = document.createElement("DIV");
                toolBarCounty.className = 'col-3';
                toolBarCounty.id = "countyTitle_"+this.moduleID;
                toolBarCounty.style.fontSize = '1.5em';
                toolBarCounty.innerHTML = (this.isMulti)? this.multiCountyStr : this.county;//((this.county != null && this.county.length > 1)? this.county.charAt(0).toUpperCase() + this.county.slice(1) : '')+'</h2>';
                toolBarHolder.appendChild(toolBarCounty);

                toolBar = document.createElement("DIV");
                toolBar.id = "measuredataToolbar_"+this.moduleID;
                toolBar.style.textAlign ="right";
                toolBar.className = 'col-9';


                let btn1 = document.createElement("button");
                btn1.id = "pinbutton_"+this.moduleID;
                btn1.className = "btn btn-secondary";
                btn1.setAttribute("data-toggle","tooltip");
                btn1.setAttribute("data-placement","top");
                btn1.setAttribute("title","Pin the Graph to the View");
                btn1.innerHTML = this.pinIcon;
                btn1.addEventListener('click', (self, e)=>{
                    console.log("hello");
                    this.togglePin();
                });
                toolBar.appendChild(btn1);

                if(this.isMulti){
                    switch(this.defaultGraphType ){
                        case 1: //bars
                        let btn2 = document.createElement("button");
                        btn2.id = "graphTypebutton_"+this.moduleID;
                        btn2.className = "btn btn-secondary";
                        btn2.setAttribute("data-toggle","tooltip");
                        btn2.setAttribute("data-placement","top");
                        btn2.setAttribute("title","Convert to Line Graph");
                        btn2.innerHTML = this.lineGraphIcon;
                        btn2.addEventListener('click', (self, e)=>{
                            this.toggleGraphType();
                        });
                        toolBar.appendChild(btn2);

                        break;
                        case 2: //line
                            let btn3 = document.createElement("button");
                            btn3.id = "graphTypebutton_"+this.moduleID;
                            btn3.className = "btn btn-secondary";
                            btn3.setAttribute("data-toggle","tooltip");
                            btn3.setAttribute("data-placement","top");
                            btn3.setAttribute("title","Convert to Bar Graph");
                            btn3.innerHTML = this.barGraphIcon;
                            btn3.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                            toolBar.appendChild(btn3);
                        break;
                    }
                }
                else{
                    switch(this.graphInformation.graphType){
                        case "1": //bars
                            let btn2 = document.createElement("button");
                            btn2.id = "graphTypebutton_"+this.moduleID;
                            btn2.className = "btn btn-secondary";
                            btn2.setAttribute("data-toggle","tooltip");
                            btn2.setAttribute("data-placement","top");
                            btn2.setAttribute("title","Convert to Line Graph");
                            btn2.innerHTML = this.lineGraphIcon;
                            btn2.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                            toolBar.appendChild(btn2);
                        break;
                        case "2": //line
                        let btn3 = document.createElement("button");
                            btn3.id = "graphTypebutton_"+this.moduleID;
                            btn3.className = "btn btn-secondary";
                            btn3.setAttribute("data-toggle","tooltip");
                            btn3.setAttribute("data-placement","top");
                            btn3.setAttribute("title","Convert to Bar Graph");
                            btn3.innerHTML = this.barGraphIcon;
                            btn3.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                            toolBar.appendChild(btn3);
                        break;
                    }
                }

                if(this.graphInformation.graphHelpDescription != null){
                    let btn4 = document.createElement("button");
                    btn4.id = "graphTypebutton_"+this.moduleID;
                    btn4.className = "btn btn-info";
                    btn4.setAttribute("data-toggle","tooltip");
                    btn4.setAttribute("data-placement","top");
                    btn4.setAttribute("title","Graph Information");
                    btn4.innerHTML = this.infoGraphIcon;
                    btn4.addEventListener('click', (self, e)=>{
                        this.toggleGraphSubmodule();
                    });
                    toolBar.appendChild(btn4);
                }

                let btn6 = document.createElement("button");
                btn6.id = "expandbutton_"+this.moduleID;
                btn6.className = "btn btn-info";
                btn6.setAttribute("data-toggle","tooltip");
                btn6.setAttribute("data-placement","top");
                btn6.setAttribute("title","Minimize the Graph");
                btn6.innerHTML = this.minIcon;
                btn6.addEventListener('click', (self, e)=>{
                    this.toggleExpand();
                });
                toolBar.appendChild(btn6);

                let btn7 = document.createElement("button");
                btn7.id = "deletebutton_"+this.moduleID;
                btn7.className = "btn btn-danger";
                btn7.setAttribute("data-toggle","tooltip");
                btn7.setAttribute("data-placement","top");
                btn7.setAttribute("title","You cannot close the currently selected graph.");
                btn7.innerHTML = this.deleteIcon;
                btn7.addEventListener('click', (self, e)=>{
                    this.destroyIfNotPinned();
                });
                toolBar.appendChild(btn7);
                toolBarHolder.appendChild(toolBar);

                this.moduleDiv.appendChild(toolBarHolder);
            break;
            case 'multilocMin':
            case 'multiloc':
                this.moduleDiv.className = this.divStateClass()+' graphModule';
                toolBarHolder = document.createElement("DIV");
                toolBarHolder.className = 'row toolBarHolder';

                toolBarCounty = document.createElement("DIV");
                toolBarCounty.className = 'col-3';
                toolBarCounty.id = "countyTitle_"+this.moduleID;
                toolBarCounty.style.fontSize = '1.5em';
                toolBarCounty.innerHTML = (this.isMulti)? this.multiCountyStr : this.county;
                toolBarHolder.appendChild(toolBarCounty);

                toolBar = document.createElement("DIV");
                toolBar.id = "measuredataToolbar_"+this.moduleID;
                toolBar.style.textAlign ="right";
                toolBar.className = 'col-9';

                toolbarContent = "";
                if(this.isMulti){
                    switch(this.defaultGraphType ){
                        case 1: //bars
                            let btn2 = document.createElement("button");
                            btn2.id = "graphTypebutton_"+this.moduleID;
                            btn2.className = "btn btn-secondary";
                            btn2.setAttribute("data-toggle","tooltip");
                            btn2.setAttribute("data-placement","top");
                            btn2.setAttribute("title","Convert to Line Graph");
                            btn2.innerHTML = this.lineGraphIcon;
                            btn2.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                            toolBar.appendChild(btn2);
                        break;
                        case 2: //line
                        let btn3 = document.createElement("button");
                            btn3.id = "graphTypebutton_"+this.moduleID;
                            btn3.className = "btn btn-secondary";
                            btn3.setAttribute("data-toggle","tooltip");
                            btn3.setAttribute("data-placement","top");
                            btn3.setAttribute("title","Convert to Bar Graph");
                            btn3.innerHTML = this.barGraphIcon;
                            btn3.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                            toolBar.appendChild(btn3);
                        break;
                    }
                }
                else{
                    switch(this.graphInformation.graphType){
                        case "1": //bars
                            let btn2 = document.createElement("button");
                            btn2.id = "graphTypebutton_"+this.moduleID;
                            btn2.className = "btn btn-secondary";
                            btn2.setAttribute("data-toggle","tooltip");
                            btn2.setAttribute("data-placement","top");
                            btn2.setAttribute("title","Convert to Line Graph");
                            btn2.innerHTML = this.lineGraphIcon;
                            btn2.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                            toolBar.appendChild(btn2);
                        break;
                        case "2": //line
                            let btn3 = document.createElement("button");
                            btn3.id = "graphTypebutton_"+this.moduleID;
                            btn3.className = "btn btn-secondary";
                            btn3.setAttribute("data-toggle","tooltip");
                            btn3.setAttribute("data-placement","top");
                            btn3.setAttribute("title","Convert to Bar Graph");
                            btn3.innerHTML = this.barGraphIcon;
                            btn3.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                            toolBar.appendChild(btn3);
                        break;
                    }
                }
                
                if(this.graphInformation.graphHelpDescription != null){
                    let btn4 = document.createElement("button");
                    btn4.id = "graphTypebutton_"+this.moduleID;
                    btn4.className = "btn btn-info";
                    btn4.setAttribute("data-toggle","tooltip");
                    btn4.setAttribute("data-placement","top");
                    btn4.setAttribute("title","Graph Information");
                    btn4.innerHTML = this.infoGraphIcon;
                    btn4.addEventListener('click', (self, e)=>{
                        this.toggleGraphSubmodule();
                    });
                    toolBar.appendChild(btn4);
                }


                let btn8 = document.createElement("button");
                    btn8.id = "graphTypebutton_"+this.moduleID;
                    btn8.className = "btn btn-info";
                    btn8.setAttribute("data-toggle","tooltip");
                    btn8.setAttribute("data-placement","top");
                    btn8.setAttribute("title","Inspect Graph");
                    btn8.innerHTML = this.inspectIcon;
                    btn8.addEventListener('click', (self, e)=>{
                        console.log("TODO: Figure this out");
                    });
                toolBar.appendChild(btn8);
            
                // toolBar.innerHTML = toolbarContent;

                toolBarHolder.appendChild(toolBar);

                this.moduleDiv.appendChild(toolBarHolder);
            break;
            case 'modal':
                this.moduleDiv.className =  'col-12 graphModule';
                

                let toolBarHolderModal = document.createElement("DIV");
                toolBarHolderModal.className = 'row toolBarHolder';

                let toolBarCountyModal = document.createElement("DIV");
                toolBarCountyModal.className = 'col-6 centered';
                toolBarCountyModal.innerHTML = (this.isMulti)? '<h2>'+this.multiCountyStr+'</h2>' : '<h2>'+((this.county != null && this.county.length > 1)? this.county.charAt(0).toUpperCase() + this.county.slice(1) : '')+'</h2>';
                toolBarHolderModal.appendChild(toolBarCountyModal);


                let toolBarModal = document.createElement("DIV");
                toolBarModal.id = "measuredataToolbar_"+this.moduleID;
                toolBarModal.style.textAlign ="right";
                toolBarModal.className = 'col-6';
                let btn2 = document.createElement("button");
                    btn2.id = "graphTypebutton_"+this.moduleID;
                    btn2.className = "btn btn-secondary";
                    btn2.setAttribute("data-toggle","tooltip");
                    btn2.setAttribute("data-placement","top");
                    btn2.setAttribute("title","Convert to Line Graph");
                    btn2.innerHTML = this.lineGraphIcon;
                    btn2.addEventListener('click', (self, e)=>{
                        this.toggleGraphType();
                    });
                    toolBarModal.appendChild(btn2);
                
                toolBarModal.innerHTML = toolbarContentModal;

                toolBarHolderModal.appendChild(toolBarModal);

                this.moduleDiv.appendChild(toolBarHolderModal);
            break;
            case 'layoutdiv':
                this.moduleDiv.className = this.divStateClass()+' graphModule';
                let toolBarLDiv = document.createElement("DIV");
                toolBarLDiv.id = "measuredataToolbar_"+this.moduleID;
                toolBarLDiv.style.textAlign ="right";
    
                let btn2a = document.createElement("button");
                    btn2a.id = "graphTypebutton_"+this.moduleID;
                    btn2a.className = "btn btn-secondary";
                    btn2a.setAttribute("data-toggle","tooltip");
                    btn2a.setAttribute("data-placement","top");
                    btn2a.setAttribute("title","Convert to Line Graph");
                    btn2a.innerHTML = this.lineGraphIcon;
                    btn2a.addEventListener('click', (self, e)=>{
                                this.toggleGraphType();
                            });
                toolBarLDiv.appendChild(btn2a);
                this.moduleDiv.appendChild(toolBarLDiv);
            break;
        }

        let measureGraphSubSection1 = document.createElement("DIV");
        measureGraphSubSection1.id = "measureGraphSubSection1_"+this.moduleID;
        

        let measureGraphSubSection2 = this.createGraphSubModelDescript();
        
        let measureBreakDownGraph = this.createGraphBreakdownDIV();
        
        let measureGraphSubSection3 = this.createExportDiv();
        
        let divButtons = document.createElement("DIV");
        divButtons.id = "measuredataButtons_"+this.moduleID;
        divButtons.className = 'row';
        
            let divIntervalButtons = document.createElement("DIV");
            divIntervalButtons.id = "measuredataIntervalButtonHolder_"+this.moduleID;
            divIntervalButtons.className = 'col-3';
            divButtons.appendChild(divIntervalButtons);
            
            
            let divYearButtons = document.createElement("DIV");
            divYearButtons.id = "measuredataYearButtonHolder_"+this.moduleID;
            divYearButtons.className = 'col-6';
            divYearButtons.style.textAlign="left";
            divButtons.appendChild(divYearButtons);

            let divCapButtons = document.createElement("DIV");
            divCapButtons.id = "measuredataCapitaButtonHolder_"+this.moduleID;
            divCapButtons.className = 'col-3';
            divButtons.appendChild(divCapButtons);
                                    
            
        measureGraphSubSection1.appendChild(divButtons);
        
        let divDescription = document.createElement("DIV");
        divDescription.id = "measureDescription_"+this.moduleID;
        measureGraphSubSection1.appendChild(divDescription);
        
        let divMeasuredata = document.createElement("DIV");
        divMeasuredata.id = "measuredata_"+this.moduleID;
        divMeasuredata.innerHTML = "";
        divMeasuredata.style.overflowX = "auto";
        divMeasuredata.style.marginTop = "2%";
        measureGraphSubSection1.appendChild(divMeasuredata);

        let title = document.createElement("DIV");
        title.id="measureTitle_"+this.moduleID;
        title.style.textAlign = "center";
        title.style.fontSize = "1.5em";
        title.style.lineHeight = "1.25em";

        if(this.isMulti){
            title.innerHTML = "Combined Measurements";
        }
        else{
            title.innerHTML = this.graphInformation.measureTitle + this.generateMedicaidSubtitle() +((this.currentSubMode != null)? "<br/> ("+this.currentSubMode.toUpperCase()+")" : "");
        }

        measureGraphSubSection1.appendChild(title);


        let divGraphHolder =  document.createElement("DIV");

       
        let divGraphHolderParent = document.createElement("DIV");
        divGraphHolderParent.id = "measuredataGraphHolderParent_"+this.moduleID;
        divGraphHolderParent.style.position = "relative";
        divGraphHolderParent.style.padding = "1%";
        divGraphHolderParent.style.textAlign = "center";
        
        if(this.isMulti){
            let divGraphLegend = document.createElement("DIV");
            divGraphLegend.id = "measuredataGraphLegend_"+this.moduleID;
            divGraphLegend.style.position = "relative";
            divGraphLegend.style.padding = "1%";
            divGraphLegend.style.textAlign = "center";
            divGraphLegend.style.width = "20%";
            divGraphLegend.style.float="right";
            divGraphLegend.style.maxHeight = "380px";
            divGraphLegend.style.overflowY = "auto";
            divGraphHolderParent.appendChild(divGraphLegend);

            let divGraph = document.createElement("DIV");
            divGraph.id = "measuredataGraph_"+this.moduleID;
            divGraph.style.position = "relative";
            divGraph.style.padding = "1%";
            divGraph.style.textAlign = "center";
            divGraph.style.width = "80%";
            divGraphLegend.style.float="right";
            divGraphHolderParent.appendChild(divGraph);
        }
        else{
            let divGraph = document.createElement("DIV");
            divGraph.id = "measuredataGraph_"+this.moduleID;
            console.log("measuredataGraph_"+this.moduleID);
            divGraph.style.position = "relative";
            divGraph.style.padding = "1%";
            divGraph.style.textAlign = "center";
            divGraphHolderParent.appendChild(divGraph);
        }

        divGraphHolder.appendChild(divGraphHolderParent);


        let divGraph2 = document.createElement("DIV");
        divGraph2.id = "measuredataGraphTrend_"+this.moduleID;  
        divGraph2.style.float = "left";
        divGraph2.style.padding = "1%";
        divGraph2.style.textAlign = "center";
        divGraph2.innerHTML = ""        

        let stratExp = document.createElement("DIV");
        stratExp.id = "stratExp_"+this.moduleID;
        stratExp.style.float = "left";
        stratExp.style.visibility = "hidden";
        stratExp.appendChild(this.generateStratificationExpl());


        let graphExp = document.createElement("DIV");
        graphExp.style.float = "right";
        graphExp.style.marginRight = "3%";
        graphExp.appendChild(this.generateGraphUIExpl());

        let trendLineHolder = document.createElement("DIV");
        trendLineHolder.id = "trendlineLegend_"+this.moduleID;
        trendLineHolder.style.textAlign = "left";
        trendLineHolder.style.float = "left";
        trendLineHolder.style.marginLeft = "3%";

        divGraphHolder.appendChild(graphExp);
        divGraphHolder.appendChild(stratExp);
        divGraphHolder.appendChild(trendLineHolder);
        divGraphHolder.appendChild(divGraph2);

        measureGraphSubSection1.appendChild(divGraphHolder);
        
        let divGraphInfo = document.createElement("DIV");
        divGraphInfo.id = "graphinfo_"+this.moduleID;
        divGraphInfo.style.position = "relative";
        divGraphInfo.style.textAlign= "center";
        divGraphInfo.style.clear = "both";
        divGraphInfo.style.marginTop = "3%";
        measureGraphSubSection1.appendChild(divGraphInfo);

        switch(this.divType){
            case 'div':
            
                switch(this.divState){
                    case 0://fullpage
                        document.getElementById(this.parentID).prepend(this.moduleDiv);
                        this.ratioX = this.LARGEWIDTH//800;
                        this.ratioY = 400;//375;
                    break;
                    case 1: //min
                        document.getElementById(this.parentID).prepend(this.moduleDiv);
                        this.ratioX = this.SMALLWIDTH;
                        this.ratioY = 380;
                    break;
                }
            break;
            case 'multilocMin':
                document.getElementById(this.parentID).prepend(this.moduleDiv);
                this.ratioX = this.SMALLWIDTH;
                this.ratioY = 380;
            break;
            case 'multiloc':
                switch(this.divState){
                    case 0://fullpage
                        document.getElementById(this.parentID).prepend(this.moduleDiv);
                        this.ratioX = this.LARGEWIDTH//800;
                        this.ratioY = 400;//375;
                    break;
                    case 1: //min
                        document.getElementById(this.parentID).prepend(this.moduleDiv);
                        this.ratioX = this.SMALLWIDTH;
                        this.ratioY = 380;
                    break;
                }
            break;
            case 'modal':
                document.getElementById(this.parentID).appendChild(this.moduleDiv);
                this.ratioX = this.LARGEWIDTH;
                this.ratioY = 400;
            break;
            case 'slide':
                document.getElementById(this.parentID).appendChild(this.moduleDiv);
                this.ratioX = 1050;
                this.ratioY = 400;
            break;
            case 'layoutdiv':
                
                switch(this.divState){
                    case 0://fullpage
                        document.getElementById(this.parentID).prepend(this.moduleDiv);
                        this.ratioX = this.LARGEWIDTH//800;
                        this.ratioY = 400;//375;
                    break;
                    case 1: //min
                        document.getElementById(this.parentID).prepend(this.moduleDiv);
                        this.ratioX = this.SMALLWIDTH;
                        this.ratioY = 380;
                    break;
                }
            break;
        }     
        
        
        this.moduleDiv.appendChild(measureGraphSubSection1);
        this.moduleDiv.appendChild(measureGraphSubSection2);
        this.moduleDiv.appendChild(measureBreakDownGraph);
        this.moduleDiv.appendChild(measureGraphSubSection3);

        this.subModule1 = measureGraphSubSection1;
        this.subModule2 = measureGraphSubSection2;
        this.subModule3 = measureBreakDownGraph;
        this.subModule4 = measureGraphSubSection3;
    }

    addData(indata){
        this.data = indata;
        this.updateFromFilter();
    }

    
    createGraphSubModelDescript(){
        
        let measureGraphSubSection2 = document.createElement("DIV");
        measureGraphSubSection2.id = "measureGraphSubSection2_"+this.moduleID;
        measureGraphSubSection2.className = "subModuleGraphInformation";
        measureGraphSubSection2.style.display = 'none';
        
        let measureGraphSubSectionParent = document.createElement("DIV");
        measureGraphSubSectionParent.id = "measureGraphSubSection2_"+this.moduleID;
        measureGraphSubSectionParent.className = "subModuleGraphContentParent";

        //titlebar
        let mGSSTB = document.createElement("DIV");
        mGSSTB.id = "mGSSTB_"+this.moduleID;
        mGSSTB.style.margin = "0px";

            //close icon
            let mGSSClose = document.createElement("DIV");
            mGSSClose.id = "mGSSClose_"+this.moduleID;
            mGSSClose.style.float = "right";
            mGSSClose.style.margin= "1% 1% 0% 1%";

                let closeButton1 = document.createElement('button');
                closeButton1.className = "btn btn-secondary";
                closeButton1.setAttribute('data-toggle','tooltip');
                closeButton1.setAttribute('data-placement','top');
                closeButton1.setAttribute('title','Close Description');
                closeButton1.innerHTML = this.deleteIcon;
                closeButton1.addEventListener('click', (e)=>{
                    this.toggleGraphSubmodule()
                });

                mGSSClose.appendChild(closeButton1);

            //measuretitle
            let mGSSTitle = document.createElement("DIV");
            mGSSTitle.id = "mGSSTitle_"+this.moduleID;
            mGSSTitle.style.textAlign = "center";
            mGSSTitle.style.fontSize = "1.5em";
            mGSSTitle.style.paddingTop = "2%";
            mGSSTitle.style.lineHeight = '1.5em';
            
            if(this.isMulti){
                mGSSTitle.appendChild(document.createTextNode(this.graph_title));
            }
            else{
                mGSSTitle.appendChild(document.createTextNode(this.graphInformation.measureTitle));
            }

        mGSSTB.appendChild(mGSSTitle);


        mGSSTB.prepend(mGSSClose);
        measureGraphSubSectionParent.appendChild(mGSSTB);
        //hr
        measureGraphSubSectionParent.appendChild(document.createElement("hr"));

        //contentDiv
        let mGSSContent = document.createElement("DIV");
        mGSSContent.id = "mGSSContent_"+this.moduleID;
        mGSSContent.className = "subModuleGraphContentInformation";

        if(this.isMulti){
            mGSSContent.innerHTML = "Custom Graph Info";
        }
        else{
            mGSSContent.innerHTML = (this.graphHelpPanel != '' ? this.graphHelpPanel : this.graphInformation.graph_information);
        }

        measureGraphSubSectionParent.appendChild(mGSSContent);

        measureGraphSubSection2.appendChild(measureGraphSubSectionParent);
        return measureGraphSubSection2;
    }

    createExportDiv(){
        let measureGraphSubSection2 = document.createElement("DIV");
        measureGraphSubSection2.id = "measureGraphSubSection4_"+this.moduleID;
        measureGraphSubSection2.className = "measureBreakDownGraphDiv";
        measureGraphSubSection2.style.display = 'none';

        let measureGraphSubSectionParent = document.createElement("DIV");
        measureGraphSubSectionParent.id = "measureBreakDownGraphDiv_"+this.moduleID;
        measureGraphSubSectionParent.className = "subModuleGraphContentParentNoHeight";
        measureGraphSubSectionParent.style.padding = "1%";

        //titlebar
        let mGSSTB = document.createElement("DIV");
        mGSSTB.id = "mGSSTB_"+this.moduleID;
        mGSSTB.className = "row";
        mGSSTB.style.margin = "0px";
        mGSSTB.style.paddingTop = "1%";
               
            //measuretitle
            let mGSSTitle = document.createElement("DIV");
            mGSSTitle.id = "mGSSBDTitle_"+this.moduleID;
            mGSSTitle.className='col-12';
            mGSSTitle.style.textAlign = "center";
            mGSSTitle.style.fontSize = "1.5em";
            mGSSTitle.style.paddingTop = "2%";
            mGSSTitle.style.lineHeight = '1.2em';
            mGSSTitle.appendChild(document.createTextNode("Export Measure"));

            mGSSTB.appendChild(mGSSTitle);

            let closeButton = document.createElement('button');
            closeButton.className = "btn btn-secondary";
            closeButton.setAttribute('data-toggle','tooltip');
            closeButton.setAttribute('data-placement','top');
            closeButton.setAttribute('title','Close Description');
            closeButton.innerHTML = this.deleteIcon;
            closeButton.addEventListener('click', (e)=>{
                this.toggleExportSubModules()
            });

                            
            closeButton.style.position = "absolute";
            closeButton.style.right = "5%";
            closeButton.style.zIndex = 5;
            mGSSTB.append(closeButton);
            

            let mGFormHolder = document.createElement("DIV");
            mGFormHolder.className = "row subModuleGraphBreakDownContentBox ";

            let mGForm = document.createElement("DIV");
            mGForm.className = "col-12 formHolderNoBorder";

            mGForm.appendChild(document.createTextNode("Select the Export Format:"))
            mGForm.appendChild(document.createElement("BR"));
            let radio1 = document.createElement("INPUT");
                radio1.setAttribute("type", "radio");
                radio1.setAttribute("name", "exportTypeForm_"+this.moduleID);
                radio1.setAttribute("value", "pdf");
                mGForm.appendChild(radio1);
                mGForm.appendChild(document.createTextNode(" PDF"));
                mGForm.appendChild(document.createElement("BR"));

                let radio2 = document.createElement("INPUT");
                radio2.setAttribute("type", "radio");
                radio2.setAttribute("value", "image");
                radio2.setAttribute("name", "exportTypeForm_"+this.moduleID);
                mGForm.appendChild(radio2);
                mGForm.appendChild(document.createTextNode(" PNG (Chart Only)"));
                mGForm.appendChild(document.createElement("BR"));
        
        mGFormHolder.appendChild(mGForm);

        let mGTail = document.createElement("DIV");
        mGTail.className = "col-12";
        mGTail.style.textAlign = "right";

        let submitButton = document.createElement("Button");
        submitButton.className="btn btn-primary";
        submitButton.innerHTML="Download";
        submitButton.setAttribute('onclick', 'downloadGraph('+this.moduleID+');');

        mGTail.appendChild(submitButton);

        measureGraphSubSectionParent.appendChild(mGSSTB);
        
        measureGraphSubSectionParent.appendChild(document.createElement("hr"));
        measureGraphSubSectionParent.appendChild(mGFormHolder);
        measureGraphSubSectionParent.appendChild(mGTail);
        
        measureGraphSubSection2.appendChild(measureGraphSubSectionParent);
        return measureGraphSubSection2;
    }

    createGraphBreakdownDIV(){
        let measureGraphSubSection2 = document.createElement("DIV");
        measureGraphSubSection2.id = "measureGraphSubSection3_"+this.moduleID;
        measureGraphSubSection2.className = "measureBreakDownGraphDiv";
        measureGraphSubSection2.style.display = 'none';
        
        let measureGraphSubSectionParent = document.createElement("DIV");
        measureGraphSubSectionParent.id = "measureBreakDownGraphDiv_"+this.moduleID;
        measureGraphSubSectionParent.className = "subModuleGraphContentParent";

        //titlebar
        let mGSSTB = document.createElement("DIV");
        mGSSTB.id = "mGSSTB_"+this.moduleID;
        mGSSTB.className = "row";
        mGSSTB.style.margin = "0px";
        mGSSTB.style.paddingTop = "1%";

            let mGSSToolBox = document.createElement("DIV");
            mGSSToolBox.id = "mGSSToolBox_"+this.moduleID;
            mGSSToolBox.className='col-2';
           

                let mGSSParentDD = document.createElement("SELECT");
                mGSSParentDD.id = 'mGSSParentDD_'+this.moduleID;
                mGSSParentDD.style.display = "inline-flex";
                mGSSParentDD.style.width="70%";
                mGSSParentDD.addEventListener('click', (e)=>{
                    this.processBreakdownChange()
                });
                mGSSParentDD.className = "form-control form-control-sm";
        
                let opt = document.createElement('option');
                opt.value= 'N/A';
                opt.innerText = 'N/A';
                mGSSParentDD.append(opt);
                mGSSToolBox.appendChild(document.createTextNode("Interval: "));
                mGSSToolBox.appendChild(mGSSParentDD);

            mGSSTB.append(mGSSToolBox);
            
            //measuretitle
            let mGSSTitle = document.createElement("DIV");
            mGSSTitle.id = "mGSSBDTitle_"+this.moduleID;
            mGSSTitle.className='col-8';
            mGSSTitle.style.textAlign = "center";
            mGSSTitle.style.fontSize = "1.5em";
            mGSSTitle.style.paddingTop = "2%";
            mGSSTitle.style.lineHeight = '1.2em';

            mGSSTB.appendChild(mGSSTitle);

                let closeButton = document.createElement('button');
                closeButton.className = "btn btn-secondary";
                closeButton.setAttribute('data-toggle','tooltip');
                closeButton.setAttribute('data-placement','top');
                closeButton.setAttribute('title','Close Description');
                closeButton.innerHTML = this.deleteIcon;
                closeButton.addEventListener('click', (e)=>{
                    this.toggleBreakDownGraphSubmodule()
                });
                closeButton.style.position = "absolute";
                closeButton.style.right = "5%";
                closeButton.style.zIndex = 5;

            mGSSTB.append(closeButton);
            

        measureGraphSubSectionParent.appendChild(mGSSTB);
        measureGraphSubSectionParent.appendChild(document.createElement("hr"));

        //contentDiv
        let mGSSContent = document.createElement("DIV");
        mGSSContent.className = 'row subModuleGraphBreakDownContentBox';
        mGSSContent.id = "measureBreakDownGraphDivContent_"+this.moduleID;

        measureGraphSubSectionParent.appendChild(mGSSContent);

        measureGraphSubSection2.appendChild(measureGraphSubSectionParent);
        return measureGraphSubSection2;
    }

    

    toggleBreakDownGraphSubmodule(forceOpen = null){
        //currently displaying the graph
        if(forceOpen != null || this.graphBreakDownMode == 0){
            this.graphBreakDownMode = 1;
            this.subModule3.style.display = 'inline';
        }
        else{
            this.graphBreakDownMode = 0;
            this.subModule3.style.display = 'none';
        }
    }

    toggleExportSubmodule(forceOpen = null){
        //currently displaying the graph
        if(forceOpen != null || this.graphExportMode == 0){
            this.graphExportMode = 1;
            this.subModule4.style.display = 'inline';
        }
        else{
            this.graphExportMode = 0;
            this.subModule4.style.display = 'none';
        }
    }

    resetGraphBreakdown(){
        document.getElementById("measureBreakDownGraphDivContent_"+this.moduleID).innerHTML = "";
    }

    initGraphBreakDown(originalName){
        document.getElementById("mGSSParentDD_"+this.moduleID).innerHTML = "";

        let originalOption = document.createElement('option');
        originalOption.value= 'n/a';
        originalOption.innerText = originalName;
        document.getElementById('mGSSParentDD_'+this.moduleID).append(originalOption);


        let numPossible = 0;
        let options = this.data.getPossibleTotalStratifications();
        options.forEach((d)=>{
            numPossible++;
            let opt2 = document.createElement('option');
            opt2.value= d;
            opt2.innerText = d;
            document.getElementById('mGSSParentDD_'+this.moduleID).append(opt2);
        })
        return numPossible;
    }



    toggleGraphSubmodule(){
        //currently displaying the graph
        if(this.subModuleMode == 0){
            this.subModuleMode = 1;
            this.subModule2.style.display = 'inline';
        }
        else{
            this.subModuleMode = 0;
            this.subModule2.style.display = 'none';
        }

    }

    toggleGraphType(){
        let temp = document.getElementById('graphTypebutton_'+this.moduleID);
        
        switch(this.graphType){
            case 1://bargraph
                this.graphType = 2;
                temp.innerHTML = this.barGraphIcon;
                temp.setAttribute('title', 'Convert to Bar Graph');
            break;
            case 2: //linegraph
                this.graphType = 1;
                temp.innerHTML = this.lineGraphIcon;
                temp.setAttribute('title', 'Convert to Line Graph');
            break;
        }
        this.updateFromFilter();
    }


    toggleExpand(){
        let temp = document.getElementById('expandbutton_'+this.moduleID);
        let descr = document.getElementById("graphDescription_"+this.moduleID);
        let title = document.getElementById("measureTitle_"+this.moduleID);
        let countyTitle = document.getElementById("countyTitle_"+this.moduleID);
        let graphModuleTitle = document.getElementById("mGSSTitle_"+this.moduleID);
        let graphBreakDownTitle = document.getElementById("mGSSBDTitle_"+this.moduleID);

        switch(this.divState){
            case 0://fullpage
                this.divState = 1;
                temp.innerHTML = this.expandIcon;
                temp.setAttribute('title', 'Maximize the Graph');
                this.ratioX = this.SMALLWIDTH;
                this.ratioY = 380;
                this.BASEWIDTH = this.SMALLWIDTH;
                
                descr.style.fontSize = '1em';
                descr.style.lineHeight = '1.25em';
                title.style.fontSize = '1.25em';
                graphModuleTitle.style.fontSize = '1.25em';
                countyTitle.style.fontSize = '1.25em';
                graphBreakDownTitle.style.fontSize = '1em';

            break;
            case 1: //min
                this.divState = 0;
                temp.innerHTML = this.minIcon;
                temp.setAttribute('title', 'Minimize the Graph');
                this.ratioX = this.LARGEWIDTH//800;
                this.ratioY = 400;//375;
                this.BASEWIDTH = this.LARGEWIDTH;
                descr.style.fontSize = '1.3em';
                descr.style.lineHeight = '1.5em';
                title.style.fontSize = '1.5em';
                graphModuleTitle.style.fontSize = '1.5em';
                countyTitle.style.fontSize = '1.5em';
                graphBreakDownTitle.style.fontSize = '1.5em';

            break;
        }
        this.moduleDiv.className = this.divStateClass()+' graphModule';
        this.updateFromFilter();
    }

    divStateClass(){
        switch(this.divState){
            case 0://fullpage
                return  'col-md-12';
            case 1: //min
                return  'col-md-6';
        }
    }

    processBreakdownChange(){
        let d = {
                num_units : (this.graphInformation.num_units != null && this.graphInformation.num_units.length > 1) ? this.graphInformation.num_units : this.graphInformation.y_axis_label,
                stratification : null
            };
        let currentVal = document.getElementById('mGSSParentDD_'+this.moduleID).value;
        switch(currentVal.toLowerCase()){
            case 'month (all time)':
                d.group = "Month Data (All Time)";
                d.textValue = this.data.getStratificationTotal(this.county+"_"+this.measureID, 'month');
                d.stratification = this.data.getStratification(this.county+"_"+this.measureID, 'month');
                this.generateStratificationGraph(d);
            break;
            case 'quarter (all time)':
                d.group = "Quarter Data (All Time)";
                d.textValue = this.data.getStratificationTotal(this.county+"_"+this.measureID, 'quarter');
                d.stratification = this.data.getStratification(this.county+"_"+this.measureID, 'quarter')
                this.generateStratificationGraph(d);
            break;
            case 'year (all time)':
                let tempYears = this.data.getMeasurePossibleYears(this.county+"_"+this.measureID);
                
                if (tempYears.length > 0) {
                    let possibleYearsStr = '';
                    possibleYearsStr = (tempYears.length > 1)?
                        "Years: "+tempYears[0]+' - '+tempYears[tempYears.length-1] :
                        "Year: "+tempYears[0];

                    d.group = "Year Data (All Time) <br/>"+possibleYearsStr;
                    d.textValue = this.data.getStratificationTotal(this.county+"_"+this.measureID, 'year');
                    d.stratification = this.data.getStratification(this.county+"_"+this.measureID, 'year')
                    this.generateStratificationGraph(d);
                }
            break;
            default:
                this.generateStratificationGraph(this.originalStratification);            
        }
    }
    
    updateCapitaMode(val){
        this.capitaCurrent = val;
    }

    togglePin(){
        if(this.pinGraph){
            this.pinGraph = false;
            let temp = document.getElementById('pinbutton_'+this.moduleID);
            temp.className = 'btn btn-secondary';
            temp.setAttribute('title', 'Pin the Graph to the View');
        }
        else{
            this.pinGraph = true;
            let temp = document.getElementById('pinbutton_'+this.moduleID);
            temp.className = 'btn btn-success';
            temp.setAttribute('title', 'Unpin the Graph from the View');
        }
    }

    destroyIfNotPinned(){
        if(!this.pinGraph){
            this.destroy();
            return true;
        }
        return false;
    }


    populateCapiFilters(dataCapit, functionIn){

        let mdcbh = document.getElementById("measuredataCapitaButtonHolder_"+this.moduleID)
    
        let rateHolder = document.createElement('DIV');

        let mdB = document.createElement("SELECT");
        mdB.id = "measureCapitaDropDown_"+this.moduleID;
        mdB.style.display = "inline-flex";
        mdB.style.width="70%";
        mdB.addEventListener("change", functionIn);
        
        mdB.className = "form-control form-control-sm";

        let opt = document.createElement('option');
        opt.value= 'totals';
        opt.innerText = 'Count';
        mdB.append(opt);

        let foundCustomRate = false;
        
        if((!this.isMulti)){
            if(this.graphInformation.hasCustomRate != null){
                let opt5 = document.createElement('option');
                opt5.value= 'customrate';
                opt5.innerText = this.graphInformation.hasCustomRate;
                mdB.append(opt5);
                foundCustomRate = true;
            }
        }

    
        if(dataCapit != 0 && !foundCustomRate){
            let label_opt3 = this.generateRateUnit(this.graphInformation, true);
            let opt3 = document.createElement('option');
            opt3.value= '1k';
            opt3.innerText = "Rate per 1,000 " + label_opt3;
            if(label_opt3.length > 25){
                opt3.setAttribute("title", this.generateRateUnit(this.graphInformation));
            }
            mdB.append(opt3);

            let opt4 = document.createElement('option');
            opt4.value= '100k';
            opt4.innerText = "Rate per 100,000 "+ label_opt3;
            if(label_opt3.length > 25){
                opt4.setAttribute("title", this.generateRateUnit(this.graphInformation));
            }
            mdB.append(opt4); 
        }       
        
                
        rateHolder.appendChild(mdB);

        let rateDescription = document.createElement("DIV");
        rateDescription.id = "measuredataRateDescr_"+this.moduleID;
        rateHolder.appendChild(rateDescription);



        rateHolder.prepend(document.createTextNode("Value: "));
        mdcbh.appendChild(rateHolder);        
    }

    generateRateUnit(graphInformation, shouldShrink = false){
        if(this.isMulti){
            return " (Measure Definition)";
        }
        else if((this.graphInformation.denom_units != null && this.graphInformation.denom_units.length > 1)){
            let label = (!shouldShrink || this.graphInformation.denom_units.length <= 25) ? this.graphInformation.denom_units : this.graphInformation.denom_units.substring(0,23)+"...";
            return " ("+label+")";
        }
        else if (graphInformation.measureID.startsWith("2.14.") || graphInformation.measureID.startsWith("3.8") || graphInformation.measureID.startsWith("2.8.2") ){
            return " (County Population, any age)";
        }
        else if(this.graphInformation.source_text != null && this.graphInformation.source_text.indexOf("Medicaid") == -1) {
            return " (County Population, ages 18+)";
        }
        return "";
    }
    
    populateYearFilter(years, functionIn){
        years.sort();
        var mdB = document.getElementById("measuredataYearButtonHolder_"+this.moduleID)
        var yearfilterlist = document.createElement("DIV");
        yearfilterlist.id = "yearlist";
        yearfilterlist.style.border = "1px solid rgb(152, 37, 104)";
        yearfilterlist.style.float="right";
        yearfilterlist.style.overflowY = "auto";
        yearfilterlist.style.maxHeight = "100px";
        

        for (var i = 0; i < years.length; i++){   
            var inputField = document.createElement("input");
            inputField.id = "yf_"+years[i]+"_"+this.moduleID;
            inputField.type = "checkbox";
            inputField.value = years[i];
            inputField.checked = true;
            inputField.style.marginLeft="1%";
            inputField.addEventListener("change", functionIn);
            mdB.appendChild(inputField);
    
            var inputLabel = document.createElement('label');
            inputLabel.htmlFor = "yf_"+years[i];
            inputLabel.appendChild(document.createTextNode(" "+years[i]));
            mdB.appendChild(inputLabel);
        }
    }

    generateInitialGraph(){
        if(this.data != null){
            
            if(this.isMulti){
                this.graphMode = "year";
                for (let a = 0; a < this.county.length; a++){
                    let mode = (this.isPublic)? "year" : this.data.bestMeasureInterval(this.currentSubMode, this.graphInformation.isVisibleMonth, this.graphInformation.isVisibleQuarter, this.graphInformation.isVisibleYear);
                    if(this.graphMode == "year" && mode == "quarter"){
                        this.graphMode = mode;
                    }
                    if(mode == "month"){
                        this.graphMode = mode;
                    }
                }
            }
            else{
                this.graphMode = (this.isPublic && this.measureID != "3.8")? "year" : this.data.bestMeasureInterval(this.currentSubMode, this.graphInformation.isVisibleMonth, this.graphInformation.isVisibleQuarter, this.graphInformation.isVisibleYear);
                
                if(this.defaultInterval != null){
                    this.graphMode = this.defaultInterval.toLowerCase();
                }
            }
            this.updateFromFilter();
        }
    }

    

    fillGraph(mode, data) {
        if(data != null && data.length > 0) {
            let hasStrat = false;
            let shouldProc = false;
            let dataCount = data.length;
            if(this.isMulti){
                dataCount = 0;
                for( let a = 0; a < data.length; a++){
                    if(data[a] != null && data[a].length > 0){
                        shouldProc = true;
                        dataCount += data[a].length;
                        if(data[a].stratification != null && data[a].stratification != "" ){
                            hasStrat = true;
                        }
                    }
                }
            }
            else{
                shouldProc = true;
                for( let a = 0; a < data.length; a++){
                    if(data[a].stratification != null && data[a].stratification != "" ){
                        hasStrat = true;
                    }
                }
            }

            //if the graph has at least one stratification element, show the tooltip
            if(hasStrat){
                document.getElementById("stratExp_"+this.moduleID).style.visibility = "visible";
            }
            else {
                document.getElementById("stratExp_"+this.moduleID).style.visibility = "hidden";
            }


            if(!this.dataHasInit){
                let initialMode = this.graphMode;
                this.prepareForData(mode, dataCount);
                //if we found matching data at a different time interval, we should show that instead
                if(this.isMulti &&  this.multiDataChange != null){
                    data = this.generateCombinedData();
                    let dropdown = document.getElementById("measureTimeInterval_"+this.moduleID);
                    if(dropdown != null){
                        for (let a = 0; a < dropdown.options.length; a++){
                            if(dropdown.options[a].value == this.graphMode){
                                dropdown.selectedIndex = a;
                            }
                        }
                    }
                }
            }

            if(!this.isMulti && dataCount == 1){
                this.resultType = "table";
                this.generateTable(data, document.getElementById("measuredataGraph_"+this.moduleID), this.graphInformation);
            }
            else if(shouldProc){
                this.resultType = "graph";
                this.generateGraph(data, "#measuredataGraph_"+this.moduleID, ((mode === '')? false : true), this.isMulti);
            }
            else{
                this.resultType = "none";
                document.getElementById("measuredata_"+this.moduleID).innerHTML = "No data to display.A";
            }
        }
        else if (!this.dataHasInit){
            document.getElementById("measuredataGraph_"+this.moduleID).innerHTML = "Loading";
        }
        else{
            document.getElementById("measuredata_"+this.moduleID).innerHTML = "No data to display.B";
        }
    }

    prepareForData(modeString, numData){
        if(this.graphInformation != null){
            let needsFilled = true;
            if(this.isMulti || this.graphInformation.overrideToggle == null) {
                if(this.submodes != null && this.submodes.length > 0){
                    for (let i = 0; i < this.submodes.length; i++){
                        let isActive = false;
                        if(this.currentSubMode == this.submodes[i]){
                            isActive = true;
                            needsFilled = this.generateModeButtons(modeString, this.submodes[i]);
                        }
                    }
                }
                else{
                    needsFilled = this.generateModeButtons(modeString);
                }
                //updatestuff if a table
                if(numData == 1){
                    this.cleanForTable();
                }
            }
            else{
                needsFilled = false;
            }
            this.dataHasInit = true;
            this.ProcessDescription(!needsFilled);
        }
    }

    cleanForTable(){
        if(document.getElementById("measuredataGraphExp_"+this.moduleID) != null){
            document.getElementById("measuredataGraphExp_"+this.moduleID).style.display = "none";
        }
        if(document.getElementById("graphTypebutton_"+this.moduleID) != null){
            document.getElementById("graphTypebutton_"+this.moduleID).style.display = "none";
        }
    }


    generateModeButtons(modeString, submode = null){
        let foundData = false;

        let hasMonthData = false;
        let hasQuarterData = false;
        let hasYearData = false;
        let possibleCapita = null;

        let combinedHasMonth = true;
        let combinedHasQuarter = true;
        let combinedHasYear = true;

        if(this.isMulti){
            for(let a = 0; a < this.measureID.length; a++){
                let processMode =  this.data.hasSubmodes();
                let multiSubmode = (processMode)? submode : null;

                let mD = this.data.getPossibleInterval(this.measureID[a], 'month', this.county[a], multiSubmode);
                let qD = this.data.getPossibleInterval(this.measureID[a], 'quarter', this.county[a], multiSubmode);
                let yD = this.data.getPossibleInterval(this.measureID[a], 'year', this.county[a], multiSubmode);


                if(!hasMonthData){
                    hasMonthData = mD;
                }
                if(!hasQuarterData){
                    hasQuarterData = qD;
                }
                if(!hasYearData){
                    hasYearData = yD;
                }

                combinedHasMonth = (!mD)? false : combinedHasMonth;
                combinedHasQuarter = (!qD)? false : combinedHasQuarter;
                combinedHasYear = (!yD)? false : combinedHasYear;

                possibleCapita = this.data.getPossibleCapita();
            }
        }
        else{
            hasMonthData = this.data.getPossibleInterval(this.measureID, 'month', this.county, submode);
            hasQuarterData = this.data.getPossibleInterval(this.measureID, 'quarter', this.county, submode);
            hasYearData = this.data.getPossibleInterval(this.measureID, 'year', this.county, submode);
            possibleCapita = this.data.getPossibleCapita(this.measureID, this.county);
        }
        this.multiDataChange = null;
        if(this.isMulti){
            if(combinedHasMonth && !this.isPublic){
                modeString = "month";
                this.multiDataChange = "month";
            } else if(combinedHasQuarter && !this.isPublic){
                modeString = "quarter";
                this.multiDataChange = "quarter";
            } else{
                modeString = "year";
                this.multiDataChange = "year";
            }   
        }        
        if(this.filteredYears.length < 1){
            if(this.isMulti){
                for (let a = 0; a < this.measureID.length; a++){
                    let processMode =  this.data.hasSubmodes();
                    let multiSubmode = (processMode)? submode : null;

                    let tempYearArray = this.data.getMeasurePossibleYears(this.county[a]+'_'+this.measureID[a], multiSubmode);
                    //fill the year array before we grab the data
                    for (var i = 0; i < tempYearArray.length; i++){
                        if(this.filteredYears.indexOf(tempYearArray[i]) == -1){
                            this.minYear = (this.minYear > tempYearArray[i])? tempYearArray[i] : this.minYear;
                            this.maxYear = (this.maxYear < tempYearArray[i])? tempYearArray[i] : this.maxYear;
                            this.filteredYears.push(tempYearArray[i]);
                        }
                    }
                }
            }
            else{
                let tempYearArray = this.data.getMeasurePossibleYears(this.county+'_'+this.measureID, submode);
                //fill the year array before we grab the data
                for (var i = 0; i < tempYearArray.length; i++){
                    this.minYear = (this.minYear > tempYearArray[i])? tempYearArray[i] : this.minYear;
                    this.maxYear = (this.maxYear < tempYearArray[i])? tempYearArray[i] : this.maxYear;
                    this.filteredYears.push(tempYearArray[i]);
                }
            }
        }
        
        let isCurrent = false;


        let modeHolder = document.createElement('DIV');

        let mdB = document.createElement("SELECT");
        mdB.id="measureTimeInterval_"+this.moduleID;
        mdB.style.display = "inline-flex";
        mdB.style.width="70%";
        mdB.addEventListener("change", (self)=>{
            console.log(self);
            this.changeMode = self.target.value;
            this.triggeredGraphMode(this.changeMode, null/*, subMode*/);
        });

        mdB.className = "form-control form-control-sm";

        let isVisibleMonthMulti = false;       
        let isVisibleQuarterMulti = false;
        let isVisibleYearMulti = false;
        
        if(this.isMulti){
            for (let a = 0; a < this.graphInformation.length; a++){
                if(!isVisibleMonthMulti){
                    isVisibleMonthMulti = this.graphInformation[a].isVisibleMonth;
                }
                if(!isVisibleQuarterMulti){
                    isVisibleQuarterMulti = this.graphInformation[a].isVisibleQuarter;
                }
                if(!isVisibleYearMulti){
                    isVisibleYearMulti = this.graphInformation[a].isVisibleYear;
                }
            }
        } 

        if( (isVisibleMonthMulti || (!this.isMulti && this.graphInformation.isVisibleMonth == 1)) && hasMonthData){
            isCurrent = false
            let opt = document.createElement('option');
            opt.value= 'month';
            opt.innerText = 'Month';
            mdB.append(opt);
            if(modeString == 'month'){
                isCurrent = true;
                foundData = true;
                this.graphMode = "month";
            }  
        }
        if(( isVisibleQuarterMulti || (!this.isMulti && this.graphInformation.isVisibleQuarter == 1)) && hasQuarterData){
            isCurrent = false
            let opt = document.createElement('option');
            opt.value= 'quarter';
            opt.innerText = 'Quarter';
            mdB.append(opt);

            if(modeString == 'quarter'){
                isCurrent = true;
                foundData = true;
                this.graphMode = "quarter";
            }
        }
        if((isVisibleYearMulti || (!this.isMulti && this.graphInformation.isVisibleYear == 1)) && hasYearData){
            isCurrent = false
            let opt = document.createElement('option');
            opt.value= 'year';
            opt.innerText = 'Year';
            mdB.append(opt);
            if(modeString == 'year'){
                isCurrent = true;
                foundData = true;
                this.graphMode = "year";
            }
        }
        
        for(let a = 0; a < mdB.length; a++){
            if(mdB.options[a].value == this.graphMode.toLowerCase()){
                mdB.selectedIndex = a;
                break;
            }
        }
        console.log(this.filteredYears);
        if(this.filteredYears.length > 0){
            let id = this.moduleID;
            this.populateYearFilter(this.filteredYears, (self)=>{
                let year = parseInt(document.getElementById(self.target.id).value)
                console.log(this.filteredYears);
                
                var yf_checked = document.getElementById(self.target.id).checked;
                if(!yf_checked && this.filteredYears.indexOf(year) >= 0){
                    this.filteredYears.splice(this.filteredYears.indexOf(year), 1);
                }
                else{
                    console.log(year);
                    this.filteredYears.push(year);
                }
                this.updateFromFilter();
            });

            if(possibleCapita != null) {
                this.populateCapiFilters(possibleCapita, (self)=>{
                    this.updateCapitaMode(self.target.value);
                    this.updateFromFilter();
                });
            }
        }

        modeHolder.prepend(document.createTextNode("Interval: "));
        modeHolder.appendChild(mdB);
        document.getElementById("measuredataIntervalButtonHolder_"+this.moduleID).appendChild(modeHolder);
        return !foundData;
    }

    toggleSubmode(activeButton){
        for (let i = 0; i < this.submodes.length; i++){
            let tempID = 'submode_'+this.submodes[i]+'_'+this.moduleID;
            if(activeButton != tempID){
                document.getElementById(tempID).className = "btn subModeBtnDeAct";
                
            }
        }
        document.getElementById(activeButton).className = "btn subModeBtnAct";
    }

    ProcessDescription(haveDataAndShouldDisplay){
        //Graph Description
        if(haveDataAndShouldDisplay){
            var graphDescription = document.createElement("DIV");
            graphDescription.id = "graphDescription_"+this.moduleID;
            if (this.divType == "slide"){
                graphDescription.innerHTML = "";
                if(this.graphInformation.source_link != null && this.graphInformation.source_text != null && this.graphInformation.source_link.length > 4) {
                    graphDescription.innerHTML += "<br/>(Source: <a href ='"+this.graphInformation.source_link+"'>"+this.graphInformation.source_text+"</a>)";
                }
                else if(this.graphInformation.source_text != null){
                    graphDescription.innerHTML += "<br/>(Source: "+this.graphInformation.source_text+")";
                }

                graphDescription.innerHTML += "<br/>Click <a href='"+baseUrl+"/dashboards/group/"+COUNTYID+"?default="+this.measureID+"' target='_blank'>HERE</a> to view your county's dashboard</a>";
            }
            else if(this.isMulti){
                for (let a = 0; a < this.graphInformation.length; a++) {

                    graphDescription.innerHTML += "<b>"+this.graphInformation[a].community+": "+this.graphInformation[a].measureTitle+"<b>";
                    let id = this.moduleID+"-"+this.graphInformation[a].community+"-"+this.graphInformation[a].measureTitle.replace(" ", "-");
                    graphDescription.innerHTML +='&nbsp;&nbsp;&nbsp;<svg id="'+id.split(" ").join("-")+'" width="1.75em" height="1.75em" viewBox="0 0 16 16" class="bi bi-square-fill" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"/></svg>';
                    graphDescription.innerHTML += "<br/>";
                    graphDescription.innerHTML += this.graphInformation[a].graph_information+"";
                    if(this.graphInformation[a].source_link != null && this.graphInformation[a].source_text != null && this.graphInformation[a].source_link.length > 4) {
                        graphDescription.innerHTML += "<br/>(Source: <a href ='"+this.graphInformation[a].source_link+"'>"+this.graphInformation[a].source_text+"</a>)";
                    }
                    else if(this.graphInformation[a].source_text != null){
                        graphDescription.innerHTML += "<br/>(Source: "+this.graphInformation[a].source_text+")";
                    }
                    graphDescription.innerHTML += "<hr/>";
                }
            }
            else{
                graphDescription.innerHTML += this.graphInformation.graph_information+"";
                if(this.graphInformation.source_link != null && this.graphInformation.source_text != null && this.graphInformation.source_link.length > 4) {
                    graphDescription.innerHTML += "<br/>(Source: <a href ='"+this.graphInformation.source_link+"'>"+this.graphInformation.source_text+"</a>)";
                }
                else if(this.graphInformation.source_text != null){
                    graphDescription.innerHTML += "<br/>(Source: "+this.graphInformation.source_text+")";
                }
            }

            document.getElementById("graphinfo_"+this.moduleID).appendChild(document.createElement("HR"));
            document.getElementById("graphinfo_"+this.moduleID).appendChild(graphDescription);
            graphDescription.style.fontSize = '1.3em';
            graphDescription.style.lineHeight = '1.5em';
        }
        else {
            document.getElementById("measuredataButtons_"+this.moduleID).innerHTML = "";
            document.getElementById("measuredata_"+this.moduleID).innerHTML = '<div style="text-align:center"><h3> No data to display</h3></div>';
        }
    }

    updateFromFilter(){
        console.log(this.getData());
        console.log("measuredataGraph_"+this.moduleID);
        if(document.getElementById("measuredataGraph_"+this.moduleID) != null){
            document.getElementById("measuredataGraph_"+this.moduleID).innerHTML = "";

            if(this.capitaCurrent == "customrate"){
                let newTitle = this.graphInformation.measureTitle + this.generateMedicaidSubtitle();
                document.getElementById("measureTitle_"+this.moduleID).innerHTML = newTitle;
            }
            else if(this.isMulti){ 
                let newTitle = this.graph_title + this.generateMedicaidSubtitle()+ ((this.currentSubMode != null)? "<br/> ("+this.currentSubMode.toUpperCase()+")" : "");
                document.getElementById("measureTitle_"+this.moduleID).innerHTML = newTitle;
            }
            else{
                let newTitle = this.graphInformation.measureTitle + this.generateMedicaidSubtitle()+ ((this.currentSubMode != null)? "<br/> ("+this.currentSubMode.toUpperCase()+")" : "");
                document.getElementById("measureTitle_"+this.moduleID).innerHTML = newTitle;
            }
            
            if(this.isMulti){
                let combinedData = this.generateCombinedData();
                this.fillGraph(this.graphMode, combinedData);
            }
            else{
                console.log("FLAGB");
                this.fillGraph(this.graphMode, this.getData());

            }
        }
        else {
            console.log("no module");
        }
        
    }
    
    getData(geospatial = false){
        let submode = this.currentSubMode;
        if(this.graphMode != ''){
            let interval = this.graphMode
            console.log(interval);
            console.log(this.data);
            if(this.data != null){
                switch(interval){
                    case 'month':
                        if(submode != null && this.data.submodes[submode] != undefined && this.data.submodes[submode].dataMonth != null && this.data.submodes[submode].dataMonth.length > 0){
                            return this.data.submodes[submode].dataMonth;
                        }
                        else if(this.data.dataMonth != null && this.data.dataMonth.length > 0){
                            return this.data.dataMonth;
                        }
                    break;
                    case 'quarter':
                        if(submode != null && this.data.submodes[submode] != undefined && this.data.submodes[submode].dataQuarter != null && this.data.submodes[submode].dataQuarter.length > 0){
                            return this.data.submodes[submode].dataQuarter;
                        }
                        else if(this.data.dataQuarter != null && this.data.dataQuarter.length > 0){
                            return this.data.dataQuarter;
                        }
                    break;
                    case 'year':
                        if(submode != null && this.data.submodes[submode] != undefined && this.data.submodes[submode].dataYear != null && this.data.submodes[submode].dataYear.length > 0){
                            return this.data.submodes[submode].dataYear;
                        }    
                        else if(this.data.dataYear != null && this.data.dataYear.length > 0){
                            return this.data.dataYear;
                        }
                    break;
                    default:
                        console.log('Unknown interval: '+interval);
                }
            }
        }
        else if(this.data != null){
            return this.data.dataUnknown;
        }
        return null;
    }   

    generateCombinedData(){
        let combinedData = [];
        for (let a = 0; a < this.county.length; a++){
            let newVal = this.getData();
            if(newVal != null){
                combinedData.push(newVal);
            }
        }
        return combinedData;
    }

    destroy(){
        if(this.tooltipDiv != null){
            this.tooltipDiv.innerHTML = "";
            this.tooltipDiv.remove();
        }
        if(this.tooltipYAxisDiv != null){
            this.tooltipYAxisDiv.innerHTML = "";
            this.tooltipYAxisDiv.remove();
        }
        
        this.moduleDiv.innerHTML = "";
        this.moduleDiv.remove();
    }
    
    populatesubmodebutton(subMode, currentID, isActive){
        var button = document.createElement("BUTTON");
        button.innerHTML = subMode;
        button.id='submode_'+subMode+'_'+currentID
        if(isActive){
            button.className = 'btn subModeBtnAct';
        }
        else {
            button.className = 'btn subModeBtnDeAct';
        }
        button.setAttribute('data-toggle', 'tooltip');
        button.setAttribute('data-placement', 'top');
        button.setAttribute('title', 'Show '+subMode+' Data');

        button.addEventListener("click", (self,e)=>{
            console.log(self);
            this.toggleSubmode(self.target.id);//this.moduleID);
            this.triggeredGraphMode(null, subMode);
        });

        document.getElementById("measuredataToolbar_"+this.moduleID).prepend(button);
    }
    
    triggeredGraphMode(changeMode, subMode){        
        console.log("HW");
        this.graphMode = (changeMode != null)? changeMode : this.graphMode;
        this.currentSubMode = (subMode != null)? subMode : this.currentSubMode;
        if(this.isMulti){
            document.getElementById("measuredataGraph_"+this.moduleID).innerHTML = "";           

            let combinedData = [];
            for (let a = 0; a < this.county.length; a++){
                combinedData.push(this.getData());
            }
 
            this.fillGraph(this.graphMode, combinedData);

        }
        if(this.data.hasMeasure(this.county+'_'+this.measureID) && this.graphInformation != null){
            if(this.capitaCurrent == "customrate"){
                let newTitle = this.graphInformation.measureTitle + this.generateMedicaidSubtitle();
                document.getElementById("measureTitle_"+this.moduleID).innerHTML = newTitle;
            }
            else{
                let newTitle = this.graphInformation.measureTitle + this.generateMedicaidSubtitle()+ ((this.currentSubMode != null)? "<br/> ("+this.currentSubMode.toUpperCase()+")" : "");
                document.getElementById("measureTitle_"+this.moduleID).innerHTML = newTitle;
            }
            document.getElementById("measuredataGraph_"+this.moduleID).innerHTML = "";
            this.fillGraph(this.graphMode, this.getData());
        }
    }

    generateMedicaidSubtitle(){
        if(this.graphInformation.source_text != null && this.graphInformation.source_text.indexOf("Medicaid") > -1){
            return " <br/>(Medicaid population) ";
        }
        return "";
    }

}
