/**
 * Created by Trevor Jackson on 01-Mar-2016.
 */
/// <reference path="./express/express.d.ts" />
/// <reference path="./app.ts" />

/*
 *             Libraries Used Throughout ImageWebService Class
 * cloudinary - http://cloudinary.com/documentation/node_integration
 *
 * */

import express = require("express");

class ImageWebService {

    cloudinary:any;

    constructor() {
        this.cloudinary = require('cloudinary');
    };

    // para: path:string - path to image to be uploaded, callback:function(body:any) => void - callback with a single parameter
    // uploads image to cloudinary database
    // return: none
    addImage(path:string ,callback:(body:any) => void) {
        this.cloudinary.uploader.upload(__dirname + path, callback);
    };

    // para: callback:function(body:any) => void - callback with a single parameter
    // delete every single image in the cloudinary database
    // return: none
    deleteAllImages(callback:(body:any) => void) {
        this.cloudinary.api.delete_all_resources(callback);
    };

    // para: id:string - id of an image to delete, callback:function(body:any) => void - callback with a single parameter
    // delete image in cloudinary database with given id
    // return: none
    deleteImage(id:string ,callback:(body:any) => void) {
        this.cloudinary.uploader.destroy(id, callback);
    };
}export = ImageWebService;