function RenderTest() {
  console.log('React sub-component render test')
  return false
}

function defaultRoute() {
  if (!['#search', '#summary', '#details'].find((route) => window.location.hash === route)) {
    window.location.hash = '#search'
  }
}
defaultRoute()
const App = ({ model }) => {
  window.addEventListener('hashchange', defaultRoute)
  return (
    <div class='flexParent'>
      <div class='sidebar debug'>
        <SidebarPresenter model={model} />
      </div>
      <div class='mainContent debug'>
        <Show hash='#search'>
          <SearchPresenter model={model} />
        </Show>
        <Show hash='#details'>
          <DetailsPresenter model={model} />
        </Show>
        <Show hash='#summary'>
          <SummaryPresenter model={model} />
        </Show>
      </div>
    </div>
  )
}
