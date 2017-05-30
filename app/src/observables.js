import Rx from 'rxjs/Rx';

(function ($) {
  "use strict";

  $(document).ready(init);

  function init() {
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

    // test observer
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