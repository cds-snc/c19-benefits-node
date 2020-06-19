window.onload = function(){
  const elems = document.querySelectorAll('.error-list a')

  if (elems !== undefined && elems.length > 0) {
    elems[0].focus()
  }
}
