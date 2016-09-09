import xs from 'xstream';
import $ from 'jquery';

function View( data$ ) {
  // constant variable
  const $lists = $('#list-data');
  const $search_title = $('#search-title');

  // side-effect
  data$.addListener({
    next: (data) => {
      clearList();
      addList(data);
    },
    error : () => {},
    complete : () => {}
  });

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

  return {
    // side-effects
    updateSearchTitle
  }
};

export default View;