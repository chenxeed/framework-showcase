import $ from 'jquery';

const $lists = $('#list-data');

// side-effect functions
function clearList(){
  $('#list-data').empty();
}

function addList(data){
  data.forEach(function(row){
    $('#list-data').append('<li>'+row.title+'</li>');
  });
}

function updateSearchTitle(value){
	$('#search-title').text(value);
}

// export
export {
	// side effects
	clearList,
	addList,
	updateSearchTitle
}