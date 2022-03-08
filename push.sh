#!/bin/bash
###
 # @Author: korealu
 # @Date: 2022-03-08 15:23:56
 # @LastEditors: korealu
 # @LastEditTime: 2022-03-08 15:34:02
 # @Description: file content
 # @FilePath: /h5-active-v2/push.sh
### 
baseball=$(
  cd $(dirname $0) || exit
  pwd
)
cd "$baseball" || exit
npm run build
git add .
npm run commit
git push origin
git push pofi
