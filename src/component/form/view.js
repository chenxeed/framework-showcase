import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import $ from 'jquery';

// static elements
const $btnSearch = $('#btn-search');
const $inputSearch = $('#input');
const $inputPreview = $('#search-preview');

// observable state
const clickBtnSearch$ = fromEvent($btnSearch[0], 'click');

// side-effect function
function getSearchValue() {
  return $inputSearch.val();
}

function updateSearchPreview(value) {
  $inputPreview.text(value);
}

// export
export {
  // observable state
  clickBtnSearch$,
  // side effects
  getSearchValue,
  updateSearchPreview
}