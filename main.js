const app = Vue.createApp({
    data(){
        return{
            searchText: '',
            innList: []
        }
    },

    computed:{
        listResult(){
            if (this.searchText){
                return this.innList.filter(inn => {
                    return inn.name.toLowerCase().includes(this.searchText.toLowerCase());
                });
            }else{
                return this.innList
            }
        }
    },


    methods:{
        async getInnIndex(){
            let response = await fetch('http://localhost:3000/api/v1/inns');
            let data = await response.json();
            console.log(data);

            this.innList = []

            data.forEach(item =>{
                var inn = new Object();
                var address = new Object();

                inn.id = item.id;
                inn.name = item.name;
                inn.email = item.email;
                inn.phone = item.phone;
                inn.pets = item.pets;
                inn.policies = item.policies;
                inn.check_in_time = item.checkInTime;
                inn.check_out_time = item.checkOutTime;
                inn.pix = item.pix;
                inn.cash = item.cash;
                inn.credit = item.credit;
                inn.debit = item.debit;

                address.street = item.address.street;
                address.number = item.address.number;
                address.neighborhood = item.address.neighborhood;
                address.city = item.address.city;
                address.state = item.address.state;
                address.cep = item.address.cep;

                inn.address = address

                this.innList.push(inn)
            })
            console.log(this.innList);
        }
    }

})

app.mount('#app');