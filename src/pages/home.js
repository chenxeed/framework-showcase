import Cycle from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import xs from 'xstream';

import Form from 'component/form';

import Lists from 'component/lists';

import {SearchInput, searchInputData} from 'data/search_input';
import {Posts, postsData} from 'data/posts';

function start(){

  function main( sources ) {

    // define components
    const formComponent = Form( sources.formDOM );
    const listsComponent = Lists({
      data$ : sources.listsData
    });
    // define data
    const searchInputData = SearchInput( sources.searchInputData );
    const postsData = Posts( sources.postsData );
    const listsData = searchInputData.get$.map( value =>
      postsData.get$.map( data => [value, data] )
    ).flatten();

    return {
      // components
      formDOM : formComponent.vdom$,
      listsDOM : listsComponent.vdom$,
      // data
      searchInputData : formComponent.submit$,
      postsData : searchInputData.get$,
      listsData : listsData
    };

  }

  function driver( ) {
    return {
      // component driver
      formDOM : makeDOMDriver('#form-component'),
      listsDOM : makeDOMDriver('#lists-component'),
      // data driver
      searchInputData,
      postsData,
      listsData : (stream$) => { return stream$ }
    }
  }

  Cycle.run( main, driver() );
}

export default {
  start
};