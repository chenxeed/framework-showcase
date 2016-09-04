import {submit$} from 'component/form';
import {updateList, updateSearchTitle} from 'component/lists';
import {getSearchInput$, setSearchInput} from 'data/search_input';
import {getPost$, getPost} from 'data/posts';

function init(){
  // attach listener
  submit$.addListener({
    next: setSearchInput,
    error: new Function,
    complete: new Function
  });
  submit$.addListener({
    next: updateSearchTitle,
    error: new Function,
    complete: new Function
  });
  getSearchInput$.addListener({
    next: getPost,
    error: new Function,
    complete: new Function
  });
  getPost$.addListener({
    next: updateList,
    error: new Function,
    complete: new Function
  });
}

export default {
  init
};