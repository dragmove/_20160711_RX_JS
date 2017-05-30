import Rx from 'rxjs/Rx';

(function ($) {
  "use strict";

  $(document).ready(init);

  function init() {
    setInstance();
  }

  function setInstance() {
    const $title = $('#title'),
      $results = $('#results');

    const keyups$ = Rx.Observable.fromEvent($title, 'keyup');

    const queries$ = keyups$
      .map(e => e.target.value)
      .distinctUntilChanged()
      .debounce(500)
      .switchMap(getItems)
      .subscribe(items => {
        $results.empty();
        $results.append(items.map(item => $('<li />').text(item)));
      });

    /*
     let lastQuery = null,
     lastTimeout = null,
     nextQueryId = 0;

     const $title = $('#title'),
     $results = $('#results');

     $title.on('keyup', evt => {
     const title = evt.target.value;

     if (title === lastQuery) return;
     lastQuery = title;

     if (lastTimeout) window.clearTimeout(lastTimeout);

     let ourQueryId = ++nextQueryId;
     lastTimeout = window.setTimeout(() => {
     getItems(title).then(items => {
     if (ourQueryId !== nextQueryId) return;

     $results.empty();

     const $items = items.map(item => {
     return $('<li />').text(item);
     });
     $results.append($items);
     });
     }, 500);
     });
     */
  }

  function getItems(title) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve([title, 'Item 2', `Another ${Math.random()}`])
      }, 500 + Math.random() * 5000);
    });
  }
}(jQuery));