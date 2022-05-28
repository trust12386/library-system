<template>
  <view class="box">
    <view class="box-title">
      <view class="title"></view>
      <view class="text">数据来源：国家及各地卫健委每日信息发布</view>
    </view>
    <view class="box-card">
      <view class="title">国内疫情</view>
      <u-grid :border="true" col="3">
        <u-grid-item>
          <view class="card1">
            <view>+{{ chinaAdd.localConfirmH5 || 0 }}</view>
            <view>新增本土确诊</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card2">
            <view>+{{ chinaAdd.noInfectH5 || 0 }}</view>
            <view>新增本土无症状</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card3">
            <view>+{{ chinaAdd.confirm || 0 }}</view>
            <view>新增确诊病例</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card4">
            <view>{{ chinaTotal.localConfirm || 0 }}</view>
            <view>现有本土确诊</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card5">
            <view>{{ chinaTotal.noInfectH5 || 0 }}</view>
            <view>现有本土无症状</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card6">
            <view>{{ chinaTotal.nowConfirm || 0 }}</view>
            <view>现有确诊病例</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card7">
            <view>+{{ chinaAdd.importedCase || 0 }}</view>
            <view>新增境外输入</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card8">
            <view>+{{ chinaAdd.dead || 0 }}</view>
            <view>新增死亡</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card9">
            <view>{{ chinaTotal.highRiskAreaNum || 0 }}</view>
            <view>高风险地区</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card10">
            <view>{{ chinaTotal.importedCase || 0 }}</view>
            <view>现有境外输入</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card11">
            <view>{{ chinaTotal.dead || 0 }}</view>
            <view>累计死亡</view>
          </view>
        </u-grid-item>
        <u-grid-item>
          <view class="card12">
            <view>{{ chinaTotal.mediumRiskAreaNum || 0 }}</view>
            <view>中风险地区</view>
          </view>
        </u-grid-item>
      </u-grid>
    </view>
    <view class="box-kownledge">
      <view class="title">新冠肺炎预防须知</view>
      <view class="content">
        <view class="content-title"
          ><img
            src="https://puui.qpic.cn/vupload/0/1580113954413_67dj6qw9r34.png/0"
            class="icon"
          />
          <view class="text">个人清洁</view>
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text">经常保持双手清洁，尤其在触摸口、鼻或眼之前。</view>
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text"
            >经常用洗手液和清水清洗双手，搓手最少20秒，并用纸巾擦干。</view
          >
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text">
            打喷嚏或咳嗽时应用纸巾掩盖口鼻，把用过的纸巾弃置于有盖垃圾箱内，然后彻底清洁双手。
          </view>
        </view>
        <view class="content-title"
          ><img
            src="https://puui.qpic.cn/vupload/0/1580113954413_b3dr1w759hr.png/0"
            class="icon"
          />
          <view class="text">尽量避免</view>
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text"
            >减少前往人流密集的场所。如不可避免，应戴上外科口罩。</view
          >
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text"
            >避免到访医院。如有必要到访医院，应佩戴外科口罩及时刻注重个人和手部卫生。</view
          >
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text">
            避免接触动物（包括野味）、禽鸟或其粪便；避免到海鲜、活禽市场或农场。
          </view>
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text"> 切勿进食野味及切勿光顾有提供野味的餐馆。 </view>
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text">
            注意食物安全和卫生，避免进食或饮用生或未熟透的动物产品，包括奶类、蛋类和肉类。
          </view>
        </view>
        <view class="content-title"
          ><img
            src="https://puui.qpic.cn/vupload/0/1580113954413_qs8jz3v8m7.png/0"
            class="icon"
          />
          <view class="text">尽快就诊</view>
        </view>
        <view class="content-content">
          <view class="icon"></view>
          <view class="text"
            >如有身体不适，特别是有发烧或咳嗽，应戴上外科口罩并尽快就诊。</view
          >
        </view>
      </view>
    </view>
    <view class="box-bottom"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
    };
  },

  methods: {},
  onLoad() {
    this.$store.commit('getList');
  },
  onPullDownRefresh() {
    uni.redirectTo({
      url: '../index/index',
    });
    uni.stopPullDownRefresh()
  },
};
</script>

<style lang="scss" scoped>
$bg1-color: #fffaf7;
$bg2-color: #fef7ff;
$bg3-color: #fff4f4;
$bg4-color: #f3f6f8;
$wd1-color: #e57631;
$wd2-color: #ca3f81;
$wd3-color: #be2121;
$wd4-color: #4e5a65;
.box {
  background: url(https://mat1.gtimg.com/news/feiyanarea/head_bg_new.png);
  background-size: cover;
  height: 30vh;
  .box-title {
    position: relative;
    height: 30vh;
    .title {
      background: url(https://mat1.gtimg.com/news/images/inews/2020/feiyan/area/head_title.png);
      background-size: 100% 100%;
      height: 16vw;
      width: 50vw;
      position: relative;
      left: 25%;
      top: 10vh;
    }
    .text {
      position: relative;
      font-size: 3.2vw;
      color: white;
      text-align: center;
      top: 13vh;
    }
  }
  .box-card {
    .title {
      color: #222;
      font-size: 5.5vw;
      font-weight: 600;
      text-align: center;
      margin: 2vh;
    }
    .card1,
    .card4,
    .card12 {
      margin: 0.1vh;
      background-color: $bg1-color;
      width: 32.6vw;
      height: 10vh;
      text-align: center;
      view {
        line-height: 4vh;
        &:nth-of-type(1) {
          margin-top: 1.5vh;
          color: $wd1-color;
          font-size: 5.5vw;
          font-weight: 700;
        }
        &:nth-of-type(2) {
          font-size: 4vw;
          font-weight: 700;
        }
      }
    }
    .card2,
    .card5,
    .card7,
    .card10 {
      margin: 0.1vh;
      background-color: $bg2-color;
      width: 32.6vw;
      height: 10vh;
      text-align: center;
      view {
        line-height: 4vh;
        &:nth-of-type(1) {
          margin-top: 1.5vh;
          color: $wd2-color;
          font-size: 5.5vw;
          font-weight: 700;
        }
        &:nth-of-type(2) {
          font-size: 4vw;
          font-weight: 700;
        }
      }
    }
    .card3,
    .card6,
    .card9 {
      margin: 0.1vh;
      background-color: $bg3-color;
      width: 32.6vw;
      height: 10vh;
      text-align: center;
      view {
        line-height: 4vh;
        &:nth-of-type(1) {
          margin-top: 1.5vh;
          color: $wd3-color;
          font-size: 5.5vw;
          font-weight: 700;
        }
        &:nth-of-type(2) {
          font-size: 4vw;
          font-weight: 700;
        }
      }
    }
    .card8,
    .card11 {
      margin: 0.1vh;
      background-color: $bg4-color;
      width: 32.6vw;
      height: 10vh;
      text-align: center;
      view {
        line-height: 4vh;
        &:nth-of-type(1) {
          margin-top: 1.5vh;
          color: $wd4-color;
          font-size: 5.5vw;
          font-weight: 700;
        }
        &:nth-of-type(2) {
          font-size: 4vw;
          font-weight: 700;
        }
      }
    }
  }
  .box-kownledge {
    .title {
      color: #222;
      font-size: 5.5vw;
      font-weight: 600;
      text-align: center;
      margin: 3vh;
    }
    .content {
      background-color: #f8f8f8;
      margin: 0 5vw;
      padding: 0 0 2vh 5vw;
      box-sizing: border-box;
      position: relative;
      .content-title {
        display: flex;
        align-items: center;
        padding-top: 2vh;
        .icon {
          display: inline-block;
          height: 2ex;
          width: 2ex;
        }
        .text {
          font-size: 4vw;
          font-weight: 500;
          margin-left: 2vw;
        }
      }
      .content-content {
        padding-top: 1.5vh;
        .icon {
          position: relative;
          top: 1.8vh;
          height: 1vw;
          width: 1vw;
          background-color: #005dff;
          border-radius: 0.5vw;
        }
        .text {
          font-size: 3.5vw;
          margin-left: 2vw;
        }
      }
    }
  }
  .box-bottom {
    height: 3vh;
  }
}
</style>
