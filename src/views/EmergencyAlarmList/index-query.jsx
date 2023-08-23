import query from '&/api/electricity/query';
import { message } from 'antd';
import _ from 'lodash';

export const getList1 = (setData, setLoading, setPageInfo) => {
  // console.log("111111111111111");
  return (params) => {
    setLoading(true);
    const {
      ent_name,
      county_id,
      town_id,
      dev_type,
      industry_type_id,
      warn_type,
      warn_level,
      process_status,
      release_status,
      timeRange,
    } = params;
    const { project_id } = JSON.parse(localStorage.getItem('user'));
    const p = {
      ent_name,
      project_id: project_id,
    };
    if (county_id) {
      p.county_id = county_id;
    }
    if (town_id) {
      p.town_id = town_id;
    }
    if (dev_type) {
      p.dev_type = dev_type;
    }
    if (industry_type_id) {
      p.industry_type_id = `${industry_type_id}`;
    }
    if (warn_type) {
      p.warn_type = warn_type;
    }
    if (warn_level) {
      p.warn_level = warn_level;
    }
    if (process_status) {
      p.process_status = process_status;
    }
    if (release_status || release_status === 0) {
      // console.log(release_status,"release_statusrelease_statusrelease_status");
      p.release_status = release_status;
    }
    if (timeRange && timeRange[0]) {
      p.start_time = timeRange[0].format('YYYY-MM-DD HH:mm:ss');
    }
    if (timeRange && timeRange[1]) {
      p.end_time = timeRange[1].format('YYYY-MM-DD HH:mm:ss');
    }
    p.warn_type = '1,2,3';
    // console.log(p,"ppppppppp");
    query('/v1/device-warn-list', p)
      .then((res) => {
        // setPageInfo(res.page_info);
        setData(res.data);
      })
      .catch((e) => {
        message.error('暂无数据');
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
};
