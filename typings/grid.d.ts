/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-16 20:08:42
 * @Description: 组件类型
 * @FilePath: \ytab-master\typings\grid.d.ts
 */
export type GridIconTy = {
  url: string,
  type: 'icon',
  name: string,
  src: string,
  id:string,
  size:number,
  x:number,
  y:number,
}

export type GridComponentTy = {
  url: string,
  type: 'component',
  name: string,
  src: string,
  id:string,
  size:number,
  x:number,
  y:number,
}

export interface GrideModuleTy {
  icon: Array<GridIconTy>,
  component: Array<GridComponentTy>
}
