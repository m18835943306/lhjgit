 const columnnew = [
    {
      title: '序号',
      width: 50,
      align: 'center',
      render: (text, item, index) => {
        return index + 1
      }
    },
    {
      title: '企业名称',
      width: 250,
      dataIndex: 'ent_name',
      align: 'center',
    //   render: renderFun
    },
    {
      width: 150,
      title: '区',
      dataIndex: 'county_name',
      align: 'center',
    //   render: renderFun
    },
    {
      title: '街乡镇',
      width: 150,
      dataIndex: 'town_name',
      align: 'center',
    //   render: renderFun
    },
    {
      width: 150,
      title: '所属工业园区',
      dataIndex: 'of_park',
      align: 'center',
    //   render: renderFun
    },
    {
      width: 150,
      title: '是否重点排污单位',
      dataIndex: 'if_key_discharge_unit',
      align: 'center',
    //   render: renderFun
    },
    {
      title: '是否纳入环境统计',
      width: 150,
      dataIndex: 'if_in_environment',
      align: 'center',
    //   render: renderFun
    },
    {
      title: '是否有在线监测',
      width: 150,
      dataIndex: 'if_online_monitor_avail',
      align: 'center',
    //   render: renderFun
    },
    {
      title: '重点行业类型',
      dataIndex: 'key_industry_type',
      width: 150,
      align: 'center',
    //   render: renderFun
    },
    {
      title: '其他行业类型',
      dataIndex: 'other_industry_type',
      width: 100,
      align: 'center',
    //   render: renderFun
    },
    {
      title: '管控类型',
      dataIndex: 'control_type',
      width: 100,
      align: 'center',
    //   render: renderFun
    },
    {
      title: '报告',
      dataIndex: '',
      width: 100,
      align: 'center'
      // render: renderFun,
    },
    {
        title: 'SO2排放量（年）',
        dataIndex: 'SO2_emissions',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: 'NOx排放量（年)',
        dataIndex: 'NOx_emissions',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: 'VOCs排放量（年）',
        dataIndex: 'VOCs_emissions',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '详细地址',
        dataIndex: 'address',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '年用电量',
        dataIndex: 'annual_electricity_consumption',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '年产量',
        dataIndex: 'annual_output',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '年产值',
        dataIndex: 'annual_output_value',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '大气CEMS在线数量',
        dataIndex: 'cems_online_count',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '建设单位',
        dataIndex: 'construction_unit',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '大气CEMS在线数量',
        dataIndex: 'cems_online_count',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '建设单位',
        dataIndex: 'construction_unit',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '联系人',
        dataIndex: 'contacts',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '管控类型',
        dataIndex: 'control_type',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '统一社会信用代码',
        dataIndex: 'credit_code',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '排污许可管理类型',
        dataIndex: 'discharge_management_type',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '排污许可证编号',
        dataIndex: 'discharge_permit_code',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '电力局总表编号',
        dataIndex: 'general_code',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '是否已有用电监测系统',
        dataIndex: 'if_elec_system_avail',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '电力局总表编号',
        dataIndex: 'general_code',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '是否已有用电监测系统',
        dataIndex: 'if_elec_system_avail',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '行业类型信息',
        dataIndex: 'industry_type',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '企业法人',
        dataIndex: 'legal_person',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '生产线数量',
        dataIndex: 'line_count',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '生产线描述',
        dataIndex: 'line_description',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '大气主要排放口数量',
        dataIndex: 'main_outlet_count',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '主要污染物',
        dataIndex: 'main_pollutants',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '主要产品',
        dataIndex: 'main_product',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '所属工业园区',
        dataIndex: 'of_park',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '橙色预警减排措施',
        dataIndex: 'orange_control_measure',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '颗粒物排放量（年）',
        dataIndex: 'particle_emissions',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '大气排放口数量',
        dataIndex: 'outlet_count',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '大气排放口数量',
        dataIndex: 'outlet_count',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '红色预警减排措施',
        dataIndex: 'red_control_measure',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '注册资金',
        dataIndex: 'registered_capital',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '备用生产线描述',
        dataIndex: 'spare_line_description',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
      {
        title: '黄色预警减排措施',
        dataIndex: 'yellow_control_measure',
        width: 100,
        align: 'center'
        // render: renderFun,
      },
  ]
  export default columnnew