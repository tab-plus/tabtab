//globalProperties挂载的类型扩展
export {}
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $message: any
  }
}
