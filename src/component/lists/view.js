import xs from 'xstream';
import $ from 'jquery';
import template from './template.html';
import './style.css';

function View( selector ) {
  const $parent = $( selector );
  return function( streams$ ) {
    $parent.append( template );
    // static elements
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
}

export default View;