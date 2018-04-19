<template>
  <div class="complaint" :class="{'show': show}">
      <ul class="menu">
          <li class="btn-adv">广告、营销</li>
          <li class="btn-junk">垃圾内容、水文</li>
          <li class="btn-censored">低俗、色情、反动</li>
          <li class="btn-cancel" @click="hide">取消</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'complaint',
  props: ['tweet', 'show'],
  data() {},
  methods: {
    hide() {
      this.isHide = true;
    },
  },
};
</script>

<style lang="stylus" scoped>
_radius = 6px;

.complaint.show {
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: auto;

    .menu {
        bottom: 0%;
    }
}

.complaint {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 100%;
    top: 0;
    background-color: transparent;
    pointer-events: none;

    .menu {
        position: absolute;
        overflow: hidden;
        transition: all 0.5s;
        left: 0;
        bottom: -100%;
        margin: 0;
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        list-style: none;

        li {
            background-color: rgba(255, 255, 255, 0.8);
            color: #0076ff;
            text-align: center;
            line-height: 50px;
            transition: background-color 0.3s;
        }

        li:active {
            // background-color: rgba(0, 0, 0, 0.5);
            background-color: rgba(255, 255, 255, 0.2);
        }

        li.btn-adv {
            border-top-left-radius: _radius;
            border-top-right-radius: _radius;
        }

        li.btn-junk {
            border-top: 1px solid #999;
            border-bottom: 1px solid #999;
            box-sizing: border-box;
        }

        li.btn-censored {
            color: #fe3824;
            border-bottom-left-radius: _radius;
            border-bottom-right-radius: _radius;
        }

        li.btn-cancel {
            border-radius: _radius;
            margin-top: 10px;
        }
    }
}
</style>

