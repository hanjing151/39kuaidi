$(document).ready(function(){
	
    /*物流信息选项卡*/
	TouchSlide({
			slideCell:"#paidan_box",  //包围体
			titCell:".paidan_tab li", //导航标签
			mainCell:".paidan_body",  //切换元素包裹层
			titOnClassName:"active",  //选中状态添加class
	})

	/*脏衣篮选项卡*/
	$(".zangyi_tab li").click(function(){
		$(this).addClass("tab_on").siblings().removeClass("tab_on");
		$(".zangyi_body>ul").eq($(this).index()).show().siblings().hide();
    });

    /*监听函数*/
    var number = function(){

		//遍历衣物
		var num = 0;
		var price = 0;
		$(".zangyi_info li").each(function(){
			var single = $(this).find("b").text();	
			num++;
			price += parseInt(single);
		})
		//总数量
		$(".zangyi_info strong b").text(num);
		//总价格
		$(".zangyi_info>p>i>b").text(price);
		
		//为空时显示暂无内容
		if(num == 0){
			$(".zangyi_info h2").slideDown();
		}else{
			$(".zangyi_info h2").slideUp();
		}

		//删除衣物
		$(".zangyi_info span").click(function(){
			$(this).parent().remove();
		})	

		//收银统计
		var cash = parseInt($(".cash").text()),
			card = parseInt($(".card").text()),
			money = parseInt($(".money").text());
		var now = cash + card;
		$(".Payment").text(now);
		$(".yuer").text(money - now);
    };
    window.setInterval(number,100);
	
	//添加衣物显示框
    $(".zangyi").click(function(){
    	$(".model").fadeIn(500);
    	//横向滚动条
    	var swiper = new Swiper('.zangyi_tab', {
                slidesPerView: 4.5,
                paginationClickable: true,
                freeMode: true
        });
    })

    //关闭衣物窗口
    $(".model").click(function(){
    	$(this).fadeOut();
    })

    //阻止冒泡
    $(".zangyi_box").click(function(e){
    	e.stopPropagation();
    })
	
	//增加衣服
	var yifu = $(".zangyi_body li").text();
	$(".zangyi_body li").click(function(){
		var yifu_name = $(this).text(),
			yifu_price = $(this).attr("data-price");
			num = $(".zangyi_info li").length;
		if(num > 1){
			$(".zangyi_info li:last-child").after('<li><strong>' + yifu_name + '</strong><span>x</span><i><b>' + yifu_price + '</b> 元</i></li>');
		}else{
			$(".zangyi_info>ul>h2").after('<li><strong>' + yifu_name + '</strong><span>x</span><i><b>' + yifu_price + '</b> 元</i></li>');
		}
		
    });

    //提交按钮
    $("#submit").click(function(e){
       var info = '';
       var zanyifu = $(".zangyi_info li").length;
       $(".zangyi_info li").each(function(){
           var single = $(this).find("b").text();	
           if( zanyifu > 0){
               info += $(this).find("strong").text() + '.........................' + single + ' 元<br/>';
           }
       });
       if(zanyifu){
           layer.open({
               content: info,
               style: 'width:300px; border:none;',
               btn: ['确认', '修改'],
               shadeClose: false,
               yes: function () {
                   layer.open({
                   		content: '下单成功', time: 1,
						success: function(){	  
							//这里是选择了确认的回调函数
							var GoTo = function(){
							location.href="daizi.html"
							}
							window.setInterval(GoTo,800);
						}
                   });
                    
               }, no: function () {
                   layer.close();
               }
           });
       }else{
           layer.open({
               content:'脏衣篮内暂无衣物'
           })
       }
       e.preventDefault();
    })

    //清空按钮
    $("#reset").click(function(){
    	layer.open({
			content: '删除将无法恢复，是否确认删除？',
			btn: ['确认', '关闭'],
			shadeClose: false,
			yes: function(){
				layer.open({
					content: '已删除', time: 1,
					success: function(){	  
						$(".zangyi_info li").remove();  //这里是选择了确认的回调函数
					}
				});			
			}, no: function(){
				layer.close();
			}
		});	
    })

    //添加袋子
    $(".daizi").click(function(){
    	layer.open({
    		title: '添加袋子',
			content: '<input type="tel" class="add_daizi" placeholder="请填写袋子编号..." maxlength="16">',
			style: 'width:300px; border:none;',
			btn: ['按件', '按袋'],
			shadeClose: false,
			yes: function(){
				var id = $(".add_daizi").val();
				layer.open({
					content: '您的袋子编号：' + id + ' 按件', time: 1,
					success: function(){
						//这里是选择了按件的回调函数
						var GoTo = function(){
						location.href="zangyi.html"
						}
						window.setInterval(GoTo,800); 
					}
				});
			}, no: function(){
				var id = $(".add_daizi").val();
				layer.open({
					content: '您的袋子编号：' + id + ' 按袋', time: 1,
					success: function(){
						//这里是选择了按袋的回调函数
						var GoTo = function(){
						location.href="zangyi.html"
						}
						window.setInterval(GoTo,800); 
					}
				});
			}
		});	
    })

    //删除袋子
    $(".daizi_body li i").click(function(){
    	var daizi = $(this).parents("li");
    	layer.open({
			content: '删除将无法恢复，是否确认删除？',
			btn: ['确认', '关闭'],
			shadeClose: false,
			yes: function(){
				layer.open({
					content: '已删除', time: 1,
					success: function(){	  
						daizi.remove();  //这里是选择了确认的回调函数
					}
				});			
			}, no: function(){
				layer.close();
			}
		});	
    })

    //收银
    $("#shouyin").click(function(){
    	var num = $(".daizi_body li").length;
    	if(!num){
    		layer.open({content: '请先添加袋子', time: 1});		
    	}
    })

	//现金支付
    $("#cash").click(function(){
    	layer.open({
    		title:'现金支付',
			content: '<input type="tel" class="add_daizi" placeholder="请填支付金额..." maxlength="16">',
			style: 'width:300px; border:none;',
			btn: ['确认'],
			yes: function(index){
				//这里是回调函数
				var val = $(".add_daizi").val();
				$(".cash").text(val);
				layer.close(index);
			}
		});
    })

    //刷卡支付
    $("#card").click(function(){
    	layer.open({
    		title:'刷卡',
			content: '<input type="tel" class="add_daizi" placeholder="请填支付金额..." maxlength="16">',
			style: 'width:300px; border:none;',
			btn: ['确认'],
			yes: function(index){
				//这里是回调函数
				var val = $(".add_daizi").val();
				$(".card").text(val);
				layer.close(index);
			}
		});
    })	

    //支付提交
    $("#pay").click(function(){
    	var yuer = $(".yuer").text();
    	if(yuer > 0){
    		layer.open({content: '还未完成收银', time: 1});
    	}else{
    		layer.open({
				content: '收银成功', time: 1,
				success: function(){
					//这里是回调函数
				}
			});	  
    	}
    })

    //退单
    $("#tuidan").click(function(e){
    	layer.open({
			content: '<textarea class="why" placeholder="请描述退单原因..." maxlength="150"></textarea>',
			style: 'width:300px; border:none;',
			btn: ['确认', '关闭'],
			shadeClose: false,
			yes: function(){
				layer.open({content: '已取消订单', time: 1});
				var GoTo = function(){
					location.href="dingdan.html"
				}
				window.setInterval(GoTo,800); 
			}, no: function(){
				layer.close();
			}
		});	
    })
	
	//派送信息
	$(".paidan_body ul").eq(1).find("li").click(function(e){
		var obj = $(this);
		layer.open({
			content: '是否完成派件送达？',
			style: 'width:300px; border:none;',
			btn: ['是的', '没有'],
			shadeClose: false,
			yes: function(){
				layer.open({
					content: '干的漂亮，辛苦你了！', time: 1.2,
					success: function(){
						obj.hide();  //这里是回调函数
					}
				});	  
			}, no: function(){
				layer.open({
					content: '<textarea class="why" placeholder="请描述未送达原因..." maxlength="150"></textarea>',
					style: 'width:300px; border:none;',
					btn: ['提交', '按错了'],
					shadeClose: false,
					yes: function(){
						layer.open({
							content: '提交成功！', time: 1.2,
							success: function(){
								//这里是回调函数
							}
						});
					}, no: function(){
						layer.open({content: '请继续完成订单派送！', time: 1.2});
					}
				});	
			}
		});	
		e.preventDefault();
	})

});