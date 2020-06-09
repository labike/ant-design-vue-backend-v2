<template>
  <div>
    <div
      class="specs-list"
      v-for="(specs, index) in goodsAttribute"
      :key="index"
      :parentId="specs.id"
      :style="{marginRight: '10px',marginTop: '20px'}"
    >
      <p>{{ specs.attr_name }}</p>
      <div>
        <a-button
          :parentId="specs.id"
          type="primary"
          v-for="item in specs.skuvalue"
          :key="item.id"
          @click="specsItemClick(item.id, specs.id, item.attr_value)"
          :style="{marginRight: '10px', marginTop: '20px'}"
          :class="item.id === activeId ? 'active-specs' : ''"
        >
          {{ item.attr_value }}
        </a-button>
      </div>
    </div>
    <div class="input-box" :style="{marginTop: '15px'}">
      <p>
        <span class="label-text">商品库存: </span>
        <a-input
          size="default"
          type="text"
          :value="stock"
          @change="changeStock"
          placeholder="请输入商品库存"
          class="input-text"
        />
      </p>
      <p>
        <span class="label-text">商品价格: </span>
        <a-input
          size="default"
          type="text"
          :value="price"
          @change="changePrice"
          placeholder="请输入商品价格"
          class="input-text"
        />
      </p>
      <p>
        <span class="label-text">下载链接: </span>
        <a-input
          size="default"
          type="text"
          :value="downUrl"
          @change="changeDownUrl"
          placeholder="请输入下载链接地址"
          class="input-text"
        />
      </p>
      <p>
        <span class="label-text">验证码: </span>
        <a-input
          size="default"
          type="text"
          :value="downKey"
          @change="changeDownKey"
          placeholder="请输入验证码"
          class="input-text"
        />
      </p>
      <p>
        <span class="label-text">是否默认: </span>
        <a-switch :checked="is_default" @change="onChangeDefault" />
      </p>
    </div>
    <a-button type="primary" @click="submitOk" :style="{marginTop: '20px'}">提交</a-button>
  </div>
</template>

<script>
import { goodsAttribute, detailGoodsSpecs, changeGoodsSpecs } from '@/api/goods'

export default {
  name: 'ChangeGoodsSpecs',
  data () {
    return {
      activeId: '',
      id: '', // 当前商品id
      parentId: '', // 父级id
      category_id: '', // 当前商品的分类id
      params: {
        category_id: ''
      },
      goodsAttribute: [], // 属性列表api返回的数据

      specs_id: '', // 规格id
      stock: '',
      price: '',
      downUrl: '',
      downKey: '',
      is_default: '0',
      submitAttrubite: [], // 提交的sku数据
      submitParams: {}, // 选中的属性放入对象中
      submitFinData: {}
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.category_id = this.$route.query.category_id
    this.params.category_id = this.$route.query.category_id
    this.specs_id = this.$route.query.specs_id
    this.getGoodsAttribute(this.params)
    this.getSpecsDetail(this.specs_id)
  },
  methods: {
    getSpecsDetail (specsId) {
      detailGoodsSpecs(specsId).then(res => {
        if (res.code === 1) {
          this.stock = res.data.product_stock
          this.price = res.data.product_price
          this.is_default = res.data.is_default
          this.downUrl = res.data.down_url
          this.downKey = res.data.key
        }
      })
    },
    onChangeDefault (checked) {
      if (checked) {
        this.is_default = '1'
      }
      console.log(`a-switch to ${checked}`)
    },
    changeStock (e) {
      this.stock = e.target.value
    },
    changePrice (e) {
      this.price = e.target.value
    },
    changeDownUrl (e) {
      this.downUrl = e.target.value
    },
    changeDownKey (e) {
      this.downKey = e.target.value
    },
    // 属性
    getGoodsAttribute (params) {
      goodsAttribute(params).then(res => {
        this.goodsAttribute = res.data
      })
    },
    // 属性值
    specsItemClick (id, parentId, value) {
      this.activeId = id
      this.submitParams = {
        key_id: parentId,
        value_id: id
      }
      this.submitAttrubite.push(this.submitParams)
    },
    submitOk () {
      this.submitFinData = {
        product_id: this.id, // 当前商品id
        product_specs: this.submitAttrubite, // 当前商品sku
        product_stock: this.stock, // 当前商品库存
        product_price: this.price, // 当前商品的价钱
        down_url: this.downUrl,
        key: this.downKey,
        is_default: this.is_default
      }
      console.log(this.submitFinData)
      if (
        !this.submitFinData.product_stock || !this.submitFinData.product_price ||
        !this.submitFinData.down_url || !this.submitFinData.key ||
        this.submitFinData.product_specs.length === 0) {
        this.$message.error('提交数据不能为空')
      } else {
        changeGoodsSpecs(this.submitFinData).then(res => {
          if (res.code === 1) {
            this.$message.success(res.message)
            this.submitAttrubite = []
            this.stock = ''
            this.price = ''
            this.$router.push({
              path: '/goods/goods-specs',
              query: {
                id: this.id,
                category_id: this.category_id
              }
            })
          } else {
            this.$message.success(res.message)
          }
        })
      }
      console.log(this.submitAttrubite)
    }
  }
}
</script>

<style lang="less" scoped>
  .active-specs {
    background-color: #000;
    color: #fff;
    border: 1px solid #ccc !important;
  }
  .input-box{
    .label-text{
      display: inline-block;
      width: 100px;
    }
    .input-text{
      margin-top: '15px';
      display: 'inline-block';
      width: 300px;
    }
  }
</style>
