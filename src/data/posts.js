import xs from 'xstream';
import $ from 'jquery';

// observable state
function Posts( {postsData} ) {
  const get$ = postsData.get$;

  return {
    get$
  }
}

function postsData( source$ ) {
  const get$ = xs.createWithMemory();

  get$.imitate( source$ );
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
      url : 'http://jsonplaceholder.typicode.com/posts'
    });
  }  
}

export {
  Posts,
  postsData
};