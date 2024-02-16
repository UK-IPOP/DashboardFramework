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


<code>

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
</code>
<code>

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
</code>
<br/>

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
