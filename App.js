import React,{ useState} from "react";

const App = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);

    const isValid = (s) => {
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
            }
        }

        return stack.length === 0;
    };

    return(
        <div style={{ padding: '20px', fontFamily: 'sana-serif'}}>
            <h2>括弧判定ツール（React）</h2>
        </div>
    )
}