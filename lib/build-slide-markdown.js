/*
 * @Author: siweijie siweijie@163.com
 * @Date: 2015-04-11 19:02:50
 * @LastEditors: siweijie siweijie@163.com
 * @LastEditTime: 2022-12-14 16:45:25
 * @FilePath: /opml-to-markdown/lib/build-slide-markdown.js
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * Created by azu on 2014/04/13.
 * LICENSE : MIT
 */
"use strict";
/*
    Each node has accessor like `.isNote()` , `.hasChildren()`
 */
module.exports = function (root) {
    function buildOutline(root) {
        var br = "\n";
        var buildNode = {
            text: function text(node, parent) {
                if (node.depth === 0) {
                    /*
                    --

                    # Header
                     */
                    return br + "--" + br + br + "# " + node.text + br;
                }
                // return new Array((node.depth - 1) * 5).join(" ") + "- " + node.text;
                return new Array((node.depth + 2)).join("#") + " " + node.text;
            },
            note: function note(node, parent) {
                var prev = parent[parent.indexOf(node)];
                if (prev && prev.depth === 0) {
                    return node.note;
                } else {
                    return br + node.note;
                }
            }
        };


        return root.children.map(function (node, index, array) {
            var oneline = [];
            if (node.isText()) {
                oneline.push(buildNode.text(node, array));
            }
            if (node.isNote()) {
                oneline.push(buildNode.note(node, array));
            }
            if (node.hasChildren()) {
                oneline.push(buildOutline(node));
            }
            return oneline.join(br);
        }).join(br);
    }

    var titleHeader = "title: " + root.title;
    return titleHeader + buildOutline(root).replace(/\\n/g, "\n");
};
