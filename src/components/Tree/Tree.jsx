import { Menu, Icon, Input } from 'ant-design-vue'

const { Item, ItemGroup, SubMenu } = Menu
const { Search } = Input

export default {
  name: 'Tree',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.localOpenKeys = this.openKeys.slice(0)
  },
  data () {
    return {
      localOpenKeys: []
    }
  },
  methods: {
    handlePlus (item) {
      this.$emit('add', item)
    },
    handleTitleClick (...args) {
      this.$emit('titleClick', { args })
    },
    // edit
    handleEdit (item) {
      this.$emit('edit', item)
    },
    // delete
    handleDelete (item) {
      this.$emit('delete', item)
    },

    renderSearch () {
      return (
        <Search
          placeholder="input search text"
          style="width: 100%; margin-bottom: 1rem"
        />
      )
    },
    renderIcon (icon) {
      return icon && (<Icon type={icon} />) || null
    },
    renderMenuItem (item) {
      // console.log('item is', item)
      return (
        <Item key={item.id}>
          { this.renderIcon(item.icon) }
          { item.name }
          <a
            class="btn"
            style="width: 20px;display:inline-block;margin-right:70px;"
            {...{ on: { click: () => this.handleEdit(item) } }}
          ><a-icon type="edit"/></a>
          <a
            class="btn"
            style="width: 20px;display:inline-block;margin-right:50px;"
            {...{ on: { click: () => this.handlePlus(item) } }}
          ><a-icon type="plus"/></a>
          <a
            class="btn"
            style="width: 20px;display:inline-block;margin-right:30px;"
            {...{ on: { click: () => this.handleDelete(item) } }}
          ><a-icon type="delete"/></a>
        </Item>
      )
    },
    renderItem (item) {
      return item.tree ? this.renderSubItem(item, item.id) : this.renderMenuItem(item, item.id)
    },
    renderItemGroup (item) {
      console.log('item group', item)
      const childrenItems = item.tree.map(o => {
        return this.renderItem(o, o.p_id)
      })

      return (
        <ItemGroup key={item.p_id}>
          <template slot="title">
            <span>{ item.name }</span>
            <a-dropdown>
              <a class="btn"><a-icon type="ellipsis" /></a>
              <a-menu slot="overlay">
                <a-menu-item key="1">新增</a-menu-item>
                <a-menu-item key="2">合并</a-menu-item>
                <a-menu-item key="3">移除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          { childrenItems }
        </ItemGroup>
      )
    },
    renderSubItem (item, key) {
      const childrenItems = item.tree && item.tree.map(o => {
        return this.renderItem(o, o.p_id)
      })

      const title = (
        <span slot="title">
          { this.renderIcon(item.icon) }
          <span>{ item.name }</span>
          <a
            class="btn"
            style="width: 20px;display:inline-block;margin-right:70px;"
            {...{ on: { click: () => this.handleEdit(item) } }}
          ><a-icon type="edit"/></a>
          <a
            class="btn"
            style="width: 20px;display:inline-block;margin-right:50px;"
            {...{ on: { click: () => this.handlePlus(item) } }}
          ><a-icon type="plus"/></a>
          <a
            class="btn"
            style="width: 20px;display:inline-block;margin-right:30px;"
            {...{ on: { click: () => this.handleDelete(item) } }}
          ><a-icon type="delete"/></a>
        </span>
      )

      if (item.group) {
        return this.renderItemGroup(item)
      }
      // titleClick={this.handleTitleClick(item)}
      return (
        <SubMenu key={key}>
          { title }
          { childrenItems }
        </SubMenu>
      )
    }
  },
  render () {
    const { dataSource, search } = this.$props

    // this.localOpenKeys = openKeys.slice(0)
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })

    return (
      <div class="tree-wrapper">
        { search ? this.renderSearch() : null }
        <Menu mode="inline" class="custom-tree" {...{ on: { click: item => this.$emit('click', item), 'update:openKeys': val => { this.localOpenKeys = val } } }} openKeys={this.localOpenKeys}>
          { list }
        </Menu>
      </div>
    )
  }
}
