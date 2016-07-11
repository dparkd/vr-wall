FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('App_body', {main: 'hello'});
  }
});

FlowRouter.route('/draw', {
  name: 'Draw Canvas',
  action() {
    BlazeLayout.render('App_body', {main: 'draw_canvas'});
  }
});

import '../imports/ui/body.js';