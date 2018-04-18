<template>
    <div class="post">
        <div class="post-page" :class="{submitting: isSubmitting}">
            <common-header title="发布币文" button-label="发布" v-on:tool="publish"></common-header>
            <div id="content" contenteditable="true" data-placeholder="输入内容" ref="content"
                v-touch:tap="checkBold"
                v-touch:longtap="checkBold"
                @click="checkBold"
                @keyup="checkBoldWithKey">
            </div>
            <div class="preview" v-if="files.length > 0">
                <ul>
                    <li v-for="(img, idx) in files" :key="idx" :style="{backgroundImage: 'url(' + getDataUrl(img) + ')'}">
                        <button class="btn-close" @click="removeImage(idx)"></button>
                    </li>
                </ul>
            </div>
            <div class="toolbar">
                <label class="tool btn-img-upload">
                    <!-- 上传图片 -->
                    <input type="file" multiple accept="image/*" @change="previewImages" ref="file">
                </label>
                <button class="tool btn-bold" :class="{active: isBold}" @click="triggerBold">
                    <!-- 加粗按钮 -->
                </button>
            </div>
        </div>
        <dialog class="submitting-dialog" :open="isSubmitting">正在发布，请不要关闭页面</dialog>
    </div>
</template>

<script>
import CommonHeader from '../../components/CommonHeader';
import { upload } from '~/plugins/upload.js';
import axios from '~/plugins/axios';

export default {
  name: 'post',
  data() {
    return {
      isBold: false,
      files: [],
      timer: null,
      isSubmitting: false,
    };
  },
  mounted() {
    const self = this;
    // 如果有保存的内容，从 localStorage 读取
    setTimeout(() => {
      let content = localStorage.getItem('saved-tweet');
      if (content && self.$refs && self.$refs.content) {
        self.$refs.content.innerHTML = content;
      }
    }, 100);
    // 每5秒种自动保存一次编辑内容
    this.timer = (function autoSave() {
      return setTimeout(function() {
        if (self.$refs && self.$refs.content) {
          localStorage.setItem('saved-tweet', self.$refs.content.innerHTML);
          autoSave();
        }
      }, 10000);
    })();
  },
  head() {
    return {
      title: '发布币文',
    };
  },
  methods: {
    triggerBold: function() {
      let range = this.getRange();
      // 如果已经是加粗，则移除加粗
      const node = range.startContainer;
      const parentNode = node.parentNode;
      if (parentNode.nodeName === 'B' || parentNode.nodeName === 'STRONG') {
        this.isBold = false;

        // 如果当前已经是加粗，并且光标在加粗块的最后位置，则将光标移动到下一个节点
        if (this.isCaretAtEndOfBold()) {
          let nextNode = parentNode.nextSibling;
          let charPosition = 1;
          // 如果下一节点不存在，创建一个新的节点
          if (!nextNode) {
            nextNode = document.createTextNode('\u200B');
            parentNode.parentNode.insertBefore(nextNode, parentNode.nextSibling);
          }
          window.getSelection().collapse(nextNode, charPosition);
        } else if (range.startOffset !== range.endOffset) {
          // 有文字被选中，执行命令
          document.execCommand('bold');
        } else {
          // 没有文字被选中，但光标在加粗文字内，将整块文字变为普通
          const text = document.createTextNode(node.parentElement.innerText);
          parentNode.parentNode.replaceChild(text, parentNode);
        }
      } else {
        this.isBold = true;
        document.execCommand('bold');
      }
    },
    previewImages: function() {
      const files = this.$refs.file.files;
      const totalFiles = files.length;
      // 如果已经有9张图片，不能再增加
      if (this.files.length === 9) {
        return;
      }

      // 计算还可以放几张图片
      let available = 9 - this.files.length;
      available = available < 0 ? 0 : available;
      for (let i = 0; i < totalFiles && available--; i++) {
        this.files.push(files[i]);
      }
      this.$refs.file.value = null;
      // 如果超过了9张图片，只使用前9张
    },
    // 鼠标点击之后，光标位置检查是否需要处理 bold
    checkBold: function() {
      let range = this.getRange();
      // 如果光标所在的文字区域为加粗则设置加粗状态（工具栏显示变动）
      const node = range.startContainer;
      this.isBold = node.nodeName === '#text' && (node.parentNode.nodeName === 'B' || node.parentNode.nodeName === 'STRONG');
    },
    // 在按键完成（释放）之后，检查是否需要处理 bold
    checkBoldWithKey: function(event) {
      // 上、下、左、右、退格键按下，检查是否有加粗显示
      if ([37, 38, 39, 40, 8, 127].indexOf(event.keyCode) >= 0) {
        this.checkBold();
      }
    },
    getRange: function() {
      this.$refs.content.focus();

      let selection = window.getSelection ? window.getSelection() : document.selection;
      let range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
      return range;
    },
    // 判断当前光标是否在加粗文字的最后
    isCaretAtEndOfBold: function() {
      let range = this.getRange();
      const node = range.startContainer;
      const parentNode = node.parentNode;
      if (parentNode.nodeName === 'B' || parentNode.nodeName === 'STRONG') {
        // 如果当前已经是加粗，并且光标在加粗块的最后位置，则将光标移动到下一个节点
        const caretPosition = this.getCaretPosition();
        return caretPosition === node.wholeText.length;
      }
    },
    // 获取光标位置
    getCaretPosition: function() {
      if (window.getSelection && window.getSelection().getRangeAt) {
        var range = window.getSelection().getRangeAt(0);
        var selectedObj = window.getSelection();
        var rangeCount = 0;
        var childNodes = selectedObj.anchorNode.parentNode.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
          if (childNodes[i] === selectedObj.anchorNode) {
            break;
          }
          if (childNodes[i].outerHTML) rangeCount += childNodes[i].outerHTML.length;
          else if (childNodes[i].nodeType === 3) {
            rangeCount += childNodes[i].textContent.length;
          }
        }
        return range.startOffset + rangeCount;
      }
      return -1;
    },
    // 将光标移动到指定元素上
    moveCaret: async function(node) {
      let selection = window.getSelection();
      let range = document.createRange();
      range.setStartAfter(node);
      selection.removeAllRanges();
      selection.addRange(range);
    },
    // 发布博文
    publish: async function() {
      if (this.isSubmitting) {
        return;
      }
      // 检查博文（纯文本）内容是否为空
      if (!this.$refs.content.innerText.trim().length) {
        alert('博文不能为空哦');
        return;
      }

      this.isSubmitting = true;

      // 中止自动保存的 timer
      clearTimeout(this.timer);

      // 有图片的情况下上传图片

      const uploadPromises = [];
      const files = this.files;
      for (let i = 0; i < files.length; i++) {
        uploadPromises.push(upload(files[i]));
      }

      let images;
      if (uploadPromises.length) {
        images = await Promise.all(uploadPromises);
      }

      this.isSubmitting = false;

      // 提交给服务器API
      const content = this.$refs.content.innerHTML.replace(/\u200B/gi, ''); // 删除0宽空格（在“加粗”按下之后会添加）
      const categoryId = '29a88140-316f-11e8-87ac-055d9ddf12ff';
      const resp = await axios.post('/api/tweet/put', { content, images, categoryId });
      console.log(resp);
    },
    // 删除一个图片
    removeImage: function(idx) {
      this.files.splice(idx, 1);
    },
    getDataUrl: function(imgFile) {
      return URL.createObjectURL(imgFile);
    },
  },
  components: { CommonHeader },
};
</script>

<style lang="stylus" scoped>
.post {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}

.post-page {
  font-size: 16px;
  position: static;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  pointer-events: default;
  min-height 500px

  #content {
    // height: calc(100% - 46px);
    padding: 1em;
    overflow-y: auto;
    box-sizing: border-box;
    flex: auto;
    // margin-top: 50px;
  }

  [contentEditable=true] {
    outline: none;
    caret-color: #138FF2;
  }

  [contentEditable=true]:empty {
    color: #aaa;
  }

  [contentEditable=true]:empty::before {
    content: attr(data-placeholder);
  }

  .preview {
    padding: 6px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        float: left;
        width: calc(33% - 8px);
        padding-top: calc(33% - 8px);
        margin: 4px;
        background-color: #eee;
        border-radius: 3px;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        position: relative;
      }
    }

    // 关闭按钮
    .btn-close {
      background-image: url("data:image/svg+xml,%3Csvg width='21px' height='21px' viewBox='0 0 21 21' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='X' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' opacity='0.600000003'%3E%3Cg id='XX' transform='translate%28-1273.000000, -385.000000%29' fill='%231D2043'%3E%3Cg id='XXX' transform='translate%280.000000, -3.000000%29'%3E%3Cg id='Group-6' transform='translate%28460.000000, 73.000000%29'%3E%3Cg id='Group-31-Copy' transform='translate%28125.000000, 306.000000%29'%3E%3Cg id='Group'%3E%3Cg id='Group-4-Copy' transform='translate%28697.500000, 21.000000%29 scale%28-1, 1%29 translate%28-697.500000, -21.000000%29 translate%28677.000000, 0.000000%29'%3E%3Cpath d='M21.0680942,17.8040151 L21.0680942,7.15401513 C21.0680942,6.325588 20.3965213,5.65401513 19.5680942,5.65401513 C18.7396671,5.65401513 18.0680942,6.325588 18.0680942,7.15401513 L18.0680942,7.15401513 L18.0680942,17.8040151 L7.41809418,17.8040151 C6.58966706,17.8040151 5.91809418,18.475588 5.91809418,19.3040151 C5.91809418,20.1324423 6.58966706,20.8040151 7.41809418,20.8040151 L7.41809418,20.8040151 L18.0680942,20.8040151 L18.0680942,31.4540151 C18.0680942,32.2824423 18.7396671,32.9540151 19.5680942,32.9540151 L19.5680942,32.9540151 L19.5680942,32.9540151 C20.3965213,32.9540151 21.0680942,32.2824423 21.0680942,31.4540151 L21.0680942,20.8040151 L31.7180942,20.8040151 C32.5465213,20.8040151 33.2180942,20.1324423 33.2180942,19.3040151 L33.2180942,19.3040151 C33.2180942,18.475588 32.5465213,17.8040151 31.7180942,17.8040151 L21.0680942,17.8040151 Z' id='Combined-Shape' transform='translate%2819.568094, 19.304015%29 rotate%2845.000000%29 translate%28-19.568094, -19.304015%29 '%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-repeat: no-repeat;
      backgorund-size: 20px 20px;
      width: 30px;
      height: 30px;
      position: absolute;
      right: 0;
      top: 0;
      background-color: transparent;
      background-position: center;
      border: none;
    }
  }

  .toolbar {
    background-color: #F0F0F0;
    border-top: 1px solid #ccc;
    // position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    min-height: 51px;

    .tool {
      height: 50px;
      width: 50px;
      background-repeat: no-repeat;
      background-position: center center;
      border: none;
      background-color: transparent;
      display: block;
      transition: background-color 0.3s;
      outline: none;
      overflow: hidden;
    }

    .tool:active, .tool.active {
      background-color: #ccc;
    }

    .btn-img-upload {
      background-image: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='发布页' transform='translate(-52.000000, -842.000000)' fill='%23636363'%3E%3Cg id='Group' transform='translate(44.000000, 834.000000)'%3E%3Cpath d='M12.8,8 L35.2,8 C37.8509668,8 40,10.1490332 40,12.8 L40,35.2 C40,37.8509668 37.8509668,40 35.2,40 L12.8,40 C10.1490332,40 8,37.8509668 8,35.2 L8,12.8 C8,10.1490332 10.1490332,8 12.8,8 Z M34.0587608,35.2 C34.689922,35.2 35.2000721,34.706075 35.2,34.0723217 L35.1874517,25.6762634 L35.1338333,21.1322403 C35.1258284,20.5042437 34.6179499,20 33.9924859,20 C29.4682386,20 28.6697866,23.2925195 27.9907042,25.4699967 C27.4759746,27.1225201 27.174673,27.8571077 26.4453256,27.9751399 C25.0494801,28.1964322 23.8076747,27.8663403 22.533922,27.4824097 C21.5227083,27.1775535 20.4761216,26.8578528 19.1179207,26.8257378 C14.774,26.8257378 12.8035151,33.1516706 12.8035151,33.6119961 C12.8035151,34.0723217 12.7601372,34.333984 12.9781446,34.6273266 C13.1938802,34.9172659 13.6033922,35.2 14.4032692,35.2 L34.0587608,35.2 Z M16.8,20 C18.5673112,20 20,18.5673112 20,16.8 C20,15.0326888 18.5673112,13.6 16.8,13.6 C15.0326888,13.6 13.6,15.0326888 13.6,16.8 C13.6,18.5673112 15.0326888,20 16.8,20 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-size: 24px 24px;
      position: relative;

      input[type='file'] {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }

    .btn-bold {
      background-image: url('data:image/png;base64,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');
      background-size: 20px 20px;
    }
  }

  // 半透明背景
  .backdrop {
    color: rgba(0, 0, 0, 0.3);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
}

.post-page.submitting {
  opacity: 0.3;
  pointer-events: none;
}

.submitting-dialog {
  display: none;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  width: -webkit-fit-content;
  height: -webkit-fit-content;
  color: black;
  margin: auto;
  border: none;
  padding: 1em;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 0.8rem;
  border-radius: 4px;
}

.submitting-dialog[open=open] {
  display: block;
}
</style>

