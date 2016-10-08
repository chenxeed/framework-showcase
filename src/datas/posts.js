import xs from 'xstream';
import $ from 'jquery';

function postsData( source$ ) {
  const get$ = xs.createWithMemory();

  source$.addListener({
    next: (value) => get$.imitate( xs.fromPromise( getPost( value ) ) ),
    error : () => {},
    complete : () => {}
  });

  return {
    get$
  }

  // side-effect functions
  function getPost(value){
    return $.ajax({
      url : `http://jsonplaceholder.typicode.com/posts?title_like=${value}`
    });
  }  
}

export default postsData;