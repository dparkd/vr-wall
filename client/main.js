FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('App_body', {main: 'draw_canvas'});
  }
});

FlowRouter.route('/draw', {
  name: 'Draw Canvas',
  action() {
    BlazeLayout.render('App_body', {main: 'draw_canvas'});
  }
});

FlowRouter.route('/vr-wall', {
  name: 'Canvas On VR WALL',
  action() {
    BlazeLayout.render('App_body', {main: 'vr_wall'});
  }
});

import '../imports/ui/body.js';