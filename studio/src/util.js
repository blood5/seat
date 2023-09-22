import { RowNode, SeatNode } from "./elements";

/**
 * save and download json file
 * @param {*} json
 * @param {*} filename
 */
export function saveJSON(json, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([json], { type: "text/plain" }));
  link.download = filename || "datas.json";
  link.dispatchEvent(new MouseEvent("click"));
}

/**
 * load json from local file
 * @param {*} json
 */
export function loadJSON(json) {
  return new Promise((res, rej) => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.style.display = "none";
      document.body.appendChild(input);

      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target.readyState === 2) {
            const datas = JSON.parse(e.target.result);
            res(datas);
          }
        };
        reader.readAsText(file);
      };
      input.click();
    } catch (e) {
      rej(e);
    }
  });
}

/**
 * 注入css
 * @param css
 * @returns
 */
export function insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === "undefined") {
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}
/**
 *
 * @param {*} elements
 * @returns
 */
function _checkAndFilter(elements) {
  if (!elements || elements.length == 0) {
    return null;
  }
  elements = elements.filter(function (item, index, array) {
    return item instanceof RowNode || item instanceof SeatNode;
  });
  if (elements.length < 1) {
    return null;
  }
  return elements;
}
/**
 *
 * @param {*} elements
 * @returns
 */
function _getBounds(elements) {
  var xMin = Number.MAX_VALUE;
  var xMax = Number.MIN_VALUE;
  var yMin = Number.MAX_VALUE;
  var yMax = Number.MIN_VALUE;

  elements.forEach(function (node, index, array) {
    if (node instanceof b2.Node) {
      var x = node.getX();
      xMin = Math.min(x, xMin);
      var width = node.getWidth();
      xMax = Math.max(x + width, xMax);
      var y = node.getY();
      yMin = Math.min(y, yMin);
      var height = node.getHeight();
      yMax = Math.max(y + height, yMax);
    }
  });
  return { x: xMin, y: yMin, width: xMax - xMin, height: yMax - yMin };
}

/**
 *
 * @param {*} elements
 * @param {*} alignType
 * @returns
 */
export function align(elements, alignType, app) {
  if (!alignType) {
    throw new Error("align type can't be null");
  }
  elements = _checkAndFilter(elements);
  if (elements == null) {
    return;
  }
  var bounds = _getBounds(elements);
  if (bounds == null || bounds.x == Number.MAX_VALUE) {
    return;
  }
  alignType = alignType.toLowerCase();
  if (
    alignType === "row-left" ||
    alignType === "row-right" ||
    alignType === "row-middle" ||
    alignType === "row-reset-seat-interval" ||
    alignType === "row-reset-interval"
  ) {
    let rows = elements.filter((element) => element instanceof RowNode);
    rows = rows.sort((a, b) => {
      return a.getCenterLocation().y - b.getCenterLocation().y;
    });
    const startRowY = rows[0].getCenterLocation().y;
    rows.forEach((row, index) => {
      const children = row.getChildren();
      var x = row.getX();
      var y = row.getY();
      switch (alignType) {
        case "row-left":
          if (app) {
            const rects = app._scene.viewer.getGroupChildrenRects(row);
            if (!rects.isEmpty()) {
              var shape = row.getStyle("group.shape");
              var func = _b2.group[shape];
              if (!func) {
                throw "Can not resolve group shape '" + shape + "'";
              }
              const shapeRect = func(rects);
              console.log(shapeRect);
              x = bounds.x + shapeRect.width / 2;
              row.setLocation(x, y);
            }
          }
          break;
        case "row-right":
          if (app) {
            const rects = app._scene.viewer.getGroupChildrenRects(row);
            if (!rects.isEmpty()) {
              var shape = row.getStyle("group.shape");
              var func = _b2.group[shape];
              if (!func) {
                throw "Can not resolve group shape '" + shape + "'";
              }
              const shapeRect = func(rects);
              console.log(shapeRect);
              x = bounds.x + bounds.width - shapeRect.width / 2;
              row.setLocation(x, y);
            }
          }
          break;
        case "row-middle":
          x = bounds.x + bounds.width / 2;
          row.setLocation(x, y);
          break;
        case "row-reset-seat-interval":
          let startX = 0,
            startY = 0;
          for (let i = 0; i < children.size(); i++) {
            const child = children.get(i);
            const center = child.getCenterLocation();
            if (i === 0) {
              startX = center.x;
              startY = center.y;
            }
            child.setName(`0-${i}`);
            child.setCenterLocation(startX + i * 40, startY);
            child.c("business.seat", i); // 座位号
          }
          break;
        case "row-reset-interval":
          row.setY(startRowY + index * 40);
          break;
      }
    });
    return;
  } else {
    elements.forEach(function (node, index, array) {
      if (!(node instanceof b2.Node)) {
        return;
      }
      var x = node.getX();
      var y = node.getY();
      switch (alignType) {
        case "left":
          x = bounds.x;
          node.setLocation(x, y);
          break;
        case "right":
          x = bounds.x + bounds.width - node.getWidth();
          node.setLocation(x, y);
          break;
        case "top":
          y = bounds.y;
          node.setLocation(x, y);
          break;
        case "bottom":
          y = bounds.y + bounds.height - node.getHeight();
          node.setLocation(x, y);
          break;
        case "horizontalcenter":
          x =
            bounds.x +
            (bounds.x + bounds.width - bounds.x - node.getWidth()) / 2;
          node.setLocation(x, y);
          break;
        case "verticalcenter":
          y =
            bounds.y +
            (bounds.y + bounds.height - bounds.y - node.getHeight()) / 2;
          node.setLocation(x, y);
          break;
      }
    });
  }
}

/**
 *
 * @param {*} evt
 * @returns
 */
export function isCtrlDown(evt) {
  return evt.ctrlKey || evt.metaKey;
}

/**
 *
 * @param {*} evt
 * @returns
 */
export function isShiftDown(evt) {
  return evt.shiftKey;
}

export function registerImage(option, callback) {
  const name = option.name,
    url = option.url;
  var image = new Image();
  image.src = url;
  image.onload = (e) => {
    b2.Util.registerImage(name, image, image.width, image.height);
    callback && callback();
  };
}

export function findDimensions() {
  let winWidth, winHeight;
  if (window.innerWidth) winWidth = window.innerWidth;
  else if (document.body && document.body.clientWidth)
    winWidth = document.body.clientWidth;
  if (window.innerHeight) winHeight = window.innerHeight;
  else if (document.body && document.body.clientHeight)
    winHeight = document.body.clientHeight;
  if (
    document.documentElement &&
    document.documentElement.clientHeight &&
    document.documentElement.clientWidth
  ) {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
  }
  return {
    winWidth,
    winHeight,
  };
}
