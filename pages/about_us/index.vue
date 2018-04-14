<template>
  <div class="aboutUS">
     <div class="header">
       <div class="backpage"><a href="javascript:history.back(-1);" class="backtoPage"><img src="../../assets/img/back.png" alt="back"/></a></div>  
       <div class="title">关于知币</div>
       <div class="baipishu"><a href="/api/baipishu.pdf" target="blank">白皮书</a></div>
     </div>
     <div class="book">
       <div class="bookTitle">1、如何获取知豆？</div>  
       <div class="pcont">
           <p>1、锁币：计算挖矿收益时，系统将按照锁定的ZIB数量来就统计收益倍数，得到的收益可以直接翻多倍。</p>
           <p>2、投票：有锁定ZIB的用户，投票时需要付出1ZIB的成本，投票越早，奖励越多，最终获得的投票数越多，奖励越多。</p>
           <p>3、发布内容：发布优质文章，被投票或评论后可获得ZIB，数量越多奖励越多。</p>
           <p>4、评论：发布评论，增加互动，可获得评论收益，评论越早奖励越多，互动数量越多，奖励越多。</p>
           <p>5、邀请好友：邀请好友注册即可获得邀请奖励。</p>
       </div>
       <div class="bookTitle">2、锁定ZIB</div>
       <div class="pcont">
           <p>1、锁定数量越多，奖励越多，获得的收益成倍数增长。</p>
           <p>2、解锁需要等待30天后才变为可用状态，解锁中的数量不增加收益倍数。</p>
       </div> 
       <div class="bookTitle">3、注册及邀请</div>  
       <div class="pcont">
           <p>1、前10000名用户注册即赠送1000ZIB，之后注册用户每增加10000名赠送数量少100ZIB,递减至500ZIB后恒定，每邀请一位好友注册即赠送200ZIB。</p>
           <p>2、注册及邀请好友后获得的ZIB均为待领取状态，根据每日首次启动领取20ZIB的规则，半年内能领取完成所有奖励的的用户，
按此规则实行。半年内不能领取完成所有奖励的用户每日领取的额度增加，保证所有用户的奖励半年内都能领完。领取后的ZIB自动进入锁定状态。</p>
       </div>  
     </div>   
  </div>
</template>
<script>
export default {
  name: 'aboutUS',
  head () {
    return {
      title: '关于我们'
    }
  }
}
</script>

<style lang="stylus">
.aboutUS {
    width 100%
    max-width 750px
    margin 0 auto

   .header {
       padding 10px 15px
       line-height 20px
       display flex
       justify-content space-around

       .backpage {
          width 12px
          height 20px

          a {
              display block
              width 12px
              height 20px

              img {
                  width 100%
                  height 100%
              }
          }     
       } 

       .title {
           flex 1
           font-size 18px
           color #202020
           text-align center
           font-weight bolder
       } 

       .baipishu {
           line-height 20px
           font-size 15px
           
           a {
               color #9B9B9B
           }
       } 
   }

    .book {
       clear both
       padding 20px 15px

       .bookTitle {
           clear both
           font-size 16px
           color #4a4a4a
           
       }

      .pcont {
        clear both  
        margin-top 30px

        p {
            margin-top 15px
            color #9B9B9B
            font-size 15px
            line-height 25px
            clear both
        }
      }  
    }
}
</style>


