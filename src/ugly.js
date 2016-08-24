define(['jquery'], function($){

	let DATA = [];

	function init(){
		const $dom_button = $('#btn-search');
		$dom_button.click(onClickButtonSearch);
	};

	function onClickButtonSearch(){
		const $input = $('#input');
		const value = $input.val();
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
