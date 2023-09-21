let ShapeRegionNode = function (id) {
  ShapeRegionNode.superClass.constructor.call(this, id);
  this.setLayerId("bottom");
};

b2.Util.ext(ShapeRegionNode, b2.ShapeNode, {
  getClassName() {
    return "b2.ShapeRegionNode";
  },
  getVectorUIClass: function () {
    return ShapeRegionNodeUI;
  },
});

let ShapeRegionNodeUI = function (network, element) {
  ShapeRegionNodeUI.superClass.constructor.call(this, network, element);
};

b2.Util.ext(ShapeRegionNodeUI, b2.ShapeNodeUI, {});

b2.ShapeRegionNode = ShapeRegionNode;
_b2.addMethod(b2.ShapeRegionNode, {
  serializeJson: function (serializer, newInstance, dataObject) {
    b2.ShapeRegionNode.superClass.serializeJson.call(
      this,
      serializer,
      newInstance,
      dataObject
    );
  },
});
export { ShapeRegionNode };
