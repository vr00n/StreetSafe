Vue.component('item-well', {
    template: `
        <div class="col-xs-2 well">
            <img class="img-responsive img-thumbnail" v-bind:src="item.image">
            <h5>{{item.name}}</h5>
            <p>Cost: \${{item.munnies}}</p>
            <p>Weigth: {{item.weight}}LBS</p>
            <button v-if="yes" v-on:click="add" class="btn btn-primary">Add</button>
            <button v-if="yes" v-on:click="remove" class="btn btn-danger">Remove</button>
        </div>
    `,
    props : ['item', 'yes'],
    methods : { 
        add : function() {
            this.$emit('add');
        },
        remove : function() {
            this.$emit('remove');
        }
    }
})
mainAppVM = new Vue({
    el: '#app',
    data: {
        vehicleSelected: '',
        weight: 500,
        money: 100,
        itemsInV: [],
        canPurchase: true,
        canRemove: false,
        nameOfClick: '',
        items: [
            {
                name: 'Samsung 65"LED Smart 4K Ultra HDTV',
                munnies: 16,
                weight: 90,
                image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5773/5773800_sd.jpg',
                indexNum: 0
            },
            {
                name: 'Queen Koil Mattress set',
                munnies: 10,
                weight: 8,
                image: "http://generalplatform.blob.core.windows.net/wwwthemattressfactoryinccom/multimedia/images/brand-collection/hero/large/bc80d575-0223-4ab4-a563-bf65bf412a98.jpg",
                indexNum: 1
            },
                {
                name: 'Grill Master 5000',
                munnies: 4,
                weight: 95,
                image: 'http://staceygustafson.com/wp-content/uploads/2013/06/Hemi-Grill.jpg',
                indexNum: 2
            },
            {
                name: 'Skittles',
                munnies: 25,
                weight: 80,
                image: 'https://smedia.webcollage.net/rwvfp/wc/cp/21469538/module/wrigley/_cp/products/1452027131596/tab-56242735-f441-432c-aad5-c8fe7c421f32/resource-ef9c6f55-91a6-4901-86a2-bf9bf684945d.jpg',
                indexNum: 3
            },
            {
                name: '1969 Stingray Corvette',
                munnies: 45,
                weight: 3,
                image: 'https://s-media-cache-ak0.pinimg.com/originals/16/66/08/166608387b644988b02b1da70dcfed12.jpg',
                indexNum: 4
            },
            {
                name: 'Silk Underwear',
                munnies: 16,
                weight: 70,
                image: 'http://www.royalsilkusa.com/images/silk-boxers-sky-blue-stripes.jpg',
                indexNum : 5
            },
            {
                name: 'Confortable Concrete Shoes',
                munnies: 0.5,
                weight: 0.5,
                image: 'https://www.concretedecor.net/CD/assets/Image/archives/CD1505/1505i_Page_26_Image_0003_600.jpg',
                indexNum: 6
            },
            {
                name: 'Dwayne Johnson THE ROCK!',
                munnies: 1.75,
                weight: 8.92,
                image: 'http://www.southpawer.com/wp-content/uploads/2015/07/Dwayne-Johnson-eminem-gym-songs.jpg',
                indexNum: 7
            },
        ],

    },
    computed: {
        
    },
    methods: {
        addSomething: function(item) {
            if (this.money > 0 && this.weight > 0) {
                this.money = parseInt(this.money) - this.items[item].munnies;
                this.weight = parseInt(this.weight) - this.items[item].weight;
                this.itemsInV.push(this.items[item].name); 
                this.canRemove = true;
            } else {
                this.canPurchase = false;
            }
        },
        removeSomething: function(item) {
            for (var i = 0; i < this.itemsInV.length; i++) {
                if (this.itemsInV[i] === this.items[item].name) {
                    this.itemsInV.splice(i, 1);
                    this.money = parseInt(this.money) + this.items[item].munnies;
                    this.weight = parseInt(this.weight) + this.items[item].weight;
                    this.canPurchase = true;
                    return;
                } else {
                    this.canRemove = false;
                }
            }
        },
    },
    created: function() {
        var thisVm = this;
        $.get('/vehicle', function(vehicle) {
            if (vehicle) {
                thisVm.money = vehicle.money;
                thisVm.weight = vehicle.weight;
                thisVm.itemsInV = vehicle.itemsInV;
                console.log(vehicle);
                console.log("you have a vehicle");
            } else {
                console.log("you don't have a vehicle");
                $.post('/vehicle', {
                    weight: thisVm.weight,
                    money: thisVm.money,
                    itemsInV: thisVm.itemsInV
                }, function(success) {
                    console.log('success');
                });
            }
        });

        // $(window).on("beforeunload", function() { 
        //     console.log("Working!");
        // });
    },
    destroyed:  function() {
        console.log('destroyed worked!');

    }
});
