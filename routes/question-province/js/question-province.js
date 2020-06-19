// your js code here

import accessibleAutocomplete from 'accessible-autocomplete'

accessibleAutocomplete.enhanceSelectElement({
  selectElement: document.querySelector('#province-select'),
  showAllValues: true,
  showNoOptionsFound: false,
})

window.onload = function(){
  const elems = document.querySelectorAll('.error-list a')

  if (elems !== undefined && elems.length > 0) {
    elems[0].focus()
  }
}