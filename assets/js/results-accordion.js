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

  const $accordion = $('.benefits--unavailable .benefits__list');

  // Insert the "More info" link into each card
  $('<button class="acc-trigger cursor-pointer">+ <span class="underline">' + moreInfo[locale] + '</span></button>')
    .insertBefore('.benefits--unavailable .benefit__main')

  // Loop over all the acc-trigger links we just created
  $('.acc-trigger').each(function (index, elem) {
    const accControlId = 'acc_control_' + index
    const containerId = 'benefit_' + index

    const $container = $(elem).next('div.benefit__main')

    // Attach aria attributes and unique id to accordion controller
    $(this).attr('aria-expanded', false)
    $(this).attr('aria-controls', containerId)
    $(this).attr('id', accControlId)

    // Attach aria-labelled by and unique id to accordion container
    $container.attr('aria-labelledby', accControlId)
    $container.attr('role', 'region');
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

  // Grab the list of generated triggers
  const triggers = Array.prototype.slice.call($('.acc-trigger'));

  // Attach some key triggers for keyboard navigation
  $accordion.on('keydown', function (event) {
    const target = event.target;
    const key = event.which.toString();

    // 33 = Page Up, 34 = Page Down
    var ctrlModifier = (event.ctrlKey && key.match(/33|34/));

    if (target.classList.contains('acc-trigger')) {
      // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
      // 38 = Up, 40 = Down
      if (key.match(/38|40/) || ctrlModifier) {

        const index = triggers.indexOf(target);

        var direction = (key.match(/34|40/)) ? 1 : -1;
        var length = triggers.length;
        var newIndex = (index + length + direction) % length;

        triggers[newIndex].focus();

        event.preventDefault();
      }
      else if (key.match(/35|36/)) {
        // 35 = End, 36 = Home keyboard operations
        switch (key) {
          // Go to first accordion
          case '36':
            triggers[0].focus();
            break;
          // Go to last accordion
          case '35':
            triggers[triggers.length - 1].focus();
            break;
        }
        event.preventDefault();

      }
    }
  })
});
