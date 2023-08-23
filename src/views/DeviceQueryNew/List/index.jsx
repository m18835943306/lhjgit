import React, { useState, useEffect, useCallback } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Tree, Spin } from 'antd';
import sourceImg from '&/images/images/imgs';
import { useNavigate, useLocation } from 'react-router-dom'
import {
  getDeviceListNew,
  getDeviceRelList,
} from '&/api/electricity';
import query from '&/api/electricity/query';
import { Card } from '&/appComponents/Antd'
import _, { debounce } from 'lodash';
import './index.scss';
const List = (props) => {
  const location = useLocation()

  const value = JSON.parse(localStorage.getItem('user'));
  const [checkParentKey, setCheckParentKey] = useState('0-0-1');
  const [expandedKeys, setExpandedKeys] = useState(['0-1', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState(['0-0-1']);
  const [autoExpandParent, setAutoExpandParent] = useState(true); //先别删
  const [treedata1, setTreedata1] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultKeys, setDefaultKeys] = useState([]);
  const [entName,setEntName]=useState("")
  // useEffect(() => {
  //   getDeviceListNewRequest();
  // }, [location]);
  useEffect(() => {
    if (location.search != "") {
      const params = decodeURIComponent(location.search)?.split('?')[1]?.split('&')
      const paramsArr = params?.map(item => item?.split('='))
      const urlres = Object?.fromEntries(paramsArr)
      setEntName(urlres.ent_name)
      debounceSearch(urlres.ent_name, "1", urlres.dev_id, urlres.ent_id);
    } else {
      getDeviceListNewRequest();
    }

  }, [location])
  // 企业列表接口
  const getDeviceListNewRequest = async (str, mode, dev, entId) => {
    // 获取各个区的接口
    // TODO
    // 区的ID需要替换
    const result = await query(
      `/v1/adm-list?json={"adm_level":3,"project_id":${value?.project_id}}`
    );
    let json = {
      project_id: value.project_id,
      county_id: result[0]?.county_id,
    };
    let jsonname = {};
    if (value) {
      jsonname.ent_name = str;
      jsonname.project_id = value.project_id;
    }
    getDeviceListRes(json, result, jsonname, str, mode, dev, entId);
  };
  const getDeviceListRes = async (json, resultArr, jsonname, str, mode, dev, entId) => {
    const res = await getDeviceListNew(str ? jsonname : json);
    setIsLoading(false);
    props.clickequipment(res[0]?.ent_id);
    const devData = []
    res[0]?.dev_data?.map(item => {
      devData.push(item.dev_code)
    })
    props.clickDevCode(devData)
    const treeData = [];
    const v = res?.map((item, index) => {
      return {
        title: `${item.ent_name}` + ` ` + `（${item.dev_number}）`,
        key: `0-0-${index + 1}`,
        ent_id: item.ent_id,
        // children: item.dev_data,
        children: item.group_data.map((it, i) => {
          return {
            title: it.group_name == '' ? '--' : it.group_name,
            key: `${item.ent_id}-0-0-0-${i + 1}`,
            children: it.dev_data,
            selectable: false,
            group: true,
            ent_id: item.ent_id
          };
        }),
        dev_type_data: item.dev_type_data,
      };
    });
    resultArr.forEach((item, index) => {
      let obj = {};
      obj.title = item.county_name;
      obj.key = `0-${index + 1}`;
      obj.disableCheckbox = true,
        // obj.selectable=false
        obj.checkable = false
      item.county_id == res[0]?.county_id
        ? (obj.children = v)
        : (obj.children = []);
      obj.county_id = item.county_id;
      treeData.push(obj);
    });
    const Image = () => {
      return (
        <div>
          <img src={sourceImg.zhengchang} />
        </div>
      );
    };
    const ImageBaoJing = () => {
      return (
        <div>
          <img src={sourceImg.baojing} />
        </div>
      );
    };
    const ImageLiXian = () => {
      return (
        <div>
          <img src={sourceImg.lixian} />
        </div>
      );
    };
    const treeDataIndex = (treeData || []).findIndex(
      (treeData) => treeData.county_id === res[0]?.county_id
    );
    treeData[treeDataIndex]?.children.forEach((item, index) => {
      item.children.forEach((o, i) => {
        const n = o.children.map((it, dex) => {
          return {
            title: it.dev_name,
            key: `pointname${it.dev_id}`,
            dev_id: it.dev_id,
            if_alarm: it.if_alarm,
            if_online: it.if_online,
            dev_code: it.dev_code,
            parentKey: item.key,
            selectable: false,
            dev_type_data: item.dev_type_data,
            company: item.ent_id,
            ent_id: item.ent_id,
            icon:
              it.if_alarm == 1 ? (
                <ImageBaoJing />
              ) : it.if_online == 1 ? (
                <Image />
              ) : (
                <ImageLiXian />
              ),
          };
        });
        o.children = n;
      });
    });
    let newDevArr = [];
    treeData[treeDataIndex]?.children[0]?.children.map((item) => {
      item.children.map((it) => {
        newDevArr.push(it);
      });
    });
    const y = newDevArr;
    if (mode && mode == "1") {
      // console.log(111);
      let jsonparam = {
        project_id: value?.project_id,
        ent_id: entId,
      };
      const res = await getDeviceRelList(jsonparam);
      const RealtiveArr = res.filter(item => {
        return item.treat_dev_id == dev || item.yield_dev_id == dev
      })
      const newDevBrr = newDevArr.filter(item => {
        return item.dev_id == RealtiveArr[0].treat_dev_id || item.dev_id == RealtiveArr[0].yield_dev_id
      })
      props.click(newDevBrr);
      const keyArr = newDevBrr.map(item => {
        return item.key
      })
      setCheckedKeys(keyArr)
    } else {
      props.click(y);
      // console.log(entName,"entName--");
      // if (str == '') {
        setCheckedKeys(['0-0-1']); //搜索框清空后保证选择的是第一家公司
      // }
    }
    setTreedata1(treeData);
  };
  const onExpand = (expandedKeysValue, e) => {
    setExpandedKeys(expandedKeysValue);
    // setAutoExpandParent(!autoExpandParent); //先别删
  };

  const getCheckedRelData = (curentKey, threshKey, treeData = [], e) => {
    const data = [];
    function getData(tree = []) {
      for (const t of tree) {
        if (t.children) {
          getData(t.children, e);
        } else {
          if (t.key == threshKey) {
            data.push(t);
          }
          continue;
        }
      }
    }
    getData(treeData);

    if (e.checked) {
      e.checkedNodes = e.checkedNodes.concat(data);
    } else {
      e.checkedNodes = e.checkedNodes
        .filter((item) => item.key != threshKey)
        .filter((n) => n.key != curentKey);
    }
    props.click(e);
  };

  const getRelKey = (curentKey, relInfo) => {
    curentKey = curentKey.slice(9);
    let threshKey = '';
    const findObj =
      relInfo?.find(
        (rel) => rel.treat_dev_id == curentKey || rel.yield_dev_id == curentKey
      ) || {};
    for (const [key, value] of Object.entries(findObj)) {
      if (value != curentKey) {
        threshKey = key;
        break;
      }
    }
    return findObj[threshKey] ? `pointname${findObj[threshKey]}` : '';
  };

  const setKey = async (e, checkedKeysValue, flag) => {
    let jsonparam = {
      project_id: value?.project_id,
      ent_id: e.node.company,
    };
    const res = await getDeviceRelList(jsonparam);
    // 当前点击的key,选中状态下，取checkedKeysValue最后一个值，否则取当前点击node下的值
    const curentKey = e.node.key;
    // 获取对应关系Key
    const threshKey = getRelKey(curentKey, res);
    getCheckedRelData(curentKey, threshKey, treedata1, e);
    // 合并选中Key、对应关系Key、之前选中Key
    let checkArr = [
      // flag 为true时,当前公司下，需要累计添加之前选中的keys,
      // flag 为false时，说明切换公司，需要默认一个空的keys
      ...new Set([curentKey, threshKey, ...(flag ? checkedKeys : [])]),
    ].filter((id) => id);
    // 判断是否是默认选中
    const isDefaultChecked =
      checkedKeys.length === 1 && checkedKeys.includes(checkParentKey);
    if (!e.checked) {
      // 默认选中下，checkedKeys 只有一个最外层值，需要区判断使用哪个keys
      checkArr = (!isDefaultChecked && e.checked ? checkArr : checkedKeysValue) //
        .filter((item) => curentKey != item)
        .filter((f) => f != threshKey)
        .filter((m) => m != checkParentKey);
    }
    setCheckedKeys(checkArr);
  };
  const onCheck = async (checkedKeysValue, e) => {
    if (!e.node.group) setIsLoading(true);
    props.clickequipment(e.node.ent_id);
    // 设备关联性的接口操作
    if (e.node.company) {
      let devcodeNum = []
      const devArr = e.checkedNodes[e.checkedNodes.length - 1]
      const devNewArr = e.checkedNodes.filter(item => item.ent_id == devArr.ent_id).filter(it => !it.children).map(i => {
        devcodeNum.push(i.dev_code)
      })
      props.clickDevCode(devcodeNum)
      props.clickequipment(e.node.company);

      if (checkParentKey !== e.node.parentKey) {
        checkedKeysValue = [e.node.key];
        await setKey(e, checkedKeysValue, false);
      } else {
        await setKey(e, checkedKeysValue, true);
      }
      setCheckParentKey(e.node.parentKey);
      setIsLoading(false);

      return;
    }

    // 从一个公司到另一个公司的单选逻辑
    if (
      (checkParentKey &&
        checkParentKey !== e.node.key || checkParentKey &&
        checkParentKey == e.node.key) &&
      !e.node.group &&
      !e.node.company
    ) {
      // console.log(e, 2222222);
      if (e.checked == false) {
        setCheckedKeys([])
        setIsLoading(false);
        return;
      } else {
        setCheckedKeys([e.node.key]);
        const dataD = []
        e.node.children.map(item => {
          item.children.map(it => {
            dataD.push(it.dev_code)
          })
        })
        props.clickDevCode(dataD)
        setCheckParentKey(e.node.key);
        e.checkedNodes = e.checkedNodes.filter(
          (item) => item.parentKey === e.node.key
        );
        props.click(e);
        props.clickequipment(e.node.ent_id);
        setIsLoading(false);
        return;
      }

    }

    // 全选的判断
    if (!e.node.parentKey || e.node.group) {
      const checkedNodes = _.cloneDeep(e.checkedNodes);
      // 是否是相同公司
      const isSameCompany = checkedNodes
        .filter((c) => c.parentKey)
        .every((v) => v.parentKey === checkParentKey);
      if (e.node.group) {
        const c = checkedNodes
          .filter((c) => c.parentKey)
          .filter((f) => f.parentKey !== checkParentKey);

        e.checkedNodes = e.checked && !isSameCompany ? c : checkedNodes;
        const dataCheck = []
        e.checkedNodes.filter(item => !item.children).map(it => {
          dataCheck.push(it.dev_code)
        })
        props.clickDevCode(dataCheck)
      }
      props.click(e);
      props.clickequipment(e.node.ent_id);

      const b = e.checkedNodes;
      const c = b.map((m) => m.key);
      setCheckedKeys([
        ...new Set([...c, ...(isSameCompany ? checkedKeysValue : [])]),
      ]);
      if (e.node.company) {
        setCheckParentKey(e.node.key);
      }
      if (!isSameCompany && e.node.group && !e.node.company) {
        setCheckParentKey(b[0].parentKey);
      }
      setIsLoading(false);
      return;
    }
  };
  const onSelect = (selectedKeysValue, e) => {
    if (e.node.county_id) {
      setIsLoading(true);
      setCheckedKeys(['0-0-1']);
      query(
        `/v1/adm-list?json={"adm_level":3,"project_id":${value?.project_id}}`
      ).then((result) => {
        const resultArr = result?.map((item) => {
          return item;
        });
        let json = {
          project_id: value?.project_id,
          county_id: e.node.county_id,
        };
        getDeviceListRes(json, resultArr);
      });
    }
  };
  const onChange = (e) => {
    if (e.target.value == '') {
      getDeviceListNewRequest();
      setEntName(e.target.value)
      // return;
    } else {
      setEntName(e.target.value)
      const { value } = e.target;
      debounceSearch(value);
    }
  };
  const debounceSearch = useCallback(
    _.debounce(getDeviceListNewRequest, 700),
    []
  );
  // if(entName==""){
  //   return
  // }
  return (
    <div className="DeviceQuery-list">
      <div className="list-top">
        <div className="list-top-head">
          <div className="head-text">企业设备列表</div>
        </div>
        <div className="list-top-seacher">
          <Input
            placeholder="请输入"
            prefix={<SearchOutlined className="site-form-item-icon" />}
            onChange={onChange}
            value={entName&&entName}
            // allowClear={true}
          />
        </div>
      </div>
      <Spin tip="Loading......" spinning={isLoading}>
        <Card bodyStyle={{ height: '1200px' }} size="small">
          <div className="list-bottom">
            {treedata1.length > 0 && treedata1 && (
              <Tree
                showLine
                onExpand={onExpand}
                expandedKeys={expandedKeys} //（受控）展开指定的树节点s
                onCheck={onCheck}
                checkedKeys={checkedKeys}
                onSelect={onSelect}
                treeData={treedata1}
                checkable={true}
                showIcon={true}
                defaultExpandAll
              // defaultExpandedKeys={defaultKeys} //默认展开指定的树节点
              />
            )}
          </div>
        </Card>

      </Spin>
      {/* <div className='list-expand'>展开</div> */}
    </div>

  );
};
export default List;
