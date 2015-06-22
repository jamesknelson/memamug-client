import router from "../utils/router";

function getLocation() {
  return window.location.hash.substr(1);
}

function getRoute() {
  return router.getRoute(getLocation()) || {name: '404'};
}

// Make sure that there is a slash immediately following '#'
function ensureSlash() {
  const path = getLocation();

  if (path.charAt(0) == '/') {
    return true;
  }
  else {
    const windowPath = window.location.pathname + window.location.search;
    window.location.replace(windowPath + '#/' + path);
    return false;
  }
}

export default (Actions, Replayables) => ({
  initialize() {
    // If we don't need to redirect because of a missing slash or some other reason,
    // emit a navigatedTo event.
    function onHashChange() {
      ensureSlash();
      Actions.Navigation.navigatedTo(getRoute());
    }

    window.addEventListener('hashchange', onHashChange, false);
    ensureSlash();
    this(getRoute());
  },

  // Triggered when the hash is updated, either by a link or by manual navigation
  navigatedTo(route) {
    this(route);
  },
})
