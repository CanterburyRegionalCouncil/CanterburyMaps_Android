/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
define("esri/dijit/analysis/Analysis",["dijit","dojo","dojox","dojo/require!dijit/_Widget,dijit/_Templated,dijit/Menu,dijit/form/CheckBox,dijit/layout/AccordionContainer,dijit/TooltipDialog,esri/dijit/analysis/AnalysisToolItem,esri/dijit/analysis/utils,esri/dijit/analysis/HelpWindow"],function(_1,_2,_3){_2.provide("esri.dijit.analysis.Analysis");_2.require("dijit._Widget");_2.require("dijit._Templated");_2.require("dijit.Menu");_2.require("dijit.form.CheckBox");_2.require("dijit.layout.AccordionContainer");_2.require("dijit.TooltipDialog");_2.require("esri.dijit.analysis.AnalysisToolItem");_2.require("esri.dijit.analysis.utils");_2.require("esri.dijit.analysis.HelpWindow");_2.declare("esri.dijit.analysis.Analysis",[_1._Widget,_1._Templated],{widgetsInTemplate:true,templateString:"<div class=\"esriAnalysis\">\r\n   <div data-dojo-type=\"dijit.layout.AccordionContainer\"  doLayout=\"false\" style=\"height:600px;width:100%\" data-dojo-attach-point=\"_leftAccordion\">\r\n      <div data-dojo-type=\"dijit.layout.ContentPane\"  title=\"dummy\" style=\"height:240px;display:none;\" data-dojo-attach-point=\"_dummyPane\">\r\n      </div>\r\n      <div data-dojo-type=\"dijit.layout.ContentPane\"  title=\"${i18n.summarizeData}\" esriHelpTopic=\"SummarizeDataCategory\"  data-dojo-attach-point=\"_summarizeTools\">\r\n      </div>\r\n      <div data-dojo-type=\"dijit.layout.ContentPane\" title=\"${i18n.findLocations}\" esriHelpTopic=\"FindLocationsCategory\" data-dojo-attach-point=\"_locationTools\">\r\n      </div>\r\n      <div data-dojo-type=\"dijit.layout.ContentPane\" title=\"${i18n.dataEnrichment}\" esriHelpTopic=\"EnrichLocationsCategory\" data-dojo-attach-point=\"_geoenrichTools\" >\r\n      </div>\r\n      <div data-dojo-type=\"dijit.layout.ContentPane\" title=\"${i18n.analyzePatterns}\" esriHelpTopic=\"AnalyzePatternsCategory\" data-dojo-attach-point=\"_analyzePatTools\">\r\n      </div>\r\n      <div data-dojo-type=\"dijit.layout.ContentPane\" title=\"${i18n.useProximity}\" esriHelpTopic=\"UseProximityCategory\" data-dojo-attach-point=\"_proximityTools\">\r\n      </div>\r\n      <div data-dojo-type=\"dijit.layout.ContentPane\" title=\"${i18n.manageData}\" esriHelpTopic=\"ManageDataCategory\" data-dojo-attach-point=\"_managedataTools\" >\r\n      </div>\r\n  </div><!-- end AccordionContainer -->\r\n</div>",i18n:null,helpFileName:"Analysis",constructor:function(_4,_5){this.inherited(arguments);this._pbConnects=[];},postMixInProperties:function(){this.inherited(arguments);this.i18n={};_2.mixin(this.i18n,_2.i18n.getLocalization("esri","jsapi").common);_2.mixin(this.i18n,_2.i18n.getLocalization("esri","jsapi").tocPanel);_2.mixin(this.i18n,_2.i18n.getLocalization("esri","jsapi").analysisTools);},startup:function(){this.inherited(arguments);_2.query(".esriAnalysis .dijitAccordionTitle").forEach(function(_6,_7,_8){var _9=_1.byNode(_6);var _a=_2.isIE?_9.contentWidget.get("esriHelpTopic"):_9.contentWidget.get("esrihelptopic");_2.attr(_6,"innerHTML","<span class=\"esriFloatTrailing helpIcon\" esriHelpTopic=\""+_a+"\" dojoattachpoint=\"_helpIconNode\"></span>"+_6.innerHTML);},this);this.set("summarizeTools");this.set("locationTools");this.set("geoenrichTools");this.set("analyzePatterns");this.set("proximityTools");this.set("manageDataTools");this._leftAccordion.startup();_2.query(".esriAnalysis .dijitAccordionInnerContainer.dijitAccordionInnerContainerSelected.dijitSelected").forEach(function(_b,_c,_d){_2.style(_b,"display","none");});esri.dijit.analysis.utils.initHelpLinks(this.domNode);},destroy:function(){this.inherited(arguments);_2.forEach(this._pbConnects,_2.disconnect);delete this._pbConnects;},_connect:function(_e,_f,_10){this._pbConnects.push(_2.connect(_e,_f,_10));},_setSummarizeToolsAttr:function(){var _11=_2.create("div");var _12=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.aggregateTool,helpTopic:"AggregatePointsTool",toolIcon:"aggregateIcon"},_2.create("div",null,_11));_12.set("showComingSoonLabel",false);this._connect(_12,"onToolSelect",_2.hitch(this,"onToolSelect"));var _13=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.sumnearby,helpTopic:"SummarizeNearbyTool",toolIcon:"sumNearbyIcon"},_2.create("div",null,_11));var _14=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.summarizeWithin,helpTopic:"SummarizeWithinTool",toolIcon:"sumWithinIcon"},_2.create("div",null,_11));this._summarizeTools.set("content",_11);},_setLocationToolsAttr:function(){var _15=_2.create("div");var _16=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.findExistingLocations,helpTopic:"FindExistingLocationsTool",toolIcon:"findLocationsIcon"},_2.create("div",null,_15));var _17=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.findNewLocations,helpTopic:"DeriveNewLocationsTool",toolIcon:"findNewLocationsIcon"},_2.create("div",null,_15));this._locationTools.set("content",_15);},_setGeoenrichToolsAttr:function(){var _18=_2.create("div");var _19=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.geoenrichLayer,helpTopic:"EnrichFeaturesTool",toolIcon:"geoenrichLayerIcon"},_2.create("div",null,_18));this._geoenrichTools.set("content",_18);},_setProximityToolsAttr:function(){var _1a=_2.create("div");var _1b=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.createBuffers,helpTopic:"CreateBuffersTool",toolIcon:"buffersIcon"},_2.create("div",null,_1a));this._connect(_1b,"onToolSelect",_2.hitch(this,"onToolSelect"));_1b.set("showComingSoonLabel",false);var _1c=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.driveTimes,helpTopic:"CreateDriveTimeAreasTool",toolIcon:"driveIcon"},_2.create("div",null,_1a));_2.style(_1c.optionsDiv,"margin-top","0");var _1d=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.findClosestFacility,helpTopic:"FindNearestTool",toolIcon:"findClosestFacilityIcon"},_2.create("div",null,_1a));this._proximityTools.set("content",_1a);},_setAnalyzePatternsAttr:function(){var _1e=_2.create("div");var _1f=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.correlationReporter,helpTopic:"ExploreCorrelationsTool",toolIcon:"correlationReporterIcon"},_2.create("div",null,_1e));var _20=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.findHotSpots,helpTopic:"FindHotSpotsTool",toolIcon:"findHotSpotsIcon"},_2.create("div",null,_1e));_20.set("showComingSoonLabel",false);this._connect(_20,"onToolSelect",_2.hitch(this,"onToolSelect"));this._analyzePatTools.set("content",_1e);},_setInterpolateToolsAttr:function(){var _21=_2.create("div");var _22=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.createInterpolatedSurface,helpTopic:"SummarizeWithinTool",toolIcon:"createInterpolatedSurfaceIcon"},_2.create("div",null,_21));this._interpolateTools.set("content",_21);},_setManageDataToolsAttr:function(){var _23=_2.create("div");var _24=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.attributeCalculator,helpTopic:"AttributeCalculatorTool",toolIcon:"attributeCalculatorIcon"},_2.create("div",null,_23));var _25=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.dissolveBoundaries,helpTopic:"DissolveBoundariesTool",toolIcon:"dissolveBoundariesIcon"},_2.create("div",null,_23));var _26=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.extractData,helpTopic:"ExtractDataTool",toolIcon:"extractDataIcon"},_2.create("div",null,_23));var _27=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.mergeLayers,helpTopic:"MergeLayersTool",toolIcon:"mergeLayersIcon"},_2.create("div",null,_23));var _28=new esri.dijit.analysis.AnalysisToolItem({name:this.i18n.overlayLayers,helpTopic:"OverlayLayersTool",toolIcon:"overlayLayersIcon"},_2.create("div",null,_23));_28.set("showComingSoonLabel",false);this._connect(_28,"onToolSelect",_2.hitch(this,"onToolSelect"));this._managedataTools.set("content",_23);},onToolSelect:function(_29){}});});