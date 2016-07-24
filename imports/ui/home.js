import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import { Images } from '../api/images.js';

import './body.html'; 

Template.start_app.events({
  'click .enter-wall'(e) {
    e.preventDefault();

    Meteor.call('createRoom');
  }
})