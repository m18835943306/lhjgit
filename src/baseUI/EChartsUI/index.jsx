import React, { useEffect, useRef, useState } from 'react';
import { changeThemeListener } from '&/commonjs/util';

//引入 echarts
import * as echarts from 'echarts';

const Echarts = (props) => {
  //echarts
  const { style, events, callback, isChangeColor = true, onChartReady } = props;
  const ref = useRef();
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    if (ref.current && props.option) {
      const instance =
        echarts.getInstanceByDom(ref.current) || echarts.init(ref.current);
      instance.clear();
      instance.setOption(props.option, true);
      isChangeColor
        ? changeThemeListener({
            type: 'echarts',
            instance,
          })
        : null;
      setInstance(instance);
      // 图表联动
      if (props.group) {
        instance.group = props.group;
        echarts.connect(props.group);
      }
      instance.on(events, (params) => {
        if (callback) {
          callback(params);
        }
      });
      window.addEventListener('resize', function () {
        instance.resize();
      });
    }
  }, [ref.current, props.option]);

  useEffect(() => {
    if (instance && instance.getOption()) {
      onChartReady && onChartReady(instance);
    }
  }, [instance,props.option]);

  useEffect(() => {
    instance && instance.resize();
  }, [props.width, props.height]);

  return (
    <div
      ref={ref}
      style={{ width: `100%`, height: props.height || '100%', ...style }}
    ></div>
  );
};

export default Echarts;
