define([
    "esri/IdentityManager",
    "esri/layers/FeatureLayer",
    "esri/dijit/FeatureTable",
    "esri/geometry/webMercatorUtils",
    "esri/arcgis/utils",
    "esri/Color",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "dojo/on",
    "dojo/_base/lang",
    "dijit/registry",
    "dijit/form/Button",
    "dijit/form/TextBox"
],
        function (
                IdentityManager,
                FeatureLayer,
                FeatureTable,
                webMercatorUtils,
                arcgisUtils,
                Color,
                SimpleMarkerSymbol,
                SimpleLineSymbol,
                SimpleFillSymbol,
                on,
                lang,
                registry,
                Button,
                TextBox
                ) {
            var mapp;
            var myarr;
            return {
                loadTable: function (map, arr) {
                    mapp = map;
                    myarr = arr
                    try {
                        var parcelsFeature = new FeatureLayer("http://localhost:6080/arcgis/rest/services/KWALE/kwalerms/MapServer/5", {
                            mode: FeatureLayer.MODE_ONDEMAND,
                            outFields: ["*"],
                            visible: true,
                            id: "parcelsFeature"
                        });

                        //Simple fill symbol for FeatureTable
                        var sfs = new SimpleFillSymbol(
                                "solid",
                                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([52, 221, 221]), 2),
                                null
                                );

                        on(parcelsFeature, "load", function (evt) {
                            console.log("SFS layer loaded");
                            //            var extent = parcelsLayer.fullExtent;
                            //            if (webMercatorUtils.canProject(extent, map)) {
                            //                map.setExtent(webMercatorUtils.project(extent, map));
                            //            }
                        });

                        if (registry.byId("parcelTableNode")) {
                            registry.byId("parcelTableNode").destroy();
                            domConstruct.create("div", {id: "parcelTableNode"}, dom.byId("parcelFeatureTable"));
                            console.log("Re-creating table...");
                        }

                        // Add the feature layer to the map
                        var oldLayer = map.getLayer("parcelsLayer");
                        if (oldLayer) {
                            map.removeLayer(oldLayer);
                        }
                        //map.addLayer(parcelsFeature);

                        myTable = new FeatureTable({
                            "featureLayer": parcelsFeature,
                            //"dateOptions": {
                            //  "timeEnabled" : true,
                            //  "timePattern" : "HH:mm:ss",
                            //  "datePattern" : "YYYY-MM-DD"
                            //},
                            "hiddenFields": ["X_COORD", "Y_COORD", "Shape_Leng"], // field that end-user can show, but is hidden on startup
                            "map": map,
                            "allowSelectAll": true,
                            "cellNavigation": true
                        }, 'parcelTableNode');

                        // load event (must be before startup)
                        on(myTable, "load", function (evt) {
                            console.log("The load event - ", evt);
                        });

                        myTable.startup();

                        on(myTable, "dgrid-refresh-complete", function (evt) {
                            console.log("The dgrid-refresh-complete event - ", evt);
                        });

                        on(myTable, "dgrid-select", function (evt) {
                            map.addLayer(parcelsFeature);
                            parcelsFeature.setRenderer(new SimpleRenderer(sfs));
                            console.log("The dgrid-select event - ", evt);
                        });

                        on(myTable, "dgrid-deselect", function (evt) {
                            parcelsFeature.clearSelection();
                            map.graphics.clear();
                            map.removeLayer(parcelsFeature);
                            console.log("The dgrid-deselect event - ", evt);
                        });
                    } catch (err) {
                        console.log("loadTable: function (MTable.js) " + err.message);
                    }
                }
            };
        });

