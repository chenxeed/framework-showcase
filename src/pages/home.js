import Cycle from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import xs from 'xstream';

import Form from 'component/form';
import Lists from 'component/lists';
import Todos from 'component/todos';

import searchInputData from 'data/search_input';
import postsData from 'data/posts';
import todosData from 'data/todos';

import makeHistory from 'utils/history';

function start(){

  function main( sources ) {

    // define components
    const formComponent = Form({
      dom$ : sources.formDOM
    });

    const searchInputData = formComponent.submit$;
    const postsData = sources.searchInputData.get$;
    const listsData = sources.searchInputData.get$.map( value =>
      sources.postsData.get$.map( data => [value, data] )
    ).flatten();
    const listsComponent = Lists({
      data$ : sources.listsData
    });

    const todosComponent = Todos({
      dom$ : sources.todosDOM,
      data$ : sources.todosData
    });

    // define the source of data
    const todosData = xs.of({
      add$: todosComponent.add$,
      remove$: todosComponent.remove$,
      toggleCheck$: todosComponent.toggleCheck$,
      toggleCheckAll$: todosComponent.toggleCheckAll$,
      undo$: todosComponent.undo$,
      redo$: todosComponent.redo$
    });

    return {
      // components
      formDOM : formComponent.vdom$,
      listsDOM : listsComponent.vdom$,
      todosDOM : todosComponent.vdom$,
      // data
      searchInputData,
      postsData,
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
      todosData : makeHistory( todosData )
    }
  }

  Cycle.run( main, driver() );
}

export default {
  start
};