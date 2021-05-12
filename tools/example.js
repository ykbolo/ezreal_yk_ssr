var asyncFunc = function (arr, i) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      arr.push(i)
      console.log('index is : ', i)
      resolve()
    }, 1000)
  })
}

var box5 = async function () {
  var arr = []
  for (var i = 0; i < 5; i++) {
    await asyncFunc(arr, i)
  }
  console.log(arr)
}

box5()
