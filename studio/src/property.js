import { GUI } from "dat.gui";
import {
  RegionNode,
  RowNode,
  SeatNode,
  ShapeRegionNode,
  StageNode,
} from "./elements";
export default class Property {
  constructor(app, element) {
    this._app = app;
    this._element = element;
    this._init();
  }

  _init() {
    // const gui = (this._gui = new GUI({
    //   autoPlace: true,
    //   width: 220,
    // }));
    // gui.domElement.style.position = "absolute";
    // gui.domElement.style.right = "2px";
    // gui.domElement.style.top = "2px";
  }

  set element(element) {
    this._element = element;
    const target = element;
    if (!target) {
      this._gui && this._gui.destroy();
      this._gui = undefined;
      return;
    }
    if (this._gui) {
      this._gui.destroy();
    }
    this._gui = new GUI({
      autoPlace: true,
      width: 220,
    });
    this._gui.domElement.style.position = "absolute";
    this._gui.domElement.style.right = "2px";
    this._gui.domElement.style.top = "2px";

    const config = {
      property: {
        id: target.getId(),
        name: target.getName(),
        angle: target.getAngle(),
        width: target.getWidth() || 32,
        height: target.getHeight() || 32,
        x: target.getCenterLocation().x,
        y: target.getCenterLocation().y,
        // region: target.c("business.region") || "",
        // tier: target.c("business.tier") || "",
        // row: target.c("business.row") || "",
        // seat: target.c("business.seat") || "",
        // visible: target.isVisible(),
        // movable: target.c("movable") || false,
        // selectable: target.c("selectable") || false,
      },
      styles: {
        "label.alpha": target.s("label.alpha") || 0,
        "label.font": target.s("label.font") || "30px arial",
        "label.position": target.s("label.position"),
        "label.xoffset": target.s("label.xoffset"),
        "label.yoffset": target.s("label.yoffset"),
        "label.rotate.angle": target.s("label.rotate.angle") || 0,
        "vector.fill": target.s("vector.fill"),
        "vector.fill.color": target.s("vector.fill.color"),
        "vector.outline.color": target.s("vector.outline.color"),
        "vector.outline.width": target.s("vector.outline.width"),
        "vector.outline.pattern": !!target.s("vector.outline.pattern"),
        "vector.shape": target.s("vector.shape"),
      },
      business: {
        "business.region": target.c("business.region") || "未分区", // 第几区
        "business.group": target.c("business.group") || "", // 第几组
        "business.row": target.c("business.row") || "0", // 第几排
        "business.seat": target.c("business.row") || "0", // 座位号
      },
      group: {
        "business.row": target.c("business.row") || "0",
        "business.region": target.c("business.region") || "",
        "business.group": target.c("business.group") || "",
      },
    };

    if (target instanceof SeatNode) {
      // 基本属性面板
      let propertyFolder = this._gui.addFolder("基本属性");
      propertyFolder.open();
      if (config.property) {
        propertyFolder.add(config.property, "id").name("ID");
        // propertyFolder
        //   .add(config.property, "name")
        //   .name("名称")
        //   .onChange((v) => {
        //     if (!target) return;
        //     target.setName(v);
        //   });
        // propertyFolder
        //   .add(config.property, "width")
        //   .name("Width")
        //   .onChange((v) => {
        //     if (!target) return;
        //     target.setWidth(v);
        //   });
        // propertyFolder
        //   .add(config.property, "height")
        //   .name("Height")
        //   .onChange((v) => {
        //     if (!target) return;
        //     target.setHeight(v);
        //   });
        propertyFolder
          .add(config.property, "x")
          .name("X")
          .onChange((v) => {
            if (!target) return;
            const center = target.getCenterLocation();
            target.setCenterLocation(v, center.y);
          });
        propertyFolder
          .add(config.property, "y")
          .name("Y")
          .onChange((v) => {
            if (!target) return;
            const center = target.getCenterLocation();
            target.setCenterLocation(center.x, v);
          });
        // propertyFolder
        //   .add(config.property, "region")
        //   .name("区域")
        //   .onChange((v) => {
        //     target.c("business.region", v);
        //     if (target instanceof b2.Group) {
        //       const seats = target.getChildren();
        //       seats.forEach((seat) => {
        //         if (seat instanceof b2.Seat) {
        //           seat.c("business.region", v);
        //           const followers = seat.getChildren();
        //           followers.forEach((follower) => {
        //             follower.c("business.region", v);
        //           });
        //         }
        //       });
        //     }
        //   });
        // propertyFolder
        //   .add(config.property, "tier")
        //   .name("层数")
        //   .onChange((v) => {
        //     target.c("business.tier", v);
        //     if (target instanceof b2.Group) {
        //       const children = target.getChildren();
        //       children.forEach((seat) => {
        //         if (seat instanceof b2.Seat) {
        //           seat.c("business.tier", v);
        //           const followers = seat.getChildren();
        //           followers.forEach((follower) => {
        //             follower.c("business.tier", v);
        //           });
        //         }
        //       });
        //     }
        //   });

        // propertyFolder
        //   .add(config.property, "row")
        //   .name("排号")
        //   .onChange((v) => {
        //     target.c("business.row", v);
        //     if (target instanceof b2.Group) {
        //       const children = target.getChildren();
        //       children.forEach((seat) => {
        //         if (seat instanceof b2.Seat) {
        //           seat.c("business.row", v);
        //           const followers = seat.getChildren();
        //           followers.forEach((follower) => {
        //             follower.c("business.row", v);
        //           });
        //         }
        //       });
        //     }
        //   });

        // propertyFolder
        //   .add(config.property, "seat")
        //   .name("座号")
        //   .onChange((v) => {
        //     target.c("business.seat");
        //   });

        propertyFolder
          .add(config.property, "angle")
          .name("Angle")
          .onChange((v) => {
            // target.setAngle(v);
          });
        // propertyFolder
        //   .add(config.property, "visible")
        //   .name("Visible")
        //   .onChange((v) => {
        //     target.setVisible(v);
        //   });
        // propertyFolder
        //   .add(config.property, "movable")
        //   .name("Movable")
        //   .onChange((v) => {
        //     target.c("movable", v);
        //   });
        // propertyFolder
        //   .add(config.property, "selectable")
        //   .name("Selectable")
        //   .onChange((v) => {
        //     target.c("selectable", v);
        //   });
      }

      // 样式属性面板
      let styleFolder = this._gui.addFolder("样式属性");
      styleFolder.close();
      if (config.styles) {
        // styleFolder
        //   .add(config.styles, "label.alpha", 0, 1, 0.1)
        //   .name("Label透明度")
        //   .onChange((v) => {
        //     target.s("label.alpha", v);
        //   });
        styleFolder
          .add(config.styles, "label.font")
          .name("Label字体")
          .onChange((v) => {
            target.s("label.font", v);
          });
        styleFolder
          .add(config.styles, "label.position", [
            "top.top",
            "center",
            "bottom.bottom",
            "left.left",
            "right.right",
          ])
          .name("Label位置")
          .onChange((v) => {
            target.s("label.position", v);
          });
        styleFolder
          .add(config.styles, "label.rotate.angle")
          .name("Label旋转角度")
          .onChange((v) => {
            target.s("label.rotate.angle", v);
          });
        styleFolder
          .add(config.styles, "label.xoffset")
          .name("Label.XOffset")
          .onChange((v) => {
            target.s("label.xoffset", v);
          });
        styleFolder
          .add(config.styles, "label.yoffset")
          .name("Label.YOffset")
          .onChange((v) => {
            target.s("label.yoffset", v);
          });
        styleFolder
          .add(config.styles, "vector.fill")
          .name("是否填充")
          .onChange((v) => {
            target.s("vector.fill", v);
          });
        styleFolder
          .addColor(config.styles, "vector.fill.color")
          .name("填充色")
          .onChange((v) => {
            target.s("vector.fill.color", v);
          });
        styleFolder
          .addColor(config.styles, "vector.outline.color")
          .name("边框色")
          .onChange((v) => {
            target.s("vector.outline.color", v);
          });
        styleFolder
          .add(config.styles, "vector.outline.width")
          .name("边框线宽")
          .onChange((v) => {
            target.s("vector.outline.width", v);
          });
        styleFolder
          .add(config.styles, "vector.outline.pattern")
          .name("虚线线框")
          .onChange((v) => {
            if (v) {
              target.s("vector.outline.pattern", [1, 1]);
            } else {
              target.s("vector.outline.pattern", [1, 0]);
            }
          });
        styleFolder
          .add(config.styles, "vector.shape", [
            "rectangle",
            "roundrect",
            "circle",
          ]) // rectangle
          .name("形状")
          .onChange((v) => {
            target.s("vector.shape", v);
          });
      }

      let businessFolder = this._gui.addFolder("业务数据");
      businessFolder.open();
      if (config.business) {
        businessFolder.add(target._clientMap, "business.region").name("分区");
        businessFolder.add(target._clientMap, "business.group").name("分组");
        businessFolder.add(target._clientMap, "business.row").name("排号");
        businessFolder.add(target._clientMap, "business.seat").name("座位");
      }
      // if (target instanceof b2.Group) {
      //   if (
      //     target._clientMap &&
      //     target._clientMap["row.number"] !== undefined
      //   ) {
      //     businessFolder.add(target._clientMap, "row.number").name("排号");
      //     businessFolder.add(target._clientMap, "row.name").name("第几排");
      //   }
      // } else if (target instanceof b2.Follower) {
      //   if (
      //     target._clientMap &&
      //     target._clientMap["column.number"] !== undefined
      //   ) {
      //     businessFolder.add(target._clientMap, "column.number").name("列号");
      //     businessFolder.add(target._clientMap, "column.name").name("座位号");
      //     businessFolder
      //       .add(target._clientMap, "row.column.name")
      //       .name("几排几座");
      //     businessFolder
      //       .add(target._clientMap, "seat.stats", [
      //         "未分配",
      //         "未售",
      //         "锁座",
      //         "已售",
      //       ])
      //       .name("座位状态")
      //       .onChange((v) => {
      //         if (v === "未分配") {
      //           target.s("vector.outline.width", 1);
      //           target.s("vector.outline.pattern", [1, 1]);
      //           target.s("vector.fill.color", "#E3E3E3");
      //           target.s("body.type", "vector");
      //           target.s("vector.shape", "roundrect");
      //           target.setName(target.c("column.number"));
      //         } else if (v === "未售") {
      //           target.s("vector.outline.width", 0);
      //           target.s("vector.outline.pattern", [1, 0]);
      //           target.s("vector.fill.color", "#2A7FFF");
      //           target.s("vector.shape", "roundrect");
      //           target.s("body.type", "vector");
      //           target.setName(target.c("column.number"));
      //         } else if (v === "锁座") {
      //           target.s("vector.outline.width", 0);
      //           target.s("vector.outline.pattern", [1, 0]);
      //           target.s("vector.fill.color", "#E3E3E3");
      //           target.s("body.type", "default.vector");
      //           target.s("vector.shape", "roundrect");
      //           target.setName("");
      //           target.setImage("lock");
      //         } else if (v === "已售") {
      //           target.s("vector.outline.width", 0);
      //           target.s("vector.outline.pattern", [1, 0]);
      //           target.s("vector.fill.color", "#999999");
      //           target.s("vector.shape", "roundrect");
      //           target.setName("");
      //         }
      //         const selections = this._viewer
      //           .getSelectionModel()
      //           .getSelection();
      //         if (selections.size() > 1) {
      //           selections.toArray().forEach((selection) => {
      //             if (v === "未分配") {
      //               selection.s("vector.outline.width", 1);
      //               selection.s("vector.outline.pattern", [1, 1]);
      //               selection.s("vector.fill.color", "#E3E3E3");
      //               selection.s("body.type", "vector");
      //               selection.s("vector.shape", "roundrect");
      //               selection.setName(selection.c("column.number"));
      //             } else if (v === "未售") {
      //               selection.s("vector.outline.width", 0);
      //               selection.s("vector.outline.pattern", [1, 0]);
      //               selection.s("vector.fill.color", "#2A7FFF");
      //               selection.s("vector.shape", "roundrect");
      //               selection.s("body.type", "vector");
      //               selection.setName(selection.c("column.number"));
      //             } else if (v === "锁座") {
      //               selection.s("vector.outline.width", 0);
      //               selection.s("vector.outline.pattern", [1, 0]);
      //               selection.s("vector.fill.color", "#E3E3E3");
      //               selection.s("body.type", "default.vector");
      //               selection.s("vector.shape", "roundrect");
      //               selection.setName("");
      //               selection.setImage("lock");
      //             } else if (v === "已售") {
      //               selection.s("vector.outline.width", 0);
      //               selection.s("vector.outline.pattern", [1, 0]);
      //               selection.s("vector.fill.color", "#999999");
      //               selection.s("vector.shape", "roundrect");
      //               selection.setName("");
      //             }
      //           });
      //         }
      //       });
      //     if (target._clientMap["seat.price"]) {
      //       const priceColor = [];
      //       for (let key in this._colorMap) {
      //         priceColor.push(key);
      //       }
      //       businessFolder
      //         .add(target._clientMap, "seat.price", priceColor)
      //         .name("价格")
      //         .onChange((v) => {
      //           const color = this._colorMap[v] || "red";
      //           target.s("vector.fill.color", color);
      //           const selections = this._viewer
      //             .getSelectionModel()
      //             .getSelection();
      //           if (selections.size() > 1) {
      //             selections.toArray().forEach((selection) => {
      //               selection.s("vector.fill.color", color);
      //             });
      //           }
      //         });
      //     }
      //   }
      // }
    } else if (target instanceof RowNode) {
      // 基本属性面板
      let propertyFolder = this._gui.addFolder("基本属性");
      propertyFolder.open();
      if (config.property) {
        propertyFolder.add(config.property, "id").name("ID");
        // propertyFolder
        //   .add(config.property, "name")
        //   .name("名称")
        //   .onChange((v) => {
        //     if (!target) return;
        //     target.setName(v);
        //   });
        propertyFolder
          .add(config.property, "width")
          .name("Width")
          .onChange((v) => {
            if (!target) return;
            target.setWidth(v);
          });
        propertyFolder
          .add(config.property, "height")
          .name("Height")
          .onChange((v) => {
            if (!target) return;
            target.setHeight(v);
          });
        propertyFolder
          .add(config.property, "x")
          .name("X")
          .onChange((v) => {
            if (!target) return;
            const center = target.getCenterLocation();
            target.setCenterLocation(v, center.y);
          });
        propertyFolder
          .add(config.property, "y")
          .name("Y")
          .onChange((v) => {
            if (!target) return;
            const center = target.getCenterLocation();
            target.setCenterLocation(center.x, v);
          });
        propertyFolder
          .add(config.property, "angle")
          .name("Angle")
          .onChange((v) => {
            // target.setAngle(v);
          });
      }

      // 样式属性面板
      let styleFolder = this._gui.addFolder("样式属性");
      styleFolder.open();
      if (config.styles) {
        styleFolder
          .add(config.styles, "label.font")
          .name("Label字体")
          .onChange((v) => {
            target.s("label.font", v);
          });
        styleFolder
          .add(config.styles, "label.position", [
            "top.top",
            "center",
            "bottom.bottom",
            "left.left",
            "right.right",
          ])
          .name("Label位置")
          .onChange((v) => {
            target.s("label.position", v);
          });
        styleFolder
          .add(config.styles, "label.rotate.angle")
          .name("Label旋转角度")
          .onChange((v) => {
            target.s("label.rotate.angle", v);
          });
        styleFolder
          .add(config.styles, "label.xoffset")
          .name("Label.XOffset")
          .onChange((v) => {
            target.s("label.xoffset", v);
          });
        styleFolder
          .add(config.styles, "label.yoffset")
          .name("Label.YOffset")
          .onChange((v) => {
            target.s("label.yoffset", v);
          });
      }

      let businessFolder = this._gui.addFolder("业务属性");
      businessFolder.open();

      businessFolder
        .add(config.group, "business.region")
        .name("分区")
        .onChange((v) => {
          const children = target.getChildren();
          children.forEach((element) => {
            element.c("business.region", v);
          });
          target.c("business.region", v);
        });
      businessFolder
        .add(config.group, "business.group")
        .name("分组")
        .onChange((v) => {
          const children = target.getChildren();
          children.forEach((element) => {
            element.c("business.group", v);
          });
          target.c("business.group", v);
        });
      businessFolder
        .add(config.group, "business.row")
        .name("排号")
        .onChange((v) => {
          const children = target.getChildren();
          children.forEach((element) => {
            element.c("business.row", v);
          });
          target.c("business.row", v);
          target.setName(`${v}排`);
        });
    } else if (
      target instanceof StageNode ||
      target instanceof RegionNode ||
      target instanceof ShapeRegionNode
    ) {
      // 基本属性面板
      let propertyFolder = this._gui.addFolder("基本属性");
      propertyFolder.open();
      if (config.property) {
        propertyFolder.add(config.property, "id").name("ID");
        propertyFolder
          .add(config.property, "name")
          .name("名称")
          .onChange((v) => {
            if (!target) return;
            target.setName(v);
            target.getChildren().forEach((row) => {
              if (row instanceof RowNode) {
                row.c("business.region", v);
                row.getChildren().forEach((seat) => {
                  seat.c("business.region", v);
                });
              }
            });
          });
        propertyFolder
          .add(config.property, "width")
          .name("Width")
          .onChange((v) => {
            if (!target) return;
            target.setWidth(v);
          });
        propertyFolder
          .add(config.property, "height")
          .name("Height")
          .onChange((v) => {
            if (!target) return;
            target.setHeight(v);
          });
        propertyFolder
          .add(config.property, "x")
          .name("X")
          .onChange((v) => {
            if (!target) return;
            const center = target.getCenterLocation();
            target.setCenterLocation(v, center.y);
          });
        propertyFolder
          .add(config.property, "y")
          .name("Y")
          .onChange((v) => {
            if (!target) return;
            const center = target.getCenterLocation();
            target.setCenterLocation(center.x, v);
          });
      }

      // 样式属性面板
      let styleFolder = this._gui.addFolder("样式属性");
      styleFolder.open();
      if (config.styles) {
        styleFolder
          .add(config.styles, "label.font")
          .name("Label字体")
          .onChange((v) => {
            target.s("label.font", v);
          });
        styleFolder
          .add(config.styles, "label.position", [
            "top.top",
            "center",
            "bottom.bottom",
            "left.left",
            "right.right",
          ])
          .name("Label位置")
          .onChange((v) => {
            target.s("label.position", v);
          });
        styleFolder
          .add(config.styles, "label.rotate.angle")
          .name("Label旋转角度")
          .onChange((v) => {
            target.s("label.rotate.angle", v);
          });
        styleFolder
          .add(config.styles, "label.xoffset")
          .name("Label.XOffset")
          .onChange((v) => {
            target.s("label.xoffset", v);
          });
        styleFolder
          .add(config.styles, "label.yoffset")
          .name("Label.YOffset")
          .onChange((v) => {
            target.s("label.yoffset", v);
          });
        styleFolder
          .add(config.styles, "vector.fill")
          .name("是否填充")
          .onChange((v) => {
            target.s("vector.fill", v);
          });
        styleFolder
          .addColor(config.styles, "vector.fill.color")
          .name("填充色")
          .onChange((v) => {
            target.s("vector.fill.color", v);
          });
        styleFolder
          .addColor(config.styles, "vector.outline.color")
          .name("边框色")
          .onChange((v) => {
            target.s("vector.outline.color", v);
          });
        styleFolder
          .add(config.styles, "vector.outline.width")
          .name("边框线宽")
          .onChange((v) => {
            target.s("vector.outline.width", v);
          });
        styleFolder
          .add(config.styles, "vector.outline.pattern")
          .name("虚线线框")
          .onChange((v) => {
            if (v) {
              target.s("vector.outline.pattern", [1, 1]);
            } else {
              target.s("vector.outline.pattern", [1, 0]);
            }
          });
      }
    } else if (target instanceof b2.Seat) {
      // propertyFolder
      //   .add(config.seat, "grid.column.count", 1, 50, 1)
      //   .name("Column")
      //   .onChange((v) => {
      //     const width = target.c("seat.width") || this._gridWidth,
      //       height = target.c("seat.height") || this._gridHeight;
      //     target.s("grid.column.count", v);
      //     target.setWidth(width * v);
      // });
    } else {
      this._gui && this._gui.destroy();
      this._gui = undefined;
    }
  }
}
