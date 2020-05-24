const CONSTS = {
  wishlist: 'Wishlist',
};

function localStorageLoad(key) {
  if (localStorage) {
    return localStorage.getItem(key);
  }
  return null;
}

function localStorageSet(key, value) {
  if (localStorage) {
    localStorage.setItem(key, value);
  }
}

const defaultWishlist = {
  settings: {},
  items: [
    { id: '702c4f18', prio: false },
    { id: 'f733ff0b', prio: false },
    { id: '486a0062', prio: true },
  ],
};

function getDefaultWishlist() {
  return { ...defaultWishlist };
}

function setWishlist(wishlist) {
  localStorageSet(CONSTS.wishlist, JSON.stringify(wishlist));
}

function getWishlist() {
  const d = getDefaultWishlist();
  const w = localStorageLoad(CONSTS.wishlist);
  if (w) {
    try {
      return JSON.parse(w);
    } catch (e) {
      setWishlist(d);
      return d;
    }
  }
  setWishlist(d);
  return getDefaultWishlist();
}

function addCap(id) {
  const w = getWishlist();
  w.items.push({ id, prio: false });
  setWishlist(w);
  return w;
}

function rmCap(id) {
  const w = getWishlist();
  w.items = w.items.filter((x) => x.id !== id);
  setWishlist(w);
  return w;
}

// Only for dev
function resetWishlist() {
  const d = getDefaultWishlist();
  setWishlist(d);
  return d;
}

module.exports = {
  getWishlist,
  setWishlist,
  resetWishlist,
  addCap,
  rmCap,
};