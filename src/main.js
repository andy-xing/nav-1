const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.lastLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
window.hashMap= xObject || [{logo:'A',url:'https://www.acfun.cn'},
{logo:'B',url:'https://www.bilibili.com'}
]
const simplifyUrl =(url) =>{
  return url.replace('https://','')
.replace('http://','')
.replace('www.','')
.replace(/\/.*/,'')}//删除/后面的内容
const render=()=>{
  $siteList.find('li:not(.lastLi)').remove()/*找到不是最后一个的li */
  hashMap.forEach((node,index)=>{
    const $li=$(`<li>
      <div class="site">
        <div class="logo">${simplifyUrl(node.url)[0].toUpperCase()}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-guanbi"></use>
          </svg>
        </div>
      </div>
  </li>`).insertBefore($lastLi)
  $li.on('click',()=>{
    window.open(node.url)
  })
  $li.on('click','.close',(e)=>{
    e.stopPropagation()//阻止冒泡
    hashMap.splice(index,1)
    render()
  })
  })
}

render()

$('.addButton')
.on('click',()=>{
  let url = window.prompt('请问你要添加的网址是？')
  if(url.indexOf('http')!==0){
    url = 'https://'+ url;
  }
 
  hashMap.push({
    logo:simplifyUrl(url)[0].toUpperCase(),
    logoType:'text',
    url:url});
    render();
})
window.onbeforeunload =()=>{
  const string =JSON.stringify(hashMap)
  localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{
  const {key} = e
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].logo.toLowerCase()=== key){
      window.open(hashMap[i].url)
    }
  }
})