/*
 * @Author: your name
 * @Date: 2022-01-19 09:52:04
 * @LastEditTime: 2022-01-19 15:58:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-active-v2/src/views/home/test.js
 */
export const stringUrl = `<form name="punchout_form" method="post" action="https://openapi.alipay.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=LyArRptCP4z%2FkI%2F3ShNwjz56s1P3RUBxQv0tv2OfLOc%2BYU%2BgwKP%2FwcaJfMau433mPdM8cw4jLQGLdFYZ%2BGUYBokmk%2BTLaz3PMP4W8v71psqRoLhgXxkEcyex%2FY68VrSQiFSx8CjQGVkbj8owaED2d%2BSoL3Ygl1LnviYZOuefiQGrcYH7AjiJTvPXANTFIzbOHLVILWurKkXJMpnoxSyGjPcjhAiXrokuUgdqnk%2FCTFo3Kc8PkNJ7sOtt9cCf1BXhLHV%2F9zMaf78vRIJju4zP6z1l6rk0vL3SPq79O5fsFFB9znEhZpZZWwoRQeTKBo3HPdllhiF%2B1yybruWVLi%2ByMw%3D%3D&return_url=http%3A%2F%2Fwww.baidu.com&notify_url=http%3A%2F%2Fwww.baidu.com&version=1.0&app_id=2016120703987922&sign_type=RSA2&timestamp=2022-01-19+13%3A48%3A12&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json">
<input type="hidden" name="biz_content" value="{ &quot;out_trade_no&quot;:&quot;doll20150320010101002&quot;, &quot;total_amount&quot;:&quot;0.12&quot;, &quot;subject&quot;:&quot;Iphgfg&quot;, &quot;product_code&quot;:&quot;QUICK&quot; }">
<input type="submit" value="立即支付" style="display:none" >
</form>
<script>document.forms[0].submit();</script>`;
