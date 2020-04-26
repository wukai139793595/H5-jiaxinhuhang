
function reqOpportunity(request) {
    var arr = request.body.split('&').map((item, index) => {
        return item.split('=')
    });
    var params = {};
    arr.forEach((item) => {
        params[item[0]] = item[1];
    })
    if (params.type === "industry_type") {
        return {
            code: 0,
            count: 9,
            data: [{
                "id": 30,
                "value": "网吧",
                "createTime": "2019-06-27 10:45:21",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "网吧",
                "sort": 1,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 31,
                "value": "酒店",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "酒店",
                "sort": 2,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 32,
                "value": "商超餐饮零售",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "商超餐饮零售",
                "sort": 3,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 33,
                "value": "培训机构",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "培训机构",
                "sort": 4,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 34,
                "value": "中小企业",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "中小企业",
                "sort": 5,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 35,
                "value": "房产中介",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "房产中介",
                "sort": 6,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 36,
                "value": "互联网机构",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "互联网机构",
                "sort": 7,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 37,
                "value": "行业客户",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "行业客户",
                "sort": 8,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }, {
                "id": 38,
                "value": "律师事务所",
                "createTime": "2019-06-27 10:45:22",
                "type": "industry_type",
                "typeName": "行业分类",
                "name": "律师事务所",
                "sort": 9,
                "parent": null,
                "remark": null,
                "branchpostoffice": null
            }]
        }
    } else if (params.type === "broadbandtype") {
        return {
            code: 0,
            data: []
        }
    } else {
        return {
            code: 0,
            totalCount: 40,
            data: [
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                },
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                },
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                },
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                },
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                },
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                },
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                },
                {
                    imgUrl: require("@/assets/images/home/smallpic.jpg"),
                    company: "湖州电动滚筒有限公司",
                    address: "吴兴-吉山支局-红旗路27",
                    id: "2022209",
                    phone: "15305727699"
                }
            ]
        }
    }
}

module.exports = {
    reqOpportunity
}