const prefix = 'https://www.snhm.org.cn/qingwa';
// const prefix = 'https://www.xiaowanwu.cn/qingwa';

function deal(path,params){
	return new Promise((resolve,reject)=>{
		uni.request({
			url: `${prefix}${path}`, 
			method: 'post',
			data: params,
			header: {
				"Content-Type": "application/json"
			},
			success: (res) => {
				console.log('res',res);
				if(res.data.meta.errno!==0){
					uni.showToast({
						title:res.data.meta.msg || "系统错误",
						icon:"none"
					})
					reject(res.data.meta);
				}else{
					resolve(res.data.result)
				}
			},
			fail: ()=>{
				uni.showToast({
					title:"系统错误",
					icon:"none"
				})
			}
		});
	})
}

export function wexinLogin(params){
	return deal('/weixin/loginXiaochengxuWeixinUser',params);
}

export function xuanzuo(params){
	return deal('/xuanzuo',params);
}


