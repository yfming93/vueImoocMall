let checkLogin = function () {
  return new Promise(function (resolve,reject) {
    let  falg = document.cookie.indexOf("userId")> -1? true: false;
    if (falg = true) {
      resolve({
        satatus:0,
        result:true
      })
    }else  {
      reject("error");
    }
  })
};

let getUserInfo = ()=>{
  return new Promise((resolve,reject)=>{
    let  userInfo = {
      userId: "101"
    }
    resolve(userInfo);
  });
};

checkLogin().then((res)=>{
  if (res.satatus == 0) {
    console.log("login success")
    return getUserInfo();
  }
}).catch((error)=>{
  console.log(`errs:${error}`)
}).then((res2)=>{
  console.log(`userId:${res2.userId}`); //userId:101
})

Promise.all([checkLogin(),getUserInfo()]).then(([res1,res2])=>{
  console.log(`res1:${res1.satatus} ; res2:${res2.userId}`); //res1:0 ; res2:101

})
