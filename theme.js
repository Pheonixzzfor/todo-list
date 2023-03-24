const $themeSelector = document.querySelector('.themeSelector') 
 
const Themes = [ 
 { 
  id: 1, 
  title: 'Dark', 
  value: 'dark', 
  color: '#313638', 
 }, 
 { 
  id: 2, 
  title: 'Light', 
  value: 'light', 
  color: '#F2F3F4', 
 }, 
 { 
  id: 3, 
  title: 'Primary', 
  value: 'primary', 
  color: '#d0bdbd', 
 }, 
] 
 
window.addEventListener('load', () => {  
  
 const theme = localStorage.getItem('theme') 
 const currentTheme = getCurrentTheme(Themes, theme) 
 if (!theme) {
    const defauttheme = Themes.at(0)
    $themeSelector.value = defauttheme
    setThemeColor(defauttheme.value)
    
    return
}
 $themeSelector.value = theme 
 setThemeColor(theme) 
}) 
 
$themeSelector.addEventListener('change', (event) => { 
 const value = event.target.value 
 localStorage.setItem('theme', value) 
 const currentTheme = getCurrentTheme(Themes, value) 
 setThemeColor(currentTheme.color) 
}) 
 
function optionTemplate(theme) { 
 return ` 
 <option value="${theme.value}">${theme.title}</option> 
 ` 
} 
 
function getCurrentTheme(themes, value) { 
 return themes.find(theme => theme.value === value) || null 
} 
 
function setThemeColor(color) { 
 document.body.style.backgroundColor = color 
}


