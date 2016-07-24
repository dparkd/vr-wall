import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import { Images } from '../api/images.js';

import Sketch from 'sketch-js';
const sketch = require('sketch-js');



/*============================= 
                    END IMPORTS
============================= */

import './draw.html';

// Global Variables
// Pen Color
var lineColor = '#2E93FF';
Session.set('penColor', lineColor);
// Color History
var colorHistory = ['#2E93FF']; 
Session.set('colorHistory', colorHistory);
// Pen Radius
var currentRadius = 20;
Session.set('penRadius', currentRadius);


// Function to clone all the canvases
function cloneCanvas(oldCanvas) {
  var newCanvas = document.getElementsByClassName('copy');

  for (var i = 0; i < newCanvas.length; i++) {
    var context = newCanvas[i].getContext('2d');
    newCanvas[i].width = oldCanvas.width;
    newCanvas[i].height = oldCanvas.height;

    context.drawImage(oldCanvas, 0, 0);
  }
}

Template.draw_canvas.onCreated(function bodyOnCreated() {
  Meteor.subscribe('images');
});

// Template Events
Template.draw_canvas.events({
  // Submitting a New Color
  'submit .pickColor'(event) {
    event.preventDefault(); 

    const color = event.target.color2.value; 
    lineColor = '#' + String(color); 
    colorHistory.push('#' + String(color)); 
    Session.set('penColor', lineColor);
    Session.set('colorHistory', colorHistory);
    Session.set('colorChange', false);
  },

  'change #color_value'(e) {
    Session.set('colorChange', true);
  },

  // Decrease Pen Radius
  'click .decreaseR'(e) {
    e.preventDefault(); 
    currentRadius -= 5;
    Session.set('penRadius', currentRadius);
  },

  // Increase Pen Radius
  'click .increaseR'(e) {
    e.preventDefault(); 
    currentRadius += 5; 
    Session.set('penRadius', currentRadius);
  },

  // Change Pen Color From History Colors
  'click .pickFromHistory'(e) {
    e.preventDefault(); 
    var color = e.target.getAttribute('data-color');
    Session.set('penColor', color);
  },

  // Export Image and save locally 
  'click .save-image'(e) {
    e.preventDefault(); 
    var wall = document.getElementById( 'wall' );
    html2canvas(wall, {
    onrendered: function(canvas) {
      Canvas2Image.saveAsImage(canvas, 500, 500, "jpeg")
        }
    });
  }, 

  // save image to db and go to new route 
  'click .go-vr'(e) {
    e.preventDefault(); 
    var wall = document.getElementById('wall');
    var img; 

    html2canvas(wall, {
      onrendered: function(canvas) {
        img = Canvas2Image.convertToImage(canvas, 500, 500, "jpeg");
        img = img.src;
        Meteor.call('saveFile.insert', img, function(error, result){
          FlowRouter.go('/vr/' + result.toString());
        });
      }
    })
  }
});

// Template Helpers 
Template.draw_canvas.helpers({
  penRadius() {
    return Session.get('penRadius');
  },

  penColor() {
    return Session.get('penColor');
  },

  colors() {
    return Session.get('colorHistory');
  },

  colorChange() {
    return Session.get('colorChange');
  },

  images() {
    return Images.find({});
  }
})

// Template On Rendered 
Template.draw_canvas.onRendered( function() {
  // Canvas/Sketch plugin Code
  Sketch.create({
      container: document.getElementById( 'draw-area' ),
      autoclear: false,
      fullscreen: false,
      background: '#ffffff',
      width: 600, 
      height: 600, 

      setup: function() {
        draw = false;
      },
      update: function() {
      },
      // Event handlers
      keydown: function() {
        if ( this.keys.C ) {
          var oldCanvas = document.getElementById( 'container' ).getElementsByTagName( 'canvas' )[0];
          cloneCanvas(oldCanvas);
        };
      },

      mousedown: function() {
        draw = true; 
      },

      mouseup: function() {
        draw = false;
      },

      touchmove: function() {

        if (draw === true) {
          for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {
            touch = this.touches[i];
            this.lineCap = 'round';
            this.lineJoin = 'round';
            this.fillStyle = this.strokeStyle = Session.get('penColor');
            this.lineWidth = currentRadius;
            this.beginPath();
            this.moveTo( touch.ox, touch.oy );
            this.lineTo( touch.x, touch.y );
            this.stroke();
          }
        }

        // In order to clone the canvas onto many walls.
        var oldCanvas = document.getElementById( 'draw-area' ).getElementsByTagName( 'canvas' )[0];
        cloneCanvas(oldCanvas);
      }
  });
});




















