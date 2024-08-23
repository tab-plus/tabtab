import { ref, onMounted, onUnmounted } from 'vue';
import throttle from '@/utils/throttle'; // 确保路径正确

export default function useMousePosition() {
    const mouseX = ref(0);
    const mouseY = ref(0);
    const rightClickX = ref(100);
    const rightClickY = ref(100);

    // 节流函数
    const updateMousePosition = throttle((event: MouseEvent) => {
        mouseX.value = event.clientX;
        mouseY.value = event.clientY;
    }, 100);

    const handleRightClick = (event: MouseEvent) => {
        event.preventDefault(); // 防止浏览器默认的上下文菜单
        rightClickX.value = event.clientX;
        rightClickY.value = event.clientY;
    };

    onMounted(() => {
        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('contextmenu', handleRightClick);
    });

    onUnmounted(() => {
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('contextmenu', handleRightClick);
    });

    return { mouseX, mouseY, rightClickX, rightClickY };
}
