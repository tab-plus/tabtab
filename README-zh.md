<mark>黄色高亮</mark>

#### 一、SvgIcon 组件 svg 雪碧图全局使用

`<SvgIcon name="osx" style="font-size: 40px"></SvgIcon>`

#### 二、AntdSvg 组件 anticon 图标库封装全局使用 支持[antdesign](https://www.antdv.com/components/icon-cn)的 icon 组件原生参数 rotate、spin、style、twoToneColor

###### ❗️ 注意 name 需要驼峰且首字母大写

`<AntdIcon :name="'HomeOutlined'" :style="'font-size: 40px'" :spin="true"></AntdIcon>`

---

## Vue3 相关知识点补充：

#### 一、`<router-view>'s v-slot`

`<router-view>` 暴露了一个 v-slot API，主要使用 `<transition>` 和 `<keep-alive>` 组件来包裹你的路由组件。

```html
<router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transition || 'fade'" mode="out-in">
    <keep-alive>
      <suspense>
        <template #default>
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </template>
        <template #fallback> Loading... </template>
      </suspense>
    </keep-alive>
  </transition>
</router-view>
```

v-slot 中解构的 Component: VNodes to be passed to a `<component>`'s is prop.

###### ❗️ 注意：Note you should be passing View components' props directly to the `<component>` rather than the `<router-view>`:

```html
<router-view v-slot="{ Component, route }">
  <component :is="Component" view-prop="value" />
</router-view>
```

#### 二、useRoute 和 useRouter

useRoute：返回当前路由地址。相当于在模板中使用 $route。必须在 setup() 中调用
useRouter：返回 router 实例。相当于在模板中使用 $router。必须在 setup() 中调用。

#### 三、`<router-link>`标签

`<router-link>` 组件支持用户在具有路由功能的应用中（点击）导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 `<a>` 标签，可以通过配置 tag 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

`<router-link>` 比起写死的 `<a href="...">` 会好一些，理由如下：

无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，
在 HTML5 history 模式下，router-link 会拦截点击事件，让浏览器不在重新加载页面。
当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写（基路径）了。

#### 四、setup和生命周期钩子的关系
按照官方文档的说法：
1、由于在执行setup函数时候，还没有执行created生命周期方法，所以在setup函数中，是无法使用data和methods。
2、由于我们不能在setup函数中使用data和methods,所以VUE为了避免我们错误的使用,它直接将setup函数中this修改成了undefined。
3、setup函数只能是同步的不能是异步的

这里补充一下关键的点，比如我们在setup中的某一个return出来的值的结果依赖于Vue生命周期钩子中的运行函数，那么这个值又可能就会获取不到。
原因是你在setup中计算这个结果，但生命周期钩子中的东西却还没有执行，你很有可能获取到一个undefined

## Ts 知识点补充：

#### 一、const 断言

`const x = { text: "hello" } as const;`
TypeScript 3.4 引入了一个名为 const 断言的字面值的新构造。它的语法是一个类型断言，用 const 代替类型名称（例如 123 as const）断言构造新的文字表达式时，我们可以向语言发出以下信号：
该表达式中的字面类型不应被扩展（例如：不能从“hello”转换为字符串）

例子：CountActions 是这两个接口的联合。

```typescript
const setCount = (n: number) => {
  return <const>{
    type: "SET_COUNT",
    payload: n,
  };
};

const resetCount = () => {
  return <const>{
    type: "RESET_COUNT",
  };
};

type CountActions = ReturnType<typeof setCount> | ReturnType<typeof resetCount>;
```

我们从 action creator 函数 setCount 和 resetCount 的返回类型中推断出一个很好的 action 联合。

#### 二、类型断言

手动指定一个值的类型
语法： `值 as 类型` 或 `<类型>值`

1、类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误

```typescript
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}

const tom: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function`
```

2、将一个父类断言为更加具体的子类
```typescript
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true;
  }
  return false;
}
```

3、将任何一个类型断言为 any
一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。

#### 三、keyof操作符
keyof操作符：是将一个类型映射为它所有成员名称的联合类型。
```typescript
interface Person {
  name: string;
  age: number;
  gender: string;
}
type P = keyof Person; // "name" | "age" | "gender"

// 我们可以看到，keyof将Person这个对象类型映射成了一个联合类型（当然它也可以映射一个function，而且这个function会被自动执行）
// 因此我们可以更方便的操作这个联合类型
```

也可以写的复杂点用泛型继承/扩展类型
```typescript
class Student {
  constructor(private info: Person) {}

  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key];
  }
}

// T是泛型，通过keyof得到了Person的成员名的联合类型，即"name" | "age" | "gender"
// 这样就实现了限制key值的输入，这时候key只能输入"name" | "age" | "gender"
// 而也不会出现返回结果为undefined了
```

#### 四、typeof操作符
typeof操作符: 在编译时获取类型
```typescript
interface Person {
    name: string,
    age: number,
}

let person: Person = { name: 'tao', age: 18 }

//两者一样
type p1 = typeof person  
type p2 = Person
```

#### 五、interface来定义函数的形状
```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}
```
采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
##### 扩展泛型接口
也可以使用含有泛型的接口来定义函数的形状：
```typescript
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

#### 六、关于extends关键字在type中
```typescript
// 示例2
interface A1 {
  name: string
}

interface A2 {
  name: string
  age: number
}
// A的类型为string
type A = A2 extends A1 ? string : number

const a: A = 'this is string'
// A1，A2两个接口，满足A2的接口一定可以满足A1，所以条件为真，A的类型取string
```
*如果extends前面的类型能够赋值给extends后面的类型，那么表达式判断为真，否则为假*
*或者说如果extends前面包含的类型是extends后面包含的类型的‘子集’*

延伸：
```typescript
type A1 = 'x' extends 'x' ? string : number; // string
type A2 = 'x' | 'y' extends 'x' ? string : number; // number

type P<T> = T extends 'x' ? string : number;
type A3 = P<'x' | 'y'>  // A3的类型是 string | number

// A1和A3为什么不同？

```
*对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。*
`P<'x' | 'y'> => P<'x'> | P<'y'>`
'x'代入得到
`'x' extends 'x' ? string : number => string`
'y'代入得到
`'y' extends 'x' ? string : number => number`
然后将每一项代入得到的结果联合起来，得到string | number
总之，满足两个要点即可适用分配律：第一，参数是泛型类型，第二，代入参数的是联合类型

#### 七、关于extends关键字在泛型约束中
```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}
```
现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
`loggingIdentity(3);  // Error, number doesn't have a .length property`

我们需要传入符合约束类型的值，必须包含必须的属性：
`loggingIdentity({length: 10, value: 3});`

#### 八、TS高级类型
> 1、❤️Exclude类型
```typescript
type Exclude<T, U> = T extends U ? never : T
// 左右两边是相等的，也是Exclude定义的源码。
```
Exclude作用是从第一个联合类型参数中，将第二个联合类型中出现的联合项全部排除，只留下没有出现过的参数。
例子：`type A = Exclude<'key1' | 'key2', 'key2'> // 'key1'`

剖析一下Exclude的定义，来尝试将实例拆开看看发生了什么：
```typescript
type A = `Exclude<'key1' | 'key2', 'key2'>`

// 等价于

type A = `Exclude<'key1', 'key2'>` | `Exclude<'key2', 'key2'>`

// =>

type A = ('key1' extends 'key2' ? never : 'key1') | ('key2' extends 'key2' ? never : 'key2')

// =>

// never是所有类型的子类型
type A = 'key1' | never = 'key1'
```

> 2、❤️Pick类型
```typescript
// 高级类型Pick的定义
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
Pick的意思是，从接口T中，将联合类型K中涉及到的项挑选出来，形成一个新的接口，其中K extends keyof T则是用来约束K的条件，即，传入K的参数必须使得这个条件为真，否则ts就会报错，也就是说，K的联合项必须来自接口T的属性。

> 3、❤️Partial类型
```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<User>
```
把接口的类型转换成可选项

> 4、❤️Omit类型
```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```
Omit 会创建一个省略 K(Todo) 中字段的 T('description' | 'title') 对象。


## TS错误修正笔记
#### 一、类型“EventTarget"上不存在属性“value”
```Vue
<input type="text" class="search" :value="searchWord" @input="searchWord = $event.target.value" style="font-size: 20px" @keyup.enter="enterSubmit" />

//类型“EventTarget"上不存在属性“value”
```

修正：
`(event.target as HTMLInputElement).value`
这应该通过让TS知道这event.target是一个HTMLInputElement本身具有的错误来摆脱错误value.在指定之前,TS可能只知道event单独是一个HTMLInputElement,因此根据TS,键入的target是一些随机映射的值,可以是任何东西
