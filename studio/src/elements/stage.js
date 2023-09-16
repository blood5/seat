let StageNode = function (id) {
  StageNode.superClass.constructor.call(this, id);
  this.setWidth(400);
  this.setHeight(100);
  this.setName("Stage");
  this.s("body.type", "vector");
  this.s("vector.shape", "rectangle");
  this.s("vector.fill.color", "rgba(255,255,255,0.4)");
  this.s("vector.outline.width", 2);
  this.s("vector.outline.color", "#000000");
  this.s("label.position", "center");
  this.s("label.font", "20px arial");
  this.s("label.xoffset", 0);
  this.s("label.yoffset", 0);
  this.s("shadow.xoffset", 0);
  this.s("shadow.yoffset", 0);
  this.s("select.padding", 0);
  this.setLayerId("bottom");
};

b2.Util.ext(StageNode, b2.Follower, {
  getClassName() {
    return "b2.StageNode";
  },
  getVectorUIClass: function () {
    return StageNodeUI;
  },
});

let StageNodeUI = function (network, element) {
  StageNodeUI.superClass.constructor.call(this, network, element);
};

b2.Util.ext(StageNodeUI, b2.NodeUI, {});
b2.StageNode = StageNode;
_b2.addMethod(b2.StageNode, {});
export { StageNode };
