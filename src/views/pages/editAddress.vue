<template>
  <nav-bar title="新增地址"></nav-bar>
  <section class="edit-address-container">
    <van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import {
  addAddress,
  EditAddress,
  DeleteAddress,
  getAddress
} from '../../api/address'

import { reactive, toRefs, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { areaList } from '@vant/area-data'
import { Toast } from 'vant'
export default {
  name: 'EditAddress',
  components: {
    NavBar
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const state = reactive({
      searchResult: [],
      addressInfo: {},
      type: 'add', // 默认为添加地址信息
      addressId: '',
      provinceCode: '',
      areaCode: ''
    })

    onMounted(async () => {
      const { type, addressId } = route.query
      if (addressId) {
        state.addressId = addressId
      }

      if (type) {
        state.type = type

        if (type === 'edit') {
          const { data: res } = await getAddress(addressId)

          Object.keys(areaList.province_list).forEach(k => {
            if (areaList.province_list[k] === res.data.provinceName) {
              state.provinceCode = k.substring(0, 2)
            } else if (res.data.provinceName === '北京') {
              state.provinceCode = '11'
            }
          })

          Object.keys(areaList.county_list).forEach(k => {
            if (areaList.county_list[k] === res.data.regionName) {
              if (k.substring(0, 2) === state.provinceCode) {
                state.areaCode = k
              }
            }
          })

          state.addressInfo = {
            id: addressId,
            name: res.data.userName,
            tel: res.data.userPhone,

            province: res.data.provinceName,
            city: res.data.cityName,
            county: res.data.regionName,

            addressDetail: res.data.detailAddress,
            areaCode: state.areaCode,
            isDefault: !!res.data.defaultFlag
          }
        }
      }
    })

    const onSave = async content => {
      const params = {
        userName: content.name,
        userPhone: content.tel,
        provinceName: content.province,
        cityName: content.city,
        regionName: content.county,
        detailAddress: content.addressDetail,
        defaultFlag: content.isDefault ? 1 : 0
      }

      if (state.type === 'edit') {
        params.addressId = state.addressId
      }
      ;(await state.type) === 'add' ? addAddress(params) : EditAddress(params)
      Toast('保存成功')
      setTimeout(() => {
        router.back()
      }, 1000)
    }

    const onDelete = async () => {
      await DeleteAddress(state.addressId)
      Toast('删除成功')
      setTimeout(() => {
        router.back()
      }, 1000)
    }

    return {
      areaList,
      ...toRefs(state),
      onSave,
      onDelete
    }
  }
}
</script>

<style scoped lang="less">
.edit-address-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;

  /deep/.van-button--danger {
    border-color: #1baeae;
    background: #1baeae;
  }

  /deep/.van-button--default {
    color: #cc0000;
    background: #f9f9f9;
  }
}
</style>
