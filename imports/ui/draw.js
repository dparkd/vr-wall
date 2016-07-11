import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import Sketch from 'sketch-js';
const sketch = require('sketch-js');


/*============================= 
                    END IMPORTS
============================= */

import './draw.html';

// Global Variables
var lineColor = '#FFFFFF';
Session.set('penColor', lineColor);
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

// Template Events
Template.draw_canvas.events({
  'submit .pickColor'(event) {
    event.preventDefault(); 

    const color = event.target.color2.value; 
    lineColor = '#' + String(color); 
    Session.set('penColor', lineColor);
  },

  'click .decreaseR'(e) {
    e.preventDefault(); 
    currentRadius -= 5;
    Session.set('penRadius', currentRadius);
  },

  'click .increaseR'(e) {
    e.preventDefault(); 
    currentRadius += 5; 
    Session.set('penRadius', currentRadius);
  }
});

// Template Helpers 
Template.draw_canvas.helpers({
  penRadius() {
    return Session.get('penRadius');
  },
  penColor() {
    return Session.get('penColor');
  }
})

// Template On Rendered 
Template.draw_canvas.onRendered( function() {
  Sketch.create({
      container: document.getElementById( 'container' ),
      autoclear: false,
      fullscreen: false,
      width: 400, 
      height: 400, 

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
            this.fillStyle = this.strokeStyle = lineColor;
            this.lineWidth = currentRadius;
            this.beginPath();
            this.moveTo( touch.ox, touch.oy );
            this.lineTo( touch.x, touch.y );
            this.stroke();
          }
        }

        var oldCanvas = document.getElementById( 'container' ).getElementsByTagName( 'canvas' )[0];
        cloneCanvas(oldCanvas);
      }
  });
});




















