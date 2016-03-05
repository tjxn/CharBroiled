/**
 * Created by Trevor Jackson on 01-Mar-2016.
 */
/// <reference path="./express/express.d.ts" />
/// <reference path="./app.ts" />

import express = require("express");

class ImageWebService {

    cloudinary:any;

    constructor() {
        this.cloudinary = require('cloudinary');
    };

    addImage(path:string ,callback:(body:any) => void) {
        this.cloudinary.uploader.upload(__dirname + path, callback);
    };

    deleteAllImages(callback:(body:any) => void) {
        this.cloudinary.api.delete_all_resources(callback);
    };

    deleteImage(id:string ,callback:(body:any) => void) {
        this.cloudinary.uploader.destroy(id, callback);
    };
}export = ImageWebService;