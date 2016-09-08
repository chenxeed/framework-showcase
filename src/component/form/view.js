import xs from 'xstream';
import $ from 'jquery';

function View( submit$ ) {

	// static elements
	const $btnSearch = $('#btn-search');
	const $inputSearch = $('#input');
	const $inputPreview = $('#search-preview');

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
    $btnSearch,
	  // side effects
	  getSearchValue,
	  updateSearchPreview
	}
}


// export
export default View;