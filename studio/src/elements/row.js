let RowNode = function (id) {
  RowNode.superClass.constructor.call(this, id);
  // this.setName("排");
  this.s("group.fill", false);
  this.s("group.fill.color", "#FFFFFF");
  this.s("group.shape", "roundrect");
  this.s("group.outline.width", 0);
  this.s("group.outline.color", "#000000");
  this.s("group.padding", 2);
  this.s("vector.outline.pattern", [2, 2]);
  this.s("shadow.xoffset", 0);
  this.s("shadow.yoffset", 0);
  this.s("label.position", "center");
  this.c("selectable", true);
  this.c("movable", true);
  this.c("business.region", "未分区"); // 第几区
  this.c("business.group", "未分组"); // 第几组
  this.c("business.row", 0); // 第几排
  this.c("business.seat", 0); // 座位号
  this.c("angle", 0); // 座位号
  this.setExpanded(true);
  this.setLayerId("top");
};

b2.Util.ext(RowNode, b2.Group, {
  getClassName() {
    return "b2.RowNode";
  },
  getVectorUIClass: function () {
    return RowNodeUI;
  },
  isExpanded: function () {
    return true;
},
});

let RowNodeUI = function (network, element) {
  RowNodeUI.superClass.constructor.call(this, network, element);
};

b2.Util.ext(RowNodeUI, b2.GroupUI, {});
b2.RowNode = RowNode;
_b2.addMethod(b2.RowNode, {
  serializeJson: function (serializer, newInstance, dataObject) {
    b2.RowNode.superClass.serializeJson.call(
      this,
      serializer,
      newInstance,
      dataObject
    );
  },
});
export { RowNode };
