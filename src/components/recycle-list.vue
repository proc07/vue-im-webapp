<template>
  <div class="cube-recycle-list">
    <div class="cube-recycle-list-main">
      <div class="cube-recycle-list-items" :style="{height: heights + 'px'}">
        <div
          v-for="item in visibleItems"
          class="cube-recycle-list-item"
          :style="{transform: 'translate(0,' + item.top + 'px)'}"
        >
          <div
            v-if="infinite"
            :class="{'cube-recycle-list-transition': infinite}"
            :style="{opacity: +!item.loaded}"
          >
            <slot name="tombstone"></slot>
          </div>
          <div
            :class="{'cube-recycle-list-transition': infinite}"
            :style="{opacity: item.loaded}"
          >
            <slot name="item" :data="item.data"></slot>
          </div>
        </div>

        <!-- preloads item for get its height, remove it after caculating height-->
        <div class="cube-recycle-list-pool">
          <div
            class="cube-recycle-list-item cube-recycle-list-invisible"
            v-if="item && !item.isTombstone && !item.height"
            :ref="'preloads'+index"
            v-for="(item, index) in items"
          >
            <slot name="item" :data="item.data"></slot>
          </div>
          <div ref="tomb" class="cube-recycle-list-item cube-recycle-list-invisible">
            <slot name="tombstone"></slot>
          </div>
        </div>
      </div>
      <div
        v-if="!infinite && !noMore"
        class="cube-recycle-list-loading"
        :style="{visibility: loading ? 'visible' : 'hidden'}"
      >
        <slot name="spinner">
          <div class="cube-recycle-list-loading-content">
            <cube-loading class="cube-recycle-list-spinner"></cube-loading>
          </div>
        </slot>
      </div>

      <div v-show="noMore" class="cube-recycle-list-noMore">
        <slot name="noMore" />
      </div>
    </div>
    <div class="cube-recycle-list-fake"></div>
  </div>
</template>

<script>
import CubeLoading from 'cube-ui/src/components/loading/loading.vue'
import { warn } from 'cube-ui/src/common/helpers/debug.js'
import { isUndef } from 'cube-ui/src/common/helpers/util.js'
import { debuglog } from 'util'
const COMPONENT_NAME = 'cube-recycle-list'
const PROMISE_ERROR = 'requires a Promise polyfill in this browser.'
const EVENT_SCROLL = 'scroll'
const EVENT_RESIZE = 'resize'
export default {
  name: COMPONENT_NAME,
  data () {
    return {
      items: [],
      heights: 0,
      startIndex: 0,
      loadings: [],
      noMore: false
    }
  },
  props: {
    infinite: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 20
    },
    offset: {
      type: Number,
      default: 100
    },
    onFetch: {
      type: Function,
      required: true
    },
    pullDirection: {
      type: String,
      default: 'pullup' // 'pullup' || 'pulldown'
    }
  },
  computed: {
    visibleItems () {
      return this.items.slice(Math.max(0, this.startIndex - this.size), Math.min(this.items.length, this.startIndex + this.size))
    },
    tombHeight () {
      return this.infinite ? this.$refs.tomb && this.$refs.tomb.offsetHeight : 0
    },
    loading () {
      return this.loadings.length
    }
  },
  created () {
    this.list = []
    this.promiseStack = []
  },
  mounted () {
    this.checkPromiseCompatibility()
    this.$el.addEventListener(EVENT_SCROLL, this._onScroll)
    window.addEventListener(EVENT_RESIZE, this._onResize)
    this.load()
  },
  beforeDestroy () {
    this.$el.removeEventListener(EVENT_SCROLL, this._onScroll)
    window.removeEventListener(EVENT_RESIZE, this._onResize)
  },
  methods: {
    checkPromiseCompatibility () {
      /* istanbul ignore if */
      if (isUndef(window.Promise)) {
        warn(PROMISE_ERROR)
      }
    },
    load () {
      // debugger
      if (this.infinite) {
        console.log(this.list)
        const items = this.items
        let start, end
        this._onPullDirection({
          pullup () {
            start = items.length
            // increase capacity of items to display tombstone
            items.length += this.size
            end = items.length
          },
          pulldown () {
            start = 0
            end = this.size
            // 填充，执行 loadItems 方法避免跳出
            if (this.infinite && !this.noMore) {
              for (let i = start; i < end; i++) {
                this.items.unshift(null)
                this.list.unshift(null)
              }
            }
          }
        })
        this.loadItems(start, end)
        this.getItems()
      } else if (!this.loading) {
        this.getItems()
      }
    },
    getItems () {
      const index = this.promiseStack.length
      const promiseFetch = this.onFetch()
      this.loadings.push('pending')
      this.promiseStack.push(promiseFetch)
      promiseFetch.then((res) => {
        this.loadings.pop()
        /* istanbul ignore if */
        if (!res) {
          this.stopScroll(index)
        } else {
          this.setList(index, res)
          this.loadItemsByIndex(index)
          if (res.length < this.size) {
            this.stopScroll(index)
          }
        }
      })
    },
    removeUnusedTombs (copy, index) {
      let cursor
      let size = this.size
      let start = index * size
      let end = (index + 1) * size
      for (cursor = start; cursor < end; cursor++) {
        if (copy[cursor] && copy[cursor].isTombstone) break
      }
      this.items = copy.slice(0, cursor)
    },
    stopScroll (index) {
      this.noMore = true
      this.removeUnusedTombs(this.items.slice(0), index)
      this.updateItemTop()
      this.updateStartIndex()
    },
    setList (index, res) {
      // debugger
      const list = this.list
      const baseIndex = index * this.size
      for (let i = 0; i < res.length; i++) {
        this._onPullDirection({
          pullup () {
            list[baseIndex + i] = res[i]
          },
          pulldown () {
            list[(this.size - 1) - i] = res[i]
            // list.unshift(res[i])
          }
        })
      }
    },
    loadItemsByIndex (index) {
      const size = this.size
      let start, end
      this._onPullDirection({
        pullup () {
          start = index * size
          end = (index + 1) * size
        },
        pulldown () {
          start = 0
          end = size
          // 填充，执行 loadItems 方法避免跳出
          if (!this.infinite) {
            for (let i = start; i < end; i++) {
              this.items.unshift(null)
            }
          }
        }
      })
      this.loadItems(start, end)
    },
    loadItems (start, end) {
      const items = this.items
      let promiseTasks = []
      let item
      for (let i = start; i < end; i++) {
        item = items[i]
        /* istanbul ignore if */
        if (item && item.loaded) {
          continue
        }
        this.setItem(i, this.list[i])
        // get each item's height in nextTick
        promiseTasks.push(this.$nextTick().then(() => {
          this.updateItemHeight(i)
        }))
      }
      // update items top and full list height
      window.Promise.all(promiseTasks).then(() => {
        this.updateItemTop()
        this.updateStartIndex()
      })
    },
    setItem (index, data) {
      console.log(index, data)
      this.$set(this.items, index, {
        data: data || {},
        height: 0,
        top: -1000,
        isTombstone: !data,
        loaded: data ? 1 : 0
      })
    },
    updateItemHeight (index) {
      // update item height
      let cur = this.items[index]
      let dom = this.$refs['preloads' + index]
      if (dom && dom[0]) {
        cur.height = dom[0].offsetHeight
      } else if (cur) {
        cur.height = this.tombHeight
      }
    },
    updateItemTop () {
      let heights = 0
      const items = this.items
      let pre
      let current
      // loop all items to update item top and list height
      for (let i = 0; i < items.length; i++) {
        pre = items[i - 1]
        current = items[i]
        // it is empty in array
        /* istanbul ignore if */
        if (!items[i]) {
          heights += 0
        } else {
          current.top = pre ? pre.top + pre.height : 0
          heights += current.height
        }
      }
      this.heights = heights
      this.updateScrollTop()
    },
    updateScrollTop () {
      // 每次加入数据后，scrolltop 还原到原来的位置
      if (this.pullDirection === 'pulldown' && !this.noMore) {
        let addHeight = this.items[this.size].top
        this.$nextTick(() => {
          this.$el.scrollTop = addHeight + this.$el.scrollTop
        })
      }
    },
    updateStartIndex () {
      // update visible items start index
      let top = this.$el.scrollTop
      let item
      const items = this.items
      console.log(items)
      for (let i = 0; i < items.length; i++) {
        item = items[i]
        if (!item || item.top > top) {
          this.startIndex = Math.max(0, i - 1)
          break
        }
      }
    },
    reset () {
      const map = [
        {
          key: 'items',
          value: []
        },
        {
          key: 'heights',
          value: 0
        },
        {
          key: 'startIndex',
          value: 0
        },
        {
          key: 'loadings',
          value: []
        },
        {
          key: 'noMore',
          value: false
        },
        {
          key: 'list',
          value: []
        },
        {
          key: 'promiseStack',
          value: []
        }
      ]
      map.forEach(({ key, value }) => {
        this[key] = value
      })
      this.$el.scrollTop = 0
      this.load()
    },
    _onScroll () {
      // trigger load
      this._onPullDirection({
        pullup () {
          if (!this.noMore && this.$el.scrollTop + this.$el.offsetHeight > this.heights - this.offset) {
            this.load()
          }
        },
        pulldown () {
          if (this._initPullDown && !this.noMore && this.$el.scrollTop <= this.offset) {
            console.log('pulldown')
            this.load()
          }
          // 首次初始化数据后，不进行 load，里面修改了 scrollTop，会再次触发该函数
          this._initPullDown = true
        }
      })
      this.updateStartIndex()
    },
    _onResize () {
      const items = this.items
      items.forEach((item) => {
        item.loaded = false
      })
      this.loadItems(0, items.length)
    },
    _onPullDirection (optFns) {
      optFns[this.pullDirection].call(this, this)
    }
  },
  components: {
    CubeLoading
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cube-recycle-list
    position: relative
    height: 100%
    overflow-x: hidden
    overflow-y: auto
    -webkit-overflow-scrolling: touch
  .cube-recycle-list-main
    min-height: 100%
  .cube-recycle-list-fake
    height: 1px
  .cube-recycle-list-invisible
    top: -1000px
    visibility: hidden
  .cube-recycle-list-item
    width: 100%
    position: absolute
    box-sizing: border-box
  .cube-recycle-list-transition
    position: absolute
    opacity: 0
    transition-property: opacity
    transition-duration: 500ms
  .cube-recycle-list-loading
    overflow: hidden
  .cube-recycle-list-loading-content
    text-align: center
  .cube-recycle-list-spinner
    margin: 10px auto
    display: flex
    justify-content: center
</style>
