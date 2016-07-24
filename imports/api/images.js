import { Meteor } from 'meteor/meteor'; 
import { Mongo } from 'meteor/mongo';

export const Images = new Mongo.Collection('images');

if (Meteor.isServer) {
  Meteor.publish('images', function imagesPublication() {
    return Images.find({}); 
  });
}


Meteor.methods({
  'saveFile.insert'(buffer) {
    return Images.insert({
      data: buffer
    });
  }
})