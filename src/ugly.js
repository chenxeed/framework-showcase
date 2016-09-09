define(['jquery'], function($){

	let DATA = [];

	function start(){
		const $dom_button = $('#btn-search');
		$dom_button.click(onClickButtonSearch);
	};

	function onClickButtonSearch(){
		const $input = $('#input');
		const $preview = $('#search-preview');
		const $list_search_title = $('#search-title');
		const value = $input.val();
		$preview.text(value || 'nothing');
		$list_search_title.text(value || 'nothing');
		$.ajax('http://jsonplaceholder.typicode.com/posts?title_like='+value)
			.done(function(data){
				DATA = data;
				showData();
			}
		);
	}

	function showData(){
		$('#list-data').empty();
		DATA.forEach(function(row){
			$('#list-data').append('<li>'+row.title+'</li>');
		});
	}

	return {
		start
	};

	
});
