import xs from 'xstream';
import fromEvent from 'xstream/extra/fromEvent';
import $ from 'jquery';

function View( submit$ ) {

	// static elements
	const $btnSearch = $('#btn-search');
	const $inputSearch = $('#input');
	const $inputPreview = $('#search-preview');

	// observable state
	const clickBtnSearch$ = fromEvent($btnSearch[0], 'click');

	// side-effect
	submit$.addListener({
		next : updateSearchPreview,
		error : () => {},
		complete : () => {}
	});

	// side-effect function
	function getSearchValue() {
	  return $inputSearch.val();
	}

	function updateSearchPreview(value) {
	  $inputPreview.text(value);
	}

	return {
	  // observable state
	  clickBtnSearch$,
	  // side effects
	  getSearchValue,
	  updateSearchPreview
	}
}


// export
export default View