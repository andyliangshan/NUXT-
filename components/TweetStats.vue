<template>
  <div class="tweet-stats">
      <div><span class="collect-count">{{ tweet.collectCount }}</span></div>
      <div><span :class="['zan-count', {'already-zan': tweet.iszan}]" @click="zan">{{ tweet.zanCount }}  </span></div>
      <div v-if="!hideReplyCount"><span class="reply-count" @click="jumpToReply">{{ tweet.replyCount }}</span></div>
      <div><span class="share-count">{{ tweet.shareCount }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from '~/plugins/axios';

export default {
  props: ['hideReplyCount', 'tweet'],
  computed: mapGetters(['userInfo']),
  methods: {
    async zan() {
      // 如果用户没有登录，则跳转到登录页面
      if (!this.userInfo) {
        this.$router.push({ path: '/login' });
        return;
      }

      if (this.tweet.iszan) {
        return;
      }

      const body = {
        targetUserId: this.tweet.tweetUser.id,
        tweetId: this.tweet.id,
      };

      const resp = await axios.post('/api/action/zan', body, { credentials: true });

      if (resp.data.success) {
        this.$emit('zan', resp.data.data.data);
      }
    },

    jumpToReply() {
      this.$router.push('/detail/' + this.tweet.id);
    },
  },
};
</script>

<style lang="stylus">
.tweet-stats {
    display: flex;

    > div {
        flex: 1;
        text-align: center;

        span {
            display: inline-block;
            line-height: 30px;
        }

        span:last-child {
            text-align: right;
        }

        span::before {
            content: '';
            display: inline-block;
            width: 18px;
            height: 18px;
            margin-right: 0.5em;
            margin-top: -4px;
            background-size: 16px 16px;
            background-position: left center;
            background-repeat: no-repeat;
            vertical-align: middle;
        }

        .collect-count::before {
            background-image: url("data:image/svg+xml,%0A%3Csvg width='32px' height='32px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 49.1 %2851147%29 - http://www.bohemiancoding.com/sketch --%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='正文页' transform='translate%28-56.000000, -750.000000%29' fill='%23999999' fill-rule='nonzero'%3E%3Cg id='Group-33' transform='translate%2848.000000, 742.000000%29'%3E%3Cg id='Group-32'%3E%3Cpath d='M24,37 C31.1797017,37 37,31.1797017 37,24 C37,16.8202983 31.1797017,11 24,11 C16.8202983,11 11,16.8202983 11,24 C11,31.1797017 16.8202983,37 24,37 Z M26.3594881,21 L28.4282665,18.9312215 C29.0591234,18.3003647 29.0591234,17.2775436 28.4282665,16.6466867 C27.7974097,16.0158298 26.7745886,16.0158298 26.1437317,16.6466867 L23.9507046,18.8397138 L21.7576775,16.6466867 C21.1268206,16.0158298 20.1039995,16.0158298 19.4731427,16.6466867 C18.8422858,17.2775436 18.8422858,18.3003647 19.4731427,18.9312215 L21.5419211,21 L19.5,21 C18.6715729,21 18,21.6715729 18,22.5 C18,23.3284271 18.6715729,24 19.5,24 L22.5,24 L22.5,26 L19.5,26 C18.6715729,26 18,26.6715729 18,27.5 C18,28.3284271 18.6715729,29 19.5,29 L22.5,29 L22.5,31.5 C22.5,32.3284271 23.1715729,33 24,33 C24.8284271,33 25.5,32.3284271 25.5,31.5 L25.5,29 L28.5,29 C29.3284271,29 30,28.3284271 30,27.5 C30,26.6715729 29.3284271,26 28.5,26 L25.5,26 L25.5,24 L28.5,24 C29.3284271,24 30,23.3284271 30,22.5 C30,21.6715729 29.3284271,21 28.5,21 L26.3594881,21 Z M24,40 C15.163444,40 8,32.836556 8,24 C8,15.163444 15.163444,8 24,8 C32.836556,8 40,15.163444 40,24 C40,32.836556 32.836556,40 24,40 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .zan-count::before {
            background-image: url("data:image/svg+xml,%0A%3Csvg width='30px' height='30px' viewBox='0 0 30 30' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 49.1 %2851147%29 - http://www.bohemiancoding.com/sketch --%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='正文页' transform='translate%28-329.000000, -751.000000%29'%3E%3Cg id='Group-26' transform='translate%28320.000000, 742.000000%29'%3E%3Cg id='Group-3'%3E%3Crect id='Combined-Shape-Copy' stroke='%23999999' stroke-width='3' x='10.5' y='10.5' width='27' height='27' rx='6'%3E%3C/rect%3E%3Cg id='Group-2' transform='translate%2824.000000, 27.000000%29 rotate%2845.000000%29 translate%28-24.000000, -27.000000%29 translate%2818.000000, 21.000000%29'%3E%3Crect id='Combined-Shape' fill='%239CA4B5' x='0' y='0' width='12' height='3' rx='1.5'%3E%3C/rect%3E%3Crect id='Combined-Shape' fill='%23999999' x='0' y='0' width='3' height='12' rx='1.5'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .zan-count.already-zan::before {
            background-image: url("data:image/svg+xml,%0A%3Csvg width='31px' height='30px' viewBox='0 0 31 30' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 49.1 %2851147%29 - http://www.bohemiancoding.com/sketch --%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='' transform='translate%28-235.000000, -1036.000000%29' fill='%23138FF2'%3E%3Cg id='Group-6' transform='translate%2832.000000, 743.000000%29'%3E%3Cg id='评论区' transform='translate%282.000000, 284.000000%29'%3E%3Cg id='点赞' transform='translate%28192.333333, 0.000000%29'%3E%3Cg id='Group-26'%3E%3Cg id='Group-4'%3E%3Cpath d='M24,22.7573593 L29.6568542,28.4142136 C30.4379028,29.1952621 31.7042328,29.1952621 32.4852814,28.4142136 C33.26633,27.633165 33.26633,26.366835 32.4852814,25.5857864 L25.4142136,18.5147186 C24.633165,17.73367 23.366835,17.73367 22.5857864,18.5147186 L15.5147186,25.5857864 C14.73367,26.366835 14.73367,27.633165 15.5147186,28.4142136 C16.2957672,29.1952621 17.5620972,29.1952621 18.3431458,28.4142136 L24,22.7573593 Z M15,9 L33,9 C36.3137085,9 39,11.6862915 39,15 L39,33 C39,36.3137085 36.3137085,39 33,39 L15,39 C11.6862915,39 9,36.3137085 9,33 L9,15 C9,11.6862915 11.6862915,9 15,9 Z' id='Combined-Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .reply-count::before {
            background-image: url("data:image/svg+xml,%0A%3Csvg width='33px' height='31px' viewBox='0 0 33 31' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 49.1 %2851147%29 - http://www.bohemiancoding.com/sketch --%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='个人主页_主人态' transform='translate%28-426.000000, -1037.000000%29'%3E%3Cg id='Group-6' transform='translate%2832.000000, 743.000000%29'%3E%3Cg id='评论区' transform='translate%282.000000, 284.000000%29'%3E%3Cg id='留言' transform='translate%28384.666667, 0.000000%29'%3E%3Cg id='Group-27'%3E%3Cg id='Group-13'%3E%3Cg id='Group-21' transform='translate%288.000000, 10.000000%29'%3E%3Cpath d='M16.3558943,28.5227854 L20.3786797,24.5 L21,24.5 L27.9957423,24.5 C29.380931,24.5 30.5,23.3798556 30.5,21.9944797 L30.5,4.00552025 C30.5,2.61792622 29.3812209,1.5 27.9957423,1.5 L4.0042577,1.5 C2.61906895,1.5 1.5,2.62014441 1.5,4.00552025 L1.5,21.9944797 C1.5,23.3820738 2.61877913,24.5 4.0042577,24.5 L11.6213203,24.5 L15.6441057,28.5227854 C15.8409668,28.7196465 16.1589817,28.719698 16.3558943,28.5227854 Z' id='Combined-Shape' stroke='%23999999' stroke-width='3'%3E%3C/path%3E%3Cpath d='M9,15 C7.8954305,15 7,14.1045695 7,13 C7,11.8954305 7.8954305,11 9,11 C10.1045695,11 11,11.8954305 11,13 C11,14.1045695 10.1045695,15 9,15 Z M16,15 C14.8954305,15 14,14.1045695 14,13 C14,11.8954305 14.8954305,11 16,11 C17.1045695,11 18,11.8954305 18,13 C18,14.1045695 17.1045695,15 16,15 Z M23,15 C21.8954305,15 21,14.1045695 21,13 C21,11.8954305 21.8954305,11 23,11 C24.1045695,11 25,11.8954305 25,13 C25,14.1045695 24.1045695,15 23,15 Z' id='Combined-Shape' fill='%23999999'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .share-count::before {
            background-image: url("data:image/svg+xml,%0A%3Csvg width='32px' height='32px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 49.1 %2851147%29 - http://www.bohemiancoding.com/sketch --%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='正文页' transform='translate%28-597.000000, -750.000000%29'%3E%3Cg id='Group-28' transform='translate%28591.000000, 742.000000%29'%3E%3Cg id='Group-20'%3E%3Cpath d='M12,28.5 C14.4852814,28.5 16.5,26.4852814 16.5,24 C16.5,21.5147186 14.4852814,19.5 12,19.5 C9.51471863,19.5 7.5,21.5147186 7.5,24 C7.5,26.4852814 9.51471863,28.5 12,28.5 Z M32,18.5 C34.4852814,18.5 36.5,16.4852814 36.5,14 C36.5,11.5147186 34.4852814,9.5 32,9.5 C29.5147186,9.5 27.5,11.5147186 27.5,14 C27.5,16.4852814 29.5147186,18.5 32,18.5 Z M32,38.5 C34.4852814,38.5 36.5,36.4852814 36.5,34 C36.5,31.5147186 34.4852814,29.5 32,29.5 C29.5147186,29.5 27.5,31.5147186 27.5,34 C27.5,36.4852814 29.5147186,38.5 32,38.5 Z' id='Combined-Shape' stroke='%23999999' stroke-width='3'%3E%3C/path%3E%3Cpath d='M27.4034554,15 L28.7654269,17.6730196 L16.3619715,23.9928958 L15,21.3198762 L27.4034554,15 Z M26.5692314,33.8772507 L15.1955,28.0820451 L16.5574715,25.4090255 L27.9312029,31.2042311 L26.5692314,33.8772507 Z' id='Combined-Shape' fill='%23999999'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
    }

    > div:first-child {
        text-align: left;
    }

    > div:last-child {
        text-align: right;
    }
}
</style>
