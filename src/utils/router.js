import Routr from "routr"

const router = new Routr({
  'new': {path: "/", method: "get"},
  'mugs': {path: "/mugs", method: "get"},
  'unsubscribe': {path: "/unsubscribe", method: "get"},
});

export default router;
