import xs from 'xstream';
import $ from 'jquery';

// observable state
function SearchInput( {searchInputData} ) {

  const get$ = searchInputData.get$;

  return {
    get$
  }
}

function searchInputData( source$ ) {

  const get$ = source$;

  return {
    get$,
  }
}

export {
  SearchInput,
  searchInputData
};