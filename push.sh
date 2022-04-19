#!/bin/bash
###
 # @Author: korealu
 # @Date: 2022-03-08 15:23:56
 # @LastEditors: Please set LastEditors
 # @LastEditTime: 2022-04-19 16:59:23
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
