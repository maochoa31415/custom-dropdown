const ITEM_MARKUP = `
  <span class="dropdown-label">{label}</span>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="check">
      <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
  </svg>
`

/**
  Format for each item:
  {
    label: 'The label',
    value: 25
  }
 */
class Dropdown {
  #items = []
  #targetEl = null
  #selectedItemEl = null
  #itemsContainerEl = null
  #isOpen = false

  /**
   * @param {HTMLElement} targetEl Target element to applay the logic
   * @param {Array} items Array of items to use as data
   */
  constructor(targetEl, items) {
    if (targetEl) {
      this.#targetEl = targetEl
      this.#itemsContainerEl = targetEl.querySelector('.dropdown-items')
    }

    if (items instanceof Array && items.length !== 0) {
      this.#items = items
    }

    this.#init()
  }

  #init() {
    this.#targetEl.querySelector('.dropdown-placeholder')
    .addEventListener('click', () => {
        if (this.#isOpen) {
          this.#targetEl.classList.remove('open')
          this.#isOpen = false
        } else {
          this.#targetEl.classList.add('open')
          this.#isOpen = true
        }
      }, false)

      this.#buildItems()
  }

  #handleItemClick(event, index) {
    const itemEl = event.target

    if (this.#selectedItemEl === null) {
      this.#selectedItemEl = itemEl
      itemEl.classList.add('selected')
    } else {
      this.#selectedItemEl.classList.remove('selected')
      this.#selectedItemEl = itemEl
      itemEl.classList.add('selected')
    }

    this.#targetEl
      .querySelector('.dropdown .dropdown-placeholder .dropdown-placeholder-label')
      .innerHTML = this.#items[index].label
    this.close()
  }

  #buildItems() {
    this.#items.forEach((item, index) => {
      const itemEl = document.createElement('a')

      itemEl.setAttribute('href', '#')
      itemEl.classList.add('dropdown-item')
      itemEl.innerHTML = ITEM_MARKUP.replace('{label}', item.label)
      itemEl.addEventListener('click', event => {
        this.#handleItemClick(event, index)
        event.preventDefault()
      }, false)
      this.#itemsContainerEl.append(itemEl)
    })
  }

  close() {
    this.#targetEl.classList.remove('open')
    this.#isOpen = false
  }
}