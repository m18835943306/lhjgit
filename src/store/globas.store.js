const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light'
const userTheme = localStorage.getItem('theme')

const initialState = {
  theme: userTheme || systemTheme,
  loading: false
}
const globalStore = (state = initialState, { type, theme }) => {
  switch (type) {
    case 'THEME':
      return { ...state, theme }
  }
  return state
}

const globalAction = ({ theme }) => {
  if (theme) {
    const body = document.body
    if (theme === 'dark') {
      if (!body.hasAttribute('theme-mode')) {
        body.setAttribute('theme-mode', 'dark')
      }
    } else {
      if (body.hasAttribute('theme-mode')) {
        body.removeAttribute('theme-mode')
      }
    }
  }
  return {
    type: 'THEME',
    theme
  }
}
export { globalStore, globalAction }
