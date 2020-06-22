// for (let i = 1; i < 32; i++) {
//   if (i < 10) {
//     console.log(`0${i}`)
//   } else {
//     console.log(i)
//   }
// }

for (let i = 1; i < 32; i++) {
  // padStart(a, b)
  // 头部补位，a指定位数，低于此位数，需要进行补位。b是补位时使用的字符串
  console.log(i.toString().padStart(2, '0'));
}
for (let i = 1; i < 30020; i += 1000) {
  console.log(i.toString().padEnd(5, '*#'));
}
