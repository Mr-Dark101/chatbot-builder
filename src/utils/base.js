const DOMAIN_PREFIX = "";

export const STRINGS = {
    ROUTES: {
        ROOT: `${DOMAIN_PREFIX}/`,
        BWS: `${DOMAIN_PREFIX}/bws`,
        TEMPLATES: `${DOMAIN_PREFIX}/dashboard`,
        ANALYTICS: `${DOMAIN_PREFIX}/analytics`,
        CHAT: `${DOMAIN_PREFIX}/chat_manager`,
        AUTH: {
            LOGIN: `${DOMAIN_PREFIX}/login`
        },

    },
    DEFAULTS: {
        COPY_RIGHTS: `COPYRIGHT \u00A9 ${new Date().getFullYear()} E Ocean Private Limited, All Rights Reserved`,
        VERSION: "Version 2.1",
        BOT_LIMIT: 8,
    },
    COLOR: {
        PRI: "#363A77",
        SEC: "#35F5C6",
    },
    API_STATUS: {
        SUCCESS: 200,
    }
}


//---functions---//

export function getGeneratedId(botId, triggers, separator) {
    // console.log('allIds___', triggers)
    // console.log('allIds___', triggers.map((t) => parseInt(t.split(`_${separator}`)[1])).filter((d)=> !isNaN(d)))
    let value = "";
    let sortedFlow = triggers.length > 0 ? triggers.map((t) => parseInt(t.split(`_${separator}`)[1])).filter((d) => !isNaN(d)) : [];
    let genNumber = Math.round(Math.random() * (sortedFlow.length > 0 ? Math.max(...sortedFlow) : Math.max(2)) + 5);
    if (!sortedFlow.includes(genNumber)) {
        value = `B${botId}_${separator}${genNumber}`
    } else {
        getGeneratedId(botId, triggers, separator)
    }
    // console.log("allIds", value);
    return value === "" ? getGeneratedId(botId, triggers, separator) : value;
}

export function currentTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

//export function TreeNode(data) {
//     this.data = data;
//     this.parent = null;
//     this.children = [];
// }

// TreeNode.comparer = function (a, b) {
//     return a.data.id < b.data.sort ? 0 : 1;
// };
// TreeNode.prototype.sortRecursive = function () {
//     this.children.sort(TreeNode.comparer);
//     for (var i = 0, l = this.children.length; i < l; i++) {
//         this.children[i].sortRecursive();
//     }
//     return this;
// };
//
// function toTree(data) {
//     var nodeById = {}, i = 0, l = data.length, node;
//
//     nodeById[0] = new TreeNode(); // that's the root node
//
//     for (i = 0; i < l; i++) {  // make TreeNode objects for each item
//         nodeById[data[i].index] = new TreeNode(data[i]);
//     }
//     for (i = 0; i < l; i++) {  // link all TreeNode objects
//         node = nodeById[data[i].index];
//         node.parent = nodeById[node.data.parent];
//         node.parent.children.push(node);
//     }
//     return nodeById[0].sortRecursive();
// }