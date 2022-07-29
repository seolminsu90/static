<template>
  <table class="table table-sm table-hover">
    <thead>
      <tr>
        <th scope="col" v-for="[k, v] in _heads" v-show="v.disable !== true" :key="k">
          {{ k }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in this._rows" :key="index">
        <td scope="row" v-show="v.disable !== true" v-for="[k, v] in _heads" :key="k">
          {{ row[k] }}
          <button type="button" v-if="v.button !== undefined && v.button.click !== undefined"
            @click="v.button.click(_rows[index])">{{ v.button.text }}</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'DynamicTable',
  props: {
    rows: {
      type: Array
    },
    heads: {
      type: Object
    }
  },
  data() {
    return {
      _rows: [],
      _heads: {},
      /** 헤더 기능 메모 **/
      __sample__heads__: {
        imgUrl: {
          disable: true,
          order: 1
        },
        price: {
          order: 2
        },
        custom: {
          button: {
            click: (row) => this.callbacktest(row),
            text: 'MyButton'
          },
          order: 3
        }
      }
    };
  },
  mounted() {
    if (this.rows.length == 0)
      return

    let keys = Object.keys(this.rows[0])
    let temp = this.heads

    // 기본 헤더 넣어주기
    for (let i = 0; i < keys.length; i++) {
      if (temp[keys[i]] === undefined) {
        temp[keys[i]] = {}
      }
    }

    // [[k][v]]
    let sortTemp = Object.entries(temp)

    // order 필드로 정렬 처리
    sortTemp.sort((a, b) => {
      let aVal = a[1]
      let bVal = b[1]
      let aOrder = (aVal.order == undefined) ? 0 : aVal.order
      let bOrder = (bVal.order == undefined) ? 0 : bVal.order
      return aOrder - bOrder
    })

    // 컴포넌트에서 사용할 값으로 변경
    this._heads = sortTemp
    this._rows = this.rows
  }
}
</script>

<style scoped>
</style>