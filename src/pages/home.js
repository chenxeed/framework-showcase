import Cycle from '@cycle/xstream-run';

import Form from 'component/form';
import formView from 'component/form/view';

function start(){

  function main( sources ) {

    const formComponent = Form( sources );

    return {
      formView : formComponent.submit$
    };

  }

  function driver( ) {
    return {
      formView
    }
  }

  Cycle.run( main, driver() );
}



export default {
  start
};