import Cycle from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import xs from 'xstream';

import Form from 'component/form';
import Lists from 'component/lists';
import Todos from 'component/todos';

import searchInputData from 'data/search_input';
import postsData from 'data/posts';
import todosData from 'data/todos';

function start(){

  function main( sources ) {

    // define components
    const formComponent = Form({
      dom$ : sources.formDOM
    });
    const listsComponent = Lists({
      data$ : sources.listsData
    });
    const todosComponent = Todos({
      dom$ : sources.todosDOM,
      data$ : sources.todosData
    });

    // define data
    const searchInputData = sources.searchInputData;
    const postsData = sources.postsData;
    const listsData = searchInputData.get$.map( value =>
      postsData.get$.map( data => [value, data] )
    ).flatten();
    const todosData = xs.of({
      add$: todosComponent.add$,
      remove$: todosComponent.remove$,
      toggleCheck$: todosComponent.toggleCheck$,
      toggleCheckAll$: todosComponent.toggleCheckAll$
    });

    return {
      // components
      formDOM : formComponent.vdom$,
      listsDOM : listsComponent.vdom$,
      todosDOM : todosComponent.vdom$,
      // data
      searchInputData : formComponent.submit$,
      postsData : searchInputData.get$,
      listsData,
      todosData
    };
  }

  function driver( ) {
    return {
      // component driver
      formDOM : makeDOMDriver('#form-component'),
      listsDOM : makeDOMDriver('#lists-component'),
      todosDOM : makeDOMDriver('#todos-component'),
      // data driver
      searchInputData,
      postsData,
      listsData : (stream$) => { return stream$ },
      todosData
    }
  }

  Cycle.run( main, driver() );
}

export default {
  start
};