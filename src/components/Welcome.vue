<template>
        <div class="welcome">
            <h1>creazy</h1>
        </div>
</template>
<script>
export default {
    data(){
        return{
        
        }
    },
    created(){
        if(sessionStorage.getItem('first')!==null){
            this.$router.push('/find');
        }
    },
    mounted(){
        this.ifShowWelcome();
    },
    methods:{
        ifShowWelcome(){
            if(sessionStorage.getItem('first')==null){
                sessionStorage.setItem('first',true);
                setTimeout(() => {
                    this.$router.push('/find');
                }, 3000);
            }
        }
    }
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);

div.welcome{
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(45deg, #FF69B4, #42b983);
}

h1 {
  color: hsla(0, 0%, 0%, .9);
  font: normal 140px Varela Round, sans-serif;
  height: 140px;
  top: 50px;
  left: 0;
  letter-spacing: 5px;
  position: absolute;
  text-align: center;
  text-transform: uppercase;
  width: 100%;
  animation: move linear 2000ms infinite alternate;  
}

@keyframes move {
  0% {
    text-shadow:
      4px -4px 0 hsla(0, 100%, 50%, 1), 
      3px -3px 0 hsla(0, 100%, 50%, 1), 
      2px -2px 0 hsla(0, 100%, 50%, 1), 
      1px -1px 0 hsla(0, 100%, 50%, 1),
      -4px 4px 0 hsla(180, 100%, 50%, 1), 
      -3px 3px 0 hsla(180, 100%, 50%, 1), 
      -2px 2px 0 hsla(180, 100%, 50%, 1), 
      -1px 1px 0 hsla(180, 100%, 50%, 1)
    ;
    filter: blur(0px);
  }
  25% {    
    text-shadow:      
      -4px -4px 0 hsla(180, 100%, 50%, 1), 
      -3px -3px 0 hsla(180, 100%, 50%, 1), 
      -2px -2px 0 hsla(180, 100%, 50%, 1), 
      -1px -1px 0 hsla(180, 100%, 50%, 1),
      4px 4px 0 hsla(0, 100%, 50%, 1), 
      3px 3px 0 hsla(0, 100%, 50%, 1), 
      2px 2px 0 hsla(0, 100%, 50%, 1), 
      1px 1px 0 hsla(0, 100%, 50%, 1)      
    ;
    filter: blur(1px);
  }
  50% {
    text-shadow:
      -4px 4px 0 hsla(0, 100%, 50%, 1), 
      -3px 3px 0 hsla(0, 100%, 50%, 1), 
      -2px 2px 0 hsla(0, 100%, 50%, 1), 
      -1px 1px 0 hsla(0, 100%, 50%, 1),
      4px -4px 0 hsla(180, 100%, 50%, 1), 
      3px -3px 0 hsla(180, 100%, 50%, 1), 
      2px -2px 0 hsla(180, 100%, 50%, 1), 
      1px -1px 0 hsla(180, 100%, 50%, 1)
    ;
    filter: blur(2px);
  }
  75% {
    text-shadow:
      4px 4px 0 hsla(180, 100%, 50%, 1), 
      3px 3px 0 hsla(180, 100%, 50%, 1), 
      2px 2px 0 hsla(180, 100%, 50%, 1), 
      1px 1px 0 hsla(180, 100%, 50%, 1),
      -4px -4px 0 hsla(0, 100%, 50%, 1), 
      -3px -3px 0 hsla(0, 100%, 50%, 1), 
      -2px -2px 0 hsla(0, 100%, 50%, 1), 
      -1px -1px 0 hsla(0, 100%, 50%, 1)      
    ;
    filter: blur(3px);
  }
  100% {
    text-shadow:
      4px -4px 0 hsla(0, 100%, 50%, 1), 
      3px -3px 0 hsla(0, 100%, 50%, 1), 
      2px -2px 0 hsla(0, 100%, 50%, 1), 
      1px -1px 0 hsla(0, 100%, 50%, 1),
      -4px 4px 0 hsla(180, 100%, 50%, 1), 
      -3px 3px 0 hsla(180, 100%, 50%, 1), 
      -2px 2px 0 hsla(180, 100%, 50%, 1), 
      -1px 1px 0 hsla(180, 100%, 50%, 1)
    ;
    filter: blur(5px);
  }  
}
</style>