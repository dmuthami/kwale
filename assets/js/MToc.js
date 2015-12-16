define([
    "dojo/_base/declare",
    "agsjs/dijit/TOC"],
        function (
                declare,
                TOC) {
            var arr;
            var mapp;
            return {
                showTOC: function (arr, mapp) {
                    this.arr = arr;
                    this.mapp = mapp;
                    try {
                        toc = new TOC({
                            map: this.mapp,
                            layerInfos: [
                                {
                                    layer: this.arr[0],
                                    title: "Parking"
                                            //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                            //slider: false // whether to display a transparency slider.
                                },
                                {
                                    layer: this.arr[1],
                                    title: "Outdoor Advert"
                                            //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                            //slider: false // whether to display a transparency slider.
                                }, {
                                    layer: this.arr[2],
                                    title: "Markets"
                                            //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                            //slider: false // whether to display a transparency slider.
                                }, {
                                    layer: this.arr[3],
                                    title: "House Rent"
                                            //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                            //slider: false // whether to display a transparency slider.
                                }, {
                                    layer: this.arr[4],
                                    title: "Building"
                                            //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                            //slider: false // whether to display a transparency slider.
                                }, {
                                    layer: this.arr[5],
                                    title: "Parcles"
                                            //collapsed: false, // whether this root layer should be collapsed initially, default false.
                                            //slider: false // whether to display a transparency slider.
                                }]
                        }, 'tocDiv');

                        toc.startup();
                        toc.on('load', function () {
                            if (console)
                                console.log('TOC loaded');
                        });
                    } catch (err) {
                        console.log("showTOC: function (MToc.js) " + err.message);
                    }
                }
            };
        });

