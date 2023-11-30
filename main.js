const app = Vue.createApp({
    data(){
        return{
            searchText: '',
            page: 'innIndex',

            innList: [],
            inn: new Object(),
            address: new Object(),
            innPaymentMethods: [],
            innPets: false,

            room: new Object(),
            roomAccessible: false,
            roomList: [],
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

            this.getRooms(id)

            this.page = 'innShow';
        },
        async getRooms(id){
            let response = await fetch(`http://localhost:3000/api/v1/inns/${id}/rooms`);
            let data = await response.json();

            console.log(data)
            data.forEach(item =>{
                var room = new Object();

                room.id = item.id;
                room.number = item.number;
                room.capacity = item.capacity;
                room.description = item.description;
                room.dimension = item.dimension;
                room.bathrooms = item.bathrooms;
                room.double_beds = item.double_beds;
                room.single_beds = item.single_beds;

                item.accessible ? room.accessible = "Sim" : room.accessible = "Não";

                room.amenities = [];
                if (item.kitchen) room.amenities.push("Cozinha");
                if (item.balcony) room.amenities.push("Varanda");
                if (item.air) room.amenities.push("Ar Condicionado");
                if (item.tv) room.amenities.push("TV");
                if (item.wardrobe) room.amenities.push("Guarda-Roupas");
                if (item.safe) room.amenities.push("Cofre"); 

                this.roomList.push(room)
            }) 
        },
    }

})

app.mount('#app');