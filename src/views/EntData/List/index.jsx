import React, { useState, useEffect,useCallback } from 'react'
import { Tree, Input, message,Spin  } from 'antd'
import _, { debounce, set } from 'lodash'
import { useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'
import { Card } from '&/appComponents/Antd'
import { getEnterpriseData } from '&/api/electricity'
import './index.scss'




const List = (props) => {
  const { tap, setTap } = props
  const record = useSelector((state) => state.getRecordReducer);
  const values = JSON.parse(localStorage.getItem('user'))
  const { DirectoryTree } = Tree
  const [treeDataList, setTreeDataList] = useState([])
  const [expandedKeys, setExpandedKeys] = useState(['0-0'])
  const [selectedKeys, setSelectedKeys] = useState(['0-0-0'])
  const [selectId,setSelectId]=useState([])
  const [autoExpandParent] = useState(true)
  const [loading, setLoading] = useState(false);
  //搜索功能
  const onChange = (e) => {
    if (treeDataList.length > 0) {
      if (e.target.value != '') {
       debounceSearch(e.target.value)  
      } else {
        setSelectedKeys([treeDataList?.[0].children[0].key])
        setExpandedKeys([treeDataList?.[0].children[0].parentKey])
        getEnterpriseListRequest()
      }
    }
  }
  //搜索防抖
  const debounceSearch = useCallback(
    _.debounce((value) => {
      tap==='1' ? getEntData(value,'entAreaData',tap) : getEntData(value,'entIndustryData',tap)
    }, 3000),
    []
  )
  //   区域选择
  const handleChange = (value) => {
    setTap(value)
  }
  useEffect(() => {
    setLoading(true);
    tap === '1' ? getEntData('','entAreaData',tap) : getEntData('','entIndustryData',tap)
  }, [tap])
  useEffect(() => {
    if (Object.keys(record).length > 0) {

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
    // setLoading(false);
  }, [treeDataList, record.company])
 
 
  const getEntData= async(entName,localName,tap) => {
    const entDataList=localStorage.getItem(localName)
    if(entDataList){
      console.log('entDataList使用缓存数据')
      const res=JSON.parse(entDataList)
      const treeData=generateTree(res)
      updateTreeData(treeData);
    
      return
    }
    const res=await getEnterpriseData({ group_by: tap,
    ent_name: entName,})

      if(entDataList!== JSON.stringify(res)){
        console.log('不一致，entDataList使用接口数据');
        const treedata=generateTree(res)
        updateTreeData(treedata)
        localStorage.setItem(localName, JSON.stringify(res));
      }

  }
  

 
//生成树结构
const generateTree=(res)=>{
    const treeData = res?.data.map((item, index) => {
      return {
        title: tap === "1" ? item.county_name : item.industry_type,
        key: `0-${index}`,
        children: item.ent_info.map((t, i) => {
          return {
            title: t.ent_name,
            entId: t.ent_id,
            key: `0-${index}-${i}`,
            parentKey: `0-${index}`,
            isLeaf: true,
          };
        }),
      };
    })
    return treeData

}

//更新树形结构状态
  const updateTreeData = (treeData) => {
    props.click(treeData[0]?.children[0].entId);
    setSelectId([treeData?.[0].children[0].entId]);
    setSelectedKeys([treeData?.[0].children[0].key]);
    setExpandedKeys([treeData?.[0].children[0].parentKey]);
    setTreeDataList(treeData);
    setLoading(false);
  };
    // 树形组件选择
    const onSelect = (keys, info) => {
      if (!info.node.children) {
        let selectedIds = selectId
        
        if(selectedKeys.length===0){
          setSelectedKeys([['0-0-0']])
          console.log(selectedKeys,'selectedKeys');
        }
        
        if(selectedKeys.includes(keys[0]) && selectedKeys.length !== 1){
          const filterarr=selectedKeys.filter(item=>item!==keys[0]);
          setSelectedKeys(filterarr)
        }else if(!selectedKeys.includes(keys[0])&& selectedKeys.length<3){
          setSelectedKeys([...selectedKeys,keys[0]])
  
  
        }
  
        if(selectedIds.includes(info.node.entId) && selectedIds.length !== 1){
          selectedIds= selectedIds.filter(item=>item!==info.node.entId);
        }else if(selectedIds.length<3){
          selectedIds.push(info.node.entId)
        }else {
          message.warning('最多选择三个企业')
          return
        }
        const aa = new Set([...selectedIds])
        setSelectId([...aa])
        
      }
    }
  
  useEffect(() => {
    props.click(selectId)
  }, [selectId])
  const onExpand = (keys, info) => {
    // setExpandedKeys([info?.node.key])
    if (info.expanded == true) {
      setExpandedKeys([info?.node.key])
    } else {
      setExpandedKeys([])
    }
  }
  return (
    <div className="list-data">
      <Card
        title="企业列表"
        size="small"
        // style={{ height: '100%' }}
        bodyStyle={{ height: '90vh' }}
      >
        <div className="list-top-seacher">
          <Input
            placeholder="请输入搜索的公司名称"
            prefix={<SearchOutlined className="site-form-item-icon" />}
            onChange={onChange}
          />
        </div>
        <div className="list-taps">
          <div
            className={tap === '1' ? 'active' : 'list-area'}
            onClick={() => handleChange('1')}
          >
            地区
          </div>
          <div
            className={tap === '3' ? 'active' : 'list-hangye'}
            onClick={() => handleChange('3')}
          >
            行业
          </div>
        </div>
        <div className="list-bottom-data">
        {loading ? ( <Spin tip="Loading......" style={{ height: "100%" }} /> ) :
          (treeDataList.length > 0 && treeDataList && (
            <DirectoryTree
              multiple={true}
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
          ))}
        </div>
      </Card>
    </div>
  )
}
export default List
