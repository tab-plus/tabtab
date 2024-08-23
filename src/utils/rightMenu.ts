// const clickedItem = reactive({
//     x: '0',
//     y: '0',
//     el: ref(),
//     id: '0',
// })

// const isContextMenuOpen = ref<boolean>(false); //是否显示右键菜单
// const onclickItemClass = ref<string>(''); //右键的item
// // 右键菜单创建一个弹窗容器
// const handleContextMenu = (event: MouseEvent, gridElement?: HTMLElement) => {
//     console.log(event, "event")
//     console.log(gridElement, "gridElement")
//     const click = event.currentTarget as HTMLElement; // 获取点击的 DOM 元素（小部件的 DOM 元素）
//     // 可以进一步处理点击的小部件，例如获取其 data-gs-id
//     const gsX = click.getAttribute('gs-x')?.toString() || '';
//     const gsY = click.getAttribute('gs-y')?.toString() || '';
//     const gsId = click.getAttribute('gs-id')?.toString() || '';
//     // clickedItem.value = gridElement as HTMLElement;
//     // console.log(clickedItem.value)
//     console.log('点击了具有 ID ' + gsX, gsY + ' 的小部件。');
//     clickedItem.el = gridElement
//     clickedItem.x = gsX
//     clickedItem.y = gsY
//     clickedItem.id = gsId
//     event.preventDefault(); // 阻止默认的右键菜单
//     event.stopPropagation(); // 阻止事件冒泡
//     console.log(isContextMenuOpen.value, "isContextMenuOpen");
//     const posX = event.clientX; // 获取鼠标点击的水平位置
//     const posY = event.clientY; // 获取鼠标点击的垂直位置
//     if (isContextMenuOpen.value) {
//         // 如果已经有弹窗打开，则关闭现有弹窗
//         closePopup();
//         // 如果有点击其他item则打开其他item的props
//         if (onclickItemClass.value) {
//             openContextMenu(posX, posY);
//         }
//     } else {
//         // 否则打开新弹窗
//         openContextMenu(posX, posY);
//     }

//     // 按下esc关闭弹窗
//     const closePopupOnEsc = (e: KeyboardEvent) => {
//         if (e.key === 'Escape') {
//             closePopup();
//         }
//     };
//     // 监听点击页面其他地方或按下 ESC 键，关闭弹窗
//     document.addEventListener('click', closePopup);
//     document.addEventListener('keyup', closePopupOnEsc);
//     document.addEventListener('contextmenu', closePopup);
// }

// // 点击其他地方或按下 ESC 键关闭弹窗
// const closePopup = () => {
//     isContextMenuOpen.value = false; // 更新状态
//     const popup = document.querySelector('.popup');
//     if (popup) {
//         popup.remove(); // 移除下拉列表
//     }
// };

// // 打开icon右键菜单
// const openContextMenu = (posX: number, posY: number) => {
//     isContextMenuOpen.value = true
//     // 在这里打开弹窗的逻辑，可以根据 posX 和 posY 定位弹窗
//     console.log('打开右键菜单在', posX, posY);
//     // 创建一个弹窗元素
//     const container = document.createElement('div');
//     container.className = 'popup';
//     container.style.position = 'absolute';
//     container.style.left = posX + 'px';
//     container.style.top = posY + 'px';

//     const box1 = createBox('1x1');
//     // const box2 = createBox('1x2');
//     const box3 = createBox('4x4');
//     const box4 = createBox('删除');

//     container.appendChild(box1);
//     // container.appendChild(box2);
//     container.appendChild(box3);
//     container.appendChild(box4);
//     // 添加弹窗到页面中
//     // 添加弹窗到页面中
//     document.body.appendChild(container);
//     // 添加过渡效果的触发
//     setTimeout(() => {
//         container.classList.add('popup-open');
//     }, 10);
// }


// // 创建一个右键弹窗元素里的子元素
// function createBox(content: string) {
//     const box = document.createElement('div');
//     box.className = 'popup-box';
//     box.textContent = content;
//     box.addEventListener('click', (event) => {
//         if (content == "1x1") {
//             console.log(clickedItem.el, "clickedItem.value");
//             // 开始递归检查
//             if (clickedItem.el) {
//                 let itemName = checkForItem(clickedItem.el);
//                 console.log(itemName, "bool")
//                 if (itemName == 'date') {
//                     clickedItem!.el.remove();
//                     changeItem.changeDate1(dayOfWeekText, clickedItem, grid)
//                     // 遍历给所有加上方法
//                     getAllElToMenu();
//                 } else if (itemName == 'memo') {
//                     clickedItem!.el.remove();
//                     changeItem.changeMemo1(clickedItem, grid)
//                     // 遍历给所有加上方法
//                     getAllElToMenu();
//                 } else if (itemName == 'hot') {
//                     clickedItem!.el.remove();
//                     changeItem.changeHot1(clickedItem, grid)
//                     // 遍历给所有加上方法
//                     getAllElToMenu();
//                 } else if (itemName == 'weather') {
//                     clickedItem!.el.remove();
//                     changeItem.changeWeather1(clickedItem, grid)
//                     // 遍历给所有加上方法
//                     getAllElToMenu();
//                 } else {
//                     message.error("icon图标不能改变大小")
//                 }
//             }

//         } else if (content == "4x4") {

//             if (clickedItem.el) {
//                 let itemName = checkForItem(clickedItem.el);
//                 console.log(itemName, "bool")
//                 if (itemName == 'date') {
//                     clickedItem!.el.remove();
//                     changeItem.changeDate4(dayOfWeekText, clickedItem, grid)
//                     // 遍历给所有加上方法
//                     getAllElToMenu();
//                 } else if (itemName == 'memo') {
//                     clickedItem!.el.remove();
//                     changeItem.changeMemo4(memoMenuList.value, clickedItem, grid)
//                     getAllElToMenu();
//                 } else if (itemName == 'hot') {
//                     clickedItem!.el.remove();
//                     changeItem.changeHot4(clickedItem, grid, baiduHotList, zhihuHotList, weiboHotList)
//                     // 遍历给所有加上方法
//                     getAllElToMenu();
//                 } else if (itemName == 'weather') {
//                     clickedItem!.el.remove();
//                     changeItem.changeWeather4(clickedItem, grid)
//                     // 遍历给所有加上方法
//                     getAllElToMenu();
//                 } else {
//                     message.error("icon图标不能改变大小")
//                 }
//             }

//             // grid.update(clickedItem.el, { w: 2, h: 4 });
//         } else if (content == "删除") {
//             console.log(clickedItem!.el)
//             clickedItem!.el.remove();
//             delete_icon_ByUserId(clickedItem.id).then(() => {
//                 message.success('删除成功');
//             })
//         }
//     });
//     return box;
// }