import { ReactComponent as Alarm } from '@/assets/svg/alarm.svg'
import { ReactComponent as Baojing } from '@/assets/svg/baojing.svg'
import { ReactComponent as Dataquery } from '@/assets/svg/dataquery.svg'
import { ReactComponent as Datareport } from '@/assets/svg/datareport.svg'
import { ReactComponent as Devmanage } from '@/assets/svg/devmanage.svg'
import { ReactComponent as Devops } from '@/assets/svg/devops.svg'
import { ReactComponent as Ledger } from '@/assets/svg/ledger.svg'
import { ReactComponent as Datamanage } from '@/assets/svg/datamanage.svg'
import { ReactComponent as Datastatistics } from '@/assets/svg/datastatistics.svg'
import { ReactComponent as Datacount } from '@/assets/svg/datacount.svg'
import { ReactComponent as Clueidentify } from '@/assets/svg/clueidentify.svg'
import { ReactComponent as Clueanalysis } from '@/assets/svg/clueanalysis.svg'
import { ReactComponent as Overview } from '@/assets/svg/overview.svg'
import { ReactComponent as AlarmAnalyse } from '@/assets/svg/alarm_analyse.svg'
const centerMenu = [
  { key: 'center_electric_power_map', label: '全景展示', level: 1 },
  {
    key: 'center_electric_power_alarm',
    label: '智能报警',
    level: 1,
    children: [
      {
        key: 'Synalarm',
        label: '日常报警',
        level: 2,
        icon: Alarm,
        children: [
          { key: 'SynAlarmReal', label: '实时报警(规则一)' },
          { key: 'SynAlarmRealSecond', label: '实时报警(规则二)' },
          { key: 'SynAlarmList', label: '历史报警(规则一)' },
          { key: 'SynAlarmListSecond', label: '历史报警(规则二)' },
          { key: 'MatterList', label: '问题清单列表' },
          { key: 'MatterListOther', label: '问题下发列表' }
          // { key: 'MatterFeedback', label: '问题接收清单' }
        ]
      },
      {
        key: 'EmergencyAlarm',
        label: '应急报警',
        level: 2,
        icon: Baojing,
        children: [
          { key: 'NewPlanLaunch', label: '预案启动' },
          // { key: 'PlanLaunch', label: '预案启动' },
          { key: 'EnterpriseEmergency', label: '报警列表' },
          // { key: 'EmergencyAlarmList', label: '报警列表' },
          { key: 'PlanMonitoing', label: '过程监控' },
          { key: 'PlanAssessment', label: '应急评估' }
          // { key: 'EmergentMeausere', label: '应急措施' }
        ]
      },
      {
        key: 'OverviewClues',
        label: '线索总览',
        level: 2,
        icon: Overview,

        children: [{ key: 'OverviewOfClues', label: '线索总览' }]
      },
      {
        key: 'AlarmAnalysis',
        label: '报警分析',
        level: 2,
        icon: AlarmAnalyse,
        children: [{ key: 'AlarmAnalysis', label: '报警分析' }]
      }
    ]
  },
  {
    key: 'center_electric_power_pivot_query',
    label: '数据分析',
    level: 1,
    children: [
      {
        key: 'DataQuery',
        label: '数据查询',
        icon: Dataquery,
        level: 2,
        children: [
          { key: 'EquipmentSummary', label: '设备数据' },
          {
            key: 'EnterprisePowerConsumptionList',
            label: '企业数据'
          }
        ]
      },
      {
        key: 'DataStatistics',
        label: '数据统计',
        icon: Datacount,
        level: 2,
        children: [
          { key: 'EnterprisePowerConsumption', label: '企业数据分析' }
          // { key: 'RegionElectro', label: '区级用电', disabled: true },
          // { key: 'IndustryElectro', label: '行业用电', disabled: true }
        ]
      },
      {
        key: 'DataAnayze',
        label: '数据分析',
        level: 2,
        icon: Datareport,
        children: [
          { key: 'DeviceQuery', label: '设备数据分析' },
          { key: 'EntData', label: '企业变化趋势' },
          { key: 'EnterpriseData', label: '企业数据分析' },
          { key: 'TimingComparison', label: '时序对比' },
          { key: 'DailyChangeComparison', label: '日变化分析' }
        ]
      }
    ]
  },
  {
    key: 'center_electric_power_enterprise',
    label: '数据采集',
    level: 1,
    children: [
      {
        key: 'DataStatistics',
        label: '设备管理',
        icon: Devmanage,
        level: 2,
        children: [
          { key: 'EquipmentInstallation', label: '安装统计' },
          { key: 'EquipmentAccount', label: '设备台账' }
        ]
      },
      {
        key: 'EquMaintaine',
        label: '设备质控',
        icon: Devops,
        level: 2,
        children: [
          { key: 'DataAcquisition', label: '设备采集状态' },
          { key: 'EquStatus', label: '设备联网状态' },
          { key: 'OnlineStatistics', label: '设备联网统计' }
        ]
      },
      {
        key: 'EnterpriseInfo',
        label: '企业台账',
        icon: Ledger,
        level: 2,
        children: [
          { key: 'EnterpriseList', label: '企业列表' }
          // { key: 'EnterpriseDetail', label: '企业详情' }
        ]
      },
      {
        key: 'EquDevOps',
        label: '设备运维',
        icon: Devops,
        disabled: true,
        level: 2,
        children: []
      }
    ]
  },
  {
    key: 'center_electric_power_macro_ele',
    label: '宏观用电',
    level: 1,
    children: [
      {
        key: 'DataCollected',
        label: '数据管理',
        icon: Datamanage,
        level: 2,
        children: [
          { key: 'DayElectro', label: '工业企业日用电数据' },
          { key: 'HourElectro', label: '工业企业小时用电数据' }
        ]
      },
      {
        key: 'DataStatistic',
        label: '数据统计',
        icon: Datastatistics,
        level: 2,
        children: [{ key: 'DayElectroList', label: '企业宏观用电数据' }]
      },
      {
        key: 'SuperviseDispatch',
        label: '线索识别',
        icon: Clueidentify,
        level: 2,
        children: [
          { key: 'AutoClue', label: '用电大增线索自动识别' },
          { key: 'ManualClue', label: '用电大增线索手工筛查' }
        ]
      },
      {
        key: 'StaticsAnalysis',
        label: '线索分析',
        icon: Clueanalysis,
        level: 2,
        children: [
          { key: 'ClueList', label: '线索列表' },
          { key: 'ClueCollect', label: '线索统计' },
          { key: 'ClueTracking', label: '线索追踪' }
        ]
      }
    ]
  }
]
const regionMenu = [
  {
    key: 'center_electric_power_alarm',
    label: '智能报警',
    level: 1,
    children: [
      {
        key: 'Synalarm',
        label: '日常报警',
        icon: Alarm,
        level: 2,
        children: [
          { key: 'SynAlarmReal', label: '实时报警' },
          { key: 'SynAlarmList', label: '历史报警' },
          { key: 'MatterList', label: '问题清单列表' },
          { key: 'MatterFeedback', label: '问题接收清单' },
          { key: 'MatterListOther', label: '问题下发列表' }
        ]
      }
    ]
  }
]
export { centerMenu, regionMenu }
