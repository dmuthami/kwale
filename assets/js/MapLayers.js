/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/parser",
    "esri/map",
    "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/on",
    "dojox/charting/Chart",
    "dojox/charting/themes/Dollar",
    "dojo/domReady!"
],
        function (
                declare,
                lang,
                parser,
                Map,
                Popup,
                PopupTemplate,
                FeatureLayer,
                SimpleFillSymbol,
                Color,
                domClass,
                domConstruct,
                on,
                Chart, theme
                ) {
            return declare(null, {
                map: null,
                layerArr: null,
                infoTemplate: null,
                constructor: function (/*Object*/ kwArgs) {
                    try {
                        parser.parse();
                        lang.mixin(this, kwArgs);
                    } catch (err) {
                        console.log("constructor: function (MapLayers.js) " + err.message);
                    }
                },
                //create the layer objects
                createLayerObjects: function () {
                    try {
                        //Initialize parking feature layers
                        var parkingLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/KWALE/kwalerms/MapServer/0", {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"],
                            infoTemplate: this.infoTemplate['parking'],
                            id: "parkingLayer"
                        });


                        //Initialize outdoor advertisement feature layers
                        var outdoorAdvertisementLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/KWALE/kwalerms/MapServer/1", {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"],
                            infoTemplate: this.infoTemplate['outdoor'],
                            id: "outdoorAdvertisementLayer"
                        });


                        //Initialize market feature layers
                        var marketLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/KWALE/kwalerms/MapServer/2", {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"],
                            infoTemplate: this.infoTemplate['market'],
                            id: "marketLayer"
                        });


                        //Initialize house rent layers
                        var houseRentLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/KWALE/kwalerms/MapServer/3", {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"],
                            infoTemplate: this.infoTemplate['house'],
                            id: "houseRentLayer"
                        });


                        //Initialize market feature layers
                        var buildingLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/KWALE/kwalerms/MapServer/4", {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"],
                            infoTemplate: this.infoTemplate['bulding'],
                            id: "buildingLayer"
                        });


                        //Initialize Parcels feature layers
                        var parcelsLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/KWALE/kwalerms/MapServer/5", {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"],
                            infoTemplate: this.infoTemplate['parcel'],
                            id: "parcelsLayer"
                        });

                        //Add layers in a certain order
                        this.layerArr.push(parkingLayer);
                        this.layerArr.push(outdoorAdvertisementLayer);
                        this.layerArr.push(marketLayer);
                        this.layerArr.push(houseRentLayer);
                        this.layerArr.push(buildingLayer);
                        this.layerArr.push(parcelsLayer);
                    } catch (err) {
                        console.log("createLayerObjects: function (MapLayers.js) " + err.message);
                    }
                },
                //Add layers to the map
                addLayersToMap: function () {
                    try {
                        //Add feature layers to map
                        this.map.addLayers(this.layerArr);
                        //this.map.addLayers(parkingLayer);	
                    } catch (err) {
                        console.log("addLayersToMap: function (MapLayers.js) " + err.message);
                    }
                },
                //Get the map layers
                getMapLayers: function () {
                    try {
                        return this.layerArr;
                    } catch (err) {
                        console.log("getMapLayers: function (MapLayers.js) " + err.message);
                    }
                }
            });
        });

