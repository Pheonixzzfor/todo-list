const $editCategoryInput = document.querySelector('.editCategoryInput')
const $categoryCrudmodal = document.querySelector('#modalCategoryCrud')
const $closecategoryCrudModalBTN = document.querySelector('.close-btn-category-Crud')
const $editcategoryBtn = document.querySelector('.editcategoryBtn')
const $deletecategoryBtn = document.querySelector('.deletecategoryBtn')


$closecategoryCrudModalBTN.addEventListener('click', closeCategoryCRUDModal)

window.addEventListener('click', (e) => {
  if (e.target === $categoryCrudmodal) {
    closeCategoryCRUDModal()
  }
})

// Events when keys press
document.addEventListener('keydown', e => {
  if ($categoryCrudmodal.style.display === 'none') return


  if (e.key === 'Escape') {
    closeCategoryCRUDModal()
  }

  if (e.key === 'Enter') {
    createCategory($createCategoryInput)
  }
})

// Open modal function
function openCategoryCRUDModal(categoryID) {
    const allCategories = getCategories()

    const foundCategory = allCategories.find(category => category.id === categoryID)

    $editCategoryInput.value = foundCategory.title

    $categoryCrudmodal.style.display = 'block'

    $editCategoryInput.dataset.categoryId = categoryID

  $editCategoryInput.focus()
}

// Close modal function
function closeCategoryCRUDModal() {
    $categoryCrudmodal.style.display = 'none'
}

// edit category action
$editcategoryBtn.addEventListener('click', () => {
    if (isValidated($editCategoryInput)) {
        const categories = getCategories()
    
        const newCategories = categories.map(category => {
            if(category.id === +$editCategoryInput.dataset.categoryId) {
                return {
                    ...category,
                    title: $editCategoryInput.value 
                }
            }
            return category
        })
        setCategories(newCategories)

        reloadPage()
      }
})

// delete category action

$deletecategoryBtn.addEventListener('click', () => {
    const askCategoryDelete = confirm('Вы действительно хотите удалить данную категорию?')

    if (!askCategoryDelete) return

    const categoryId = $editCategoryInput.dataset.categoryId
    
    const updatedCategories = getCategories().filter(category => category.id !== +categoryId)

    const newTodos = getTodos().filter(todo => todo.category !== categoryId)

    setCategories(updatedCategories)
    setTodos(newTodos)

    reloadPage()
})