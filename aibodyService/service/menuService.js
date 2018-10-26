let model = require("./model")
let resCode = require("../common/resCode");
let Sequelize = require("sequelize");

function handleErr(err) {
    console.error(err)
    if (err.code) {
        return Promise.resolve({ code: -1, msg: err.msg })
    }
    return Promise.resolve({ code: -1, msg: "服务器异常" })
}
module.exports = {
    getMenu: function(params) {
        if (!params.parent_id) {
            params.parent_id = '0';
        }
        return model.Menu.findAll({
            where: {
                menu_type: 1,
                parent_id: params.parent_id
            },
            attributes: Object.keys(model.Menu.attributes).concat([
                [Sequelize.literal('(SELECT COUNT(*) FROM  `t_menus` WHERE `t_menus`.`parent_id` = `t_menu`.`id`)'), 'chlirenNum']
            ]),
            order: [
                ['sort', 'desc']
            ]
        }).then(menuList => {
            let menu = menuList;
            return Promise.resolve({ code: 200, data: menuList })


        }).catch(err => {
            return handleErr(err)
        })
    },
    getMenuTreeData: function(params) {

        return model.Menu.findAll({
            where: {
                menu_type: 1
            },
            order: [
                ['sort', 'desc']
            ]
        }).then(menuList => {
            let list = []
            for (let a of menuList) {
                list.push(a.toJSON())
            }
            let menu = toTree(list);


            return Promise.resolve({ code: 200, data: menu })


        }).catch(err => {
            return handleErr(err)
        })
    }
}

function toTree(list) {
    let obj = {}
    let result = []
    for (let item of list) {
        obj[item.id] = item;
        item.children = undefined;
    }
    for (let item of list) {
        if (item.parent_id == '0') {
            result.push(item)
        } else {
            if (!obj[item.parent_id].children) {
                obj[item.parent_id].children = []
            }
            obj[item.parent_id].children.push(item)
        }
    }
    return result;
}