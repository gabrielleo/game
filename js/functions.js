// 把所有用于解决ie6-8 兼容性问题的函数  都写到这个里面  1.兼容性的通过类名获取
// 1.先区分   在进行不同的操作
// 2.先把所有的元素都获取到
// 3.然后再根据类名找我们需要的元素
function getClass(selector,context){
      context=context||document;
  if(document.getElementsByClassName){
     return context.getElementsByClassName(selector)
  }else{
      var all=context.getElementsByTagName("*")
      var newarr=[];
      for (var i = 0; i < all.length; i++){
            //"one two" "one"
        if(checkstr[i].className==selector){
          newarr.push(all[i])
        }
      };
      return newarr;
  }
}
function checkstr(lstr,str){
  var arr=lstr.split(" ")
  for (var i = 0; i < arr.length; i++) {
        if(arr[i]==str){
            return true;
        }
  }
   return false;
}


// 兼容的获取或者设置元素的文本内容
// 1.先判断浏览器
// 2.判断是要获取还是要设置
// 3.分别执行对应的操作
function getText(obj,text){
   if(document.getElementsByClassName){
     if(text==undefined){
      return obj.textContent;
  
 }else{
      obj.textContent=text;
}
     }else{
      if(text==undefined){
      return obj.innerText;
    
   }else{
      obj.innerText=text    
 }  
 } 
}
function getText(obj,text){
      if(document.getElementsByClassName){
            if(text==undefined){
                  return obj.textContent;
            }
      }else{
            obj.textContent=text;
      }
}
//   //兼容性的获取某一个对象的某一个样式的方式
  function getStyle(obj,attr){
      if (window.getComputedStyle){
         return window.getComputedStyle(obj,null)[attr]
      }else{
          return obj.currentStyle[attr]
      }
  }


//通过多种方式获取元素



function $(selector,context){
    context=context||document;
 if (typeof selector=="string") {
    if (selector.charAt(0)==".") {
      return getClass(selector.slice(1),context)
    }else if (selector.charAt(0)=="#") {
      return document.getElementById(selector.slice(1))
    }else{
      return context.getElementsByTagName(selector)
    }
}else if (typeof selector=="function") {
  // window.onload=selector;
  addEvent(window,"load",selector)
  }
}




//获得所有元素子节点的函数

    function getChild(obj){
      
    var childs=obj.childNodes;
    var newarr=[];
    for (var i = 0; i < childs.length; i++) {
                    if( childs[i].nodeType==1){
                      newarr.push(child[i])
                    }
                   };  
                   return newarr             
    }


   //获取第一个元素子节点
   function getFirst(){
    return getChild(obj)[0]
   }
    //获取最后一个元素子节点
    function getlast(){
    var arr=getChild(obj)
     return arr[arr.lenght-1]
   }
   //获取下一个元素兄弟节点
   function getNext(obj){
      var next=obj.nextSibling;
      if(next==null){
        return null
      }
      while(next.nodeType!=1){

        next=next.nextSibling;
        if(next==null){
        return null
      }
      
      }
        return next
   }
    //获取上一个元素兄弟节点
    function getprevious(obj){
      var previous=obj.previousSibling;
       if(previous==null){
        return null
      }
       while(previous.nodeType!=1){

        previous=previous.nextSibling;
        if(previous==null){
        return null;
      }
      
      }
        return previous
    } 


    //将一个元素插入到另一个元素后面
    function insertAfter(oldobj,newobj){
      var next=getNext(oldobj);
      var parent=next.parentNode;
      if(next){
      parent.insertBefore(newobj,next)
      }else{
        parent.appendChild(newpbj)
      }
    }
    



//兼容性的绑定事件的函数
    function addEvent(obj,event,callback){
      if(obj.addEventListener){
        obj.addEventListener(event,callback,false)
      }else{
            obj.attachEvent("on"+event,callback)
      }

    }

    //兼容性的移除绑定的时间
    function removeEvent(obj,event,callback){
      if(obj.removeEventListener){
        obj.removeEventListener(event,callback,false)
      }else{
        obj.detchEvent("on"+event,callback)
      }
    }



    //给某一个事件添加滚轮事件的函数
    // function mousewheel(obj,upfun,downfun){
    //   if(obj.addEventListener){
    //     obj.addEventListener("mousewheel"，scrollfun,false)
    //     obj.addEventListener("DOMMouseScroll",scrollfun,false)
    //   }else{
    //     obj.attachEvent("onmousewheel",scrollfun)
    //   }
    //   function scrollfun(e){
    //     var ev=e||window.event;
    //     var dir=ev.detail||ev.wheelDelta;
    //     if(dir==-3||dir==-120){
    //       downfun.call(obj)
    //     }
    //   }
    // }



    function mousewheel(obj,upfun,downfun){
  if(obj.addEventListener){
  obj.addEventListener("mousewheel",scrollfun,false)
  obj.addEventListener("DOMMouseScroll",scrollfun,false)
    }else{
      obj.attachEvent("onmousewheel",scrollfun)
    }
      function scrollfun(e){
       var ev=e||window.event;
       var dir=ev.detail||ev.wheelDelta;
        if(ev.preventDefault){
          ev.preventDefault()
        }else{
          ev.returnValue=false;
        }
       if(dir==-3||dir==120){
          upfun.call(obj)
       }else if(dir==3||dir==-120){
          downfun.call(obj)
         }
      }
  }
