import cuid from "cuid";

export default function buildCuidAdaptor() {
  function createId() {
    return cuid();
  }

  return Object.freeze({
    createId
  });
}
