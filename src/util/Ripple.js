export function ripple(){
    const bd = document.getElementsByTagName('body')[0]
	bd.addEventListener('touchstart',ripple)
	function ripple(e){
		let target = e.target
		while(target.nodeName.toLowerCase()!='body'){
			if(target.classList.contains('ripple')){
				let touch = e.targetTouches[0]
				let spaceX = Math.round(touch.clientX) - target.getBoundingClientRect().left
				let spaceY = Math.round(touch.clientY) - target.getBoundingClientRect().top
				let ele = document.createElement('div')
				ele.classList.add('r')
				ele.style.left = spaceX + 'px'
				ele.style.top = spaceY + 'px'
				target.appendChild(ele)
				ele.addEventListener('animationend',function(){
					return ele.remove()
				})
				break;
			}
			target = target.parentNode
		}
	}
}