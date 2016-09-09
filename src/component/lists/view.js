import xs from 'xstream';
import $ from 'jquery';

function View( streams$ ) {
  // constant variable
  const $lists = $('#list-data');
  const $search_title = $('#search-title');

  // side-effect
  streams$.addListener({
    next: ([searchInput, posts]) => {
      updateSearchTitle(searchInput);
      clearList();
      addList(posts);

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