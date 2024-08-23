/*
 * @Author: panrunjun
 * @Date: 2024-08-12 23:23:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-17 17:09:47
 * @Description: 
 * @FilePath: \ytab-master\src\types\icon.d.ts
 */

export type Icon = {
  url: string,
  type: 'component' | 'icon',
  name: string,
  src: string,
  id: string,
  size: number,
  x: number,
  y: number,
  routeName: string
}