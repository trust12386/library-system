<template>
  <scroll-view style="height: 100vh" scroll-y refresher-enabled="true" @refresherrefresh="refresh" :refresher-triggered="trigger">
    <view class="box">
      <view class="box-title">
        <view class="title_top"></view>
        <view class="title_bottom">
          <view class="title_left">{{ city.name || '无' }}</view>
          <view class="title_right"></view>
        </view>
        <view class="text">数据来源：国家及各地卫健委每日信息发布</view>
      </view>
      <view class="box-content">
        <view class="box_card">
          <view class="box_card1">
            <view class="text"
              >统计截至
              <view
                style="display: inline-block; color: #222; margin-left: 1vw"
                >{{ city.total.mtime || '00:00:00' }}</view
              >
            </view>
            <view class="block">
              <view style="background-color: rgb(255, 250, 247)">
                <view style="color: rgb(229, 118, 49)"
                  >+{{ city.today.local_confirm_add || 0 }}</view
                >
                <view>本土确诊</view>
              </view>
              <view style="background-color: rgb(254, 247, 255)">
                <view style="color: rgb(174, 58, 198)"
                  >+{{ city.today.wzz_add || 0 }}</view
                >
                <view>本土无症状</view>
              </view>
              <view style="background-color: rgb(255, 244, 244)">
                <view style="color: rgb(190, 33, 33)"
                  >+{{ city.today.abroad_confirm_add || 0 }}</view
                >
                <view>境外输入</view>
              </view>
              <view style="background-color: rgb(243, 246, 248)">
                <view style="color: rgb(78, 90, 101)"
                  >+{{ city.today.dead_add || 0 }}</view
                >
                <view>死亡病例</view>
              </view>
              <view style="background-color: rgb(255, 250, 247)">
                <view style="color: rgb(229, 118, 49)">{{
                  city.total.highRiskAreaNum || 0
                }}</view>
                <view>高风险地区</view>
              </view>
              <view style="background-color: rgb(254, 247, 255)">
                <view style="color: rgb(174, 58, 198)">{{
                  city.total.mediumRiskAreaNum || 0
                }}</view>
                <view>中风险地区</view>
              </view>
              <view style="background-color: rgb(255, 244, 244)">
                <view style="color: rgb(230, 28, 29)">{{
                  city.total.nowConfirm || 0
                }}</view>
                <view>现有确诊</view>
              </view>
              <view style="background-color: rgb(255, 251, 235)">
                <view style="color: rgb(240, 110, 38)">{{
                  city.total.confirm || 0
                }}</view>
                <view>累计确诊</view>
              </view>
            </view>
          </view>
          <view class="box_card2">
            <view>上海疫情</view>
            <view class="title">
              <view style="background-color: #f2f5f7">地区</view>
              <view style="background-color: #e8effc; color: #005dff"
                >新增确诊</view
              >
              <view style="background-color: #fdeeee; color: #f55253"
                >累计确诊</view
              >
              <view style="background-color: #e9f7ec; color: #178b50"
                >治愈</view
              >
              <view style="background-color: #f2f2f2; color: #66666c"
                >死亡</view
              >
            </view>
            <view
              class="content"
              v-for="(item, index) in city.children"
              :key="index"
            >
              <view>{{ item.name }}</view>
              <view>{{ item.today.confirm }}</view>
              <view>{{ item.total.confirm }}</view>
              <view>{{ item.total.heal }}</view>
              <view>{{ item.total.dead }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
</scroll-view>
</template>

<script>
export default {
  data() {
    return {
      city: {},
      trigger: false
    };
  },
  methods: {
    refresh() {
      this.trigger = true;
      uni.redirectTo({
        url: '../center/index',
      });
      uni.stopPullDownRefresh()
      setTimeout(() => {
        this.trigger = false;
      },1000)
    }  
  },
  onLoad(option) {
    const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
    const qqmapsdk = new QQMapWX({
      key: 'HDYBZ-OZWCU-J5QV5-2PTL2-GABBQ-XAFFS',
    });
    uni.getLocation({
      type: 'wgs84',
      success: (res) => {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
          success: (res) => {
            const city = res.result.address_component.province;
            this.city = this.totalCity.find((item) => {
              return item.name + '省' === city;
            });
          },
          fail: (res) => {
            console.log('fail');
            console.log(res);
          },
        });
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.box {
  background: url(https://mat1.gtimg.com/news/feiyanarea/area_head_bg.png);
  background-size: cover;
  height: 30vh;
  .box-title {
    position: relative;
    height: 30vh;
    .title_top {
      background: url(https://mat1.gtimg.com/news/images/inews/2020/feiyan/area/area_h3_bg.png);
      background-size: 100% 100%;
      width: 45.867vw;
      height: 5.867vw;
      position: relative;
      left: 25%;
      top: 10vh;
    }
    .text {
      position: relative;
      font-size: 3.2vw;
      color: white;
      text-align: center;
      top: 14vh;
    }
    .title_bottom {
      display: flex;
      position: relative;
      left: 25%;
      top: 11vh;
      .title_left {
        display: inline-block;
        font-weight: 600;
        font-size: 5.867vw;
        line-height: 8vw;
        color: #0056ee;
        background-color: #fff;
        padding: 0 1.333vw;
        margin-right: 1.6vw;
        border-radius: 1.067vw;
      }
      .title_right {
        background: url(https://mat1.gtimg.com/news/images/inews/2020/feiyan/area/area_h2_bg.png);
        background-size: 100% 100%;
        width: 29.867vw;
        height: 7.467vw;
      }
    }
  }
  .box-content {
    margin-top: -3.2vw;
    border-radius: 3.2vw 3.2vw 0 0;
    background-color: #fff;
    .box_card {
      margin: 0 5.333vw;
      padding-top: 5vw;
      .box_card1 {
        .text {
          font-size: 3.2vw;
          color: #737373;
          line-height: 3.733vw;
        }
        .block {
          display: flex;
          margin-top: 5vw;
          flex-wrap: wrap;
          > view {
            margin: 0.533vw 0.533vw 0 0;
            width: 21.8667vw;
            height: 21.8667vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &:nth-of-type(4n) {
              margin-right: 0;
            }
            > view:nth-child(1) {
              font-size: 5.867vw;
              font-weight: 700;
              text-align: center;
            }
            > view:nth-child(2) {
              font-size: 3.2vw;
              font-weight: 700;
            }
          }
        }
      }
    }
    .box_card2 {
      > view:nth-child(1) {
        margin: 5vw 0;
        font-size: 4.267vw;
        font-weight: 700;
      }
      .title {
        display: flex;
        justify-content: space-around;
        > view {
          padding: 0 calc(86vw / 10 - 14em / 10);
          line-height: 10.667vw;
        }
      }
      .content {
        display: flex;
        justify-content: space-around;
        border-bottom: 0.1vh solid #f5f5f5;
        view {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 10.667vw;
        }
        view:nth-of-type(1),
        view:nth-of-type(4),
        view:nth-of-type(5) {
          flex: 51.73;
        }
        view:nth-of-type(2),
        view:nth-of-type(3) {
          flex: 83.72;
        }
      }
    }
  }
}
</style>
