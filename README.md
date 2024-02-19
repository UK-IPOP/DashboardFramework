# Dashboard Framework


## Description

This framework was designed to allow the creation of dynamic visualizations for datasets.


## Add your files
<h3>Main:</h3>
<ul>
    <li>MeasureManager.js: class that controls the process for storing the measure title and data. It uses the information to dynamically spawn graphs on the screen</li>
    <li>GraphModule.js: class that represents the visual module containing the graph information, controls, and html. This class extends the GraphSystem class</li>
    <li>GraphSystem.js: the base class that generates the visualization by leveraging the d3 library to create bars, lines, and other aspects, in the svg visualization.</li>
</ul>

<h3>Objects:</h3>
<ul>
    <li>MeasureTitle.js: class containing information about the measure.</li>
    <li>MeasureData.js: class containing the measurement's data and functions need to process the data.</li>
</ul>
<h3>Utilities:</h3>
<ul>
    <li>main.css</li>
</ul>
## How to Use the Dashboard Framework
Full prototype located in the examples directory or view an interactive demo:
<ul>
	<li><a href="https://uk-ipop.github.io/DashboardFramework/examples/generated_data/" target="_blank">example of data loaded from files</a></li>
	<li><a href="https://uk-ipop.github.io/DashboardFramework/examples/data_from_file/" target="_blank">example of in-line generated data</a></li>
</ul>
<br/>
<br/>
<h3>Suppression:</h3>
<b>Some data sources require suppression of values between a set range. As a result, you will need to suppress the data in your files or database, before sending it to the client-side front end.<br/>
This system has functionality for frontend suppression; however this functionality is for display only and should not be used for data protection.</b>

    <script type="module">
        	import {MeasureManager} from '../index.js';
        var DASHBOARDSYSTEM = new MeasureManager();

        /*** Your code ***/
        
        let graph_type = "standard";
        let group = "test";
        let title2 = {
            measureID : "example",
            minSuppression : 1,
			maxSuppression : 5,
        };
        DASHBOARDSYSTEM.addMeasureTitle(title2, group);
        DASHBOARDSYSTEM.spawnNewGraph(group, title2.measureID, "GRAPHHOLDER");
    </script>

    Data format required:
    {
        numerator : integer
        denominator : integer
        month : integer,
        quarter : integer,
        year : integer
        stratification: json string
        notes : string
    }

    Example:
    {
        "numerator": 91,
        "denominator": 10000,
        "month": 12,
        "quarter": null,
        "year": 2022,
        "stratification": null,
        "notes": "Values between 1-5 are suppressed"
    }

    Measure Title format required:
    {
        "measureID": string, //represents the id of the measurement
        "measureTitle": string, //represents the titles of the measurement
        "capita": integer, //represents the capita value related to the denominator of the data
        "denom_units": string, //units of the denominator
        "desiredTrendState": integer,//affects the trend icon of the tooltip. -1 negative, 0 stable, 1 positive
        "graphHelpDescription": string, //text content of the help panel
        "graphType": integer,//default graph type 1 bar, 2 line
        "graph_information": string,//text content located under the graph
        "hasCustomRate": boolean,//custom rate for the dropdown
        "isVisibleMonth": boolean,//represents if the month interval is visible
        "isVisibleQuarter": boolean,//represents if the quarter interval is visible
        "isVisibleYear": boolean,//represents if the year interval is visible
        "maxSuppression": integer,//represents the max of the suppression range
        "measureNotes": string,//any additional notes for the measure
        "minSuppression": integer,//represents the min of the suppression range
        "num_units": string,//units that appear in the tooltip
        "source_link": string,//represents the URL of the data source
        "source_text": string,//represents the name of the data source
        "submodes": [string],//represents sub-options in the measure
        "x_axis_label": string //represents the text displayed on the x axis
        "y_axis_label": string //represents the text displayed on the y axis
    }
    
    Example:
    {
        "measureID": "1",
        "measureTitle": "Opioid overdose deaths among HCS community residents",
        "capita": 1000,
        "denom_units": "",
        "desiredTrendState": "-1",
        "graphHelpDescription": "<p>This measure reports the number of&nbsp;opioid&nbsp;overdose deaths&nbsp;among community residents.&nbsp;Opioids include prescription pain medicines such as hydrocodone,&nbsp;oxycodone, and morphine, as well as&nbsp;illicit&nbsp;opioids like heroin.&nbsp;Fentanyl is&nbsp;another prescription pain medicine&nbsp;used to manage severe pain, but fentanyl&nbsp;can also be&nbsp;manufactured and sold outside of its&nbsp;approved&nbsp;medical uses&nbsp;(illicit).&nbsp;</p>\r\n\r\n<p>The number of overdose deaths&nbsp;is&nbsp;determined from data collected on death certificates.&nbsp;Typically,&nbsp;when a drug overdose death occurs,&nbsp;a&nbsp;toxicology report determines&nbsp;what substances were involved in&nbsp;the&nbsp;death.<sup>1</sup>&nbsp;&nbsp;</p>\r\n\r\n<p>Numbers between 1 and 5&nbsp;are&nbsp;suppressed according to the state data release policy for protecting confidentiality.&nbsp;</p>\r\n\r\n<p><ins>Technical notes</ins> =&nbsp;Drug overdose deaths assigned International Classification of Disease, 10<sup>th</sup>&nbsp;Revision (ICD-10) codes&nbsp;X40-X44 (unintentional), X60-X64 (suicide), X85 (homicide), and Y10-Y14 (undetermined) are included.&nbsp;Drug overdose deaths involving specific drug types are identified using ICD-10&nbsp;multiple&nbsp;cause of death codes. For opioid overdose deaths, these codes include&nbsp;T40.0, T40.1, T40.2, T40.3, T40.4, and/or T40.6.&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<p>1&nbsp;Toxicology reports are used to identify the substances involved in an overdose death. Typically, substances that are found in sufficient quantity to contribute to death are listed as a cause of death on the death certificate.&nbsp;</p>\r\n\r\n<p>The manner and cause of death information are used to assign specific cause of death codes for standardized reporting.&nbsp;&nbsp;</p>\r\n",
        "graphType": "1",
        "graph_information": "Number of opioid overdose deaths among community residents as determined from review of death certificates, post-mortem toxicology data, and other medico-legal documents. Numbers between 1 and 5 were suppressed according to the state data release policy for protecting confidentiality.",
        "hasCustomRate": null,
        "isVisibleMonth": true,
        "isVisibleQuarter": true,
        "isVisibleYear": true,
        "maxSuppression": 5,
        "measureNotes": "",
        "minSuppression": 1,
        "num_units": "Deaths",
        "source_link": "",
        "source_text": "Office of Example Data",
        "submodes": [
            "sum",
            "average"
        ],
        "x_axis_label": "Date",
        "y_axis_label": "Overdose Deaths"
    }


## Authors and acknowledgment

<ul>
    <li>Daniel Redmond</li>
</ul>

This research was supported by the National Institutes of Health and the Substance Abuse and Mental Health Services Administration through the NIH HEAL (Helping to End Addiction Long-term&#8480;) Initiative under award numbers UM1DA049406 (ClinicalTrials.gov Identifier: NCT04111939). This study protocol (Pro00038088) was approved by Advarra Inc., the HEALing Communities Study single Institutional Review Board. We wish to acknowledge the participation of the HEALing Communities Study communities, community coalitions, community partner organizations and agencies, and Community Advisory Boards and state government officials who partnered with us on this study. The content is solely the responsibility of the authors and does not necessarily represent the official views of the National Institutes of Health, the Substance Abuse and Mental Health Services Administration or the NIH HEAL Initiative&#8480;.

This project was built upon <a href="https://d3js.org/">d3js</a> version 5.

## License
MIT License

Copyright 2024 University of Kentucky

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
