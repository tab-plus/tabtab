/**
 * 导出多个 localStorage 项为 JSON 文件
 * @param keyArr - localStorage 项的键名数组
 */
 export function exportMultipleLocalStorageItems(keyArr: string[]): void {
    // 创建一个对象来存储所有指定项的数据
    const jsonData: { [key: string]: string | null } = {};

    // 遍历键名数组，从 localStorage 获取对应的数据
    for (let i = 0; i < keyArr.length; i++) {
        const value = localStorage.getItem(keyArr[i]);
        if (value === null) {
            console.error(`localStorage 中没有找到键为 "${keyArr[i]}" 的项`);
            // 可以选择跳过当前项或者中断执行
            continue; // 跳过当前项
        }
        jsonData[keyArr[i]] = value;
    }

    // 将对象转换为格式化的 JSON 字符串
    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log(jsonString,111);
    // 创建一个 Blob 对象来表示 JSON 数据
    const blob = new Blob([jsonString], { type: 'application/json' });

    // 创建一个临时的链接元素
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    // 设置链接的属性
    link.href = url;
    link.download = 'localStorageData.json'; // 设定下载文件名

    // 将链接添加到文档中（某些浏览器需要这样做）
    document.body.appendChild(link);

    // 程序matically 点击链接以触发下载
    link.click();

    // 从文档中移除链接
    document.body.removeChild(link);

    // 撤销对象 URL 以释放内存
    URL.revokeObjectURL(url);
}

// 示例用法：导出键名为 ["myData1", "myData2"] 的 localStorage 项
// document.getElementById('exportBtn')?.addEventListener('click', () => exportMultipleLocalStorageItems(['myData1', 'myData2']));
