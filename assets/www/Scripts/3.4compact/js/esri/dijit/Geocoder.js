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
require({cache:{"url:esri/dijit/templates/Geocoder.html":"<div class=\"${theme}\" role=\"presentation\">\r\n    <div class=\"${_GeocoderContainerClass}\" role=\"presentation\">\r\n    \t<div class=\"${_GeocoderClass}\" data-dojo-attach-point=\"containerNode\" role=\"presentation\">\r\n    \t\t<div title=\"${_i18n.widgets.Geocoder.main.searchButtonTitle}\" tabindex=\"0\" class=\"${_searchButtonClass} ${_GeocoderIconClass}\" data-dojo-attach-point=\"submitNode\" data-dojo-attach-event=\"ondijitclick:_findThenSelect\" role=\"button\"></div>\r\n    \t\t<div aria-haspopup=\"true\" id=\"${id}_menu_button\" title=\"${_i18n.widgets.Geocoder.main.geocoderMenuButtonTitle}\" tabindex=\"0\" class=\"${_geocoderMenuArrowClass} ${_GeocoderIconClass}\" data-dojo-attach-point=\"geocoderMenuArrowNode\" role=\"button\" aria-expanded=\"false\" data-dojo-attach-event=\"ondijitclick:_toggleGeolocatorMenu\"></div>\r\n    \t\t<input aria-haspopup=\"true\" id=\"${id}_input\" tabindex=\"0\" placeholder=\"\" value=\"${value}\" autocomplete=\"off\" type=\"text\" data-dojo-attach-point=\"inputNode\" data-dojo-attach-event=\"ondijitclick:_inputClick\" role=\"textbox\">\r\n    \t\t<div tabindex=\"0\" class=\"${_clearButtonClass} ${_GeocoderIconClass}\" data-dojo-attach-point=\"clearNode\" data-dojo-attach-event=\"ondijitclick:clear\" role=\"button\"></div>\r\n    \t\t<div class=\"${_GeocoderClearClass}\" role=\"presentation\"></div>\r\n    \t</div>\r\n    \t<div class=\"${_resultsContainerClass}\" data-dojo-attach-point=\"resultsNode\" aria-labelledby=\"${id}_input\" role=\"menu\" aria-hidden=\"true\"></div>\r\n    \t<div class=\"${_geocoderMenuClass}\" data-dojo-attach-point=\"geocoderMenuNode\" role=\"presentation\">\r\n    \t\t<div class=\"${_geocoderMenuHeaderClass}\">\r\n    \t\t\t${_i18n.widgets.Geocoder.main.geocoderMenuHeader}\r\n    \t\t\t<div role=\"button\" data-dojo-attach-point=\"geocoderMenuCloseNode\" data-dojo-attach-event=\"ondijitclick:_hideGeolocatorMenu\" title=\"${_i18n.widgets.Geocoder.main.geocoderMenuCloseTitle}\" tabindex=\"0\" class=\"${_geocoderMenuCloseClass}\"></div>\r\n    \t\t\t<div class=\"${_GeocoderClearClass}\" role=\"presentation\"></div>\r\n    \t\t</div>\r\n    \t\t<div data-dojo-attach-point=\"geocoderMenuInsertNode\" aria-labelledby=\"${id}_menu_button\" role=\"menu\" aria-hidden=\"true\"></div>\r\n    \t</div>\r\n    </div>\r\n</div>"}});define("esri/dijit/Geocoder",["dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/event","dojo/dom-construct","dojo/json","dojo/keys","dojo/on","dojo/query","dojo/i18n!esri/nls/jsapi","dojo/text!esri/dijit/templates/Geocoder.html","dojo/uacss","dijit/_OnDijitClickMixin","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/focus","esri/kernel","esri/SpatialReference","esri/graphic","esri/request","esri/geometry/Point","esri/geometry/Extent","esri/tasks/locator"],function(_1,_2,_3,_4,_5,_6,_7,on,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16){var _17=_1([_e,_c,_d],{declaredClass:"esri.dijit.Geocoder",templateString:_a,constructor:function(_18,_19){this._setPublicDefaults();_1.safeMixin(this,_18);this._setPrivateDefaults();this.watch("value",this._updateValue);this.watch("theme",this._updateTheme);this.watch("activeGeocoder",this._setActiveGeocoder);this.watch("activeGeocoderIndex",this._setActiveGeocoderIndex);this.watch("geocoder",this._updateGeocoder);this.watch("arcgisGeocoder",this._updateGeocoder);},startup:function(){if(!this._geocoders.length){console.log("No geocoders defined.");this.destroy();return;}if(!this.domNode){console.log("domNode is undefined.");this.destroy();return;}if(this.value){this._checkStatus();}this._setDelegations();},postCreate:function(){this.loaded=true;this._updateGeocoder();},destroy:function(){var i;if(this._delegations){for(i=0;i<this._delegations.length;i++){this._delegations[i].remove();}}_5.empty(this.domNode);this.inherited(arguments);},clear:function(){this.onClear();if(this.loaded){_8(this.inputNode).attr("value","");}this.value="";this.results=[];if(this.loaded){_8(this.containerNode).removeClass(this._hasValueClass);_8(this.clearNode).attr("title","");}this._hideMenus();this._hideLoading();},show:function(){if(this.loaded){_8(this.domNode).style("display","block");}},hide:function(){if(this.loaded){_8(this.domNode).style("display","none");}},find:function(_1a){var _1b=this;if(_1a&&typeof _1a==="string"){_1b._updateValue(null,null,_1a);}var _1c=new _3();_1b._query({delay:0}).then(function(_1d){_1b.onFindResults(_1d);_1c.resolve(_1d);});return _1c;},focus:function(){if(this.loaded){_f.focus(this.inputNode);}},blur:function(){if(this.loaded&&_f.curNode){_f.curNode.blur();}},select:function(e){this.onSelect(e);this._hideMenus();this._hideLoading();if(this.autoNavigate&&e&&e.hasOwnProperty("extent")&&this.map){this.map.setExtent(e.extent);}},onSelect:function(e){},onFindResults:function(e){},onAutoComplete:function(e){},onGeocoderSelect:function(e){},onClear:function(){},onEnterKeySelect:function(){},_setPublicDefaults:function(){this.autoComplete=false;this.arcgisGeocoder=true;this.value="";this.theme="simpleGeocoder";this.activeGeocoderIndex=0;this.maxLocations=6;this.minCharacters=3;this.searchDelay=350;this.geocoderMenu=true;this.autoNavigate=true;this.showResults=true;},_setPrivateDefaults:function(){this._i18n=_9;this.results=[];this._defaultSR=new _11(4326);this._GeocoderContainerClass="esriGeocoderContainer";this._GeocoderClass="esriGeocoder";this._GeocoderMultipleClass="esriGeocoderMultiple";this._GeocoderIconClass="esriGeocoderIcon";this._GeocoderActiveClass="esriGeocoderActive";this._loadingClass="esriGeocoderLoading";this._resultsContainerClass="esriGeocoderResults";this._resultsItemClass="esriGeocoderResult";this._resultsItemEvenClass="esriGeocoderResultEven";this._resultsItemOddClass="esriGeocoderResultOdd";this._resultsItemFirstClass="esriGeocoderResultFirst";this._resultsItemLastClass="esriGeocoderResultLast";this._resultsPartialMatchClass="esriGeocoderResultPartial";this._searchButtonClass="esriGeocoderSearch";this._clearButtonClass="esriGeocoderReset";this._hasValueClass="esriGeocoderHasValue";this._geocoderMenuClass="esriGeocoderMenu";this._geocoderMenuHeaderClass="esriGeocoderMenuHeader";this._geocoderMenuCloseClass="esriGeocoderMenuClose";this._activeMenuClass="esriGeocoderMenuActive";this._geocoderMenuArrowClass="esriGeocoderMenuArrow";this._geocoderSelectedClass="esriGeocoderSelected";this._geocoderSelectedCheckClass="esriGeocoderSelectedCheck";this._GeocoderClearClass="esriGeocoderClearFloat";},_setEsriGeocoder:function(){if(this.arcgisGeocoder){if(typeof this.arcgisGeocoder==="object"){this._arcgisGeocoder=this.arcgisGeocoder;}else{this._arcgisGeocoder={};}if(!this._arcgisGeocoder.url){this._arcgisGeocoder.url=location.protocol+"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";}if(!this._arcgisGeocoder.name){this._arcgisGeocoder.name=_9.widgets.Geocoder.esriGeocoderName;}if(!this._arcgisGeocoder.hasOwnProperty("localSearchOptions")){this._arcgisGeocoder.localSearchOptions={minScale:150000,distance:12000};}this.arcgisGeocoder=this._arcgisGeocoder;}else{this.arcgisGeocoder=false;}},_setActiveGeocoder:function(){this.activeGeocoder=this._geocoders[this.activeGeocoderIndex];this._updatePlaceholder();},_setGeocoderList:function(){var _1e=[];if(this.arcgisGeocoder){_1e=_1e.concat([this._arcgisGeocoder]);}if(this.geocoders&&this.geocoders.length){_1e=_1e.concat(this.geocoders);}this._geocoders=_1e;},_updateGeocoder:function(){this.activeGeocoderIndex=0;this._setEsriGeocoder();this._setGeocoderList();this._setActiveGeocoder();this._insertGeocoderMenuItems();},_updatePlaceholder:function(){if(this.loaded){this._placeholder="";if(this.activeGeocoder&&this.activeGeocoder.placeholder){this._placeholder=this.activeGeocoder.placeholder;}_8(this.inputNode).attr("placeholder",this._placeholder);_8(this.submitNode).attr("title",this._placeholder);}},_updateValue:function(_1f,_20,_21){if(this.loaded){_8(this.inputNode).attr("value",_21);this._checkStatus();}},_updateTheme:function(_22,_23,_24){if(this.loaded){_8(this.domNode).removeClass(_23).addClass(_24);}},_setActiveGeocoderIndex:function(_25,_26,_27){this.activeGeocoderIndex=_27;this._setActiveGeocoder();this._hideMenus();this._insertGeocoderMenuItems();var evt={attr:this.activeGeocoder,oldVal:_26,newVal:_27};this.onGeocoderSelect(evt);},_query:function(e){var _28=this;if(!e){e={delay:0};}if(this._deferred){this._deferred.cancel("stop query");}this._deferred=new _3();this._queryTimer=setTimeout(function(){_28._performQuery();},e.delay);return this._deferred;},_performQuery:function(){if(this.value){this._hideGeolocatorMenu();this._showLoading();var _29;var _2a=this.activeGeocoder.outFields||"";var _2b="";var _2c=this;if(this.activeGeocoder.prefix){_2b+=this.activeGeocoder.prefix;}_2b+=this.value;if(this.activeGeocoder.suffix){_2b+=this.activeGeocoder.suffix;}if(this.activeGeocoder===this._arcgisGeocoder){var _2d=this._defaultSR;if(this.map){_2d=this.map.spatialReference;}_29={"text":_2b,"outSR":_2d.wkid||_6.stringify(_2d.toJson()),"f":"json"};if(this.map&&this.activeGeocoder.localSearchOptions&&this.activeGeocoder.localSearchOptions.hasOwnProperty("distance")&&this.activeGeocoder.localSearchOptions.hasOwnProperty("minScale")){var _2e=this.map.extent.getCenter().normalize();var _2f=this.map.getScale();if(!this.activeGeocoder.localSearchOptions.minScale||(_2f&&_2f<=parseFloat(this.activeGeocoder.localSearchOptions.minScale))){_29.location=_6.stringify(_2e.toJson());_29.distance=this.activeGeocoder.localSearchOptions.distance;}}if(_2a){_29.outFields=_2a;}if(this.maxLocations){_29.maxLocations=this.maxLocations;}if(this.activeGeocoder.sourceCountry){_29.sourceCountry=this.activeGeocoder.sourceCountry;}if(this.activeGeocoder.searchExtent){var _30={"xmin":this.activeGeocoder.searchExtent.xmin,"ymin":this.activeGeocoder.searchExtent.ymin,"xmax":this.activeGeocoder.searchExtent.xmax,"ymax":this.activeGeocoder.searchExtent.ymax,"spatialReference":this.activeGeocoder.searchExtent.spatialReference.toJson()};_29.bbox=_6.stringify(_30);}var _31=_13({url:this.activeGeocoder.url+"/find",content:_29,handleAs:"json",callbackParamName:"callback",load:function(_32){_2c._receivedResults(_32.locations);}});}else{_29={address:{}};if(this.activeGeocoder.singleLineFieldName){_29.address[this.activeGeocoder.singleLineFieldName]=_2b;}else{_29.address["Single Line Input"]=_2b;}if(_2a){_29.outFields=[_2a];}if(this.activeGeocoder.searchExtent){_29.searchExtent=this.activeGeocoder.searchExtent;}this._task=new _16(this.activeGeocoder.url);this._task.outSpatialReference=this._defaultSR;if(this.map){this._task.outSpatialReference=this.map.spatialReference;}this._task.addressToLocations(_29,function(_33){_2c._receivedResults(_33);},function(_34){_2c._receivedResults(_34);});}}else{this._hideLoading();this._deferred.resolve();}},_showResults:function(e){var _35=this;_35._hideGeolocatorMenu();var _36="";if(_35.results&&_35.results.length&&_35.resultsNode){var _37=_35.value,i;var _38=new RegExp("("+_37+")","gi");_36+="<ul role=\"presentation\">";for(i=0;i<_35.results.length;++i){var _39=this._resultsItemClass+" ";if(i%2===0){_39+=_35._resultsItemOddClass;}else{_39+=_35._resultsItemEvenClass;}if(i===0){_39+=" "+_35._resultsItemFirstClass;}else{if(i===(_35.results.length-1)){_39+=" "+_35._resultsItemLastClass;}}_36+="<li data-text=\""+_35.results[i].name+"\" data-item=\"true\" data-index=\""+i+"\" role=\"menuitem\" tabindex=\"0\" class=\""+_39+"\">"+_35.results[i].name.replace(_38,"<strong class=\""+_35._resultsPartialMatchClass+"\">"+_37+"</strong>")+"</li>";}_36+="</ul>";if(_35.resultsNode){_35.resultsNode.innerHTML=_36;}_35._showResultsMenu();}},_autocomplete:function(){var _3a=this;_3a._query({delay:this.searchDelay}).then(function(_3b){_3a.onAutoComplete(_3b);if(_3a.showResults){_3a._showResults(_3b);}});},_receivedResults:function(_3c){var _3d=this;_3d._hideLoading();var _3e=_3d._hydrateResults(_3c);_3d.results=_3e;var obj={"results":_3e,"value":_3d.value};_3d._deferred.resolve(obj);},_showLoading:function(){if(this.loaded){_8(this.containerNode).addClass(this._loadingClass);}},_hideLoading:function(){if(this.loaded){_8(this.containerNode).removeClass(this._loadingClass);}},_showGeolocatorMenu:function(){if(this.loaded){_8(this.containerNode).addClass(this._activeMenuClass);_8(this.geocoderMenuNode).style("display","block");_8(this.geocoderMenuInsertNode).attr("aria-hidden","false");_8(this.geocoderMenuArrowNode).attr("aria-expanded","true");}},_hideGeolocatorMenu:function(){if(this.loaded){var _3f=_8(this.containerNode);_3f.removeClass(this._activeMenuClass);_8(this.geocoderMenuNode).style("display","none");_8(this.geocoderMenuInsertNode).attr("aria-hidden","true");_8(this.geocoderMenuArrowNode).attr("aria-expanded","false");}},_toggleGeolocatorMenu:function(){this._hideResultsMenu();if(this.loaded){var _40=_8(this.geocoderMenuNode).style("display");if(_40[0]==="block"){this._hideGeolocatorMenu();}else{this._showGeolocatorMenu();}}},_showResultsMenu:function(){if(this.loaded){_8(this.containerNode).addClass(this._GeocoderActiveClass);_8(this.resultsNode).style("display","block");_8(this.resultsNode).attr("aria-hidden","false");}},_hideResultsMenu:function(){if(this.loaded){_8(this.resultsNode).style("display","none");_8(this.containerNode).removeClass(this._GeocoderActiveClass);_8(this.resultsNode).attr("aria-hidden","true");}},_hideMenus:function(){this._hideGeolocatorMenu();this._hideResultsMenu();},_insertGeocoderMenuItems:function(){if(this.loaded){if(this.geocoderMenu&&this._geocoders.length>1){var _41="";var _42="",i;_41+="<ul role=\"presentation\">";for(i=0;i<this._geocoders.length;i++){_42=this._resultsItemClass+" ";if(i%2===0){_42+=this._resultsItemOddClass;}else{_42+=this._resultsItemEvenClass;}if(i===this.activeGeocoderIndex){_42+=" "+this._geocoderSelectedClass;}if(i===0){_42+=" "+this._resultsItemFirstClass;}else{if(i===(this._geocoders.length-1)){_42+=" "+this._resultsItemLastClass;}}var _43=this._geocoders[i].name||_9.widgets.Geocoder.main.untitledGeocoder;_41+="<li data-index=\""+i+"\" data-item=\"true\" role=\"menuitem\" tabindex=\"0\" class=\""+_42+"\">";_41+="<div class=\""+this._geocoderSelectedCheckClass+"\"></div>";_41+=_43;_41+="<div class=\""+this._GeocoderClearClass+"\"></div>";_41+="</li>";}_41+="</ul>";this.geocoderMenuInsertNode.innerHTML=_41;_8(this.geocoderMenuNode).style("display","none");_8(this.geocoderMenuArrowNode).style("display","block");_8(this.containerNode).addClass(this._GeocoderMultipleClass);}else{this.geocoderMenuInsertNode.innerHTML="";_8(this.geocoderMenuNode).style("display","none");_8(this.geocoderMenuArrowNode).style("display","none");_8(this.containerNode).removeClass(this._GeocoderMultipleClass);}}},_checkStatus:function(){if(this.loaded){if(this.value){_8(this.containerNode).addClass(this._hasValueClass);_8(this.clearNode).attr("title",_9.widgets.Geocoder.main.clearButtonTitle);}else{this.clear();}}},_setDelegations:function(){var _44=this;this._delegations=[];var _45=on(document,"click",function(e){_44._hideResultsMenu(e);});this._delegations.push(_45);var _46=on(this.inputNode,"keyup",function(e){_44._inputKeyUp(e);});this._delegations.push(_46);var _47=on(this.inputNode,"keydown",function(e){_44._inputKeyDown(e);});this._delegations.push(_47);var _48=on(this.geocoderMenuArrowNode,"keydown",_44._geocoderMenuButtonKeyDown());this._delegations.push(_48);var _49=on(this.resultsNode,"[data-item=\"true\"]:click, [data-item=\"true\"]:keydown",function(e){clearTimeout(_44._queryTimer);var _4a=_8("[data-item=\"true\"]",_44.resultsNode);var _4b=parseInt(_8(this).attr("data-index")[0],10);var _4c=_8(this).attr("data-text");var _4d;if(e.type==="click"||(e.type==="keydown"&&e.keyCode===_7.ENTER)){_8(_44.inputNode).attr("value",_4c);_44.value=_4c;if(_44.results&&_44.results[_4b]){_44.select(_44.results[_4b]);}}else{if(e.type==="keydown"&&e.keyCode===_7.UP_ARROW){_4.stop(e);_4d=_4b-1;if(_4d<0){_44.inputNode.focus();}else{_4a[_4d].focus();}}else{if(e.type==="keydown"&&e.keyCode===_7.DOWN_ARROW){_4.stop(e);_4d=_4b+1;if(_4d>=_4a.length){_44.inputNode.focus();}else{_4a[_4d].focus();}}else{if(e.keyCode===_7.ESCAPE){clearTimeout(_44._queryTimer);_44._hideMenus();}}}}});this._delegations.push(_49);var _4e=on(this.geocoderMenuInsertNode,"[data-item=\"true\"]:click, [data-item=\"true\"]:keydown",function(e){var _4f=_8("[data-item=\"true\"]",_44.geocoderMenuInsertNode);var _50=parseInt(_8(this).attr("data-index")[0],10);var _51;if(e.type==="click"||(e.type==="keydown"&&e.keyCode===_7.ENTER)){_44._setActiveGeocoderIndex(null,null,_50);_44._hideGeolocatorMenu();}else{if(e.type==="keydown"&&e.keyCode===_7.UP_ARROW){_4.stop(e);_51=_50-1;if(_51<0){_44.geocoderMenuArrowNode.focus();}else{_4f[_51].focus();}}else{if(e.type==="keydown"&&e.keyCode===_7.DOWN_ARROW){_4.stop(e);_51=_50+1;if(_51>=_4f.length){_44.geocoderMenuArrowNode.focus();}else{_4f[_51].focus();}}else{if(e.keyCode===_7.ESCAPE){_44._hideGeolocatorMenu();}}}}});this._delegations.push(_4e);},_findThenSelect:function(){var _52=this;this.find().then(function(_53){if(_53.results&&_53.results.length){_52.select(_53.results[0]);_52.onEnterKeySelect();}});},_inputKeyUp:function(e){if(e){var _54=this;clearTimeout(this._queryTimer);var _55=this.inputNode.value;this.value=_55;var _56=0;if(_55){_56=_55.length;}var _57=_8("[data-item=\"true\"]",this.resultsNode);if(e.keyCode===e.shiftKey||e.keyCode===_7.UP_ARROW||e.keyCode===_7.DOWN_ARROW||e.keyCode===_7.LEFT_ARROW||e.keyCode===_7.RIGHT_ARROW){return;}else{if(e&&e.keyCode===_7.ENTER){this._findThenSelect();}else{if(e&&e.keyCode===_7.ESCAPE){clearTimeout(this._queryTimer);this._hideMenus();}else{if(this.autoComplete&&_56>=this.minCharacters){this._autocomplete();}else{this._hideMenus();}}}}this._checkStatus();}},_inputKeyDown:function(e){var _58=_8("[data-item=\"true\"]",this.resultsNode);if(e&&e.keyCode===_7.TAB){this._hideMenus();if(this._deferred){this._deferred.cancel("stop query");}return;}else{if(e&&e.keyCode===_7.UP_ARROW){_4.stop(e);var _59=_58.length;if(_59){_58[_59-1].focus();}}else{if(e&&e.keyCode===_7.DOWN_ARROW){_4.stop(e);if(_58[0]){_58[0].focus();}}}}},_geocoderMenuButtonKeyDown:function(e){var _5a=_8("[data-item=\"true\"]",this.geocoderMenuInsertNode);if(e&&e.keyCode===_7.UP_ARROW){_4.stop(e);this._showGeolocatorMenu();var _5b=_5a.length;if(_5b){_5a[_5b-1].focus();}}else{if(e&&e.keyCode===_7.DOWN_ARROW){_4.stop(e);this._showGeolocatorMenu();if(_5a[0]){_5a[0].focus();}}}},_inputClick:function(){this._hideGeolocatorMenu();if(!this.value){this.clear();this._hideMenus();}this._checkStatus();},_hydrateResults:function(e){var _5c=this;var _5d=[];var sR=this._defaultSR;if(_5c.map){sR=_5c.map.spatialReference;}if(e&&e.length){var i=0;for(i;i<e.length&&i<_5c.maxLocations;i++){var _5e={},_5f;if(e[i].hasOwnProperty("extent")){_5e.extent=new _15(e[i].extent);_5e.extent.setSpatialReference(new _11(sR));if(e[i].hasOwnProperty("name")){_5e.name=e[i].name;}if(e[i].hasOwnProperty("feature")){_5e.feature=new _12(e[i].feature);_5f=_5e.feature.geometry;if(_5f){_5f.setSpatialReference(sR);}}}else{if(e[i].hasOwnProperty("location")){var _60=new _14(e[i].location.x,e[i].location.y,sR);if(_5c.map){_5e.extent=_5c.map.extent.centerAt(_60);}else{_5e.extent=new _15({"xmin":_60.x-0.25,"ymin":_60.y-0.25,"xmax":_60.x+0.25,"ymax":_60.y+0.25,"spatialReference":{"wkid":4326}});}if(e[i].hasOwnProperty("address")){_5e.name=e[i].address;}var _61={};if(e[i].hasOwnProperty("attributes")){_61=e[i].attributes;}if(e[i].hasOwnProperty("score")){_61.score=e[i].score;}_5e.feature=new _12(_60,null,_61,null);}}_5d.push(_5e);}}return _5d;}});if(_b("extend-esri")){_2.setObject("dijit.Geocoder",_17,_10);}return _17;});