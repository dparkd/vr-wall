import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import { Images } from '../api/images.js';

import './vrwall.html';


var wallid;


Template.vr_wall.onCreated(function bodyOnCreated() {
  wallid = FlowRouter.getParam("_id");
  Meteor.subscribe('images');
});

Template.vr_wall.helpers({
  wallData() {
    return Images.findOne(wallid);
  }
})