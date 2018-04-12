<template>
  <div class="income">
    <div class="incomeInfo">
      <div class="closeIncome">×</div>
      <div class="incomeList">
        <div class="title">昨日收益</div>
        <div class="subTitle">昨日的收益已为您放入账户内，请查收</div>
        <div class="list">
          <div class="listInfo">
            <div class="listInfo-l">文章收益</div>
            <div class="listInfo-r">
              <span>6000<b>ZIB</b></span>
              <span>≈2200<b>CNY</b></span>
            </div>
          </div>
          <div class="listInfo">
            <div class="listInfo-l">投票收益</div>
            <div class="listInfo-r">
              <span>6000<b>ZIB</b></span>
              <span>≈2200<b>CNY</b></span>
            </div>
          </div>
          <div class="listInfo">
            <div class="listInfo-l">评论收益</div>
            <div class="listInfo-r">
              <span>6000<b>ZIB</b></span>
              <span>≈2200<b>CNY</b></span>
            </div>
          </div>
        </div>
        <div class="queryDetail"><a href="/">查看详情</a></div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="stylus">
.income {
  width: 100%;
  position: fixed;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;

  .incomeInfo {
    width: 80%;
    margin: 0 auto;
    margin-top: 20%;
    background: #fff;
    border-radius: 6px;
    padding: 10px;
    position: relative;

    .closeIncome {
      position: absolute;
      width: 30px;
      height: 30px;
      color: #939393;
      font-size: 20px;
      top: 0;
      right: 0;
      text-align: center;
    }

    .incomeList {
      width: 100%;
      padding-top: 10px;

      .title {
        width: 100%;
        text-align: center;
        color: #0d0d0d;
        font-size: 18px;
        font-weight: bolder;
        line-height: 1;
      }

      .subTitle {
        width: 100%;
        text-align: center;
        color: #939393;
        font-size: 12px;
        clear: both;
        padding-top: 5px;
      }

      .list {
        clear: both;
        padding: 10px 30px 0;
        overflow: hidden;

        .listInfo {
          clear: both;
          padding: 15px 0;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e6e6e6;

          .listInfo-l {
            color: #0d0d0d;
            font-size: 14px;
            font-weight: bolder;
          }

          .listInfo-r {
            text-align: right;

            span {
              display: inline-block;
              width: 100%;
              color: #0d0d0d;
              font-size: 12px;
              clear: both;

              b {
                display: inline-block;
                margin-left: 5px;
              }
            }
          }
        }
      }

      .queryDetail {
        clear: both;
        overflow: hidden;
        padding-top: 20px;
        text-align: center;

        a {
          display: block;
          width: 100%;
          color: #138FF2;
          font-size: 16px;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
