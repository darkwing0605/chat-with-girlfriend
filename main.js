/*
 * 数据
 */
 const messageData = 
 [
  {
    "id": 0,
    "left": "亲爱的，我今天穿的这件衣服好看吗？",
    "right": {
      "0": {
        "text": "还行",
        "reply": "哼，敷衍",
        "score": -3
      },
      "1": {
        "text": "好丑- -",
        "reply": "你丫是不是不想活了(•́へ•́╬)",
        "score": -5
      },
      "2": {
        "text": "还用问？我老婆穿什么都好看！",
        "reply": "我花了一个小时才挑出这件的呢（づ￣3￣）づ╭❤～",
        "score": 5
      }
    }
  },
  {
    "id": 1,
    "left": "亲爱的，那你爱我吗？",
    "right": {
      "0": {
        "text": "爱",
        "reply": "算你识相",
        "score": 0
      },
      "1": {
        "text": "这还用问吗？",
        "reply": "你不爱我了",
        "score": -3
      },
      "2": {
        "text": "你烦不烦啊？",
        "reply": "……",
        "score": -5
      }
    }
  },
  {
    "id": 2,
    "left": "你觉得我胖了吗？",
    "right": {
      "0": {
        "text": "我就是喜欢你这样肉肉的，超可爱",
        "reply": "嘿嘿(*/ω＼*)",
        "score": 5
      },
      "1": {
        "text": "确实是胖了",
        "reply": "一会儿去跪键盘，自觉点(▼へ▼メ)",
        "score": -5
      },
      "2": {
        "text": "没胖",
        "reply": "口是心非，我看你还是觉得我胖",
        "score": -3
      }
    }
  },
  {
    "id": 3,
    "left": "你觉得我闺蜜怎么样？",
    "right": {
      "0": {
        "text": "挺漂亮的",
        "reply": "再见来不及挥手(　 ´-ω -)▄︻┻┳══━一",
        "score": -5
      },
      "1": {
        "text": "我都没怎么注意她",
        "reply": "你是不是喜欢她！！！",
        "score": -3
      },
      "2": {
        "text": "她人挺不错的，你要好好珍惜这样的朋友",
        "reply": "恩恩，我们俩从小就很好",
        "score": 5
      }
    }
  }
]
const scoreData = 
[
	{
		"id": 0,
		"score": -20,
		"tips": "请问你是怎么找到女朋友的？租来的吧",
		"left": "分手！再也不见！！"
	},
  {
    "id": 1,
    "score": -10,
    "tips": "恭喜你捡回一条命！下次可没这么好运了。",
    "left": "呵呵"
  },
  {
    "id": 2,
    "score": -5,
    "tips": "赶快哄哄吧，不然你就凉了。",
    "left": "伐开心……"
  },
  {
    "id": 3,
    "score": 5,
    "tips": "不得不说，你的求生意识真的很强。",
    "left": "勉强算你过关了吧"
  },
  {
    "id": 4,
    "score": 15,
    "tips": "深得女神心！",
    "left": "亲爱的你真好~"
  },
]
/*
 * 判断是否手机
 */
const isMobilePhone = () => {
  let ua = navigator.userAgent;
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  let isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  let isAndroid = ua.match(/(Android)\s+([\d.]+)/);
  let isMobile = isIphone || isAndroid;
  if (isMobile) {
    return true;
  } else {
    alert('请使用移动端访问');
  }
}
/*
 * 判断是否微信浏览器
 */
const isWechat = () => {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    addClass(document.body, 'isWechat')
  } else {
    return false
  }
}
/*
 * 滚动底部
 */
const scrollToBottom = () => {
  setTimeout(() => {
    g('main').scrollTop = g('main').scrollHeight
  }, 400)
}
/*
 * 通用函数
 */
const g = (selector) => {
  return document.querySelector(selector);
}
const addClass = (element, className) => {
  element.classList.add(className);
}
const removeClass = (element, className) => {
  element.classList.remove(className);
}
const hasClass = (element, className) => {
  return element.classList.contains(className);
}
// Loading
const hideLoading = () => {
  setTimeout(() => {
    addClass(g('.loading'), 'hide')
  }, Math.floor(Math.random() * 2000));
}
const bindEvents = () => {
  g('.first-page-continue').addEventListener('touchend', () => {
    addClass(g('.first-page'), 'fadeout');
    setTimeout(() => {
      addClass(g('.first-page'), 'hide');
      oneStep(0);
    }, 300)
  })
  g('.icon-replay').addEventListener('touchend', () => {
    // init()
    window.location.reload();
  })
  g('.icon-share').addEventListener('touchend', () => {
    let alertShare = prompt("该浏览器不支持分享，请手动复制分享地址", "https://www.dark-wing.com/chat-with-girlfriend/")
  })
  g('.nav-left').addEventListener('touchend', () => {
    alert('女朋友的微信也敢不回？')
  })
  g('footer').addEventListener('touchend', () => {
    alert('别挣扎了，只有下面三个选项')
  })
  /*
   * 事件委托
   */
  g('.message-select').addEventListener('touchend', (event) => {
    let target = event.target
    let currentTarget = event.currentTarget
    while (target !== currentTarget) {
      if (hasClass(target, 'message-selected')) {
        const message = target.querySelector('.message').innerText
        appendMessage('right', message);
        getReply(message)
        getScore(message);
        nextStep();
        return
      }
      target = target.parentNode
    }
  })
  // g('.tips').addEventListener('touchend', (event) => {
  //   let target = event.target;
  //   let currentTarget = event.currentTarget;
  //   while (target !== currentTarget) {
  //     if (hasClass(target, 'icon-replay')) {
  //       init()
  //       return;
  //     }
  //     target = target.parentNode;
  //     debugger
  //   }
  // })
}

let step = 0;
let score = 0;
/*
 * @param{String} str 主页面添加DOM
 */
const getDomByStr = (str) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.children[0];
}
/*
 * @param{String} side 左右
 * @param{String} message 主页面消息
 */
const getMessage = (side, message) => {
  const template = `
  <div class="message-item message-item-${side}">
    <img class="avatar" src="./images/${side == 'left' ? 'girl' : 'boy'}.png" alt="头像">
    <div class="message">${message}</div>
  </div>
  `
  return getDomByStr(template);
}
/*
 * @param{String} message 选择框消息
 */
const getSelectMessage = (message) => {
  return `
    <div class="message-item message-item-right message-selected">
      <img class="avatar" src="./images/boy.png" alt="头像">
      <div class="message">${message}</div>
    </div>
  `
}
/*
 * 遍历显示选择框消息
 */
const changeSelectMessage = () => {
  const currentMsg = messageData[step];
  let selectMsgStr = '';
  for (i in currentMsg.right) {
    let message = currentMsg.right[i].text;
    selectMsgStr += getSelectMessage(message);
  }
  g('.message-select').innerHTML = selectMsgStr;
}
/*
 * 计算得分
 * @parma{String} message 点击的文字匹配得分
 */
const getScore = (message) => {
  const currentMsg = messageData[step];
  for (i in currentMsg.right) {
    if (message == currentMsg.right[i].text) {
      score += currentMsg.right[i].score;
    }
  }
}
/*
 * 回复
 * @parma{String} message 点击的文字匹配回复
 */
const getReply = (message) => {
  let reply
  let currentMsg = messageData[step];
  for (i in currentMsg.right) {
    if (message == currentMsg.right[i].text) {
      reply = currentMsg.right[i].reply;
    }
  }
  setTimeout(() => {
    appendMessage('left', reply)
  }, 500)
}
/*
 * @param{String} side 左右
 * @param{String} message 主页面消息
 */
const appendMessage = (side, message) => {
  const messageDom = getMessage(side, message)
  g('.message-list').append(messageDom);
}
/*
 * 下一步
 */
const nextStep = () => {
  step++;
  removeClass(g('.chat-page'), 'selected');
  if (step >= messageData.length) {
    showResult()
  } else {
    setTimeout(() => {
      oneStep(step);
    }, 950)
  }
}
/*
 * @parma{Object} resultObj 得分数组
 */
const showTips = (resultObj) => {
  g('.tips').querySelector('.tips-text').innerText = `分数：${score}
      ${resultObj.tips}`
  removeClass(g('.tips'), 'hide')
}
/*
 * 通过分数查找结果
 * @param{Number} score
 */
const getResultByScore = (score) => {
  let result
  for (i in scoreData) {
    if (score >= scoreData[i].score) {
      result = scoreData[i]
    }
  }
  return result
}
/*
 * 显示最后结果
 */
const showResult = () => {
  const result = getResultByScore(score);
  // 最后一句话
  setTimeout(() => {
    const result = getResultByScore(score)
    appendMessage('left', result.left)
    scrollToBottom()
    setTimeout(() => {
      showTips(result)
    }, 1000)
  }, 1000)
}
/*
 * @param{Number} step 步数
 */
const oneStep = (step) => {
    const currentMsg = messageData[step];
    appendMessage('left', currentMsg.left)
    setTimeout(() => {
      changeSelectMessage();
      // changeSelectList(step);
      addClass(g('.chat-page'), 'selected')
      scrollToBottom()
    }, 500)
}

const init = () => {
  isMobilePhone();
  isWechat();
  bindEvents();
  hideLoading();
}
init()