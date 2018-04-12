<template>
  <div class="accountClose">
    <div class="incomeInfo">
      <div class="closeIncome">×</div>
      <div class="incomeList">
        <div class="title">账号封停</div>
        <div class="subTitle">您发布的内容被人举报后经过核实，符合举报条件，原内容产生的全部收益已转入举报人账户。</div>
        <div class="list">
          <div class="listInfo">
            <div class="listInfo-l">转出收益</div>
            <div class="listInfo-r">
              <span>20<b>ZIB</b></span>
            </div>
          </div>
        </div>
        <div class="accoutDesc">账号将被封号 1 天，1 天内您将无法进行文章发布、投票和评论操作，望知晓！</div>
        <div class="queryDetail"><a href="/">查看详情</a></div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="stylus">
  .accountClose {
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
        overflow: hidden;
        padding: 10px 20px 0;

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
          color: #939393;
          font-size: 12px;
          clear: both;
          padding-top: 5px;
          line-height: 18px;
        }

        .list {
          clear: both;
          padding: 10px 0 0;
          overflow: hidden;

          .listInfo {
            clear: both;
            padding: 15px 0;
            display: flex;
            justify-content: space-between;

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

        .accoutDesc {
          clear: both;
          overflow: hidden;
          padding-top: 5px;
          color: #0d0d0d;
          font-weight: bolder;
          font-size: 14px;
          line-height: 20px;
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
