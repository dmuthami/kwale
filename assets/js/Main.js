//Define Global variables        
var mapObject, grid, store, toc;

require([
    "dojo/dom",
    "dojo/on",
    "dojo/_base/connect",
    "dojo/dom-construct",
    "esri/map",
    "esri/layers/OpenStreetMapLayer",
    /*custom classes*/
    "assets/js/OverviewMap",
    "assets/js/HomeButton",
    "assets/js/LocateButton",
    "assets/js/BaseMapGallery",
    "assets/js/Measurement",
    "assets/js/Popup",
    "assets/js/MapLayers",
    "assets/js/MapLegend",
    "assets/js/MToc",
    "assets/js/MSearch",
    "assets/js/MTable",
    "assets/js/WebPrint",
    /*end of custom classes*/
    "esri/layers/FeatureLayer",
    "esri/InfoTemplate",
    "dojo/string",
    "dojo/domReady!"
], function (
        dom,
        on,
        connect,
        domConstruct,
        Map,
        OpenStreetMapLayer,
        /*custom classes*/
        OverviewMap,
        HomeButton,
        LocateButton,
        BaseMapGallery,
        Measurement,
        Popup,
        MapLayers,
        MapLegend,
        MToc,
        MSearch,
        MTable,
        WebPrint,
        /*end of custom classes*/
        FeatureLayer,
        InfoTemplate,
        string
        ) {

    //Create map
    mapObject = new Map("map", {
        logo: true,
        center: [39.452953, -4.174387],
        zoom: 15
    });

    //Add the OpenStreetMap Layer to the map
    var osmLayer = new OpenStreetMapLayer();
    mapObject.addLayer(osmLayer);

    /* Overview Map*/
    var overviewMap = new OverviewMap(
            {map: mapObject,
                visible: true});
    overviewMap.loadOverViewMap();

    /*Home Button*/
    var homeButton = new HomeButton(
            {map: mapObject});
    homeButton.showHomeButton();

    /*Locate Button*/
    var locateButton = new LocateButton(
            {map: mapObject});
    locateButton.showLocateButton();

    /*Basemap Gallery*/
    var baseMapGallery = new BaseMapGallery(
            {map: mapObject,
                showArcGISBasemaps: true});
    baseMapGallery.showBasemapGallery();

    /*Measurement Gallery*/
    var measurement = new Measurement(
            {map: mapObject,
                defaultAreaUnit: esri.Units.ACRES,
                defaultLengthUnit: esri.Units.METERS
            });
    measurement.showMeasurement();

    /*Popup*/
    var popup = new Popup(
            {map: mapObject});
    popup.configurePopupTemplate();

    //Define key value pair object for Popups
    var popUpObject = {};

    //Define pop up for parking areas
    var title = "Parking";
    fieldInfos = [{
            fieldName: "name",
            label: "Name:",
            visible: true
        }, {
            fieldName: "village_id",
            label: "Village ID:",
            visible: true
        }, {
            fieldName: "capacity",
            label: "Capacity:",
            visible: true
        }]
    var parkingTemplate = popup.showPopUp(title, fieldInfos);
    popUpObject['parking'] = parkingTemplate

    //Define pop up for outdoor advertisements
    var title = "Outdoor Advertisement";
    fieldInfos = [{
            fieldName: "giscode",
            label: "GIS Code:",
            visible: true
        }, {
            fieldName: "size",
            label: "Size:",
            visible: true
        }]
    var outdoorTemplate = popup.showPopUp(title, fieldInfos);
    popUpObject['outdoor'] = outdoorTemplate;


    //Define pop up for markets
    var title = "Market";
    fieldInfos = [{
            fieldName: "market_id",
            label: "market_id:",
            visible: true
        }, {
            fieldName: "giscode",
            label: "GIS Code:",
            visible: true
        }]
    var marketTemplate = popup.showPopUp(title, fieldInfos);
    popUpObject['market'] = marketTemplate;

    //Define pop up for for house rent
    var title = "House Rent";
    fieldInfos = [{
            fieldName: "house_no",
            label: "House No:",
            visible: true
        }, {
            fieldName: "giscode",
            label: "GIS Code:",
            visible: true
        }]
    var houseRentTemplate = popup.showPopUp(title, fieldInfos);
    popUpObject['house'] = houseRentTemplate;

    //Define pop up for for buildings
    var title = "Buildings";
    fieldInfos = [
        {
            fieldName: "building_name",
            label: "Building Name:",
            visible: true
        }, {
            fieldName: "number_of_units",
            label: "Number of Units:",
            visible: true
        }, {
            fieldName: "number_of_storeys",
            label: "Number of Storeys:",
            visible: true
        }, {
            fieldName: "ward_id",
            label: "Ward ID:",
            visible: true
        }, {
            fieldName: "village_id",
            label: "Village ID:",
            visible: true
        }, {
            fieldName: "subcounty_id",
            label: "Subcounty ID:",
            visible: true
        }, {
            fieldName: "building_id",
            label: "Building ID:",
            visible: true
        }, {
            fieldName: "parcel_giscode",
            label: "Parcel GIS Code:",
            visible: true
        }]
    var buildingsTemplate = popup.showPopUp(title, fieldInfos);
    popUpObject['building'] = buildingsTemplate;

    //Define pop up for for parcels
    var title = "Parcels";
    fieldInfos = [
        {
            fieldName: "giskwalerms.SDE.Parcels.ENTITY",
            label: "Entity:",
            visible: true
        }, {
            fieldName: "LAYER",
            label: "Layer:",
            visible: true
        }, {
            fieldName: "LEVEL_",
            label: "Level:",
            visible: true
        }, {
            fieldName: "ELEVATION",
            label: "Elevation:",
            visible: true
        }, {
            fieldName: "COLOR",
            label: "Color:",
            visible: true
        }, {
            fieldName: "PLOTNO_",
            label: "Plot No:",
            visible: true
        }, {
            fieldName: "NAME",
            label: "Name:",
            visible: true
        }, {
            fieldName: "BLOCK",
            label: "Block:",
            visible: true
        }, {
            fieldName: "CLASS",
            label: "Class:",
            visible: true
        }, {
            fieldName: "balance",
            label: "Balance:",
            visible: true
        }]
    var parcelsTemplate = popup.showPopUp(title, fieldInfos);
    popUpObject['parcel'] = parcelsTemplate;

    /*Layers*/
    var mapLayers = new MapLayers(
            {map: mapObject,
                layerArr: new Array(),
                infoTemplate: popUpObject
            });
    mapLayers.createLayerObjects(); //Create layer objects
    mapLayers.addLayersToMap(); // Add the layer objects to the map objects

    arr = mapLayers.getMapLayers(); //Get array populated with layers	

    try {
        /*
         * Wire "layers-add-result" with anonymous function
         * 
         */
        mapObject.on('layers-add-result', function (evt) {
            // overwrite the default visibility of service.
            // TOC will honor the overwritten value.
            /***
             * Change default visible layers 
             * dynaLayer1.setVisibleLayers([2, 5, 8, 11]);
             */
            //Call function to load Table of Contents 
            try {

                MToc.showTOC(arr, mapObject);
            } catch (err) {
                console.log("MToc: Module (Main.js) " + err.message);
            }

            /* Code to create map legend*/
            try {
                var mapLegend = new MapLegend(
                        {
                            map: mapObject,
                            layers: evt.layers
                        }
                );
                mapLegend.createLegend();
            } catch (err) {
                console.log("Maplegend object in LoadMap.js \n" + err.message)
            }
            //Call functions to load search
            try {
                MSearch.loadSearch(mapObject, arr);
            } catch (err) {
                console.log("constructor: function (WebPrint.js) " + err.message);
            }
            //Call functions to table module
            try {
                MTable.loadTable(mapObject, arr);
            } catch (err) {
                console.log("constructor: function (WebPrint.js) " + err.message);
            }
        });
    } catch (err) {
        console.log("constructor: function (WebPrint.js) " + err.message);
    }

    /*
     *Call functions on load
     * Begin  with search function
     * Apply load table function
     */
    //mapObject.on("load", MSearch.loadSearch(mapObject, arr), MTable.loadTable(mapObject, arr));
    try {
        /*
         mapObject.on("load", function() {
         MSearch.loadSearch(mapObject, arr); //Invoke search widget
         MTable.loadTable(mapObject, arr); // Invoke load table widget
         });*/
    } catch (err) {
        console.log("constructor: function (WebPrint.js) " + err.message);
    }

    /*Print Functionality*/
    var webPrint = new WebPrint(
            {
                map: mapObject
            }
    );
    webPrint.firePrintWidget();
});