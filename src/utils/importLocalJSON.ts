/*
 * @Author: panrunjun
 * @Date: 2024-08-17 14:16:08
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-17 15:02:50
 * @Description: 将 JSON 文件导入到 localStorage 中
 * @FilePath: \ytab-master\src\utils\importLocalJSON.ts
 */

/**
 * 将 JSON 文件导入到 localStorage 中
 * @param file - 用户选择的 JSON 文件
 */
export function importJSONToLocalStorage(content: string): boolean {
    try {
        const jsonData = JSON.parse(content);
        console.log(jsonData);

        for (const key in jsonData) {
            localStorage.setItem(key, jsonData[key]);
        }
        return true;
    } catch (error) {
        console.error('Invalid JSON file:', error);
        return false;
    }
}

