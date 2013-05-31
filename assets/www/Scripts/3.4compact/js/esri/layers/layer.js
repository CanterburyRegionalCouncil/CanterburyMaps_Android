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
define("esri/layers/layer",["dojo/_base/declare","dojo/_base/config","dojo/_base/connect","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/json","dojo/has","esri/kernel","esri/lang","esri/request","esri/deferredUtils","esri/urlUtils","esri/SpatialReference","esri/geometry/Extent"],function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e){var _f=_1(null,{declaredClass:"esri.layers.Layer",constructor:function(url,_10){if(url&&_4.isString(url)){this._url=_c.urlToObject(this.url=url);}else{this.url=(this._url=null);_10=_10||url;if(_10&&_10.layerDefinition){_10=null;}}this.spatialReference=new _d(4326);this.initialExtent=new _e(-180,-90,180,90,new _d(4326));this._map=this._div=null;this.normalization=true;if(_10){if(_10.id){this.id=_10.id;}if(_10.visible===false){this.visible=false;}if(_9.isDefined(_10.opacity)){this.opacity=_10.opacity;}if(_9.isDefined(_10.minScale)){this.setMinScale(_10.minScale);}if(_9.isDefined(_10.maxScale)){this.setMaxScale(_10.maxScale);}this.attributionDataUrl=_10.attributionDataUrl||"";this.hasAttributionData=!!this.attributionDataUrl;if(_9.isDefined(_10.showAttribution)){this.showAttribution=_10.showAttribution;}}this._errorHandler=_4.hitch(this,this._errorHandler);if(this.managedSuspension){var _11=this._setMap;this._setMap=function(map){var _12=_11.apply(this,arguments);this.evaluateSuspension();if(this.suspended&&!map.loaded){var _13=_3.connect(map,"onLoad",this,function(){_3.disconnect(_13);_13=null;this.evaluateSuspension();});}return _12;};}},id:null,visible:true,loaded:false,minScale:0,maxScale:0,visibleAtMapScale:false,suspended:true,attributionDataUrl:"",hasAttributionData:false,showAttribution:true,_errorHandler:function(err){this.onError(err);},_setMap:function(map,_14,_15,lod){this._map=map;this._lyrZEHandle=_3.connect(map,"onZoomEnd",this,this._processMapScale);if(map.loaded){this.visibleAtMapScale=this._isMapAtVisibleScale();}else{var _16=_3.connect(map,"onLoad",this,function(){_3.disconnect(_16);_16=null;this._processMapScale();});}},_unsetMap:function(map,_17){_3.disconnect(this._lyrZEHandle);this._lyrZEHandle=null;this._map=null;this.suspended=true;},_cleanUp:function(){this._map=this._div=null;},_fireUpdateStart:function(){if(this.updating){return;}this.updating=true;this.onUpdateStart();if(this._map){this._map._incr();}},_fireUpdateEnd:function(_18,_19){this.updating=false;this.onUpdateEnd(_18,_19);if(this._map){this._map._decr();}},_getToken:function(){var url=this._url,crd=this.credential;return (url&&url.query&&url.query.token)||(crd&&crd.token)||undefined;},_findCredential:function(){this.credential=_8.id&&this._url&&_8.id.findCredential(this._url.path);},_useSSL:function(){var _1a=this._url,re=/^http:/i,rep="https:";if(this.url){this.url=this.url.replace(re,rep);}if(_1a&&_1a.path){_1a.path=_1a.path.replace(re,rep);}},refresh:function(){},show:function(){this.setVisibility(true);},hide:function(){this.setVisibility(false);},setMinScale:function(_1b){this.setScaleRange(_1b);},setMaxScale:function(_1c){this.setScaleRange(null,_1c);},setScaleRange:function(_1d,_1e){var _1f=_9.isDefined(_1d),_20=_9.isDefined(_1e);if(!this.loaded){this._hasMin=this._hasMin||_1f;this._hasMax=this._hasMax||_20;}var _21=this.minScale,_22=this.maxScale;this.minScale=(_1f?_1d:this.minScale)||0;this.maxScale=(_20?_1e:this.maxScale)||0;if((_21!==this.minScale)||(_22!==this.maxScale)){this.onScaleRangeChange();this._processMapScale();}},suspend:function(){this._suspended=true;this.evaluateSuspension();},resume:function(){this._suspended=false;this.evaluateSuspension();},canResume:function(){return this.loaded&&this._map&&this._map.loaded&&this.visible&&this.visibleAtMapScale&&!this._suspended;},evaluateSuspension:function(){if(this.canResume()){if(this.suspended){this._resume();}}else{if(!this.suspended){this._suspend();}}},_suspend:function(){this.suspended=true;this.onSuspend();if(this._map){this._map.onLayerSuspend(this);}},_resume:function(){this.suspended=false;var _23=(this._resumedOnce===undefined);if(_23){this._resumedOnce=true;}this.onResume({firstOccurrence:_23});if(this._map){this._map.onLayerResume(this);}},_processMapScale:function(){var _24=this.visibleAtMapScale;this.visibleAtMapScale=this._isMapAtVisibleScale();if(_24!==this.visibleAtMapScale){this.onScaleVisibilityChange();this.evaluateSuspension();}},isVisibleAtScale:function(_25){return (_25?_f.prototype._isMapAtVisibleScale.apply(this,arguments):false);},_isMapAtVisibleScale:function(_26){if(!_26&&(!this._map||!this._map.loaded)){return false;}_26=_26||this._map.getScale();var _27=this.minScale,_28=this.maxScale,_29=!_27,_2a=!_28;if(!_29&&_26<=_27){_29=true;}if(!_2a&&_26>=_28){_2a=true;}return (_29&&_2a)?true:false;},getAttributionData:function(){var url=this.attributionDataUrl,dfd=new _5(_b._dfdCanceller);if(this.hasAttributionData&&url){dfd._pendingDfd=_a({url:url,content:{f:"json"},handleAs:"json",callbackParamName:"callback"});dfd._pendingDfd.then(function(_2b){dfd.callback(_2b);},function(_2c){dfd.errback(_2c);});}else{var err=new Error("Layer does not have attribution data");err.log=_2.isDebug;dfd.errback(err);}return dfd;},getResourceInfo:function(){var _2d=this.resourceInfo;return _4.isString(_2d)?_6.fromJson(_2d):_4.clone(_2d);},setNormalization:function(_2e){this.normalization=_2e;},setVisibility:function(v){if(this.visible!==v){this.visible=v;this.onVisibilityChange(this.visible);this.evaluateSuspension();}},onLoad:function(){},onVisibilityChange:function(){},onScaleRangeChange:function(){},onScaleVisibilityChange:function(){},onSuspend:function(){},onResume:function(){},onUpdate:function(){},onUpdateStart:function(){},onUpdateEnd:function(){},onError:function(){}});if(_7("extend-esri")){_4.setObject("layers.Layer",_f,_8);}return _f;});