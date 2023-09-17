/**
 * 座位
 * @param {*} id
 */
let SeatNode = function (id) {
  SeatNode.superClass.constructor.call(this, id);
  // this.setName("座位");
  // this.setWidth(20);
  // this.setHeight(20);
  this.s("body.type", "vector");
  this.s("vector.shape", "circle");
  this.s("vector.fill.color", "#cdcdcd");
  this.s("vector.outline.width", 1);
  this.s("vector.outline.color", "#000000");
  this.s("vector.outline.pattern", [10, 0]);
  this.s("label.position", "center");
  this.s("label.font", "10px arial");
  this.s("label2.position", "left.left");
  this.s("label2.yoffset", 0);
  this.s("shadow.blur", 4);
  this.s("shadow.xoffset", 0);
  this.s("shadow.yoffset", 0);
  this.s("select.style", "shadow");
  this.s("select.padding", 0);
  this.s("select.color", "#ff0000");
  this.c("business.region", "未分区"); // 第几区
  this.c("business.group", "未分组"); // 第几组
  this.c("business.row", 0); // 第几排
  this.c("business.seat", 0); // 座位号
  this.setLayerId("top");
};

b2.Util.ext(SeatNode, b2.Follower, {
  getClassName() {
    return "b2.SeatNode";
  },
  getVectorUIClass: function () {
    return SeatNodeUI;
  },
});

let SeatNodeUI = function (network, element) {
  SeatNodeUI.superClass.constructor.call(this, network, element);
};

b2.Util.ext(SeatNodeUI, b2.NodeUI, {
  paintBody: function (ctx) {
    SeatNodeUI.superClass.paintBody.call(this, ctx);
  },
});

b2.SeatNode = SeatNode;
_b2.addMethod(b2.SeatNode, {
  serializeJson: function (serializer, newInstance, dataObject) {
    b2.SeatNode.superClass.serializeJson.call(
      this,
      serializer,
      newInstance,
      dataObject
    );
    this.serializePropertyJson(serializer, "image", newInstance, dataObject);
    this.serializePropertyJson(serializer, "location", newInstance, dataObject);

    if (_b2.num(this._width) && this._width >= 0) {
      this.serializePropertyJson(serializer, "width", newInstance, dataObject);
    }
    if (_b2.num(this._height) && this._height >= 0) {
      this.serializePropertyJson(serializer, "height", newInstance, dataObject);
    }
    this.serializePropertyJson(serializer, "host", newInstance, dataObject);
  },
});

export { SeatNode };
