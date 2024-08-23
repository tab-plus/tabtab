/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-16 20:51:14
 * @Description: 获取icon
 * @FilePath: \ytab-master\src\store\grids.ts
 */
import { defineStore } from 'pinia'
import { GrideModuleTy, GridIconTy, GridComponentTy } from '~/grid'


export const useGridsStore = defineStore('grids', {
  state: () => {
    return {
      selectedGrids: {} as GrideModuleTy
    }
  },
  getters: {
    getSelectedGrids: (state) => state.selectedGrids
  },
  actions: {
    SYNC_SELECTED_GRIDS(name: string) {
      console.log(name,"name");
      this.$patch((state) => {
        state.selectedGrids = JSON.parse(localStorage.getItem(name))
      })
    },

    SELECTED_GRIDS_MODIFY(name: string, actionObj: { action: 'DEC' | 'INC', grid: GridComponentTy | GridIconTy}) {
      this.$patch((state) => {
        if(actionObj.action === 'DEC') {
          if(actionObj.grid.type === 'icon') {
            state.selectedGrids.icon.push(actionObj.grid)
          } else {
            state.selectedGrids.component.push(actionObj.grid)
          }
        } else {
          if(actionObj.grid.type === 'icon') {
            state.selectedGrids.icon = state.selectedGrids.icon.filter(v => v.name !== actionObj.grid.name)
          } else {
            state.selectedGrids.component = state.selectedGrids.component.filter(v => v.name !== actionObj.grid.name)
          }
        }
        localStorage.setItem(name.toUpperCase(), JSON.stringify(state.selectedGrids))
      })
    },



  }
})
