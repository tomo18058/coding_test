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

let s = '()';
console.log(isValid(s)); //true

s = '([]){}';
console.log(isValid(s)); //true

s = '({)}'
console.log(isValid(s)); //false