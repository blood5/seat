const testdatas = {
    version: '5.8.4', //版本号
    platform: 'html5', //运行平台
    images: {},
    dataBox: {
        // 数据容器
        class: 'b2.ElementBox', //数据容器的类Class
        layers: [
            // 图层
            { id: 'bottom', name: 'Default', visible: true, editable: true, movable: true },
            { id: 'center', name: 'Default', visible: true, editable: true, movable: true },
            { id: 'top', name: 'Default', visible: true, editable: true, movable: true },
            { name: 'Default', visible: true, editable: true, movable: true },
        ],
    },
    datas: [
        // 所有数据元素
        {
            class: 'b2.ShapeNode', // 多边形，用于绘制区域
            ref: 0,
            p: {
                // 属性信息
                name: '岳池', //名称
                layerId: 'bottom', //图层
                location: { x: 422.47560999999996, y: -21.038700000000034 }, //位置，左上角
                width: 844.7997354545457, //宽度，bounding的宽度
                height: 470.2205363636365, //高度，bounding的高度
                points: [
                    //多边形的点
                    { x: 425.67965450867683, y: 195.19410139349725 },
                    { x: 422.47560999999996, y: -16.46234441495248 },
                    { x: 589.0859244512123, y: -18.75052220747626 },
                    { x: 1094.2569419859783, y: -17.606433311214367 },
                    { x: 1267.2753454545445, y: -21.038700000000034 },
                    { x: 1267.2753454545445, y: 178.03276794956847 },
                    { x: 1264.0713009458682, y: 212.35543483742558 },
                    { x: 846.4774999816111, y: 449.18183636363756 },
                    { x: 426.74766934490293, y: 224.94041269630608 },
                ],
                segments: ['moveto', 'quadto', 'lineto', 'quadto', 'lineto', 'quadto'],
            },
            s: {
                'shapenode.closed': true, // 多边形是否封闭
                'vector.fill.color': 'rgba(255,255,255,0.4)', //填充色
                'vector.outline.width': 2, //外边框线宽
                'vector.outline.color': '#000000', // 线宽颜色
                'label.position': 'center', // 文字位置
                'shadow.xoffset': 0, // 选中后阴影偏移量
                'shadow.yoffset': 0,
                'select.padding': 0,
                'label.yoffset': -256.9999999999999, //文字相对y轴偏移量
                'vector.fill': true, //是否填充
            },
            c: {
                // 业务属性
                movable: false, // 是否可以移动
            },
        },
        {
            class: 'b2.Group', // 分组，Group = Seat + Seat (虚拟座位)； Seat = Follower + Follower (真实座位)+ ... ，分组在前端不用绘制
            ref: 2,
            p: { name: '岳池1排', layerId: 'center', location: { x: 874.31485, y: 39.09067924140094 }, expanded: true },
            s: { 'group.fill': false, 'group.fill.color': '#f5f3f3', 'group.shape': 'roundrect', 'group.outline.width': 0, 'group.outline.color': '#000000', 'group.padding': 0, 'vector.outline.pattern': [2, 2], 'shadow.xoffset': 0, 'shadow.yoffset': 0, 'label.position': 'left.left', 'vector.fill.color': '#4242a0' },
            c: { movable: true, 'row.number': 1, 'row.name': '1排', 'business.region': '岳池', 'business.tier': '1层', 'business.row': '1排' },
        },
        {
            class: 'b2.Seat', // 虚拟座位，前端无需绘制，
            ref: 3,
            p: {
                name: '岳池1排', // 名称
                angle: 6, //旋转角度
                parent: 2, // 父亲，即Group ref = 2
                layerId: 'center', // 图层
                location: { x: 556.4556, y: 38.2096426162719 }, //位置，左上角
                width: 120, // 宽度
                height: 20, // 高度
            },
            s: {
                'grid.border': 1,
                'grid.deep': 1, //
                'grid.deep.color': 'rgba(0,0,0,0.2)',
                'grid.padding': 2,
                'grid.column.count': 6, // 虚拟座位的数量
                'grid.row.count': 1,
                'grid.fill': false,
                'grid.fill.color': 'rgba(0,0,0,0.4)',
                'label.position': 'left.left',
                'shadow.xoffset': 0,
                'shadow.yoffset': 0,
                'shadow.blur': 0,
                'select.padding': 0,
                'select.width': 2,
                'select.style': 'border',
            },
            c: {
                // 业务属性
                movable: true, // 虚拟座位是否可以移动
                'business.region': '岳池', // 虚拟座位的区域
                'business.tier': '1层', // 虚拟座位的层号
                'business.row': '1排', // 虚拟座位的排号
            },
        },
        {
            class: 'b2.Follower', // 真实座位
            ref: 4, // 引用id
            p: {
                name: 8, //名称
                angle: 6, //旋转角度
                parent: 3, // 父亲 ref = 3
                layerId: 'top', // 显示图层
                location: { x: 657.5195931889401, y: 46.348958726931556 }, // 位置
                width: 15.666666666666668, //宽度
                height: 14, //高度
                host: 3, // 对应的虚拟座位
            },
            s: {
                'body.type': 'vector', // 填充方式，vector是矢量绘制，default是图片绘制，default.vector是图片和矢量一起绘制
                'vector.shape': 'roundrect', // 绘制形状为圆角矩形
                'vector.fill.color': '#2A7FFF', //填充色
                'vector.outline.width': 0, //线宽
                'vector.outline.color': '#000000', //线颜色
                'vector.outline.pattern': [1, 0], // 虚线，第一个数为实线长度，第二个数为虚线长度
                'label.position': 'center', // 文字位置
                'shadow.xoffset': 0,
                'shadow.yoffset': 0,
                'select.padding': 0,
                'label.rotate.angle': 6, //文字旋转角度
                'follower.column.index': 5, // 对应虚拟座位中的编号
            },
            c: {
                // 业务属性
                'column.number': 8, // 座位号编号
                'column.name': '8号', // 座位号名称
                'row.column.name': '1排8号', //显示的内容
                'seat.stats': '未售', // 座位当前状态
                'seat.price': 100, //座位的售价
                'business.region': '岳池', //座位属于的区域
                'business.tier': '1层', //座位对应层号
                'business.row': '1排', //座位对应的排号
                'business.seat': '8号', //座位对应的座位号
            },
        },
        {
          "class": "b2.Follower",
          "ref": 349,
          "p": {
            "name": "剧在文化",
            "layerId": "top",
            "location": {
              "x": 828.9583362688669,
              "y": -103.49259022919027
            }
          },
          "s": {
            "body.type": "none",
            "label.position": "center",
            "label.font": "30px arial"
          },
          "c": {
            "movable": true
          }
        }
    ],
};

export { testdatas };
