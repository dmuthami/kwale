define([
    "dojo/on",
    "esri/dijit/Search",
    "esri/layers/FeatureLayer",
    "esri/InfoTemplate"
],
        function (
                on,
                Search,
                FeatureLayer,
                InfoTemplate
                ) {
            var mapp;
            var myarr;
            return {
                loadSearch: function (map, arr) {
                    mapp = map;
                    myarr = arr
                    try {
                        //Instantiate new search widget
                        var s = new Search({
                            enableButtonMode: true, //this enables the search widget to display as a single button
                            enableLabel: false,
                            enableInfoWindow: true,
                            showInfoWindowOnSelect: true,
                            map: mapp
                        }, "search");

                        //Get the value of the property from the Search widget
                        var sources = s.get("sources");

                        //Push the sources used to search, by default the ArcGIS Online World geocoder is included.
                        var InfoTemplateString = "Name: ${name}</br>" +
                                "Capacity: ${capacity}";
                        //Add parking source to search
                        sources.push({
                            featureLayer: myarr[0],
                            searchFields: ["name"],
                            displayField: "name",
                            exactMatch: false,
                            outFields: ["*"],
                            name: "Parking by name",
                            placeholder: "Kwale Town Bus Park",
                            maxResults: 6,
                            maxSuggestions: 6,
                            //Create an InfoTemplate for parking
                            infoTemplate: new InfoTemplate("Parking", InfoTemplateString),
                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        InfoTemplateString = "GIS Code: ${giscode}</br>" +
                                "Size: ${size}</br>"

                        //Add outdoor advertisement source to search
                        sources.push({
                            featureLayer: myarr[1],
                            searchFields: ["giscode"],
                            displayField: "giscode",
                            exactMatch: false,
                            outFields: ["*"],
                            name: "Outdoor Advertisement by GIS Code",
                            placeholder: "",
                            maxResults: 6,
                            maxSuggestions: 6,
                            //Create an InfoTemplate
                            infoTemplate: new InfoTemplate("Outdoor", InfoTemplateString),
                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        InfoTemplateString = "Market ID: ${market_id}</br>" +
                                "GIS Code: ${giscode}</br>"

                        //Add markets source to search
                        sources.push({
                            featureLayer: myarr[2],
                            searchFields: ["giscode"],
                            displayField: "giscode",
                            exactMatch: false,
                            outFields: ["*"],
                            name: "Market by GIS Code",
                            placeholder: "",
                            maxResults: 6,
                            maxSuggestions: 6,
                            //Create an InfoTemplate
                            infoTemplate: new InfoTemplate("Market", InfoTemplateString),
                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        InfoTemplateString = "House Number: ${house_no}</br>" +
                                "GIS Code: ${giscode}</br>"

                        //Add house rent source to search
                        sources.push({
                            featureLayer: myarr[3],
                            searchFields: ["house_no"],
                            displayField: "house_no",
                            exactMatch: false,
                            outFields: ["*"],
                            name: "House by number",
                            placeholder: "",
                            maxResults: 6,
                            maxSuggestions: 6,
                            //Create an InfoTemplate
                            infoTemplate: new InfoTemplate("House", InfoTemplateString),
                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        InfoTemplateString = "Building Name: ${building_name}</br>" +
                                "Number of Units: ${number_of_units}</br>"

                        //Add building source to search
                        sources.push({
                            featureLayer: myarr[4],
                            searchFields: ["building_name"],
                            displayField: "building_name",
                            exactMatch: false,
                            outFields: ["*"],
                            name: "Building by number",
                            placeholder: "",
                            maxResults: 6,
                            maxSuggestions: 6,
                            //Create an InfoTemplate
                            infoTemplate: new InfoTemplate("Building", InfoTemplateString),
                            enableSuggestions: true,
                            minCharacters: 0
                        });

                        InfoTemplateString = "Name: ${NAME}</br>" +
                                "Block: ${BLOCK}</br>" +
                                "Class: ${CLASS}</br>" +
                                "Balance: ${balance}</br>"

                        //Add parcels source to search
                        sources.push({
                            featureLayer: myarr[5],
                            searchFields: ["PLOTNO_"],
                            displayField: "PLOTNO_",
                            exactMatch: false,
                            outFields: ["*"],
                            name: "Parcel by plot number",
                            placeholder: "1855",
                            maxResults: 6,
                            maxSuggestions: 6,
                            //Create an InfoTemplate
                            infoTemplate: new InfoTemplate("Parcel", InfoTemplateString),
                            enableSuggestions: true,
                            minCharacters: 0
                        });
                        //Set the sources above to the search widget
                        s.set("sources", sources);

                        //Finalizes the creation of the Search widget
                        s.startup();
                    } catch (err) {
                        console.log("loadSearch: function (MSearch.js) " + err.message);
                    }
                }
            };
        });

