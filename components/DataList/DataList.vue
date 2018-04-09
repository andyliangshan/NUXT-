<template>
  <div class="index-datalist" id="wrapper">
    <div class="datalist" id="myScrollbar">
      <div class="tipsNews">5条新币文</div>
      <div class="dataListCont">
        <div class="list-top row">
          <div class="list-top-profile col-2"><img src="../../assets/img/person-pic.png" alt="profile"/></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><router-link :to="'/masterState/'" class="backtoPage">MXinsa</router-link></div>
            <div class="list-top-info-publishTime"><span>39分钟前</span><em><i></i>精选</em></div>
          </div>
          <div class="list-top-attent col-2">
            <!--<a href="javascript:void(0)" class="delete" ref="deleteBtn">删除</a>-->
            <a href="javascript:void(0)" class="attention" ref="attentBtn">关注</a>
            <a href="javascript:void(0)" class="report">×</a>
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc">大撒上大叔大叔大叔大叔阿斯顿发发多少</div>
            <div class="queryDetail"><router-link :to="'/detail/'" class="backtoPage">&nbsp;</router-link></div>
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <span><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span>&nbsp;</span><em>9636</em></div>
          <div class="dianzan col-2 active"><span>&nbsp;</span><em>9636</em></div>
          <div class="sendmsg col-2"><span>&nbsp;</span>8363</div>
          <div class="share col-7"><span>&nbsp;</span>3.2K</div>
        </div>
      </div>
      <div class="dataListCont">
        <div class="list-top row">
          <div class="list-top-profile col-2"><img src="../../assets/img/person-pic.png" alt="profile"/></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><router-link :to="'/masterState/'" class="backtoPage">MXinsa</router-link></div>
            <div class="list-top-info-publishTime"><span>39分钟前</span></div>
          </div>
          <div class="list-top-attent col-2">
            <a href="javascript:void(0)" class="attention" ref="attentBtn">关注</a>
            <a href="javascript:void(0)" class="report">×</a>
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc">大撒上大叔大叔大叔大叔阿斯顿发发多少</div>
            <div class="queryDetail"><router-link :to="'/detail/'" class="backtoPage">&nbsp;</router-link></div>
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <span><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span>&nbsp;</span><em>9636</em></div>
          <div class="dianzan col-2 active"><span>&nbsp;</span><em>9636</em></div>
          <div class="sendmsg col-2"><span>&nbsp;</span>8363</div>
          <div class="share col-7"><span>&nbsp;</span>3.2K</div>
        </div>
      </div>
      <div class="dataListCont">
        <div class="list-top row">
          <div class="list-top-profile col-2"><img src="../../assets/img/person-pic.png" alt="profile"/></div>
          <div class="list-top-info col-8">
            <div class="list-top-info-title"><router-link :to="'/masterState/'" class="backtoPage">MXinsa</router-link></div>
            <div class="list-top-info-publishTime"><span>39分钟前</span></div>
          </div>
          <div class="list-top-attent col-2">
            <a href="javascript:void(0)" class="attention" ref="attentBtn">关注</a>
            <a href="javascript:void(0)" class="report">×</a>
          </div>
        </div>
        <div class="list-mid">
          <div class="list-mid-publish-content">
            <div class="contDesc" ref="contDesc">大撒上大叔大叔大叔大叔阿斯顿发发多少</div>
            <div class="queryDetail"><router-link :to="'/detail/'" class="backtoPage">&nbsp;</router-link></div>
            <p>查看详情</p>
          </div>
          <div class="list-mid-publish-img">
            <span><img src="../../assets/img/profile-ho.png" alt="profile-ho"/></span>
          </div>
        </div>
        <div class="list-bot">
          <div class="coin"><span>&nbsp;</span><em>9636</em></div>
          <div class="dianzan col-2 active"><span>&nbsp;</span><em>9636</em></div>
          <div class="sendmsg col-2"><span>&nbsp;</span>8363</div>
          <div class="share col-7"><span>&nbsp;</span>3.2K</div>
        </div>
      </div>
      <div class="pullUp"></div>
    </div>
    <!--<report-list v-show="reportListPop"></report-list>-->
  </div>
</template>

<script>
  // import ReportList from '../../components/ReportList.vue';
  export default {
    name: 'index-datalist',
    data () {
      return {
        reportListPop: false
      }
    },
    components: {
      // ReportList,
    }
  }
</script>
<style lang="stylus">
@import "./datalist.styl";
</style>
