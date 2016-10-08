import xs from 'xstream';

function searchInputData( source$ ) {

  const get$ = xs.createWithMemory();

  get$.imitate( source$ );

  return {
    get$,
  }
}

export default searchInputData;