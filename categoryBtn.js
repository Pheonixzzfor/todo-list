const $openModalBtn = document.querySelector('.addCategoryBtn')
const modal = document.querySelector('#modal')
const $closeModalBtn = document.querySelector('.close-btn')
const $createCategoryBtn = document.querySelector('.createCategoryBtn')
const $createCategoryInput = document.querySelector('.createCategoryInput')

$openModalBtn.addEventListener('click', openModal)

$closeModalBtn.addEventListener('click', closeModal)

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

// Events when keys press
document.addEventListener('keydown', e => {
  if (modal.style.display === 'none') return


  if (e.key === 'Escape') {
    closeModal()
  }

  if (e.key === 'Enter') {
    createCategory($createCategoryInput)
  }
})

// Open modal function
function openModal() {
  modal.style.display = 'block'

  $createCategoryInput.focus()
}

// Close modal function
function closeModal() {
  modal.style.display = 'none'
}

// Create category event

$createCategoryBtn.addEventListener('click', () => {
    createCategory($createCategoryInput)
  })
  
  // Create category function
  
  function createCategory(categoryTitle) {
    const category = {
      id: generateId(),
      title: categoryTitle.value,
    }
  
    if (isValidated(categoryTitle)) {
      const categories = getCategories()
  
      setCategories([...categories, category])
  
      categoryTitle.value = ''
  
      reloadPage()
    }
  }
  
  
  // generateId
  
  function generateId() {
    const categories = getCategories()
    const maxID = categories.reduce((acc, category) => category.id > acc ? category.id : acc, 0)
  
    return maxID + 1
  }
  
  // Validation function
  
  function isValidated(element) {
    if (!element.value) {
      element.classList.add('error')
  
      element.focus()
  
      return false
    }
  
    element.classList.remove('error')
    return true
  }
  
  // Get categories from LS
  
  function getCategories() {
    return JSON.parse(localStorage.getItem('categories')) || []
  }
  
  // Set categories to LS
  
  function setCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories))
  }
  
  // Reload page
  function reloadPage() {
    window.location.reload()
  }