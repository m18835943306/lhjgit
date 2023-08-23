
sed -i 's#https://user-api.airqualitychina.cn#http://10.18.41.67:8001#g' `grep 'https://user-api.airqualitychina.cn' -rl ./dist/ | awk -F':' '{print $1}'`
sed -i 's#https://logo.i2value.cn#http://10.18.41.67:8002#g' `grep 'https://logo.i2value.cn' -rl ./dist/ | awk -F':' '{print $1}'`
sed -i 's#https://npm-static.oss-accelerate.aliyuncs.com#http://10.18.41.67:8003#g' `grep 'https://npm-static.oss-accelerate.aliyuncs.com' -rl ./dist/ | awk -F':' '{print $1}'`
sed -i 's#https://electricity-api-service-pre.airqualitychina.cn#http://electricity-api-service.bjmemc.hotgrid.cn#g' `grep 'https://electricity-api-service-pre.airqualitychina.cn' -rl ./dist/ | awk -F':' '{print $1}'`
sed -i 's#https://electricity-api-service.airqualitychina.cn#http://electricity-api-service.bjmemc.hotgrid.cn#g' `grep 'https://electricity-api-service.airqualitychina.cn' -rl ./dist/ | awk -F':' '{print $1}'`
# 替换跳转路径
sed -i 's#https://bjmemc-electricity.airqualitychina.cn/#http://bjmemc-electricity.bjmemc.hotgrid.cn#g' `grep 'https://bjmemc-electricity.airqualitychina.cn' -rl ./dist/ | awk -F':' '{print $1}'`

exit 0
