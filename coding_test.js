// readlineモジュールを読み込んで、ユーザーからの入力を受け取れるようにする
const readline = require('readline');

// 半角の括弧だけを抽出する関数
const extractHalfWidthBrackets = (str) => {
    return str.replace(/[^()\[\]{}]/g, '');
};

// 全角括弧が含まれているかチェックする関数
const containsFullWidthBrackets = (str) => {
    return /[（）｛｝［］]/.test(str);
};

const countBrackets = (str) => {
    const counts = { 
        '(': 0,')':0,
        '{': 0,'}':0,
        '[': 0,']':0
    };

    //文字列中の括弧の種類ごとの個数を数える
    for(let char of str){
        if(char in counts){
            counts[char]++;
        }
    }
    return counts;
};


// 括弧の対応関係が正しいかどうかを判定する関数
const isValid = (s) => {
    // 括弧の数が１個以下ならfalse
    if(s.length <= 1) return false;
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

        const filteredInput = extractHalfWidthBrackets(input);
        const counts = countBrackets(filteredInput);

        // 入力に全角括弧が含まれていた場合の処理
        if(containsFullWidthBrackets(input)){
            console.log('⚠ 注意：全角括弧が含まれています');
            console.log('出力：false');
            console.log('入力された括弧(半角)の数:', filteredInput.length);
            console.log('各括弧の入力数:');
            console.log('( の数:', counts['(']);
            console.log(') の数:', counts[')']);
            console.log('{ の数:', counts['{']);
            console.log('} の数:', counts['}']);
            console.log('[ の数:', counts['[']);
            console.log('] の数:', counts[']']);
            return askInput();
        }

        // 判定を実行して結果を表示
        const result = isValid(filteredInput);

        console.log('出力:',result);
        console.log('入力された括弧(半角)の数:', filteredInput.length);
        // 入力された文字数（種類ごとの括弧の数）を表示
        console.log('各括弧の入力数');
        console.log('( の数:', counts['(']);
        console.log(') の数:', counts[')']);
        console.log('{ の数:', counts['{']);
        console.log('} の数:', counts['}']);
        console.log('[ の数:', counts['[']);
        console.log('] の数:', counts[']']);
        // 次の入力を促す
        askInput();
    });
}

// 最初の入力受付を呼び出す
askInput();
