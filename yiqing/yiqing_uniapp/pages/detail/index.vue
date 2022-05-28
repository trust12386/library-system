<template>
  <view class="box">
    <view class="title">
      <view id="area"> 地区 </view>
      <view id="confirm" @click="changeClass($event)">
        新增<br />确诊
        <view
          :class="[
            confirm.isActive
              ? active_list.notActiveName
              : confirm.isActive_1
              ? active_list.ActiveName_1
              : active_list.ActiveName_2,
          ]"
        >
          <view class="top"></view>
          <view class="bottom"></view>
        </view>
      </view>
      <view id="nowConfirm" @click="changeClass($event)">
        现有<br />确诊
        <view
          :class="[
            nowConfirm.isActive
              ? active_list.notActiveName
              : nowConfirm.isActive_1
              ? active_list.ActiveName_1
              : active_list.ActiveName_2,
          ]"
        >
          <view class="top"></view>
          <view class="bottom"></view>
        </view>
      </view>
      <view id="totalConfirm" @click="changeClass($event)">
        累计<br />确诊
        <view
          :class="[
            totalConfirm.isActive
              ? active_list.notActiveName
              : totalConfirm.isActive_1
              ? active_list.ActiveName_1
              : active_list.ActiveName_2,
          ]"
        >
          <view class="top"></view>
          <view class="bottom"></view>
        </view>
      </view>
      <view id="dead" @click="changeClass($event)">
        累计<br />死亡
        <view
          :class="[
            dead.isActive
              ? active_list.notActiveName
              : dead.isActive_1
              ? active_list.ActiveName_1
              : active_list.ActiveName_2,
          ]"
        >
          <view class="top"></view>
          <view class="bottom"></view>
        </view>
      </view>
      <view id="block"></view>
    </view>
    <view v-for="(item, index) in city" :key="index">
      <view class="content" @click="viewDetail(item.name)">
        <view class="name">{{ item.name }}</view>
        <view>{{ item.today.confirm }}</view>
        <view>{{ item.total.nowConfirm }}</view>
        <view>{{ item.total.confirm }}</view>
        <view>{{ item.total.dead }}</view>
        <view class="detail">
          <view v-if="!(item.children.length === 1)"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      active_list: {
        notActiveName: 'notActive',
        ActiveName_1: 'Active_1',
        ActiveName_2: 'Active_2',
      },
      confirm: {
        isActive: false,
        isActive_1: true,
      },
      nowConfirm: {
        isActive: true,
        isActive_1: false,
      },
      totalConfirm: {
        isActive: true,
        isActive_1: false,
      },
      dead: {
        isActive: true,
        isActive_1: false,
      },
    };
  },
  methods: {
    changeClass: function (event) {
      const name = event.target.id;
      function citySort(city, dir) {
        if (dir) {
          if (name === 'confirm') {
            city.sort(function (a, b) {
              return b.today[name] - a.today[name];
            });
            return;
          }
          if (name === 'totalConfirm') {
            city.sort(function (a, b) {
              return b.total.confirm - a.total.confirm;
            });
            return;
          }
          city.sort(function (a, b) {
            return b.total[name] - a.total[name];
          });
        } else {
          if (name === 'confirm') {
            city.sort(function (a, b) {
              return a.today[name] - b.today[name];
            });
            return;
          }
          if (name === 'totalConfirm') {
            city.sort(function (a, b) {
              return a.total.confirm - b.total.confirm;
            });
            return;
          }
          city.sort(function (a, b) {
            return a.total[name] - b.total[name];
          });
        }
      }
      if (this[name].isActive) {
        this.confirm.isActive = true;
        this.nowConfirm.isActive = true;
        this.totalConfirm.isActive = true;
        this.dead.isActive = true;
        this.confirm.isActive_1 = true;
        this.nowConfirm.isActive_1 = true;
        this.totalConfirm.isActive_1 = true;
        this.dead.isActive_1 = true;
        this[name].isActive = false;
      } else {
        this[name].isActive_1 = !this[name].isActive_1;
      }
      citySort(this.city, this[name].isActive_1);
    },
    viewDetail: function (city) {
      if (city != '台湾' && city != '澳门' && city != '香港') {
        uni.navigateTo({
          url: '../city/index',
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', {
              data: city,
            });
          },
        });
      }
    },
  },
  computed: {
    city: function () {
      return this.list.diseaseh5Shelf.areaTree[0].children;
    },
  },
  beforeMount() {
    this.city.sort(function (a, b) {
      return b.today.confirm - a.today.confirm;
    });
  },
  onPullDownRefresh() {
    uni.redirectTo({
      url: '../detail/index',
    });
    uni.stopPullDownRefresh()
  }
};
</script>

<style lang="scss" scoped>
.box {
  margin: 2vh 0 0 5vw;
  .title {
    display: flex;
    margin-bottom: 1vh;
    view {
      margin: 0 0.2vw;
      text-align: center;
    }
    #area {
      background-color: #f5f5f5;
      color: #222;
      flex: 18;
      line-height: 8vh;
    }
    #block {
      flex: 5;
    }
    #confirm,
    #totalConfirm,
    #nowConfirm,
    #dead {
      position: relative;
      flex: 18;
      .notActive {
        .top {
          height: 1.5vw;
          width: 1.5vw;
          background: url(https://mat1.gtimg.com/news/feiyanarea/i_cf_up.png)
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 2.5vh;
          left: 14.1vw;
        }
        .bottom {
          height: 1.5vw;
          width: 1.5vw;
          background: url(https://mat1.gtimg.com/news/feiyanarea/i_cf_d.png)
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 4vh;
          left: 14.1vw;
        }
      }
      .Active_1 {
        .top {
          height: 1.5vw;
          width: 1.5vw;
          background: url(https://mat1.gtimg.com/news/feiyanarea/i_cf_up.png)
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 2.5vh;
          left: 14.1vw;
        }
        .bottom {
          height: 1.5vw;
          width: 1.5vw;
          background: url(https://mat1.gtimg.com/news/feiyanarea/i_cf_d_c.png)
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 4vh;
          left: 14.1vw;
        }
      }
      .Active_2 {
        .top {
          height: 1.5vw;
          width: 1.5vw;
          background: url(https://mat1.gtimg.com/news/feiyanarea/i_cf_up_c.png)
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 2.5vh;
          left: 14.1vw;
        }
        .bottom {
          height: 1.5vw;
          width: 1.5vw;
          background: url(https://mat1.gtimg.com/news/feiyanarea/i_cf_d.png)
            no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 4vh;
          left: 14.1vw;
        }
      }
    }
    #confirm {
      background-color: linen;
      color: #ff7140;
    }
    #totalConfirm {
      background-color: #fef7ff;
      color: #ca3f81;
    }
    #nowConfirm {
      background-color: #fff7f7;
      color: #f23a3b;
    }
    #dead {
      background-color: #fffaf7;
    }
  }
  .content {
    display: flex;
    > view {
      flex: 18;
      text-align: center;
      height: 3vh;
      line-height: 3vh;
      padding: 2vh 0;
      border-bottom: 0.1vh solid #f5f5f5;
      &:last-child {
        border-bottom: none;
      }
    }
    .name {
      color: #4180f1;
      font-size: 5vw;
      font-weight: 600;
    }
    .detail {
      flex: 5;
      view {
        margin-top: 0.6vh;
        background: url(https://mat1.gtimg.com/news/feiyanarea/i_list_more.png)
          no-repeat;
        background-size: 100% 100%;
        width: 1.8vw;
        height: 2.7vw;
      }
    }
  }
}
</style>
