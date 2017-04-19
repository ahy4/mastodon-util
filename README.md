# mastodon-util

> Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

*Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:
  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## 用意（追記）

apiを叩くにはaccess tokenが必要ですが、それは事前に用意してあり、環境変数(process.env.ACCESS_TOKEN)から参照してます。

そのため、以下の手順を踏む必要があります：

#### 1. 対称サーバのmastodonアカウントを作る

#### 2. http://qiita.com/syui/items/b6d07958cc9acf1b9fdc こちらを実行する。

具体的には、

```shellscript
# add application
MASTODON_HOST=mstdn.syui.cf
CLIENT_NAME=mstdn-client
if [ ! -f ./client_id.json ];then
    WEBSITE=https://example.com
    curl -X POST -d "client_name=$CLIENT_NAME&redirect_uris=${REDIRECT_URIS:-urn:ietf:wg:oauth:2.0:oob}&scopes=${SCOPES:-read write follow}&website=$WEBSITE" -sS https://${MASTODON_HOST}/api/v1/apps >> ./client_id.json
fi

# get access token
json=`cat ./client_id.json`
CLIENT_ID=`echo $json|jq -r '.client_id'`
CLIENT_SECRET=`echo $json|jq -r '.client_secret'`
YOUR_EMAIL=mail+mastodon@gmail.com
YOUR_PASSWORD=passwd
curl -H "Content-Type: application/json" -X POST -Ss https://$MASTODON_HOST/oauth/token -d "{\"client_id\": \"$CLIENT_ID\", \"client_secret\": \"$CLIENT_SECRET\", \"grant_type\": \"password\", \"username\": \"$YOUR_EMAIL\", \"password\": \"$YOUR_PASSWORD\", \"scope\": \"read write follow\"}"

# use api
if [ ! -f ./access_token.json ];then
    curl -H "Content-Type: application/json" -X POST -Ss https://$MASTODON_HOST/oauth/token -d "{\"client_id\": \"$CLIENT_ID\", \"client_secret\": \"$CLIENT_SECRET\", \"grant_type\": \"password\", \"username\": \"$YOUR_EMAIL\", \"password\": \"$YOUR_PASSWORD\", \"scope\": \"read write follow\"}" >> access_token.json
fi

ACCESS_TOKEN=`cat ./access_token.json|jq -r '.access_token'`
curl -H "Authorization: Bearer $ACCESS_TOKEN" -sS https://$MASTODON_HOST/api/v1/timelines/public
```

のMASTODON_HOST、CLIENT_NAME、YOUR_EMAIL、YOUR_PASSWORDを変更することになります。

最後まで実行が正常に通るとmastodonのlocal timelineのjsonが見えます

#### 3. ACCESS_TOKEN=youraccesstoken npm run dev を実行

これを行うことで http://localhost:3000/ へ行くと動作確認ができます。
