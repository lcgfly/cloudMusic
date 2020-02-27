export function Playcount(val){
    if(val<100000) return
    if(Math.floor(val/10000)<10000) return Math.floor(val/10000)+'万'
    return (val/100000000).toFixed(1)+'亿'
}