fakeData()

let view = {
    el: '#app',
    template: `
        <div>
          书名：《__name__》
          数量：<span id="number">__number__</span>
        </div>
        <div>
            <button id="addOne">加1</button>
            <button id="minusOne">减1</button>
            <button id="reset">归零</button>
        </div>
    `,
    render(data){
        let html = this.template.replace('__name__', data.name)
            .replace('__number__', data.number)
        $(this.el).html(html)
    }
}
let model = {
    data: {
        name: '',
        number: 0,
        id: '',
    },
    fetch(id){
        return axios.get(`/books/${id}`).then((response)=>{
            this.data = response.data
            return response
        })
    },
    update(data){
        let id = this.data.id
        return axios.put(`/books/${id}`, data).then((response)=>{
            this.data = response.data
            return response
        })
    },
}

let controller = {
    init(view, model){
        this.veiw = view
        this.model = model
        this.view.render(this.model.data)
        this.bindEvents()
        this.model.fetch(1).then(()=>{
            this.view.render(this.model.data)
        })
    },
    addOne(){
        var oldNumber = $('#number').text() //string
        var newNumber = oldNumber - 0 + 1
        model.update({
            number: newNumber
        }).then(()=>{
            console.log(0)
            this.view.render(this.model.data)
        })
    },
    minusOne(){
        var oldNumber = $('#number').text() 
        var newNumber = oldNumber - 0 - 1
        model.update({
            number: newNumber
        }).then(()=>{
            console.log(1)
            this.view.render(this.model.data)
        })
    },
    reset(){
        model.update({
            number: 0
        }).then(()=>{
            console.log(2)
            this.view.render(this.model.data)
        })
    },
    bindEvents(){
        $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
        $(this.view.el).on('click', '#minusOne', this.minusOne.bind(this))
        $(this.view.el).on('click', '#reset', this.reset.bind(this))
    },
}
controller.init(view, model)



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
        }else if(url === '/books/2' && method === 'put'){
            data = JSON.parse(data)
            Object.assign(book, data)
            response.data = book
        }
        return response
    })
}