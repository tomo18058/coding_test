// readlineモジュールを読み込んで、ユーザーからの入力を受け取れるようにする
const readline = require('readline');


// 括弧の対応関係が正しいかどうかを判定する関数
const isValid = (s) => {
    // 括弧の開閉を管理するスタック
    const stack = []; 
    // 開き括弧と閉じ括弧の対応表
    const parentheses = { 
        '(': ')',
        '{': '}',
        '[': ']'
    };

    // 文字列を1文字ずつチェック
    for(let char of s){
        if(char in parentheses) {
            // 開き括弧ならスタックに追加
            stack.push(char); 
        } else {
            // 閉じ括弧が来た場合、直前の開き括弧を取り出す
            // 括弧の対応が正しくなければ false を返す
            const last = stack.pop(); 
            if (parentheses[last] !== char) {
                return false;
            }

        };
    }
    // 最後にスタックが空なら、すべて正しく閉じられている
    return stack.length === 0;
};

// ユーザー入力を扱うためのインターフェースを作成
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 入力受付と処理を行う関数（再帰的に自分を呼び出すことで繰り返す）
const askInput = () => {
    rl.question('入力(exitで終了):',(input) => {
         // exit と入力されたら終了
        if (input.toLocaleLowerCase() === 'exit'){
            rl.close();
            console.log('終了しました。');
            return;
        }

        // 判定を実行して結果を表示
        const result = isValid(input);
        console.log('出力:',result);
        // 入力された文字数（括弧の数）を表示
        console.log('入力された括弧の数',input.length);
        // 次の入力を促す
        askInput();
    });
}

// 最初の入力受付を呼び出す
askInput();
