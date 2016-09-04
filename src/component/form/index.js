import {clickBtnSearch$, getSearchValue, updateSearchPreview} from './view';

const submit$ = clickBtnSearch$.map(getSearchValue);

// side effect action
submit$.addListener({
  next: updateSearchPreview,
  error: new Function,
  complete: new Function
});

// export
export {
  submit$
}