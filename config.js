// ====== 打刻システム（GitHub Pages版）共通設定 ======
//
// GAS_URL には「打刻」プロジェクトのWebアプリURL（/exec で終わるもの）を貼る。
// - デプロイ設定は「実行ユーザー：自分」「アクセスできるユーザー：全員」
//   （Googleログイン不要の方）が必須。
// - このURLを変えないため、GAS側のコード更新は必ず
//   「デプロイを管理 → 鉛筆 → 新バージョン」で行うこと（「新しいデプロイ」はURLが変わる）。
var GAS_URL = 'ここにGASのWebアプリURL（https://script.google.com/macros/s/…/exec）を貼る';

// GASのAPI（doPost）を呼ぶ共通ヘルパー。
// gasCall('関数名', [引数1, 引数2, …]) → Promise（成功: サーバーの戻り値 / 失敗: Error）
//
// CORSの制約（変更するときの注意）：
// - Content-Type は text/plain のまま変えないこと。application/json にすると
//   プリフライト（OPTIONS）が発生し、GASは応答できないため必ず失敗する。
// - カスタムヘッダは付けない。合言葉なども全部 args（ボディ）に入れる。
// - GASへのPOSTは302リダイレクトされるが、fetchの既定（redirect: 'follow'）で
//   自動追従される。mode: 'no-cors' は付けない（レスポンスが読めなくなる）。
// - サーバーはエラーも HTTP 200 + {ok:false, error:…} で返す設計。
function gasCall(fn, args) {
  return fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ fn: fn, args: args || [] }),
  }).then(
    function (res) {
      if (!res.ok) throw new Error('サーバーとの通信に失敗しました（HTTP ' + res.status + '）');
      return res.json().catch(function () {
        throw new Error('サーバーの応答を読み取れませんでした。config.js の GAS_URL と、GASのデプロイ設定（アクセス：全員）を確認してください。');
      });
    },
    function () {
      throw new Error('通信に失敗しました。電波状況を確認して、もう一度お試しください。');
    }
  ).then(function (json) {
    if (!json.ok) throw new Error(json.error || 'サーバーでエラーが発生しました');
    return json.data;
  });
}
