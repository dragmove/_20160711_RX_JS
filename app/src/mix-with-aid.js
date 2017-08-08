import Rx from 'rxjs/Rx';
import aid from 'aid.js';

(function ($) {
  "use strict";

  // $(document).ready(init);
  // $(document).ready(initInputWithCheckbox);
  $(document).ready(initInputCombineCheckbox);

  function init() {
    console.log('init');

    const input = $('#input-text'),
      display = $('#display');

    // make keyup$ stream. hot Observable
    const keyup$ = Rx.Observable.fromEvent(input, 'keyup');

    /* 
        // 1. subscribe
        keyup$.subscribe(function (event) {
          console.log('event :', event);
        });
        
        // 2. map operator -> subscribe
        keyup$
          .map(e => e.target.value) // keyup$ stream 에서 전달된 event 를 input value 로 치환.
          .subscribe(value => console.log('value :', value));

        // 3. map -> distinctUntilChanged operator -> subscribe
        keyup$
          .map(e => e.target.value)
          .distinctUntilChanged() // Only emit when the current value is different than the last. // https://www.learnrxjs.io/operators/filtering/distinctuntilchanged.html
          .subscribe(value => console.log('value :', value));
        
        // 4. map -> distinctUntilChanged -> debounce operator -> subscribe
        keyup$
          .map(e => e.target.value)
          .distinctUntilChanged()
          .debounce(x => Rx.Observable.timer(500)) // Discard emitted values that take less than the specified time // https://www.learnrxjs.io/operators/filtering/debounce.html
          .subscribe(value => console.log('value :', value));
     */

    // 5. map -> distinctUntilChanged -> debounce -> switchMap operator -> subscribe
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

  function initInputWithCheckbox() {
    // method for manage status : scan, withLastestFrom, combineLastest
    // class for manage status : BehaviorSubject

    console.log('initInputWithCheckbox');

    const input = $('#input-text'),
      display = $('#display'),
      checkbox = $('#checkbox');

    // make keyup$ Observable return value when keyup.
    const keyup$ = Rx.Observable.fromEvent(input, 'keyup')
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounce(x => Rx.Observable.timer(500));

    // make clickCheckbox$ Observable return flag checkbox checked.
    const clickCheckbox$ = Rx.Observable.fromEvent(checkbox, 'click')
      .map(e => {
        const isChecked = $(e.target).prop('checked');
        return isChecked;
      })
      .startWith(checkbox.prop('checked')); // set initial value with flag checkbox checked

    // make keyupWithCheckbox$ Observable return info has { keyupValue, isCheckboxChecked }.
    const keyupWithCheckbox$ = keyup$.withLatestFrom(clickCheckbox$, function (keyupValue, isCheckboxChecked) {
      // status management logic. (manage lastest status of keyup, checkbox)

      return {
        keyupValue: keyupValue,
        isCheckboxChecked: isCheckboxChecked
      };
    });

    keyupWithCheckbox$.subscribe(function (data) {
      // io code
      console.log('data :', data);

      display.text(JSON.stringify(data));
    });
  }

  function initInputCombineCheckbox() {
    console.log('initInputCombineCheckbox');

    const input = $('#input-text'),
      display = $('#display'),
      checkbox = $('#checkbox');

    // use 'startWith' method
    const keyup$ = Rx.Observable.fromEvent(input, 'keyup')
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounce(x => Rx.Observable.timer(500))
      .startWith('');

    const clickCheckbox$ = Rx.Observable.fromEvent(checkbox, 'click')
      .map(e => {
        const isChecked = $(e.target).prop('checked');
        return isChecked;
      })
      .startWith(checkbox.prop('checked')); // set initial value with flag checkbox checked

    const keyupWithCheckbox$ = keyup$.combineLatest(clickCheckbox$, function (keyupValue, isCheckboxChecked) {
      return {
        keyupValue: keyupValue,
        isCheckboxChecked: isCheckboxChecked
      };
    });

    keyupWithCheckbox$.subscribe(function (data) {
      // io code
      console.log('data :', data);
      
      display.text(JSON.stringify(data));
    });

    /* 
    // or, use Rx.BehaviorSubject class

    // make Observables (cell)
    let inputText$ = new Rx.BehaviorSubject(input.val()),
      isCheckboxChecked$ = new Rx.BehaviorSubject(checkbox.prop('checked'));

    // make keyup$ Observable (stream) return value when keyup.
    const keyup$ = Rx.Observable.fromEvent(input, 'keyup')
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounce(x => Rx.Observable.timer(500))
      .subscribe(inputText$);

    // make clickCheckbox$ Observable (stream) return flag checkbox checked.
    const clickCheckbox$ = Rx.Observable.fromEvent(checkbox, 'click')
      .map(e => {
        const isChecked = $(e.target).prop('checked');
        return isChecked;
      })
      .subscribe(isCheckboxChecked$);
    
    // make Observable (cell) combine two Observables
    const combined$ = inputText$.combineLatest(isCheckboxChecked$, function (a, b) {
      return {
        keyupValue: a,
        isCheckboxChecked: b
      };
    });

    combined$.subscribe(function (data) {
      console.log('data :', data);
    });
    */
  }
}(jQuery));