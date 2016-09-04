define(['jquery'], function($){

	let DATA = [];

	function init(){
		const $dom_button = $('#btn-search');
		$dom_button.click(onClickButtonSearch);
	};

	function onClickButtonSearch(){
		const $input = $('#input');
		const $preview = $('#search-preview');
		const $list_search_title = $('#search-title');
		const value = $input.val();
		$preview.text(value);
		$list_search_title.text(value);
		$.ajax({
			url : 'http://jsonplaceholder.typicode.com/posts',
			success : function(data){
				DATA = data;
				showData();
			}
		});
	}

	function showData(){
		DATA.forEach(function(row){
			$('#list-data').append('<li>'+row.title+'</li>');
		});
	}

	return {
		init
	};

	
});
