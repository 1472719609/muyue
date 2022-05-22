const express = require("express")
const router = express.Router()
const sqlFn = require("./mysql")
const url = require("url");
const multer = require("multer");
const fs = require("fs");

// 路由接口


/**
 * @api {get} /api/projectList 商品列表分页{total:"",arr:[{},{},{}],pageSize:8}
 * 参数：page 页码
 */
router.get("/projectList", (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from project where id";
    sqlFn(sqlLen,null,data=>{
    const len = data.length;
    const sql = "select * from project order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result,
                pageSize: 8,
                total: len
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    });

});
//     const sql = "select * from project order by id desc limit 8 offset " + (page - 1) * 8;
//     sqlFn(sql, null, result => {
//         if (result.length > 0) {
//             res.send({
//                 status: 200,
//                 data: result,
//             })
//
//         }else {
//             res.send({
//                 status: 500,
//                 msg: "暂无数据"
//             })
//         }
//     });

/**
 * @api {get} /api/search 商品查询
 * 商品查询接口search
 * 参数：search
 */

})
router.get("/search", (req, res) => {
    const search = req.query.search;
    const sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'";
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                data: result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
});


/**
 * 类目选择
 */
router.get("/goods", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from category where id=?"
    var arr = [id];
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 上传图片
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({ res_code: '0', name: file.originalname, url: file.path });
});


/**
 * 商品添加
 */

router.get("/addGoods", (req, res) => {
    /**
     * 获取参数
     */
    var title = url.parse(req.url, true).query.title || "";
    var cid = url.parse(req.url, true).query.cid || "";
    var sellPoint = url.parse(req.url, true).query.sellPoint || "";
    var price = url.parse(req.url, true).query.price || "";
    var num = url.parse(req.url, true).query.num || "";
    var desc = url.parse(req.url, true).query.descs || "";
    var image = url.parse(req.url, true).query.image || "";

    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'','',?)"
    var arr = [title, image, sellPoint, price, cid, num, desc];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
module.exports = router