
//This class represents the information about your measurement
export class MeasureTitle {
    constructor (indata){
        this.measureID = indata.measureID || "1";
        this.measureTitle = indata.measureTitle || "Opioid overdose deaths among HCS community residents";
        this.capita = indata.capita || 1000;
        this.denom_units = indata.denom_units || "";
        this.desiredTrendState = indata.desiredTrendState || "-1";
        this.graphHelpDescription = indata.graphHelpDescription || "<p>This measure reports the number of&nbsp;opioid&nbsp;overdose deaths&nbsp;among community residents.&nbsp;Opioids include prescription pain medicines such as hydrocodone,&nbsp;oxycodone, and morphine, as well as&nbsp;illicit&nbsp;opioids like heroin.&nbsp;Fentanyl is&nbsp;another prescription pain medicine&nbsp;used to manage severe pain, but fentanyl&nbsp;can also be&nbsp;manufactured and sold outside of its&nbsp;approved&nbsp;medical uses&nbsp;(illicit).&nbsp;</p>\r\n\r\n<p>The number of overdose deaths&nbsp;is&nbsp;determined from data collected on death certificates.&nbsp;Typically,&nbsp;when a drug overdose death occurs,&nbsp;a&nbsp;toxicology report determines&nbsp;what substances were involved in&nbsp;the&nbsp;death.<sup>1</sup>&nbsp;&nbsp;</p>\r\n\r\n<p>Numbers between 1 and 5&nbsp;are&nbsp;suppressed according to the state data release policy for protecting confidentiality.&nbsp;</p>\r\n\r\n<p><ins>Technical notes</ins> =&nbsp;Drug overdose deaths assigned International Classification of Disease, 10<sup>th</sup>&nbsp;Revision (ICD-10) codes&nbsp;X40-X44 (unintentional), X60-X64 (suicide), X85 (homicide), and Y10-Y14 (undetermined) are included.&nbsp;Drug overdose deaths involving specific drug types are identified using ICD-10&nbsp;multiple&nbsp;cause of death codes. For opioid overdose deaths, these codes include&nbsp;T40.0, T40.1, T40.2, T40.3, T40.4, and/or T40.6.&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<hr />\r\n<p>1&nbsp;Toxicology reports are used to identify the substances involved in an overdose death. Typically, substances that are found in sufficient quantity to contribute to death are listed as a cause of death on the death certificate.&nbsp;</p>\r\n\r\n<p>The manner and cause of death information are used to assign specific cause of death codes for standardized reporting.&nbsp;&nbsp;</p>\r\n";
        this.graphType = indata.graphType || "1";
        this.graph_information = indata.graph_information || "Number of opioid overdose deaths among community residents as determined from review of death certificates, post-mortem toxicology data, and other medico-legal documents. Numbers between 1 and 5 were suppressed according to the state data release policy for protecting confidentiality. <br><br><b>\r\nDue to standard reporting delays, we anticipate the total count of overdose deaths that occurred in 2021 will be available in April 2022. We are unable to show running totals at this time. If you would like to request the number of overdose deaths that occurred through the latest available month of 2021, please reach out to your Community Coordinator who can request the data for you.\r\n</b>";
        this.hasCustomRate = indata.hasCustomRate || null;
        this.isVisible = indata.isVisible || "1";
        this.isVisibleMonth = indata.isVisibleMonth || true;
        this.isVisibleQuarter = indata.isVisibleQuarter || true;
        this.isVisibleYear = indata.isVisibleYear || true;
        this.maxSuppression = indata.maxSuppression || "5";
        this.measureNotes = indata.measureNotes || "";
        this.measureTitle = indata.measureTitle || "Opioid overdose deaths among HCS community residents";
        this.minSuppression = indata.minSuppression || "1";
        this.moud = indata.moud || "0";
        this.naloxone = indata.naloxone || "0";
        this.num_units = indata.num_units || "Deaths";
        this.overdose = indata.overdose || "0";
        this.prescription = indata.prescription || "0";
        this.source_link = indata.source_link || "";
        this.source_text = indata.source_text || "Office of Vital Statistics";
        this.submodes = indata.submodes || ["sum", "average"];
        this.x_axis_label = indata.x_axis_label || "Date";
        this.y_axis_label = indata.y_axis_label || "Overdose Deaths";
    }

}

