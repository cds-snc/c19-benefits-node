const $ = window.$;

$(document).ready(function () {
  const locale = document.documentElement.lang;

  const moreInfo = {
    'en': 'More info',
    'fr': 'More info FR',
  }

  const lessInfo = {
    'en': 'Less info',
    'fr': 'Less info FR',
  }

  // Hide all cards by default
  $('.benefits--unavailable .benefit__main')
    .addClass('hidden')

  // Insert the "More info" link into each card
  $('<button class="expando cursor-pointer">+ <span class="underline">' + moreInfo[locale] + '</span></button>')
    .insertBefore('.benefits--unavailable .benefit__main')

  // Loop over all the expando links we just created
  $('.expando').each(function (index, elem) {
    const accControlId = 'acc_control_' + index
    const containerId = 'benefit_' + index

    const $container = $(elem).next('div.benefit__main')

    // Attach aria attributes and unique id to accordion controller
    $(this).attr('aria-expanded', false)
    $(this).attr('aria-controls', containerId)
    $(this).attr('id', accControlId)

    // Attach aria-labelled by and unique id to accordion container
    $container.attr('aria-labelledby', accControlId)
    $container.attr('id', containerId)

    // Attach a click handler to toggle between more/less
    $(this).on('click', function (e) {
      e.preventDefault()
      const $container = $(this).next('div.benefit__main')

      // Toggle between expanded/not
      if ($(this).attr('aria-expanded') === 'true') {
        $(this).html(`+ <span class="underline">${moreInfo[locale]}</span>`)
        $container.addClass('hidden')
        $container.attr('aria-hidden', true);
        $(this).attr('aria-expanded', false)
      } else {
        $(this).html(`- <span class="underline">${lessInfo[locale]}</span>`)
        $container.removeClass('hidden')
        $container.attr('aria-hidden', false);
        $(this).attr('aria-expanded', true)
      }
    })
  })
});
