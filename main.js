const app = Vue.createApp({
    data(){
        return{
            innList: []
        }
    },
    methods:{
        async getData(){
            let response = await fetch('http://localhost:3000/api/v1/inns');
            let data = await response.json();
            console.log(data);
            data.forEach(item =>{
                var inn = new Object();

                inn.name = item.name;
            })
        }
    }

})

app.mount('#app');