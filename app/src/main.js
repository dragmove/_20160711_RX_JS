import Rx from 'rxjs/Rx';

(function ($) {
  "use strict";

  $(document).ready(init);

  function init() {
    let subject = new Rx.Subject();

    let subscription = subject.subscribe(
      (x) => {
        console.log('onNext :', x)
      },
      (e) => {
        console.log('onError :', e.message)
      },
      () => {
        console.log('onCompleted');
      }
    );

    subject.onNext(1);
    subject.onNext(2);
    subject.onCompleted();

    subscription.dispose();

    /*
     function from() {
     return Rx.Observable.from(arguments);
     }

     var source = from(1, 2, 3, 4, 5, 6, 7, 8)
     .filter( function(val) {
     return val % 2 === 0;
     })
     .map( function(val) {
     return val * 10;
     });

     source.subscribe( function(val) {
     console.log(val);
     });
     */

    /*
     var evenTicks = 0;

     function updateDistance(i) {
     console.log('i :', i);
     if( i % 2 === 0 ) evenTicks += 1;
     return evenTicks;
     }

     var ticksObservable = Rx.Observable.interval(1000).map(updateDistance);

     ticksObservable.subscribe(function() {
     console.log('subscribe 1 - evenTicks :' + evenTicks);
     });

     ticksObservable.subscribe(function() {
     console.log('subscribe 2 - evenTicks :' + evenTicks);
     });
     */

    /*
     // using scan.
     function updateDistance(acc, i) { // receive accumulated count.
     if( i % 2 === 0 ) acc += 1;
     return acc;
     }

     var ticksObservable = Rx.Observable
     .interval(1000)
     .scan(updateDistance, 0);

     ticksObservable.subscribe( function(evenTicks) {
     console.log('1 - :', evenTicks);
     });

     ticksObservable.subscribe( function(evenTicks) {
     console.log('2 - :', evenTicks);
     });
     */
  }
}(jQuery));