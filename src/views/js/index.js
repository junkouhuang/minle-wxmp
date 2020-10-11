function changeTime(e){
    var date = new Date(e),
    Y = date.getFullYear() + '-',
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
    D = date.getDate() + ' ',
    h = date.getHours() + ':',
    m = date.getMinutes() + ':',
    s = date.getSeconds();
   return Y+M+D+h+m+s
}
function caranimation(item,obj){
  let img=document.createElement('img'),body=document.querySelector('body');
  img.setAttribute('src',item.src);
  img.style.width=item.width+'px'
  img.style.height=item.height+'px';
  img.style.left=obj.start.left+'px';


  img.style.top=obj.start.top+'px'
  img.setAttribute('class','add-cart-item')
  body.appendChild(img);
  // 间隔100毫秒后开始动画
  setTimeout(() => {
    img.style.left = obj.end.left + 'px'
    img.style.top = obj.end.top + 'px'
    img.style.transform = 'scale(0.1) rotate(180deg)'
    img.style.opacity = 0
  }, 100)

// 一段时间后删除这个对象
setTimeout(() => {
    document.body.removeChild(img)
  }, 1500)

}
export {
    changeTime,caranimation
}
