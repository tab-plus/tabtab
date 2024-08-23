/*
 * @Author: panrunjun
 * @Date: 2024-08-02 23:09:46
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-04 16:54:59
 * @Description: 按钮类型
 * @FilePath: \ytab-master\src\types\menu.d.ts
 */
export interface Menu {
    id: number;
    title: string;
    // icon: string;
    // path: string;
    // parentId: number;
    // sort: number;
    // type: number;
    // children: Menu[];
}
export interface MemoMenu extends Menu {
   content:string
}

// export interface AddMemo {
//     name: string;
//     value: string;
// }
