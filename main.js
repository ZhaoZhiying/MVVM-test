function Model(options){
    this.data = options.data
    this.resource = options.resource
}
Model.prototype.fetch = function(id){
    console.log(`/${this.resource}s/${id}`)
    return axios.get(`/${this.resource}s/${id}`).then((response)=>{
        this.data = response.data
        return response
    })
}
Model.prototype.update = function(data){
    let id = this.data.id
    return axios.put(`/${this.resource}s/${id}`, data).then((response)=>{
        this.data = response.data
        return response
    })
}

/* 下面是实例 */
let model = new Model({
    data: {
        name: '',
        number: 0,
        id: '',
    },
    resource: 'book'
})
let view = new Vue({
    el: '#app',
    data: {
        book: {
            name: '',
            number: 0,
            id: '',
        },
        n: 1
    },
    
    template: `
        <div>
          书名：《{{book.name}}》
          数量：<span id="number">{{book.number}}</span>
        </div>
        <div>
            <input v-model="n">
            n 的值是 {{n}}
        </div>
        <div>
            <button v-on:click="addOne">加n</button>
            <button v-on:click="minusOne">减n</button>
            <button v-on:click="reset">归零</button>
        </div>
    `,
    created(){
        model.fetch(1).then(()=>{
            this.book = model.data
        })
    },
    methods: {
        addOne(){
            model.update({
                number: this.book.number + (this.n - 0)
            }).then(()=>{
                this.view.render(this.model.data)
            })
        },
        minusOne(){
            model.update({
                number: this.book.number - (this.n - 0)
            }).then(()=>{
                this.view.render(this.model.data)
            })
        },
        reset(){
            model.update({
                number: 0
            }).then(()=>{
                this.view.render(this.model.data)
            })
        },
    }
})


function fakeData(){
    let book = {
        name: '三毛流浪记',
        number: 2,
        id: 1
    }
    axios.interceptors.response.use(function (response){
        let {config: {method, url, data}} = response //等于下面两行
        //let config = response.config
        //let {method, url, data} = config //data 是请求的 data
        if(url === '/books/1' && method === 'get'){
            response.data = book
        }else if(url === '/books/1' && method === 'put'){
            data = JSON.parse(data)
            Object.assign(book, data)
            response.data = book
        }
        return response
    })
}