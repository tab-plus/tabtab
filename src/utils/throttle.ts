/*
 * @Author: panrunjun
 * @Date: 2024-08-15 17:12:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-15 17:13:54
 * @Description: 节流函数
 * @FilePath: \ytab-master\src\utils\throttle.ts
 */
export default function throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
    let lastCall = 0;
    return function(this: any, ...args: Parameters<T>) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func.apply(this, args);
      }
    } as T;
  }
  