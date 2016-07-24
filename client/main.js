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

FlowRouter.route('/vr/:_id', {
  name: 'Canvas On VR WALL',
  action(params) {
    BlazeLayout.render('App_body', {
      main: 'vr_wall',
      data: params
    });
  }
});
import '../imports/ui/body.js';