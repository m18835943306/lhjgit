import React, { useState, useEffect } from 'react'
import { Tree, Input, Radio } from 'antd'
import { useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { Card } from '&/appComponents/Antd'
import { getMacroElecEnterpriseList } from '&/api/electricity'
import './index.scss'
const List = (props) => {
  const { tap, setTap } = props
  const record = useSelector((state) => state.getRecordReducer)
  const values = JSON.parse(localStorage.getItem('user'))
  const { DirectoryTree } = Tree
  const [treeDataList, setTreeDataList] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(['0-0'])
  const [selectedKeys, setSelectedKeys] = useState(['0-0-0'])
  const [autoExpandParent] = useState(true)
  //搜索功能
  const onChange = (e) => {
    if (treeDataList.length > 0) {
      if (e.target.value != '') {
        getMacroElecEnterpriseListRequest(e.target.value)
      } else {
        setSelectedKeys([treeDataList?.[0].children[0].key])
        setExpandedKeys([treeDataList?.[0].children[0].parentKey])
        getMacroElecEnterpriseListRequest()
      }
    }
  }
  //   区域选择
  const handleChange = (value) => {
    setTap(value)
  }
  useEffect(() => {
    getMacroElecEnterpriseListRequest()
  }, [tap])
  useEffect(() => {
    if (Object.keys(record).length > 0) {
      props.click(record.company)
      if (treeDataList.length > 0) {
        for (let index = 0; index < treeDataList.length; index++) {
          const item = treeDataList[index]
          const obj = item.children?.find((i) => {
            return i.title === record.company
          })
          if (obj) {
            setSelectedKeys([obj.key])
            setExpandedKeys([obj.parentKey])
            break
          }
        }
      }
    }
  }, [treeDataList, record.company])
  const getMacroElecEnterpriseListRequest = async (value) => {
    const params = {
      project_id: values.project_id,
      ent_name: value ? value : ''
    }
    await getMacroElecEnterpriseList(params).then((res) => {
      if (res) {
        if (tap === 1) {
          const treeData = res?.area.map((item, index) => {
            return {
              title: item.county_name,
              key: `0-${index}`,
              children: item.ent_info.map((t, i) => {
                return {
                  title: t,
                  key: `0-${index}-${i}`,
                  parentKey: `0-${index}`,
                  isLeaf: true
                }
              })
            }
          })
          props.click(treeData[0].children[0].title)
          setSelectedKeys([treeData?.[0].children[0].key])
          setExpandedKeys([treeData?.[0].children[0].parentKey])
          setTreeDataList(treeData)
        } else {
          const hangyeData = res?.industry.map((item, index) => {
            return {
              title: item.industry_type,
              key: `0-${index}`,
              children: item.ent_info.map((t, i) => {
                return {
                  title: t,
                  key: `0-${index}-${i}`,
                  parentKey: `0-${index}`,
                  isLeaf: true
                }
              })
            }
          })
          props.click(hangyeData[0].children[0].title)
          setSelectedKeys([hangyeData?.[0].children[0].key])
          setExpandedKeys([hangyeData?.[0].children[0].parentKey])
          setTreeDataList(hangyeData)
        }
      }
    })
  }
  // 树形组件选择
  const onSelect = (keys, info) => {
    if (!info.node.children) {
      props.click(info?.node.title)
      setSelectedKeys(keys)
      record.company = info?.node.title
    }
  }
  const onExpand = (keys, info) => {
    console.log(info,"info--");
    if(info.expanded==true){
      setExpandedKeys([info?.node.key])
    }else{
      setExpandedKeys([])
    }

  }
  return (
    <div className="list-data">
      <Card
        size="small"
        style={{ height: '100%' }}
        bodyStyle={{ height: '100%' }}
      >
        <div className="list-top-seacher">
          <Input
            placeholder="请输入搜索的指标名称"
            prefix={<SearchOutlined className="site-form-item-icon" />}
            onChange={onChange}
          />
        </div>
        <div className="list-taps">
          <div
            className={tap === 1 ? 'active' : 'list-area'}
            onClick={() => handleChange(1)}
          >
            地区
          </div>
          <div
            className={tap === 2 ? 'active' : 'list-hangye'}
            onClick={() => handleChange(2)}
          >
            行业
          </div>
        </div>
        <div className="list-bottom-data">
          {treeDataList.length > 0 && treeDataList && (
            <DirectoryTree
              multiple
              //   defaultExpandAll
              // defaultExpandedKeys={['0-0']} //默认展开指定的树节点
              // defaultSelectedKeys={defaultSelectedKeys} //默认选中的节点
              selectedKeys={selectedKeys} //（受控）设置选中的树节点
              expandedKeys={expandedKeys} //（受控）展开指定的树节点s
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={treeDataList}
              autoExpandParent={autoExpandParent} //是否自动展开父节点
            />
          )}
        </div>
      </Card>
    </div>
  )
}
export default List
