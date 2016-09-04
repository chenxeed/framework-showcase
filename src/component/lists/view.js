import $ from 'jquery';

const $lists = $('#list-data');
const $search_title = $('#search-title');

// side-effect functions
function clearList(){
  $('#list-data').empty();
}

function addList(data){
  data.forEach(function(row){
    $lists.append('<li>'+row.title+'</li>');
  });
}

function updateSearchTitle(value){
	$search_title.text(value);
}

// export
export {
	// side effects
	clearList,
	addList,
	updateSearchTitle
}