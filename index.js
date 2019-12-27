const getStorage = (item) => (JSON.parse(localStorage.getItem(item)))
const setStorage = (item, data) => (localStorage.setItem(item, JSON.stringify(data)))
const removeStorage = (item) => (localStorage.removeItem(item))



function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();
  
    return (a < b) ? -1 : (a > b) ? 1 : 0;
  }
  orders = [{
    ono : 1,
    cart : []
}]

tprice = 0;
orderno = 2;
order = [1]

if(getStorage('orders')){
    orders = getStorage('orders')
    orderno = getStorage('orderno')
    order = getStorage('order')     
}

function showItems(ono,n){
    if(n != 2){
        ono = order[0]
    
    }
    axios.get('https://cafekarwaan.herokuapp.com/item/get')
    .then(res=>{
        document.getElementById('close-sidebar').click()
        item = res.data.data
          item.sort(function(a, b) {
            return compareStrings(a.category.name, b.category.name);
          })
          console.log(item)
          n = 1;
          str='';
    for(i=0; i<item.length;i++){
        if(n == 1){
        // console.log('Category-->'+item[i].category.name)
        str += `<div class="card">
        <div class="card-header" id="headingOne">
        <h2 class="mb-0">
            <section class="story-area bg-seller color-white pos-relative" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapseOne">
                    <div class="pos-bottom triangle-up"></div>
                    <div class="pos-top triangle-bottom"></div>
                    <div class="container">
                            <h4 class="font-30 font-sm-20  center-text mb-25"><b>${item[i].category.name}</b></h4>
                    </div><!-- container -->
            </section>
          
        </h2>
      </div>
      <div id="collapse${i}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <section class="bg-lite-blue">
                        <div class="container">
                                <div class="row">`
        }
        str+= `<div class="col-md-6">
        <div class="sided-90x mb-30">
                <!-- <div class="s-left"><img class="br-3" src="images/menu-4-120x120.jpg" alt="Menu Image"></div>s-left--> 
                
                        <h4 class="mb-10"><b>${item[i].name}</b></h4>
                        <div><h4><b class="color-primary float-left">₹${item[i].price}</b></h4><b class="color-primary float-right"><button type="button"  onclick="addToCart('${item[i]._id}','${item[i].name}',${item[i].price},${ono})" class="btn btn-danger">Add to Cart</button></b>
                        <!-- <p class="pr-70">Proin dictum viverra varius. Etiam vulputate libero dui, at pretium elit elementum quis. </p> --></div>
                
        </div>
        </div>`
        if(i != item.length-1){
        if(item[i].category.name != item[i+1].category.name){
            n = 1;
            str += `</div>
            </div>
    </section>
</div>
</div>`
        }
        else{
            n=0;
        }
    }
    }
    document.getElementById('accordionExample').innerHTML = str;
    //document.getElementById('onumber').innerHTML = order[0]

    orders.map(o=>{
        if(o.ono == ono){
           
      document.getElementById('cartValue').innerHTML = o.cart.length
      document.getElementById('orderValue').innerHTML = order.length
    showOrders()
    showCartItems(o.ono)
        }
    })

     })
}







Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function generateOrder(){
    alert('New Order created Successfully, Add items now 👯‍♀🕺😁')
    order.push(orderno)
    orders.push({
        ono : orderno,
        cart : []
    })
    console.log(order)
    document.getElementById('orderValue').innerHTML = order.length
    showItems(orderno)
    showCartItems(orderno)
    orderno++;
    setStorage('orders',orders)
    setStorage('orderno',orderno)
    setStorage('order',order)
}


function totalPrice(ono){
    orders.map(o=>{
        if(o.ono == ono){
            tprice = 0;
        o.cart.map(c=>(
            tprice+=c.price*c.quantity
        ))
        }
    })
    
    
   
}

function showOrders(){
    str = ''
    orders.map(o=>{
        str+=`<tr>
        <td>${o.ono}</td>
        <td><button type="button" class="btn btn-success" onclick='editOrder(${o.ono})' data-dismiss="modal">Edit</button></td>
        <td><button type="button" class="btn btn-success" onclick='doneOrder(${o.ono})' data-dismiss="modal">Done</button>
        </td>
        </tr>`
    })
    document.getElementById('orders').innerHTML = str

}

function editOrder(ono){
    showItems(ono,2)
    document.getElementById('close').click();
}

function showCartItems(ono){
    orders.map(o=>{
        if(o.ono == ono){
            totalPrice(ono)
        str = ''
        o.cart.map((c,i)=>(
        str+=`<tr>
        <th scope="row">${i+1}</th>
            <td>${c.name}</td>
            <td>${c.price}</td>
            <td><button onclick=sub('${c.id}',${ono})><i class="fa  fa-minus aria-hidden="true"></i></button>&nbsp&nbsp<span class="badge badge-pill badge-primary" ><b>${c.quantity}<b></span>&nbsp&nbsp<button onclick=add('${c.id}',${ono})> <i class="fa  fa-plus aria-hidden="true"></i></button>&nbsp&nbsp<button onclick=del('${c.id}',${ono})><i class="fas fa-trash-alt" style="color:red;"></i></button></td>
        </tr>`
        ))
        str += `<tr>
        <td></td>
        <td><b>Total: </b></td>
        <td id="tprice">...</td>
        <td></td>
    </tr>`
        document.getElementById('cartItems').innerHTML = str
        document.getElementById('tprice').innerHTML = tprice
        document.getElementById('onumber').innerHTML = ono
        }
        
    })
    
}

function add(id,ono){
    orders.map(o=>{
        if(o.ono == ono){
            o.cart.map(c=>{
                if(c.id == id){
                    c.quantity++;
                }
            })
            showCartItems(ono)
        }
    })
    setStorage('orders',orders)
    setStorage('orderno',orderno)
    setStorage('order',order)
    
}

function sub(id,ono){
    orders.map(o=>{
        if(o.ono == ono){
            o.cart.map(c=>{
                if(c.id == id){
                    if(c.quantity<=1){
                        alert('1 tho lo')
                    }
                    else{
                    c.quantity--;
                    }
                }
            })
            showCartItems(ono)

        }
    })
    setStorage('orders',orders)
    setStorage('orderno',orderno)
    setStorage('order',order)
   
}

function del(id,ono){
    orders.map(o=>{
        if(o.ono == ono){
            
            o.cart.map(c=>{
                if(c.id == id){
                o.cart.remove(c)

                }
            })
            showCartItems(ono)
            updateCartValue(ono)
        }
    })
    setStorage('orders',orders)
    setStorage('orderno',orderno)
    setStorage('order',order)
}

function updateCartValue(ono){
    orders.map(o=>{
        if(o.ono == ono){
            document.getElementById('cartValue').innerHTML = o.cart.length
        }
    })
    
    showCartItems(ono);
}

function addToCart(id,name,price,ono){
    n=1;
    k=1;
    orders.map(o=>{
        if(o.ono == ono){
            if(o.cart.length==0){
                o.cart.push({
                    id  : id,
                    name : name,
                    price : price,
                    quantity : 1
                })     
            }
            else{
            o.cart.map(c=>{
                if(c.id == id){
                    k=0;
                    c.quantity++;
                }
                else{
                    n=0;
                }
            })
            if(n==0&&k==1){
                o.cart.push({
                    id  : id,
                    name : name,
                    price : price,
                    quantity : 1
                })
                n=1;    
            }
        }
        updateCartValue(ono)
        
        }
    })

    setStorage('orders',orders)
    setStorage('orderno',orderno)
    setStorage('order',order)
    
}

function doneOrder(orderno){
    var item 
    orders.map(o=>{
        if(o.ono == orderno){
            item = o.cart
            alert(o.ono)
        }
    })
   

    axios.post('https://cafekarwaan.herokuapp.com/order/save',{
        orderno : orderno,
        items : item
    })
    .then(res=>{
        console.log(res)
        delOrder(orderno)

        
    })
    .catch(e=>{
        console.log(e)
    })

}

function delOrder(ono){
    orders.map(o=>{
        if(o.ono == ono){   
                orders.remove(o)
                order.remove(ono)
                alert('order successfully saved')
        }
            })
            showOrders(ono)
            updateCartValue(ono)
        
        document.getElementById('orderValue').innerHTML = order.length
    setStorage('orders',orders)
    setStorage('orderno',orderno)
    setStorage('order',order)
    if(order.length == 0){
        alert('last order')
        generateOrder();
    }
}















function chk(){
    document.getElementById('accordionExample').innerHTML = "Hello World"
    // a = [1,1,2,2,3,3,3]
    // n = 1;
    // for(i=0; i<a.length;i++){
    //     if(n == 1){
    //     console.log('Category')
    //     }
    //     alert(a[i])
    //     if(a[i] != a[i+1]){
    //         n = 1;
    //     }
    //     else{
    //         n=0;
    //     }
    // }
}