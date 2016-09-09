import Cycle from '@cycle/xstream-run';
import xs from 'xstream';

import Form from 'component/form';
import formView from 'component/form/view';

import Lists from 'component/lists';
import listsView from 'component/lists/view';

import {SearchInput, searchInputData} from 'data/search_input';
import {Posts, postsData} from 'data/posts';

function start(){

  function main( sources ) {

    const formComponent = Form( sources );
    const searchInputData = SearchInput( sources );
    const postsData = Posts( sources );

    return {
      formView : formComponent.submit$,
      searchInputData : formComponent.submit$,
      postsData : searchInputData.get$,
      listsView : xs.combine( searchInputData.get$, postsData.get$ )
    };

  }

  function driver( ) {
    return {
      formView,
      searchInputData,
      postsData,
      listsView
    }
  }

  Cycle.run( main, driver() );
}

export default {
  start
};