Array.prototype.inArray = function(element) { 
    for(var i=0; i < this.length; i++) { 
        if(element == this[i]) return true; 
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element) { 
    if (!this.inArray(element)) {
        this.push(element);
    }
}; 

var allDeviceType = ["android_app", "desktop", "ios_app", "mobile"] 
var allUserType = ["new user", "returning user"]

var param1 = {
  date: "all", device: ["android_app", "desktop", "ios_app", "mobile"], user: ["new user"]
}
var param2 = {
  date: "all", device: ["android_app", "desktop", "ios_app", "mobile"], user: ["returning user"]
}
var param3 = {
    device: ["android_app", "desktop", "ios_app", "mobile"], user: ["new user", "returning user"]
}
const options = {
  block: {
    dynamicHeight: true,
    minHeight: 15,
    // dynamicSlope: true
  },
  chart: {
    animate: 2
  },
  label: {
    format: '{v} ({f})'
  },
  tooltip: {
    enabled: true,
    format: '{l}: {v} ({f})'
  }
};

var userTypeList1 = ["new user"]
var userTypeList2 = ["returning user"]
var deviceTypeList1 = ["android_app", "desktop", "ios_app", "mobile"] 
var deviceTypeList2 = ["android_app", "desktop", "ios_app", "mobile"] 
var chart1
var chart2
var chart3
var timeLinedata

var dateSelect = document.getElementById("date1")
var dateSelect2 = document.getElementById("date2")
for (var i=8; i>0; i--) {
  var t = document.createElement("option")
  t.text = "Mar " + i + ", 2018"
  var t2 = document.createElement("option")
  t2.text = "Mar " + i + ", 2018"
  dateSelect.add(t)
  dateSelect2.add(t2)
}
for (var i=28; i>6; i--) {
  var t = document.createElement("option")
  t.text = "Feb " + i + ", 2018"
  var t2 = document.createElement("option")
  t2.text = "Feb " + i + ", 2018"
  dateSelect.add(t)
  dateSelect2.add(t2)
}

d3.selectAll(".usertype1")
  .on("change", function() {
    var userType = d3.select(this).property("value")
    console.log(userType)
    if (d3.select(this).node().checked == true) {
      param1.user.pushIfNotExist(userType)
    } else {
      param1.user.splice(param1.user.indexOf(userType), 1)
    }
    console.log(param1)
    chart1.draw(aggregateData(param1), options)
  })

d3.selectAll(".devicetype1")
  .on("change", function() {
    var deviceType = d3.select(this).property("value")
    console.log(deviceType)
    if (d3.select(this).node().checked == true) {
      param1.device.pushIfNotExist(deviceType)
    } else {
      param1.device.splice(param1.device.indexOf(deviceType), 1)
    }
    console.log(param1)
    chart1.draw(aggregateData(param1), options)
  })

d3.select("#date1")
  .on("change", function() {
    param1.date = d3.select(this).property("value")
    chart1.draw(aggregateData(param1), options)
  })

d3.selectAll(".usertype2")
  .on("change", function() {
    var userType = d3.select(this).property("value")
    console.log(userType)
    if (d3.select(this).node().checked == true) {
      param2.user.pushIfNotExist(userType)
    } else {
      param2.user.splice(param2.user.indexOf(userType), 1)
    }
    console.log(param2)
    chart2.draw(aggregateData(param2), options)
  })

d3.selectAll(".devicetype2")
  .on("change", function() {
    var deviceType = d3.select(this).property("value")
    console.log(deviceType)
    if (d3.select(this).node().checked == true) {
      param2.device.pushIfNotExist(deviceType)
    } else {
      param2.device.splice(param2.device.indexOf(deviceType), 1)
    }
    console.log(param2)
    chart2.draw(aggregateData(param2), options)
  })

d3.select("#date2")
  .on("change", function() {
    param2.date = d3.select(this).property("value")
    chart2.draw(aggregateData(param2), options)
  })

d3.selectAll(".usertype3")
  .on("change", function() {
    var userType = d3.select(this).property("value")
    console.log(userType)
    if (d3.select(this).node().checked == true) {
      param3.user.pushIfNotExist(userType)
    } else {
      param3.user.splice(param3.user.indexOf(userType), 1)
    }
    console.log(param3)
    timeLinedata = aggregateTimelineData(param3)
    console.log(timeLinedata)
    updateConfig()
    window.myLine.data = config.data
    window.myLine.update()
  })

d3.selectAll(".devicetype3")
  .on("change", function() {
    var deviceType = d3.select(this).property("value")
    console.log(deviceType)
    if (d3.select(this).node().checked == true) {
      param3.device.pushIfNotExist(deviceType)
    } else {
      param3.device.splice(param3.device.indexOf(deviceType), 1)
    }
    console.log(param3)
    timeLinedata = aggregateTimelineData(param3)
    console.log(timeLinedata)
    updateConfig()
    window.myLine.data = config.data
    window.myLine.update()
  })

var globalData
d3.json('https://kharisisriyant.github.io/sorabel_test/data.json').then(function(data) {
  globalData = data 

  initWithData(data)
}).catch(function(error) {
  console.log(error)
}) 

console.log("masuk siniiii")

function initWithData(data) {
  console.log("aaaaaaaaaaaa")
  var dataUsed = []
  for (var i=0; i<7; i++) {
    dataUsed.push({label: data[i].label, value: data[i].value})
  }

  console.log(dataUsed)

  var data1 = aggregateData(param1)
  var data2 = aggregateData(param2)

  console.log(data)
  chart1 = new D3Funnel('#funnel1');
  chart1.draw(data1, options);
  chart2 = new D3Funnel('#funnel2');
  chart2.draw(data2, options);

  timeLinedata = aggregateTimelineData(param3)
  console.log(timeLinedata)
  initTimelineChart()
}

function aggregateData(options) {
  var temp = [{label: 'product_view', value: 0}, {label: 'show_variants', value: 0 },
      { label: 'add_to_cart', value: 0 }, { label: 'cart_view', value: 0 },
      { label: 'shipment_page', value: 0 }, { label: 'payment_page', value: 0 }, { label: 'review_page', value: 0 }]
  if (options.date == "all") {
    for (var i=0; i<globalData.length; i++) {
      if (options.device.includes(globalData[i].deviceType) && options.user.includes(globalData[i].userType))
        temp[labelToInt(globalData[i].label)].value += globalData[i].value
    }
  } else {
    for (var i=0; i<globalData.length; i++) {
      if (options.device.includes(globalData[i].deviceType) && options.user.includes(globalData[i].userType) && globalData[i].date == options.date)
        temp[labelToInt(globalData[i].label)].value += globalData[i].value
    }
  }

  for (var i=0; i<7; i++) {
    if (i==0)
      temp[i].formattedValue = '100%'
    else
      temp[i].formattedValue =  (temp[i].value/temp[0].value * 100).toFixed(2) + '%'
  }

  return temp
}

function labelToInt(str) {
  switch (str) {
    case 'product_view' : return 0;
    case 'show_variants' : return 1;
    case 'add_to_cart' : return 2;
    case 'cart_view' : return 3;
    case 'shipment_page' : return 4;
    case 'payment_page' : return 5;
    case 'review_page' : return 6;
  }
}

function aggregateTimelineData(options) {
    var result = []
    var dates = []
    var dataEach = [
        {label: "product_view", data: []},
        {label: "show_variants", data: []},
        {label: "add_to_cart", data: []},
        {label: "cart_view", data: []},
        {label: "shipment_page",data: []},
        {label: "payment_page", data:[]},
        {label: "review_page", data: []}
    ]
    var dataSum = [0,0,0,0,0,0,0]

    var dateNow = ""
    var a
    for (var i=globalData.length-1; i>=0; i--) {
        if (globalData[i].date != dateNow) {
            if (i != globalData.length-1) {
                for (var j=0; j<7; j++) {
                    dataEach[j].data.push(dataSum[j])
                }
                dataSum = [0,0,0,0,0,0,0]
            }
            dates.push(globalData[i].date)
            dateNow = globalData[i].date
        }

        if (options.device.includes(globalData[i].deviceType) && options.user.includes(globalData[i].userType))
            dataSum[labelToInt(globalData[i].label)] += globalData[i].value
    }
    for (var j=0; j<7; j++) {
        dataEach[j].data.push(dataSum[j])   
    }

    return {data: dataEach, dates: dates, keys: ["product_view", "show_variants", "add_to_cart", "cart_view", "shipment_page", "payment_page", "review_page"]}
}


// function aggregateTimelineData(options) {
//     var result = []
//     var header = []
//     var temp = {date: "", product_view: 0, show_variants: 0, add_to_cart: 0, cart_view: 0, shipment_page: 0, payment_page: 0, review_page: 0 }

//     var dateNow = ""
//     var a
//     for (var i=globalData.length-1; i>=0; i--) {
//         if (globalData[i].date != dateNow) {
//             if (i != globalData.length-1)
//                 result.push(a)
//             header.push(globalData[i].date)
//             dateNow = globalData[i].date
//             a = {date: globalData[i].date, product_view: 0, show_variants: 0, add_to_cart: 0, cart_view: 0, shipment_page: 0, payment_page: 0, review_page: 0 }
//         }

//         if (options.device.includes(globalData[i].deviceType) && options.user.includes(globalData[i].userType))
//             a[globalData[i].label] += globalData[i].value
//     }
//     result.push(a)
//     console.log(result)

//     return {data: result, dates: header, keys: ["product_view", "show_variants", "add_to_cart", "cart_view", "shipment_page", "payment_page", "review_page"]}
// }

var config




function initTimelineChart() {
    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };

    config = {
        type: 'line',
        data: {
            labels: timeLinedata.dates,
            datasets: [{
                label: timeLinedata.data[6].label,
                data: timeLinedata.data[6].data,
                borderColor: window.chartColors.red
            },{
                label: timeLinedata.data[5].label,
                data: timeLinedata.data[5].data,
                borderColor: window.chartColors.orange
            }, {
                label: timeLinedata.data[4].label,
                data: timeLinedata.data[4].data,
                borderColor: window.chartColors.yellow
            }, {
                label: timeLinedata.data[3].label,
                data: timeLinedata.data[3].data,
                borderColor: window.chartColors.green
            }, {
                label: timeLinedata.data[2].label,
                data: timeLinedata.data[2].data,
                borderColor: window.chartColors.blue
            }, {
                label: timeLinedata.data[1].label,
                data: timeLinedata.data[1].data,
                borderColor: window.chartColors.purple
            }, {
                label: timeLinedata.data[0].label,
                data: timeLinedata.data[0].data,
                borderColor: window.chartColors.grey
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart - Stacked Area'
            },
            tooltips: {
                mode: 'index',
            },
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    stacked: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };

    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
}

function updateConfig() {
    config = {
        type: 'line',
        data: {
            labels: timeLinedata.dates,
            datasets: [{
                label: timeLinedata.data[6].label,
                data: timeLinedata.data[6].data,
                borderColor: window.chartColors.red
            },{
                label: timeLinedata.data[5].label,
                data: timeLinedata.data[5].data,
                borderColor: window.chartColors.orange
            }, {
                label: timeLinedata.data[4].label,
                data: timeLinedata.data[4].data,
                borderColor: window.chartColors.yellow
            }, {
                label: timeLinedata.data[3].label,
                data: timeLinedata.data[3].data,
                borderColor: window.chartColors.green
            }, {
                label: timeLinedata.data[2].label,
                data: timeLinedata.data[2].data,
                borderColor: window.chartColors.blue
            }, {
                label: timeLinedata.data[1].label,
                data: timeLinedata.data[1].data,
                borderColor: window.chartColors.purple
            }, {
                label: timeLinedata.data[0].label,
                data: timeLinedata.data[0].data,
                borderColor: window.chartColors.grey
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart - Stacked Area'
            },
            tooltips: {
                mode: 'index',
            },
            hover: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    stacked: false,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };
}








