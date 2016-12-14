$(function(){
  //面向对象的打字游戏
  function Typegame(main,scor,life,state){         //声明一个Typegame函数 传递四个形参
       this.main=main;     //游戏的框框
       this.scorele=scor;   //分数
       this.lifeele=life;   //生命
       this.stateele=state; //开始
       this.life=5;  //定义初始的生命值
       this.scor=0;  //定义初始的分数
       this.state=1;   //定义初始的关卡
       this.speed=5;    //定义初始的速度
       this.num=3;     //初始的个数
       this.obj={};     //声明一个空对象   用来保存新的数据
       this.sceneHeight=document.documentElement.clientHeight;    //获取浏览器窗口的高度
  }
//初始化对象的一些属性


  Typegame.prototype={    //封装对象的原型  通过构造函数propotype属性
      start:function(){      // 定义一个atart方法    用于外部或者内部调用  完成游戏的初始化以及正式开始游戏
        for(i in this.obj){       //用for in遍历信息对象{}    
          clearInterval(this.obj[i].el.t)   //清除时间函数  在定义时间函数的时候  就已经把时间函数保存到信息对象this.obj的身上   所以在这里可以访问到 
        }
        this.obj={};   
        //初始化信息对象  把所有属性都覆盖掉 变成空
        this.main.innerHTML="";  
        // 把场景内容清空通过将innerHTML属性赋值为空字符串清空
        for(var i=0;i<this.num;i++){   
         //循环  重复执行 根据对象的num属性决定重复执行几次
          this._createLetter()  
            //调用对象的this._createLetter方法   用来创建字母的方法
        }
        this._play(); //调用对象的play方法  定义操作逻辑  包括如何消除 如何过关以及关卡的难度变化  按下键盘消除 
      },
      _createLetter:function(){   
       //定义对象的createLetter方法 这个方法用来创建一个字母并且这个字母和前面创建的字母不重复    位置也不会重叠  并且把创建的字母所有的信息都保存到信息对象this.obj当中
         var that=this;    
           //定义一个变量that用来获得this指针的引用
         var ele=document.createElement("div");  
          //在页面中建立一个div  并且把div赋值到ele变量身上去
         do{   
         var randomleft=Math.random()*(this.main.offsetWidth-40);
          //获取一个随机数  用来获取一个范围在main中的一个随机的left值   
         }while(this._checkleft(randomleft))
         //通过调用对象的checkleft方法  来判断得到的新的left值和前面的对象有没有冲突有没有重叠 如果重叠则重新获取
         var randomtop=-Math.random()*100;
          //获取一个随机数   获取一个随机的top值  为了在出现的时候看不到 所以变成负值
         ele.style.cssText="width:40px;height:40px;border:1px solid #000;text-align:center;line-height:40px;color:#000;font-weight:bold;font-size:30px;position:absolute;left:"+randomleft+"px;top:"+randomtop+"px";   //给创建出来的div添加样式
         do{                                   
         var num=Math.floor(Math.random()*26+65);
         //获取一个随机数   范围是65-90之间的一个随机数
         var charcter=String.fromCharCode(num)
         //根据上一步得到的随机数  得到一个字母
         }while(this.obj[charcter])        
          //根据信息对象有没有当前字母这个属性来判断是否需要重新获取 如果有重新获取
         ele.innerHTML=charcter;            //把得到的字母作为内容放置到创建的div当中
         this.main.appendChild(ele);        //把创建的div放置到main主场景中
         ele.t=setInterval(movefun,60)      //开启一个时间函数   并且赋值到创建的div的属性t身上  
         function movefun(){      //在时间函数中具体执行的回调函数   主要控制div的下落
           var top=parseInt(getStyle(ele,"top")); 
            //获取初始的top值  并且通过parseInt转化为整数  可以用offsetTop直接获取
               top+=that.speed;    //在原先top值得基础上加一个值
             ele.style.top=top+"px";   //把新的top值复制给div
             if(top>that.sceneHeight){   //判断当前top值大于场景的高度
              clearInterval(ele.t);     //就清除掉div身上的动画
               that._createLetter();      //通过 createLetter 创建一个新字母作为补充
                 that.life--;    //让生命属性减少1
                 that.lifeele.innerHTML=that.life;   //让页面中的生命值显示也跟着变化
                 if(that.life==0){   //如果生命值为0
                  that.gameover();   //调用游戏结束的放大
                 }
             }
         }
         this.obj[charcter]={left:randomleft,el:ele,fun:movefun};
         //给信息对象添加一个属性   这个属性的值是另外一个对象   
         //把我们得到的这个字母作为键来使用  方便判断判断是否重复  判断我们当前按下的是不是这个字母
         //字母这个键对应的值 就是这个字母详细的属性  通过一个属性对象来表示   这个属性对象包含每一个字母的left值 这个字母对应的div元素  这个字母对应的回调函数    我们要在后面操作访问这些属性   这样保存更容易找到
      },
      _checkleft:function(newleft){    // 定义checkleft方法来判断新的left值和以前的left值有没有冲突
           for(i in this.obj){           //遍历信息对象
              if(newleft>this.obj[i].left-40&&newleft<this.obj[i].left+40){//判断新的left值是否会和以前的重叠 即判宽高是否在旧的div的宽度范围内  并返回真假
                return true;   //如果判断重叠了则返回真
              }
           }
          return false;    //如果判断不重叠了则返回假
      },
      _play:function(){    //定义操作逻辑play的方法
          var that=this;      //定义一个变量that  用来获得this指引的引导  
          document.onkeydown=function(e){   //给document添加onkeydown事件
             var ev=e||window.event;     //兼容的获取事件对象
             var code=ev.keyCode;      //获取当前所按码的的键盘码
             var mycharcter=String.fromCharCode(code);    //通过获取当前所按码的的键盘码得到当前按下的字母是哪一个
             if(that.obj[mycharcter]){  //如果信息对象中有这个字母对应的属性
              that.main.removeChild(that.obj[mycharcter].el);  //从场景中将这个字母对应的div移除掉
              that._createLetter();  //在创建一个新的字母
              clearInterval(that.obj[mycharcter].el.t)  //停止掉这个字母对应的时间函数
              delete that.obj[mycharcter];   //从信息对象中删除当前字母的属性
              that.scor++;    //得分属性自加     
              console.log(that.scor)  //控制台输出
              that.scorele.innerHTML=that.scor;// 页面中的元素显示得分增加  
              if(that.scor%10==0){    //判断分数如果能被10整除    说明当前是10 20 30 40这样的得分
                 that.state++; //关卡属性增加1
                 that.life++;   //生命属性增加1
                 that.lifeele.innerHTML=that.life;  //生命值显示做出对应的改变
                 that.stateele.innerHTML=that.state;  //在浏览器中显示自加后的关卡
                 if(that.state<=3){  //如果当前关卡是前3关
                 that.num++;  //则让对象的数字属性增加1这个属性是上面用来空股指循环执行次数也就是生成几个字母用的
                 }else{ 
                 that.speed++;    // 如果关卡是3关以后  则让对象的速度增加  这个属性是用来控制执行时间函数时top值
                 }
                 that.start();   //每过一关都重新执行一次开始方法在开始中会清空场景重新生成字母
              }
             }
          }
      },
      gameover:function(){   //定义游戏结束的方法  供内部和外部调用
         this.main.innerHTML="<span>游戏结束，总得分"+this.scor+"</span>"; //将主场景中的内容直接覆盖为游戏结束   同时把得分连接进来
         for(i in this.obj){      //循环遍历信息对象  
          clearInterval(this.obj[i].el.t)  //将所有时间函数都停止掉
         }
      },
      pause:function(){   //定义游戏暂停的方法
        for(i in this.obj){   //遍历信息对象
          clearInterval(this.obj[i].el.t); //将所有时间函数都停止掉
        }
        document.onkeydown=null;   //将键盘事件暂时注销掉
      },   
      moveon:function(){   //定义游戏继续的方法
         for(i in this.obj){   //遍历信息对象
          this.obj[i].el.t=setInterval(this.obj[i].fun,60);  //重新开始每一个div身上保存的时间函数
        } 
        this._play()   //调用对象的play方法   把键盘事件在注册上
      }
    }
  var begin=$(".begin")[0];  //获取
  var main=$(".main")[0];  //获取
  var scor=$(".scor")[0];  //获取
  var life=$(".life")[0];  //获取
  var state=$(".state")[0];  //获取
  var pause=$(".pause")[0];  //获取
  var end=$(".end")[0];   //获取
  var game=new Typegame(main,scor,life,state);    //声明一个变量为新的 Typegame传递四个参数
  var flag=true;  // 声明一个开关为真
  begin.onclick=function(){
    if(flag){  
    flag=false;    // 一个点击的函数 判断flag  flag=false 就调用start函数
    game.start()
    }
  }
  var flag2=true;   //声明flag2为真
  pause.onclick=function(){
       if(flag2){
        flag2=false;
         this.innerHTML="继续"
         game.pause();       //判断 flag2   如果它为假    获取当前对象的内容为 继续 就调用pause函数    
       }else{
         flag2=true;
         this.innerHTML="暂停"
         game.moveon();       // flag2 如果它为真   获取当前对象的内容为 暂停 就调用moveon函数    
       }
  }
  end.onclick=function(){     //一个点击事件
    game.gameover()       //游戏结束
  }
})