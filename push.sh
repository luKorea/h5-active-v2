#!/bin/bash
###
 # @Author: korealu
 # @Date: 2022-03-08 15:23:56
 # @LastEditors: korealu 643949593@qq.com
 # @LastEditTime: 2022-05-06 10:20:42
 # @Description: file content
 # @FilePath: /h5-active-v2/push.sh
### 
baseball=$(
  cd $(dirname $0) || exit
  pwd
)
cd "$baseball" || exit
# npm run build
git add .
npm run commit
git push origin
npm run build
