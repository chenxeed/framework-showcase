import {clickBtnSearch$} from './view';

function Form( {formView} ) {

  const submit$ = formView.clickBtnSearch$.map(formView.getSearchValue);

  return {
    submit$
  }
}

// export
export default Form;