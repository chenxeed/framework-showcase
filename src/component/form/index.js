import fromEvent from 'xstream/extra/fromEvent';

function Form( {formView} ) {
  const {$btnSearch} = formView;
  
  const click$ = fromEvent($btnSearch[0], 'click');
  const submit$ = click$.map(formView.getSearchValue);

  return {
    submit$
  }
}

// export
export default Form;