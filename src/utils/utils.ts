/**
 * 将数值转换为粗略数
 * 1. 以 k 为单位 1k = 1000
 * 2. < 1k 显示为 {count}
 * 3. > 1k 显示为 {count/1000}k
 * 4. > 10k 显示为 10K+
 * @param count 
 */
const formateNumberCount = (count: number) => {
    if (count < 1000) {
        return count;
    } else if (count / 1000 < 10) {
        const num = count / 1000;
        const numStr = num.toFixed(1);
        return `${ parseFloat(numStr) }k`;
    } else {
        return '10k+'
    }
}

export {
    formateNumberCount
}
