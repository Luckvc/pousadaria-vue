const app = Vue.createApp({
    data(){
        return{
            searchText: '',
            page: 'innIndex',
            innList: [],
            inn: new Object(),
            address: new Object(),
            innPaymentMethods: [],
            innPets: false
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

    async mounted(){
        this.listResult = await this.getInnIndex();
    },

    methods:{
        async getInnIndex(){
            let response = await fetch('http://localhost:3000/api/v1/inns');
            let data = await response.json();

            this.innList = []

            data.forEach(item =>{
                var inn = new Object();
                var address = new Object();

                inn.id = item.id;
                inn.name = item.name;
                address.city = item.address.city;
                address.state = item.address.state;

                inn.address = address

                this.innList.push(inn)
            })
        },
        turnShow(){
            this.page = 'innShow';
        },
        async getInnShow(id){
            let response = await fetch(`http://localhost:3000/api/v1/inns/${id}`);
            let data = await response.json();
            
            if (data.score == 0) data.score = 'Sem Avaliações';
            this.inn = data
            this.address = data.address

            data.pets ? this.innPets = "Sim" : this.innPets = "Não"

            if (data.pix) this.innPaymentMethods.push("Pix");
            if (data.cash) this.innPaymentMethods.push("Dinheiro");
            if (data.credit) this.innPaymentMethods.push("Cartão de Crédito");
            if (data.debit) this.innPaymentMethods.push("Cartão de Débito");

            this.page = 'innShow';

        }
    }

})

app.mount('#app');