import Cycle from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import xs from 'xstream';

import Form from 'views/form';
import Lists from 'views/lists';
import Todos from 'views/todos';

import searchInputData from 'datas/search_input';
import postsData from 'datas/posts';
import todosData from 'datas/todos';

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
      redo$: todosComponent.redo$,
      reset$: todosComponent.reset$
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
      todosData
    }
  }

  Cycle.run( main, driver() );
}

export default {
  start
};