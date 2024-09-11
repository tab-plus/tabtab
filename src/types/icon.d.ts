/*
 * @Author: panrunjun
 * @Date: 2024-08-12 23:23:09
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-09-06 21:27:59
 * @Description: 
 * @FilePath: \ytab-master\src\types\icon.d.ts
 */

import { Item } from "ant-design-vue/lib/menu"

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


/**
 * @description: 组件节点数据类型
 */
interface CompnentItem {
  x: number,
  y: number,
  id: string,
}

/**
 * @description: 图库节点数据类型
 */
export interface PintureItem extends CompnentItem {
  src: string,
  name: string,
}

/**
 * @description: date节点数据类型
 */
export interface DateItem extends CompnentItem {
  size: number,
}

/**
 * @description: 天气节点数据类型
 */
export interface WeatherItem extends CompnentItem {
  size: number,
}

/**
 * @description: 热搜节点数据类型
 */
export interface HotSearchItem extends CompnentItem {
  size: number,
}