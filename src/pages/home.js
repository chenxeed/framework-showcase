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
      listsView : searchInputData.get$.map( value =>
        postsData.get$.map( data => [value, data] )
      ).flatten()
    };

  }

  function driver( ) {
    return {
      formView : formView('#form-component'),
      listsView : listsView('#lists-component'),
      searchInputData,
      postsData
    }
  }

  Cycle.run( main, driver() );
}

export default {
  start
};