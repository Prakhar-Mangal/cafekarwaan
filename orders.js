function showCOrders(){
    axios.get('https://cafekarwaan.herokuapp.com/order/get')
    .then(res=>{
        corders = res.data.data
        str='&nbsp; &nbsp; <b>#</b>&nbsp; &nbsp; <b>order</b>&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; <b>Invoice</b>&nbsp; &nbsp; <b>Date</b><br><br>'
        corders.map((c,i)=>{
            str += `
            &nbsp; &nbsp;${i+1}&nbsp; &nbsp; &nbsp; &nbsp; 
            ${c.orderno}&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal${i+1}">Bill</button></td>&nbsp; &nbsp; 
        ${c.time.split('T')[0]} <br><hr style="color:red">
          
          <div class="modal fade" id="exampleModal${i+1}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title"  id="exampleModalLabel">INVOICE</span> </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" style="color:black;">
              <table class="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Cost</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>`;
              sum = 0;
            c.items.map(i=>{
                sum+=i.item.price*i.quantity;
                str+=`<tr>
                  <th scope="row">${i.item.name}</th>
                  <td>${i.item.price}</td>
                  <td>${i.quantity}</td>
                  <td>${i.item.price*i.quantity}</td>
                </tr>`
            })
                str+=`<tr><td></td><td colspan="2" style="color:yellow;"><b>TOTAL</b></td><td  style="color:yellow;"><b>${sum}</b></td></tr>`

              str+=`</tbody>
            </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
          
          `
        })
        document.getElementById('corders').innerHTML = str
    })
}