$(document).ready(function(){
	
    /*物流信息选项卡*/
	TouchSlide({
			slideCell:"#paidan_box",  //包围体
			titCell:".paidan_tab li", //导航标签
			mainCell:".paidan_body",  //切换元素包裹层
			titOnClassName:"tab_on",  //选中状态添加class
	})

	/*脏衣篮选项卡*/
	$(".zangyi_tab li").click(function(){
		$(this).addClass("tab_on").siblings().removeClass("tab_on");
		$(".zangyi_body>ul").eq($(this).index()).show().siblings().hide();	
    });

    /*监听函数*/
    var number = function(){
        //单件数量
    	$(".number strong").each(function(){
			if($(this).text() > 0){
				$(this).parent().show();
			}else{
				$(this).parent().hide();
			}
		});

        //tab角标
        $(".zangyi_tab i").each(function(){
            if($(this).text() > 0){
                $(this).show();
            }else{
                $(this).hide();
            }
        });

        //底部角标
        $(".foot_nav i").each(function(){
            if($(this).text() > 0){
                $(this).show();
            }else{
                $(this).hide();
           }
        });

        //分类数量
        $(".zangyi_body ul").each(function(){
            var fenlei = 0;
            $(this).find("li").each(function(){
                if($(this).find("span").css("display") != "none"){
                    fenlei += parseInt($(this).find("strong").text());
                }
            });
            $(".zangyi_tab li").eq($(this).index()).find("i").text(fenlei);
        });

        //总数量
        var all = 0;
        $(".number span").each(function(){
            if($(this).css("display") != "none"){
                all +=  parseInt($(this).find("strong").text());
            }
        });
        $(".foot_nav li").eq(2).find("i").text(all);
    };
    window.setInterval(number);
	
	//增加数量
	$(".number i:contains('+')").click(function(){
        num = $(this).prev().find("strong").text();
        $(this).prev().find("strong").text(parseInt(num) + 1);
    });

	//减少数量
    $(".number i:contains('-')").click(function(){
        num = $(this).next().text();
        if(num <= 0){
        	num == 0;
        }else{
        	$(this).next().text(parseInt(num) - 1);
        }
    });

    //脏衣篮信息
    $(".foot_nav>ul>li").eq(2).click(function(e){
       if($(this).find("i").text() <= 0){
       	  layer.open({
               content:'脏衣篮内暂无衣物'
          })
          e.preventDefault();
       }
    });

    //提交按钮
    $(".header span a").click(function(e){
       var info = '';
       $(".zangyi_body li").each(function(){
           var zanyifu = $(this).find("strong").text();
           if( zanyifu > 0){
               info += $(this).find("h1").text() + '.........................x' + zanyifu + '<br/>';
           }
       });
       if(info){
           layer.open({
               content: info,
               btn: ['确认', '修改'],
               shadeClose: false,
               yes: function () {
                   layer.open({content: '下单成功', time: 1});
                   var GoTo = function(){
					location.href="xiadan.html"
					}
					window.setInterval(GoTo,800); 
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

    //退单
    $(".header span:contains('退单')").click(function(e){
    	layer.open({
			content: '<textarea class="why" placeholder="请描述退单原因" maxlength="150"></textarea>',
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
		e.preventDefault();
    })
	
	//派送信息
	$(".paidan_body ul").eq(1).find("li").click(function(e){
		var obj = $(this);
		layer.open({
			content: '是否完成派件送达？',
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
					content: '<textarea class="why" placeholder="请描述未送达原因" maxlength="150"></textarea>',
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