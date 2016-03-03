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
}export = ImageWebService;