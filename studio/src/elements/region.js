let RegionNode = function (id) {
  RegionNode.superClass.constructor.call(this, id);
  this.setWidth(600);
  this.setHeight(100);
  this.setName("Region");
  this.s("body.type", "vector");
  this.s("vector.shape", "rectangle");
  this.s("vector.fill.color", "rgba(186, 202, 198,0.5)");
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

b2.Util.ext(RegionNode, b2.Follower, {
  getClassName() {
    return "b2.RegionNode";
  },
  getVectorUIClass: function () {
    return RegionNodeUI;
  },
});

let RegionNodeUI = function (network, element) {
  RegionNodeUI.superClass.constructor.call(this, network, element);
};

b2.Util.ext(RegionNodeUI, b2.NodeUI, {});

b2.RegionNode = RegionNode;
_b2.addMethod(b2.RegionNode, {});
export { RegionNode };
