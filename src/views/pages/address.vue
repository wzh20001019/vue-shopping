<template>
  <nav-bar title="地址管理"></nav-bar>
  <section class="address-container">
    <div class="address-wrap">
      <van-address-list
        v-if="!from"
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="editAddress"
      />
      <!-- :switchable="false" -->
      <van-address-list
        v-else
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="clickItem"
      />
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

import { reactive, toRefs, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAddressList } from '@/api/address'
export default {
  name: 'Address',
  components: {
    NavBar
  },

  setup() {
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
      chosenAddressId: 0,
      list: [],
      from: route.query.from
    })

    onMounted(async () => {
      const { data: res } = await getAddressList()

      state.list = res.data.map(item => {
        return {
          id: item.addressId,
          name: item.userName,
          tel: item.userPhone,
          address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
          isDefault: !!item.defaultFlag
        }
      })

      state.list.forEach(item => {
        if (item.isDefault) {
          state.chosenAddressId = item.id
        }
      })
    })

    const onAdd = () => {
      router.push({
        path: '/edit-address',
        query: { type: 'add', from: state.from }
      })
    }

    const onEdit = item => {
      router.push({
        path: '/edit-address',
        query: { type: 'edit', addressId: item.id, from: state.from }
      })
    }

    const clickItem = item => {
      router.push({
        path: '/create-order',
        query: {
          cartItemIds: route.query.cartItemIds,
          addressId: item.id
        }
      })
    }

    const editAddress = item => {
      onEdit(item)
    }

    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      clickItem,
      editAddress
    }
  }
}
</script>

<style scoped lang="less">
.address-container {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;

  /deep/.van-button {
    border-color: #1baeae;
    background: #1baeae;
  }
}
</style>
