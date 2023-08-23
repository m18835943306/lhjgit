import React, { useState, useEffect, useMemo } from 'react';
import './index.scss';
const CanvasImage = (props) => {
    const {
        ent_id, devDataCode
    } = props;
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [id, setId] = useState(false);
    const [data, setData] = useState(false);
    useEffect(() => {
        if (ent_id || ent_id === 0) {
            setId(ent_id);
        } else {
            setId(false);
        }
    }, [ent_id]);
    useEffect(() => {
        if (devDataCode || devDataCode === 0) {
            setData(devDataCode);
        } else {
            setData(false);
        }
    }, [devDataCode])
    return (
        <div className='CanvasImage'>
            {
                useMemo(() => (
                    // (id || id === 0) && (
                    //     <iframe
                    //         title="用电"
                    //         src={
                    //             'http://localhost:8802/jtopo_topology/network_view.html?ent_id=' +
                    //             id + '&project_id=' + user?.project_id + '&data=' + data
                    //         }
                    //         frameBorder="0"
                    //     ></iframe>
                    // )
                    (id || id === 0) && (
                        <iframe
                            title="用电"
                            src={
                                'https://react-olympic-pre.airqualitychina.cn/jtopo_topology/network_view.html?ent_id=' +
                                id + '&project_id=' + user?.project_id +'&data=' + data+
                                '&time=' +
                                new Date().getTime()
                            }
                            frameBorder="0"
                        ></iframe>
                    )
                ), [id,data])
            }

        </div>
    )
}
export default CanvasImage
