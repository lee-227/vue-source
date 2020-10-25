export function patch(oldVnode, vnode) {
  if (!oldVnode) {
    return createElm(vnode);
  }
  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    const oldElm = oldVnode;
    const parentElm = oldVnode.parentNode;
    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling);
    parentElm.removeChild(oldElm);
    return el;
  } else {
  }
}
function createComponent(vnode) {
  let i = vnode.data;
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  if (vnode.componentInstance) {
    return true;
  }
  return false;
}
function createElm(vnode) {
  let { tag, children, data, key, text, vm } = vnode;
  if (typeof tag === "string") {
    if (createComponent(vnode)) {
      return vnode.componentInstance.$el;
    }
    vnode.el = document.createElement(tag);
    updateProperties(vnode);
    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
function updateProperties(vnode) {
  let newProps = vnode.data || {};
  let el = vnode.el;
  for (const key in newProps) {
    if (key === "style") {
      for (const styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === "class") {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}
