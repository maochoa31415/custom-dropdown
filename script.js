(() => {
  window.addEventListener('load', function() {
    const dropdownEl = document.querySelector('.dropdown')
    const items = [
      {
        label: 'First Item',
        value: 1,
      },
      {
        label: 'Second Item',
        value: 2,
      },
      {
        label: 'Third Item',
        value: 3,
      },
      {
        label: 'Fourth Item',
        value: 4,
      },
      {
        label: 'Fifth Item',
        value: 5,
      },
    ]

    const dropdown = new Dropdown(dropdownEl, items)
  })
})()