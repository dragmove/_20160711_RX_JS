import Rx from 'rxjs/Rx';

(function ($) {
  "use strict";

  $(document).ready(init);

  function init() {
    testThrottle();

    return;

    testDebounceTime();

    testEvent();

    testObservableSubscribe();

    testObservableInterval();
  }

  function testDebounceTime() {
    const source$ = Rx.Observable.fromEvent(window, 'resize');
    const debounce$ = source$.debounceTime(1000);
    const subscribe$ = debounce$.subscribe(val => console.log(val));

    /*
    const source$ = Rx.Observable.fromEvent(document, 'click');
    const debounce$ = source$.debounceTime(500);
    const subscribe$ = debounce$.subscribe(val => console.log(val));
    */
  }

  function testEvent() {
    const source$ = Rx.Observable.fromEvent(window, 'resize');

    const event$ = source$.map(event => event);

    const subscribe$ = event$.subscribe(val => console.log(val));
  }

  function testThrottle() {
    /*
    const source$ = Rx.Observable.interval(1000);
    const throttle$ = source$.throttle(val => Rx.Observable.interval(2000));
    throttle$.subscribe(val => console.log(val)); // 2, 4, 6, 8, ...
    */

    const source$ = Rx.Observable.fromEvent(window, 'resize');

    const example$ = source$
      .throttleTime(2000)
      .debounceTime(2000);

    const subscribe = example$.subscribe(val => console.log('val :', val));
    // subscribe.unsubscribe(); // unsubscribe
  }

  function testObservableSubscribe() {
    const simple$ = new Rx.Observable(observer => {
      observer.next('An Item!');
      observer.next('Another Item');
      observer.complete();
    });

    simple$.subscribe({
      next: function (item) {
        console.log(`next ${item}`);
      },
      error: function (error) {
        console.log(`error ${error}`)
      },
      complete: function () {
        console.log('complete')
      }
    });
  }

  function testObservableInterval() {
    const everySection$ = createInterval$(1000);
    everySection$.subscribe(createSubscriber('one'));
  }

  function createInterval$(time) {
    return new Rx.Observable(observer => {
      let index = 0;

      let interval = setInterval(() => {
        observer.next(index++);
      }, time);

      return () => {
        clearInterval(interval);
      }
    })
  }

  function createSubscriber(tag) {
    return {
      next: function (item) {
        console.log(`${tag}.next ${item}`);
      },
      error: function (error) {
        console.log(`${tag}.error ${error.stack || error}`);
      },
      complete: function () {
        console.log(`${tag}.complete`);
      }
    }
  }

}(jQuery));