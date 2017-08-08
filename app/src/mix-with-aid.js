import Rx from 'rxjs/Rx';
import aid from 'aid.js';

(function ($) {
  "use strict";

  $(document).ready(init);

  function init() {
    const input = $('#input-text'),
      display = $('#display');

    // make keyup$ stream
    const keyup$ = Rx.Observable.fromEvent(input, 'keyup');

    /* 
        keyup$.subscribe(function (event) {
          console.log('event :', event);
        });
        
        // map operator
        keyup$
          .map(e => e.target.value) // keyup$ stream 에서 전달된 event 를 input value 로 치환.
          .subscribe(value => console.log('value :', value));

        // distinctUntilChanged operator
        keyup$
          .map(e => e.target.value)
          .distinctUntilChanged() // Only emit when the current value is different than the last. // https://www.learnrxjs.io/operators/filtering/distinctuntilchanged.html
          .subscribe(value => console.log('value :', value));
        
        // debounce operator
        keyup$
          .map(e => e.target.value)
          .distinctUntilChanged()
          .debounce(x => Rx.Observable.timer(500)) // Discard emitted values that take less than the specified time // https://www.learnrxjs.io/operators/filtering/debounce.html
          .subscribe(value => console.log('value :', value));
     */
    
    // switchMap operator
    keyup$
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounce(x => Rx.Observable.timer(500))
      .switchMap(function getNumbers(text) {
        // You can provide an Observable, Promise, Array, or Iterable.

        return new Promise((resolve, reject) => { // return Promise
          window.setTimeout(() => {
            resolve([{ "name": `i am ${text}` }, { "name": `you are ${text}` }, { "name": `he is ${text}` }]);
          }, 500 + Math.random(1000));
        });

        // return [{ "name": `i am ${text}` }, { "name": `you are ${text}` }, { "name": `he is ${text}` }]; // return Array
      })
      .subscribe(function (array) {
        console.log('array from switchMap :', array);

        // io(input/output) code
        const firstItem = aid.nth(array, 0);
        display.text(firstItem.name);
      });
  }
}(jQuery));